'use server';

import { BlogData, blogService } from '@/services/blog.service';
import { updateTag } from 'next/cache';

export const getBlogs = async () => {
  return await blogService.getBlogPosts(
    {
      isFeatured: false,
    },
    {
      cache: 'no-store',
      revalidate: 10,
    },
  );
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.createBlogPost(data);
  updateTag('blogPosts');
  return res;
};