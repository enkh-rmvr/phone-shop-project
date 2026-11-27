import Link from "next/link";

export default async function Phones() {
  const response = await fetch(
    "https://dummyjson.com/products/category/smartphones",
  );

  const data = await response.json();
  const phoneList = data.products;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold">📱 Phones</h1>
      <p className="text-sm text-gray-500 mb-5">{phoneList.length} phone</p>

      <div className="grid grid-cols-4 gap-3">
        {phoneList.map((phone) => (
          <Link
            key={phone.id}
            href={`/phones/${phone.id}`}
            className="rounded-2xl bg-white p-3 shadow-sm"
          >
            <div className="flex h-32 items-center justify-center">
              <img
                src={phone.thumbnail}
                alt={phone.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-3">
              <h2 className="truncate text-sm text-black font-bold">
                {phone.title}
              </h2>

              <p className="mt-0.5 text-sm text-gray-500">
                ${phone.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
