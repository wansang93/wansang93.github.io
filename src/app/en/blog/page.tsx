export const metadata = { title: 'Blog' };

export default function BlogIndexEn() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Blog</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted leading-relaxed">Short technical notes and thoughts.</p>
      </header>

      <div className="rounded-2xl border border-dashed border-border bg-border/10 p-10 text-center">
        <p className="font-serif text-xl font-semibold">First post coming soon.</p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          An MDX-based writing system will be added shortly.
          <br className="hidden sm:block" />
          In the meantime, why not collect some missions?
        </p>
      </div>
    </div>
  );
}
