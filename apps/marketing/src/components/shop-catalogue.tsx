'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { ProductContent } from '@/types/content';
import { getProductImage } from '@/lib/images';
import { LazyImage } from '@/components/ui/lazy-image';
import { useCart, formatInr } from '@/components/cart-provider';

export function ShopCatalogue({ products }: { products: ProductContent[] }) {
  const { totalCount, addItem } = useCart();
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('all');
  const [size, setSize] = useState('all');
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    [products],
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchC = color === 'all' || p.colors.includes(color);
      const matchS = size === 'all' || p.sizes.includes(size);
      return matchQ && matchC && matchS;
    });
    list = [...list].sort((a, b) => {
      const pa = a.priceValue ?? (Number(String(a.price).replace(/[^\d.]/g, '')) || 0);
      const pb = b.priceValue ?? (Number(String(b.price).replace(/[^\d.]/g, '')) || 0);
      if (sort === 'price-asc') return pa - pb;
      if (sort === 'price-desc') return pb - pa;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
    return list;
  }, [products, query, color, size, sort]);

  return (
    <section className="bg-[#f5f5f7] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#3e6ae1]">
              Merchandise
            </p>
            <h2 className="mt-1 text-[28px] font-medium text-[#171a20]">HSE Shop</h2>
            <p className="mt-1 text-[14px] text-[#5c5e62]">
              {filtered.length} product{filtered.length === 1 ? '' : 's'} · Prices in INR
            </p>
          </div>
          <Link
            href="/merchandise/cart"
            className="sticky top-20 z-10 inline-flex items-center gap-2 rounded-md bg-[#171a20] px-4 py-2.5 text-[14px] font-medium text-white shadow-md transition hover:bg-[#393c41]"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart ({totalCount})
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-[#e8e8ea] bg-white p-3 shadow-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="min-w-[160px] flex-1 rounded-md border border-[#eee] bg-[#fafafa] px-3 py-2 text-[14px] outline-none focus:border-[#171a20]"
          />
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="rounded-md border border-[#eee] bg-[#fafafa] px-3 py-2 text-[14px]"
          >
            <option value="all">All colors</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="rounded-md border border-[#eee] bg-[#fafafa] px-3 py-2 text-[14px]"
          >
            <option value="all">All sizes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-md border border-[#eee] bg-[#fafafa] px-3 py-2 text-[14px]"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => {
            const value =
              product.priceValue ??
              (Number(String(product.price).replace(/[^\d.]/g, '')) || 0);
            return (
              <div
                key={product.slug}
                className="group overflow-hidden rounded-xl border border-[#e8e8ea] bg-white shadow-sm transition hover:shadow-md"
              >
                <Link href={`/merchandise/${product.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-[#f0f0f2]">
                    <LazyImage
                      src={getProductImage(product.slug, product.image)}
                      alt={product.name}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      wrapperClassName="absolute inset-0"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4 text-left">
                    <p className="text-[15px] font-medium text-[#171a20]">{product.name}</p>
                    <p className="mt-1 text-[14px] font-semibold text-[#171a20]">
                      {product.price || formatInr(value)}
                    </p>
                  </div>
                </Link>
                <div className="flex border-t border-[#eee]">
                  <Link
                    href={`/merchandise/${product.slug}`}
                    className="flex-1 py-2.5 text-center text-[13px] font-medium text-[#5c5e62] transition hover:bg-[#fafafa] hover:text-[#171a20]"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        slug: product.slug,
                        name: product.name,
                        price: product.price || formatInr(value),
                        priceValue: value,
                        image: getProductImage(product.slug, product.image),
                        color: product.colors[0] ?? 'Default',
                        size: product.sizes[0] ?? 'One size',
                      })
                    }
                    className="flex-1 border-l border-[#eee] py-2.5 text-center text-[13px] font-medium text-[#3e6ae1] transition hover:bg-[#f5f8ff]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
