'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { ProductContent } from '@/types/content';
import { getProductImage } from '@/lib/images';
import { LazyImage } from '@/components/ui/lazy-image';
import { TeslaButton } from '@/components/ui/tesla-button';
import { useCart, formatInr } from '@/components/cart-provider';
import { cn } from '@/lib/utils';

export function ProductDetail({ product }: { product: ProductContent }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { addItem, totalCount } = useCart();
  const [color, setColor] = useState(product.colors[0] ?? '');
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const priceValue =
    product.priceValue ?? (Number(String(product.price).replace(/[^\d.]/g, '')) || 0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
  }, []);

  const onAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      priceValue,
      image: getProductImage(product.slug, product.image),
      color,
      size,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="grid min-h-[70vh] lg:grid-cols-2">
      <div className="relative min-h-[45vh] bg-[#f4f4f4] lg:min-h-full">
        <LazyImage
          src={getProductImage(product.slug, product.image)}
          alt={product.name}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          wrapperClassName="relative min-h-[45vh] lg:absolute lg:inset-0 lg:min-h-full"
          className="object-cover"
        />
      </div>
      <div
        ref={contentRef}
        className="flex flex-col justify-center bg-white px-8 py-14 lg:px-16 lg:py-20"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#5c5e62]">HSE Shop</p>
          <Link href="/merchandise/cart" className="text-[13px] font-medium text-[#3e6ae1]">
            Cart ({totalCount})
          </Link>
        </div>
        <h1 className="mt-2 text-[32px] font-medium leading-tight text-[#171a20] md:text-[40px]">
          {product.name}
        </h1>
        <p className="mt-2 text-[17px] text-[#393c41]">
          {product.price || formatInr(priceValue)}
        </p>
        <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#393c41]">
          {product.description}
        </p>

        {product.colors.length > 0 && (
          <div className="mt-8">
            <p className="text-[14px] font-medium text-[#171a20]">Color</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    'rounded-[4px] border px-3 py-2 text-[13px] capitalize',
                    color === c
                      ? 'border-[#171a20] bg-[#171a20] text-white'
                      : 'border-[#d0d1d2] text-[#393c41]',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="mt-6">
            <p className="text-[14px] font-medium text-[#171a20]">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    'min-w-[48px] rounded-[4px] border px-3 py-2 text-[13px]',
                    size === s
                      ? 'border-[#171a20] bg-[#171a20] text-white'
                      : 'border-[#d0d1d2] text-[#393c41]',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-[14px] font-medium text-[#171a20]">Quantity</p>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded border border-[#d0d1d2]"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-8 text-center text-[14px]">{qty}</span>
            <button
              type="button"
              className="h-9 w-9 rounded border border-[#d0d1d2]"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onAdd}
            className="btn-tesla-primary min-w-[200px]"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
          <TeslaButton label="Checkout" variant="secondary-dark" href="/merchandise/checkout" compact />
        </div>
      </div>
    </section>
  );
}
