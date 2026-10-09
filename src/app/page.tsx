export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-primary">🛒 বাজার দর</h1>
      <p className="text-base-content/70">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      <div className="flex gap-2">
        <span className="badge badge-error">▲ ২.১%</span>
        <span className="badge badge-success">▼ ২.৯%</span>
        <span className="badge badge-ghost">—০.০%</span>
      </div>
    </main>
  );
}
