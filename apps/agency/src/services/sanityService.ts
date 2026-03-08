import { blogService } from './blogService';
import { portfolioService } from './portfolioService';

export const sanityService = {
  async getProjects() {
    return await portfolioService.getProjects();
  },

  async getProjectBySlug(slug: string) {
    return await portfolioService.getProjectBySlug(slug);
  },

  async getBlogs() {
    return await blogService.getPosts();
  },

  async getBlogBySlug(slug: string) {
    return await blogService.getPostBySlug(slug);
  }
};
