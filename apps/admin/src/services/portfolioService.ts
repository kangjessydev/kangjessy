import { sanityClient, sanityWriteClient } from '@kangjessy/database'

export interface PortfolioItem {
  id: string
  title: string
  slug: string
  excerpt?: string // Maps to 'description' in Sanity
  image?: string // Maps to 'image' in Sanity
  imageRef?: string // for image asset reference
  gallery?: string[] 
  content?: any // Maps to 'content' in Sanity
  client?: string 
  category?: string | { id: string, name: string } // Maps to 'category' reference
  industry?: string 
  icon?: string 
  color?: string
  tags?: string[]
  technologies?: string[] 
  websiteUrl?: string // Maps to 'liveUrl' in Sanity
  githubUrl?: string
  completionDate?: string // Maps to 'date' in Sanity
  year?: string
  visibility: 'published' | 'draft' 
  status: 'IDEA' | 'SUCCESS' 
  created_at?: string
  
  // Advanced Fields
  challenge?: { title?: string; description: string; painPoints?: string[] }
  pivot?: {
    title: string
    subtitle: string
    items: { icon: string; title: string; desc: string }[]
  }
  steps?: { title: string; desc: string }[]
  metrics?: { icon: string; value: string; label: string; proofImage?: string }[]
  impact?: string
  faqs?: { q: string; a: string }[]
  relatedServices?: string[]
}

export const portfolioService = {
  // Get All Portfolios
  async getAll() {
    const query = `*[_type == "project"] | order(date desc){
      "id": _id,
      title,
      "slug": slug.current,
      "excerpt": description,
      "image": image.asset->url,
      "client": client,
      "category": category->title,
      "status": status,
      "visibility": select(defined(publishedAt) => 'published', 'draft'),
      "technologies": technologies,
      "completionDate": date,
      "year": string::split(date, "-")[1],
      icon,
      color
    }`
    
    try {
      const data = await sanityClient.fetch(query) as PortfolioItem[]
      return data
    } catch (err) {
      console.error('Portfolio fetch failed:', err)
      return []
    }
  },

  async getById(id: string) {
    const query = `*[_type == "project" && (_id == $id || _id == "drafts." + $id)][0]{
      "id": _id,
      title,
      "slug": slug.current,
      "excerpt": description,
      "content": content,
      "image": image.asset->url,
      "imageRef": image.asset._ref,
      "gallery": gallery[].asset->url,
      client,
      "category": category->_id,
      "websiteUrl": liveUrl,
      githubUrl,
      "completionDate": date,
      technologies,
      "visibility": select(defined(publishedAt) => 'published', 'draft'),
      status,
      tags,
      publishedAt,
      challenge,
      pivot,
      steps,
      metrics,
      impact,
      faqs,
      icon,
      color,
      relatedServices
    }`
    return await sanityClient.fetch(query, { id }) as PortfolioItem
  },

  async create(item: Partial<PortfolioItem>) {
    const doc: any = {
      _type: 'project',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      description: item.excerpt, 
      content: item.content,
      client: item.client,
      date: item.completionDate,
      liveUrl: item.websiteUrl,
      githubUrl: item.githubUrl,
      publishedAt: item.visibility === 'published' ? new Date().toISOString() : null,
      status: item.status || 'SUCCESS',
      technologies: item.technologies || [],
      tags: item.tags || [],
      challenge: item.challenge,
      pivot: item.pivot,
      steps: item.steps,
      metrics: item.metrics,
      impact: item.impact,
      faqs: item.faqs,
      icon: item.icon,
      color: item.color,
      relatedServices: item.relatedServices || []
    }

    if (item.category) {
       const categoryId = typeof item.category === 'string' ? item.category : (item.category as any).id
       if (categoryId) {
         doc.category = {
           _type: 'reference',
           _ref: categoryId
         }
       }
    }

    if (item.imageRef) {
      doc.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: item.imageRef }
      }
    }

    const result = await sanityWriteClient.create(doc)
    return { ...result, id: result._id }
  },

  async update(id: string, item: Partial<PortfolioItem>) {
    const patch: any = {
      title: item.title,
      description: item.excerpt,
      content: item.content,
      client: item.client,
      date: item.completionDate,
      liveUrl: item.websiteUrl,
      githubUrl: item.githubUrl,
      technologies: item.technologies,
      status: item.status,
      tags: item.tags,
      challenge: item.challenge,
      pivot: item.pivot,
      steps: item.steps,
      metrics: item.metrics,
      impact: item.impact,
      faqs: item.faqs,
      icon: item.icon,
      color: item.color,
      relatedServices: item.relatedServices
    }

    if (item.slug) patch.slug = { _type: 'slug', current: item.slug }
    
    if (item.category) {
        const categoryId = typeof item.category === 'string' ? item.category : (item.category as any).id
        if (categoryId) {
            patch.category = {
                _type: 'reference',
                _ref: categoryId
            }
        }
    }

    if (item.imageRef) {
      patch.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: item.imageRef }
      }
    }

    if (item.visibility === 'published') {
         patch.publishedAt = new Date().toISOString()
    } else if (item.visibility === 'draft') {
         patch.publishedAt = null
    }

    const result = await sanityWriteClient.patch(id).set(patch).commit()
    return { ...result, id: result._id }
  },

  async delete(id: string) {
    await sanityWriteClient.delete(id)
  },
  
  async uploadImage(file: File) {
    return await sanityWriteClient.assets.upload('image', file, {
      filename: file.name
    })
  },

  // Categories
  async getAreas() {
    const query = `*[_type == "category"] | order(title asc){
      "id": _id,
      "name": title,
      "slug": slug.current
    }`
    try {
      return await sanityClient.fetch(query)
    } catch (e) {
      return []
    }
  },

  async createArea(area: { name: string, slug: string }) {
    const doc = {
      _type: 'category',
      title: area.name,
      slug: { _type: 'slug', current: area.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async updateArea(id: string, area: { name: string, slug: string }) {
    const patch = {
      title: area.name,
      slug: { _type: 'slug', current: area.slug }
    }
    const result = await sanityWriteClient.patch(id).set(patch).commit()
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async deleteArea(id: string) {
    await sanityWriteClient.delete(id)
  },

  // Technologies (Just helpers for UI, Sanity stores them as simple strings in 'project')
  async getTechnologies() {
    const query = `*[_type == "technology"] | order(title asc){
      "id": _id,
      "name": title,
      "slug": slug.current
    }`
    try {
      return await sanityClient.fetch(query)
    } catch (e) {
      return []
    }
  },

  async createTechnology(tech: { name: string, slug: string }) {
    const doc = {
      _type: 'technology',
      title: tech.name,
      slug: { _type: 'slug', current: tech.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async updateTechnology(id: string, tech: { name: string, slug: string }) {
    const patch = {
      title: tech.name,
      slug: { _type: 'slug', current: tech.slug }
    }
    const result = await sanityWriteClient.patch(id).set(patch).commit()
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async deleteTechnology(id: string) {
    await sanityWriteClient.delete(id)
  }
}

