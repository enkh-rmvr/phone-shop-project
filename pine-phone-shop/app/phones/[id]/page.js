"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PhoneDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(3);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const { id } = await params;

      const response = await fetch(`https://dummyjson.com/products/${id}`);

      const data = await response.json();

      setProduct(data);
      setLoading(false);
    }

    getProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const total = product.price * quantity;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-5 text-sm underline">
          Go back to phones
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-8 grid-cols-2">
            <div className="flex items-start justify-center p-4">
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="h-64 w-full object-contain"
              />
            </div>

            <div className="flex flex-col text-black">
              <p className="text-sm font-bold  ">
                {product.brand || product.category}
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                {product.title}
              </h1>

              <div className="mt-2 flex items-center gap-1">
                <span className="text-lg text-yellow-400">★</span>
                <span className="text-sm text-slate-700">{product.rating}</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {product.description}
              </p>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                ${product.price}
              </h2>

              <div className="mt-5 rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 font-bold text-black"
                    >
                      −
                    </button>

                    <span className="font-semibold text-slate-800">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 font-bold text-black"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-slate-700">
                    Total:{" "}
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </p>
                </div>

                <button
                  onClick={() => setCartQuantity(cartQuantity + quantity)}
                  disabled={product.stock <= 0}
                  className="mt-3 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98] disabled:bg-gray-400"
                >
                  🛒 Add to cart
                </button>

                {/* Stock Information */}
                <div className="mt-2 text-sm text-green-600">
                  {product.stock > 0 ? (
                    <p>
                      ✅ {product.stock} {product.title} in stock
                    </p>
                  ) : (
                    <p className="text-red-500">❌ Out of stock</p>
                  )}

                  {cartQuantity > 0 && (
                    <p className="mt-2 font-semibold">
                      ✓ {cartQuantity} ширхэг сагсанд нэмэгдлээ!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
