import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}
interface ServiceOptions {
  cache: RequestCache;
  revalidate: number;
}

export interface BlogData {
  title: string;
  content: string;
  tag?: string[];
}

export const blogService = {
  getBlogPosts: async (params?: GetBlogsParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const config: RequestInit = {};
      if (options) {
        config.cache = options.cache;
      }
      if (options?.revalidate !== undefined) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['blogPosts'] };
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      if (data.success) {
        return { data: data.data, error: null };
      } else {
        return { data: null, error: data.message };
      }
    } catch (error) {
      return { data: null, error };
    }
  },

  getBlogById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();
      if (data.success) {
        return { data: data.data, error: null };
      } else {
        return { data: null, error: data.message };
      }
    } catch (error) {
      return { data: null, error };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: 'Error: Post not created.' },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};
