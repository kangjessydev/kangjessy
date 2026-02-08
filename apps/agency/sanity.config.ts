import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'KangJessy Studio',

  projectId: 'q2kcq0p5',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
          { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }] },
          { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogTag' }] }] },
          { name: 'publishedAt', title: 'Published at', type: 'datetime' },
          { name: 'authorName', title: 'Author Name', type: 'string' },
          { name: 'readTime', title: 'Read Time', type: 'string' },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['draft', 'published'] } },
          { name: 'excerpt', title: 'Excerpt', type: 'text' },
          { name: 'content', title: 'HTML Content', type: 'text' },
          { name: 'body', title: 'PortableText Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
          { name: 'views', title: 'Views', type: 'number', initialValue: 0 },
          // SEO Fields
          { name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Override title for search engines (max 60 chars)' },
          { name: 'seoDescription', title: 'SEO Description', type: 'text', description: 'Meta description for search engines (max 160 chars)' },
          { name: 'seoKeywords', title: 'SEO Keywords', type: 'string', description: 'Comma-separated keywords for SEO' },
        ],
      },
      {
        name: 'blogCategory',
        title: 'Blog Category',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      },
      {
        name: 'blogTag',
        title: 'Blog Tag',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        ],
      },
      {
        name: 'category',
        title: 'Project Category',
        type: 'document',
        fields: [
          { name: 'title', title: 'Category Name', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        ],
      },
      {
        name: 'project',
        title: 'Portfolio Project',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { 
            name: 'category', 
            title: 'Category', 
            type: 'reference', 
            to: [{ type: 'category' }] 
          },
          { name: 'image', title: 'Thumbnail Image', type: 'image' },
          { name: 'client', title: 'Client Name', type: 'string' },
          { name: 'date', title: 'Completion Date', type: 'string' },
          { name: 'description', title: 'Short Excerpt', type: 'text' },
          { name: 'content', title: 'Main Description / Challenge', type: 'text' },
          { 
            name: 'gallery', 
            title: 'Project Gallery', 
            type: 'array', 
            of: [{ type: 'image' }] 
          },
          { name: 'technologies', title: 'Technologies', type: 'array', of: [{ type: 'string' }] },
          { 
            name: 'steps', 
            title: 'Process Steps', 
            type: 'array', 
            of: [{
              type: 'object',
              name: 'step',
              title: 'Step',
              fields: [
                { name: 'title', title: 'Step Title', type: 'string' },
                { name: 'desc', title: 'Step Description', type: 'text' }
              ]
            }]
          },
          { name: 'liveUrl', title: 'Live Project Link', type: 'url' },
          { name: 'githubUrl', title: 'GitHub Repo Link', type: 'url' },
        ],
      },
      {
        name: 'changelog',
        title: 'Changelog',
        type: 'document',
        fields: [
          { name: 'version', title: 'Version (e.g. 1.0.0)', type: 'string' },
          { name: 'title', title: 'Release Title', type: 'string' },
          { name: 'date', title: 'Date', type: 'date' },
          { name: 'description', title: 'Short Description', type: 'text' },
          { 
            name: 'changes', 
            title: 'Changes List', 
            type: 'array', 
            of: [{
              type: 'object',
              fields: [
                { name: 'type', title: 'Type', type: 'string', options: { list: ['Added', 'Improved', 'Fixed', 'Security', 'Removed'] } },
                { name: 'content', title: 'Content', type: 'string' }
              ]
            }]
          },
        ],
      },
      {
        name: 'product',
        title: 'Digital Product',
        type: 'document',
        fields: [
          { name: 'title', title: 'Product Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { 
            name: 'type', 
            title: 'Product Type', 
            type: 'string', 
            options: { list: ['Source Code', 'Template', 'UI Kit', 'Course', 'E-Book'] } 
          },
          { 
            name: 'category', 
            title: 'Category', 
            type: 'string', 
            options: { list: ['Web App', 'Mobile', 'Backend', 'UI Kit', 'Design', 'Other'] } 
          },
          { name: 'price', title: 'Price (IDR)', type: 'number' },
          { name: 'discountPrice', title: 'Discount Price (IDR)', type: 'number' },
          { name: 'platform', title: 'Platform Name (e.g. Gumroad)', type: 'string' },
          { name: 'platformLink', title: 'Platform Link', type: 'url' },
          { name: 'mainImage', title: 'Product Header Image', type: 'image', options: { hotspot: true } },
          { name: 'isFeatured', title: 'Is Featured Product?', type: 'boolean' },
          { name: 'featuredBadge', title: 'Featured Badge (e.g. Recommended)', type: 'string' },
          { name: 'downloads', title: 'Download/Purchase Count', type: 'number' },
          { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
          { name: 'description', title: 'Short Description (Excerpt)', type: 'text' },
          { name: 'content', title: 'Detailed Description', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
          { name: 'features', title: 'Key Features', type: 'array', of: [{ type: 'string' }] },
          { name: 'fileSize', title: 'File Size', type: 'string' },
          { name: 'compatible', title: 'Compatible With', type: 'array', of: [{ type: 'string' }] },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['draft', 'published'] }, initialValue: 'draft' },
          { name: 'publishedAt', title: 'Published at', type: 'datetime' },
          { name: 'lastUpdated', title: 'Last Updated', type: 'date' },
        ],
      }
    ],
  },
})
