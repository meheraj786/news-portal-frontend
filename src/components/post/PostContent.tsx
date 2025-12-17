type Props = {
  content: string;
};

export function PostContent({ content }: Props) {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
