type Props = {
  content?: string;
};

export function PostContent({ content }: Props) {
  if (!content || typeof content !== "string") return null;

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
