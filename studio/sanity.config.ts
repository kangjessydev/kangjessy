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
      /* Skema akan kita masukkan di sini */
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
          { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] },
          { name: 'publishedAt', title: 'Published at', type: 'datetime' },
          { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
        ],
      },
      {
        name: 'project',
        title: 'Portfolio Project',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'category', title: 'Category', type: 'string' },
          { name: 'image', title: 'Project Image', type: 'image' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'technologies', title: 'Technologies', type: 'array', of: [{ type: 'string' }] },
          { name: 'link', title: 'Project Link', type: 'url' },
        ],
      },
      {
        name: 'changelog',
        title: 'Changelog',
        type: 'document',
        fields: [
          { name: 'version', title: 'Version/Title', type: 'string' },
          { name: 'date', title: 'Date', type: 'date' },
          { name: 'type', title: 'Type', type: 'string', options: { list: ['Added', 'Improved', 'Fixed', 'Security'] } },
          { name: 'content', title: 'Changes', type: 'array', of: [{ type: 'block' }] },
        ],
      }
    ],
  },
})
