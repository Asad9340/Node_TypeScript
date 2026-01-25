
import { Badge } from '@/components/ui/badge';
import { blogService } from '@/services/blog.service';
import { Separator } from '@radix-ui/react-separator';

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);


    const formattedDate = new Date(data?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount = data?.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

return (
  <article className="container mx-auto px-4 py-12 max-w-2xl">
    {/* Header */}
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
        {data?.title}
      </h1>

      <div className="flex items-center gap-3 text-muted-foreground text-sm">
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{readingTime} min read</span>
        <span>·</span>
        <span>{data?.views} views</span>
      </div>
    </header>

    <Separator className="mb-8" />

    {/* Content */}
    <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-foreground">
      <p className="whitespace-pre-wrap text-lg leading-8">{data?.content}</p>
    </div>

    <Separator className="my-8" />

    {/* Footer */}
    <footer className="space-y-6">
      {data?.tags && data?.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data?.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 text-sm font-normal rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{data?._count?.comments ?? 0} comments</span>
        {data?.isFeatured && (
          <Badge variant="outline" className="rounded-full">
            Featured
          </Badge>
        )}
      </div>
    </footer>
  </article>
);
};

export default BlogDetailsPage;
