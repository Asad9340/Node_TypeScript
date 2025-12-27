import { prisma } from '../../../lib/prisma';

const createPost = async (
  title: string,
  content: string,
  tags: string[],
  authorId: string,
  isFeatured?: boolean
) => {
  const result = await prisma.post.create({
    data: {
      title,
      content,
      tags,
      authorId,
      isFeatured: isFeatured ?? false,
    },
  });
  return result;
};

export const postService = {
  createPost,
};
