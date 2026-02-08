import { sanityClient, sanityWriteClient } from '@kangjessy/database'

export interface PortfolioItem {
  id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: string
  mainImageRef?: string
  gallery?: string[] 
  content?: any // mapped to description
  client?: string
  category?: string // Renamed from category in UI to 'Area'
  industry?: string
  icon?: string // Lucide icon name or emoji
  color?: string // Theme color/gradient
  tags?: string[] // Highlights/Area tags
  technologies?: string[] // Full tech stack
  websiteUrl?: string
  githubUrl?: string
  completionDate?: string
  visibility: 'published' | 'draft' // For Sanity doc state
  status: 'IDEA' | 'SUCCESS' // For project lifecycle
  created_at?: string
  
  // Advanced Fields
  challenge?: string | { description: string }
  pivot?: {
    title: string
    subtitle: string
    items: { icon: string; title: string; desc: string }[]
  }
  steps?: { title: string; desc: string }[]
  metrics?: { icon: string; value: string; label: string; proofImage?: string }[]
  impact?: string
  faqs?: { q: string; a: string }[]
}

export const portfolioService = {
  // Get All Portfolios (Sanity: project)
  async getAll() {
    const query = `*[_type == "project"] | order(completionDate desc){
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      "client": clientName,
      "category": coalesce(category->title, category),
      industry,
      icon,
      color,
      status,
      "visibility": select(defined(publishedAt) => 'published', 'draft'),
      tags,
      "technologies": technologies[]->title,
      completionDate
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
      excerpt,
      "content": description,
      "mainImage": mainImage.asset->url,
      "mainImageRef": mainImage.asset._ref,
      "gallery": gallery[].asset->url,
      "client": clientName,
      "category": coalesce(category->title, category),
      industry,
      icon,
      color,
      websiteUrl,
      githubUrl,
      completionDate,
      "technologies": technologies[]->_id,
      "visibility": select(defined(publishedAt) => 'published', 'draft'),
      status,
      tags,
      publishedAt,
      challenge,
      pivot,
      steps,
      metrics,
      impact,
      faqs
    }`
    return await sanityClient.fetch(query, { id }) as PortfolioItem
  },

  async create(item: Partial<PortfolioItem>) {
    const doc: any = {
      _type: 'project',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      excerpt: item.excerpt,
      description: item.content, 
      clientName: item.client,
      category: item.category,
      industry: item.industry,
      icon: item.icon,
      color: item.color,
      websiteUrl: item.websiteUrl,
      githubUrl: item.githubUrl,
      completionDate: item.completionDate,
      publishedAt: item.visibility === 'published' ? new Date().toISOString() : null,
      status: item.status || 'SUCCESS',
      tags: item.tags || [],
      challenge: item.challenge,
      pivot: item.pivot,
      steps: item.steps,
      metrics: item.metrics,
      impact: item.impact,
      faqs: item.faqs
    }

    if (item.mainImageRef) {
      doc.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: item.mainImageRef }
      }
    }

    // Technologies (Tags)
    if (item.technologies && item.technologies.length > 0) {
        doc.technologies = item.technologies.map(id => ({
          _type: 'reference',
          _ref: id,
          _key: Math.random().toString(36).substring(2)
        }))
    }

    const result = await sanityWriteClient.create(doc)
    return { ...result, id: result._id }
  },

  async update(id: string, item: Partial<PortfolioItem>) {
    const patch: any = {
      title: item.title,
      excerpt: item.excerpt,
      description: item.content,
      clientName: item.client,
      category: item.category,
      industry: item.industry,
      icon: item.icon,
      color: item.color,
      websiteUrl: item.websiteUrl,
      githubUrl: item.githubUrl,
      completionDate: item.completionDate,
      challenge: item.challenge,
      pivot: item.pivot,
      steps: item.steps,
      metrics: item.metrics,
      impact: item.impact,
      faqs: item.faqs
    }

    if (item.slug) patch.slug = { _type: 'slug', current: item.slug }
    
    if (item.mainImageRef) {
      patch.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: item.mainImageRef }
      }
    }

    // Technologies
    if (item.technologies) {
        patch.technologies = item.technologies.map(id => ({
            _type: 'reference',
            _ref: id,
            _key: Math.random().toString(36).substring(2)
        }))
    }

    if (item.visibility === 'published') {
         patch.publishedAt = new Date().toISOString()
    } else if (item.visibility === 'draft') {
        patch.publishedAt = null
    }

    if (item.status) patch.status = item.status
    if (item.tags) patch.tags = item.tags

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

  // Areas (Categories)
  async getAreas() {
    const query = `*[_type == "portfolioArea"] | order(title asc){
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
      _id: `portfolioArea-${Date.now()}`,
      _type: 'portfolioArea',
      title: area.name,
      slug: { _type: 'slug', current: area.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async deleteArea(id: string) {
    await sanityWriteClient.delete(id)
  },

  // Technologies (Tags)
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
      _id: `technology-${Date.now()}`,
      _type: 'technology',
      title: tech.name,
      slug: { _type: 'slug', current: tech.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current }
  },

  async deleteTechnology(id: string) {
    await sanityWriteClient.delete(id)
  }
}
