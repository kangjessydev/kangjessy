import { sanityClient, sanityWriteClient } from '@kangjessy/database'
import type { BlogPost, BlogCategory, BlogTag } from '../types'

export const blogService = {
  // Posts
  async getAll() {
    const query = `*[_type == "post"] | order(_createdAt desc){
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "featured_image": mainImage.asset->url,
      status,
      "categories": categories[]->{ "id": _id, "name": title },
      "tags": tags[]->{ "id": _id, "name": title },
      publishedAt,
      "created_at": _createdAt,
      "updated_at": _updatedAt
    }`
    
    try {
      const data = await sanityClient.fetch(query) as BlogPost[]
      // If database works, return only database posts (ignore local)
      return data
    } catch (err) {
      console.error('Database fetch failed, using local posts:', err)
      // Only use local posts if database is completely unavailable
      return this.getLocalPosts()
    }
  },

  getLocalPosts(): BlogPost[] {
    const localPosts: BlogPost[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('demo_post_')) {
        try {
          const post = JSON.parse(localStorage.getItem(key)!)
          localPosts.push({
            ...post,
            id: key, // Use key as ID
            is_local: true,
            status: post.status || 'local-draft',
            created_at: post.created_at || new Date().toISOString()
          })
        } catch (e) {
          console.error('Error parsing local post', e)
        }
      }
    }
    return localPosts
  },

  async getById(id: string) {
    const query = `*[_type == "post" && (_id == $id || _id == "drafts." + $id)][0]{
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "featured_image": mainImage.asset->url,
      "featured_image_alt": mainImage.alt,
      "featured_image_ref": mainImage.asset._ref,
      status,
      "categories": categories[]->_id,
      "tags": tags[]->_id,
      "read_time": readTime,
      "author": authorName,
      "seo_title": coalesce(seoTitle, title),
      "seo_description": coalesce(seoDescription, excerpt),
      "seo_keywords": seoKeywords,
      "social_title": socialTitle,
      "social_description": socialDescription,
      "social_image": socialImage.asset->url,
      "social_image_ref": socialImage.asset._ref,
      publishedAt,
      "publish_schedule": publishedAt,
      "created_at": _createdAt
    }`
    const data = await sanityClient.fetch(query, { id })
    
    // Parse read time string "X min read" back to number X
    if (data && data.read_time) {
      const match = data.read_time.toString().match(/\d+/)
      if (match) {
        data.read_time = parseInt(match[0])
      } else {
        // Fallback or handle raw number
        const num = parseInt(data.read_time as any)
        data.read_time = isNaN(num) ? 5 : num
      }
    }
    
    return data as BlogPost
  },

  async create(post: Partial<BlogPost>) {
    const doc: any = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      content: post.content,
      status: post.status || 'published',
      authorName: post.author || 'Admin',
      readTime: (post.read_time || 5).toString() + ' min read',
      publishedAt: post.status === 'published' ? new Date().toISOString() : post.publish_schedule,
      // SEO Fields
      seoTitle: post.seo_title || post.title,
      seoDescription: post.seo_description || post.excerpt,
      seoKeywords: post.seo_keywords || '',
      socialTitle: post.social_title || post.seo_title || post.title,
      socialDescription: post.social_description || post.seo_description || post.excerpt,
    }

    if (post.social_image_ref) {
      doc.socialImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: post.social_image_ref }
      }
    }

    if (post.featured_image_ref) {
      doc.mainImage = {
        _type: 'image',
        alt: post.featured_image_alt || '',
        asset: {
          _type: 'reference',
          _ref: post.featured_image_ref
        }
      }
    }

    // Map Categories to References
    if (post.categories && post.categories.length > 0) {
      doc.categories = post.categories.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: Math.random().toString(36).substring(2)
      }))
    }

    // Map Tags to References
    if (post.tags && post.tags.length > 0) {
      doc.tags = post.tags.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: Math.random().toString(36).substring(2)
      }))
    }
    
    const result = await sanityWriteClient.create(doc)
    return { ...result, id: result._id } as any
  },

  async update(id: string, post: Partial<BlogPost>) {
    const patch: any = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      status: post.status,
      authorName: post.author,
      readTime: post.read_time ? (post.read_time.toString() + ' min read') : undefined,
      // SEO Fields
      seoTitle: post.seo_title,
      seoDescription: post.seo_description,
      seoKeywords: post.seo_keywords,
      socialTitle: post.social_title,
      socialDescription: post.social_description,
    }

    if (post.social_image_ref) {
      patch.socialImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: post.social_image_ref }
      }
    }

    if (post.slug) {
      patch.slug = { _type: 'slug', current: post.slug }
    }

    if (post.featured_image_ref) {
      patch.mainImage = {
        _type: 'image',
        alt: post.featured_image_alt || '',
        asset: {
          _type: 'reference',
          _ref: post.featured_image_ref
        }
      }
    }

    // Map Categories to References
    if (post.categories) {
      patch.categories = post.categories.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: Math.random().toString(36).substring(2)
      }))
    }

    // Map Tags to References
    if (post.tags) {
      patch.tags = post.tags.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: Math.random().toString(36).substring(2)
      }))
    }

    if (post.status === 'published' && !post.published_at) {
      patch.publishedAt = new Date().toISOString()
    }

    const result = await sanityWriteClient.patch(id).set(patch).commit()
    return { ...result, id: result._id } as any
  },

  async uploadImage(file: File) {
    const asset = await sanityWriteClient.assets.upload('image', file, {
      filename: file.name
    })
    return asset
  },

  async delete(id: string) {
    if (id.startsWith('demo_post_')) {
      localStorage.removeItem(id)
      return
    }
    await sanityWriteClient.delete(id)
  },

  // Categories
  async getCategories() {
    const query = `*[_type == "blogCategory"] | order(title asc){
      "id": _id,
      "name": title,
      "slug": slug.current
    }`
    const data = await sanityClient.fetch(query)
    return data as BlogCategory[]
  },

  async createCategory(category: Partial<BlogCategory>) {
    const doc = {
      _type: 'blogCategory',
      title: category.name,
      slug: { _type: 'slug', current: category.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current } as any
  },

  async deleteCategory(id: string) {
    await sanityWriteClient.delete(id)
  },

  // Tags
  async getTags() {
    const query = `*[_type == "blogTag"] | order(title asc){
      "id": _id,
      "name": title,
      "slug": slug.current
    }`
    const data = await sanityClient.fetch(query)
    return data as BlogTag[]
  },

  async createTag(tag: Partial<BlogTag>) {
    const doc = {
      _type: 'blogTag',
      title: tag.name,
      slug: { _type: 'slug', current: tag.slug }
    }
    const result = await sanityWriteClient.create(doc)
    return { id: result._id, name: result.title, slug: result.slug.current } as any
  },

  async deleteTag(id: string) {
    await sanityWriteClient.delete(id)
  }
}
