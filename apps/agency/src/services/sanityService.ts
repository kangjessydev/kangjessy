import { sanityClient } from '@kangjessy/database';

export const sanityService = {
  async getProjects() {
    return await sanityClient.fetch(`*[_type == "project"] | order(date desc)`);
  },

  async getProjectBySlug(slug: string) {
    return await sanityClient.fetch(
      `*[_type == "project" && slug.current == $slug][0]`,
      { slug }
    );
  },

  async getBlogs() {
    return await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc){
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImage": mainImage.asset->url,
      "author": author->name,
      categories[]->title
    }`);
  },

  async getBlogBySlug(slug: string) {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        ...,
        "mainImage": mainImage.asset->url,
        "author": author->name,
        categories[]->title,
        body
      }`,
      { slug }
    );
  }
};
