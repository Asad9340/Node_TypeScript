'use client';
import { getBlogs } from '@/actions/blog.action';
import BlogCard from '@/components/modules/homepage/BlogCard';
import { BlogPost } from '@/types';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data.data);
      setError(error);
    })();
  }, []);
  console.log(error)
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
