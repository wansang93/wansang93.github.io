export const metadata = { title: 'Blog' };

export default function BlogIndexEn() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">Blog</h1>
      <p className="text-muted">
        The blog system is in progress. In the next step, adding MDX files under{' '}
        <code className="font-mono text-sm">content/blog/</code> will automatically generate the index and post pages.
      </p>
    </div>
  );
}
