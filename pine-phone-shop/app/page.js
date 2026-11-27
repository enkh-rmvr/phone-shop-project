import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-7xl font-bold">📱Pine Phone Shop</h1>
      <h2 className="text-xl translate-y-1">Find your next phone here</h2>
      <div className="flex gap-4 translate-y-4">
        <Link
          href={`/phones`}
          className="border-2 rounded-lg w-40 h-10 bg-white text-black justify-center flex items-center text-center "
        >
          Check Stock →
        </Link>
      </div>
    </div>
  );
}
