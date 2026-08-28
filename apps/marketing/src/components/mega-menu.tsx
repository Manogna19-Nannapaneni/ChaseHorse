'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';
import { LazyImage } from '@/components/ui/lazy-image';
import { cn } from '@/lib/utils';

export interface MegaMenuLink {
  label: string;
  href: string;
  description?: string;
  image?: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuProduct {
  label: string;
  price?: string;
  href: string;
  image: string;
  orderHref?: string;
}

export interface MegaMenuPromo {
  title: string;
  description: string;
  image?: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
}

export interface MegaMenuChooser {
  title: string;
  description: string;
  options: {
    label: string;
    description: string;
    href: string;
    image?: string;
  }[];
}

export interface MegaMenuAction {
  label: string;
  href: string;
  variant?: 'primary' | 'whatsapp' | 'outline';
  external?: boolean;
}

export interface MegaMenuRailTab {
  label: string;
  links: MegaMenuLink[];
}

export interface MegaMenuContent {
  layout?:
  | 'resources'
  | 'solutions'
  | 'discover'
  | 'shop'
  | 'partners'
  | 'cards'
  | 'columns';

  title?: string;
  description?: string;
  exploreLabel?: string;
  exploreHref?: string;
  items?: MegaMenuLink[];
  columns?: MegaMenuColumn[];
  products?: MegaMenuProduct[];
  cards?: {
    title: string;
    body: string;
    href: string;
    image?: string;
  }[];
  chooser?: MegaMenuChooser;
  promo?: MegaMenuPromo;
  actions?: MegaMenuAction[];
  railTabs?: MegaMenuRailTab[];
}

interface MegaMenuPanelProps {
  content: MegaMenuContent;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenuPanel({
  content,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuPanelProps) {
  const layout = content.layout ?? 'resources';

  const [railIndex, setRailIndex] = useState(0);

  const activeRail = content.railTabs?.[railIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full z-40 bg-[#f5f5f7]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">

        {/* Resources / Platform / Live Market */}
        {layout === 'resources' && (
          <div className="grid gap-8 lg:grid-cols-[240px_1fr_280px]">
            <div>
              <h2 className="text-[28px] font-medium leading-tight text-[#171a20]">
                {content.title}
              </h2>

              {content.description && (
                <p className="mt-3 text-[14px] leading-relaxed text-[#5c5e62]">
                  {content.description}
                </p>
              )}

              {content.exploreHref && (
                <Link
                  href={content.exploreHref}
                  onClick={onNavigate}
                  className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-[#171a20] underline-offset-2 hover:underline"
                >
                  {content.exploreLabel ?? 'Explore'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            <ul className="space-y-1">
              {(content.items ?? []).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="group flex gap-4 rounded-2xl p-3 transition hover:bg-white"
                  >
                    {item.image && (
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                        <LazyImage
                          src={item.image}
                          alt=""
                          fill
                          sizes="56px"
                          wrapperClassName="absolute inset-0"
                          className="object-cover"
                        />
                      </span>
                    )}

                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-[#171a20] group-hover:text-[#3e6ae1]">
                        {item.label}
                      </span>

                      {item.description && (
                        <span className="mt-0.5 block text-[13px] leading-snug text-[#5c5e62]">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              {content.railTabs &&
                content.railTabs.length > 0 && (
                  <div className="rounded-2xl bg-white p-2">
                    {content.railTabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => setRailIndex(i)}
                        className={cn(
                          'block w-full rounded-xl px-4 py-3 text-left text-[14px] font-medium transition',
                          i === railIndex
                            ? 'bg-[#f5f5f7] text-[#171a20]'
                            : 'text-[#5c5e62] hover:bg-[#fafafa]',
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}

                    {activeRail && (
                      <ul className="mt-2 space-y-1 border-t border-[#eee] px-2 pt-2">
                        {activeRail.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={onNavigate}
                              className="block rounded-lg px-2 py-2 text-[13px] text-[#393c41] hover:bg-[#f5f5f7]"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

              {content.promo && (
                <Link
                  href={content.promo.href}
                  onClick={onNavigate}
                  className="block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {content.promo.image && (
                    <div className="relative aspect-[16/10]">
                      <LazyImage
                        src={content.promo.image}
                        alt=""
                        fill
                        sizes="280px"
                        wrapperClassName="absolute inset-0"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <p className="text-[15px] font-medium text-[#171a20]">
                      {content.promo.title}
                    </p>

                    <p className="mt-1 text-[12px] leading-snug text-[#5c5e62]">
                      {content.promo.description}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Solutions */}
        {layout === 'solutions' && (
          <div className="grid gap-8 lg:grid-cols-[220px_1fr_200px]">
            <div>
              <h2 className="text-[28px] font-medium text-[#171a20]">
                {content.title}
              </h2>

              {content.description && (
                <p className="mt-3 text-[14px] leading-relaxed text-[#5c5e62]">
                  {content.description}
                </p>
              )}

              {content.exploreHref && (
                <Link
                  href={content.exploreHref}
                  onClick={onNavigate}
                  className="mt-5 inline-flex text-[14px] font-medium text-[#171a20] underline-offset-2 hover:underline"
                >
                  {content.exploreLabel ?? 'Design Your Solution'} →
                </Link>
              )}
            </div>

            <ul className="space-y-2">
              {(
                content.cards ??
                content.chooser?.options.map((o) => ({
                  title: o.label,
                  body: o.description,
                  href: o.href,
                  image: o.image,
                })) ??
                []
              ).map((card) => (
                <li key={card.href}>
                  <Link
                    href={card.href}
                    onClick={onNavigate}
                    className="group flex gap-4 rounded-2xl p-3 transition hover:bg-white"
                  >
                    {card.image && (
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                        <LazyImage
                          src={card.image}
                          alt=""
                          fill
                          sizes="56px"
                          wrapperClassName="absolute inset-0"
                          className="object-cover"
                        />
                      </span>
                    )}

                    <span>
                      <span className="block text-[15px] font-medium text-[#171a20] group-hover:text-[#3e6ae1]">
                        {card.title}
                      </span>

                      <span className="mt-0.5 block text-[13px] text-[#5c5e62]">
                        {card.body}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-white p-2">
              {(content.railTabs ?? []).map((tab, i) => (
                <div key={tab.label} className="mb-1">
                  <button
                    type="button"
                    onClick={() => setRailIndex(i)}
                    className={cn(
                      'w-full rounded-xl px-4 py-3 text-left text-[14px] font-medium',
                      i === railIndex
                        ? 'bg-[#f5f5f7]'
                        : 'text-[#5c5e62] hover:bg-[#fafafa]',
                    )}
                  >
                    {tab.label}
                  </button>

                  {i === railIndex && (
                    <ul className="space-y-0.5 px-2 pb-2">
                      {tab.links.slice(0, 6).map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={onNavigate}
                            className="block rounded-lg px-2 py-1.5 text-[12px] text-[#393c41] hover:bg-[#f5f5f7]"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discover */}
        {layout === 'discover' && content.columns && (
          <div className="grid gap-10 sm:grid-cols-3">
            {content.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] text-[#8e8e8e]">
                  {col.title}
                </p>

                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="text-[15px] font-medium text-[#171a20] transition hover:text-[#5c5e62]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* =========================
            HSE SHOP
           ========================= */}
        {layout === 'shop' && (
          <div>
            {(content.title || content.description) && (
              <div className="mb-8 max-w-md">
                <h2 className="text-[28px] font-medium text-[#171a20]">
                  {content.title}
                </h2>

                {content.description && (
                  <p className="mt-2 text-[14px] text-[#5c5e62]">
                    {content.description}
                  </p>
                )}
              </div>
            )}

            {/* Only 2 category images */}
            <div className="grid gap-6 sm:grid-cols-2">

              {/* Casuals */}
              <div className="text-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                  <LazyImage
                    src="/images/casuals.png"
                    alt="Casuals"
                    fill
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <p className="mt-3 text-[14px] font-medium text-[#171a20]">
                  Casuals
                </p>
              </div>

              {/* PPE Kits */}
              <div className="text-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                  <LazyImage
                    src="/images/ppe-kit.png"
                    alt="PPE Kits"
                    fill
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <p className="mt-3 text-[14px] font-medium text-[#171a20]">
                  PPE Kits
                </p>
              </div>

            </div>

            {/* Existing Shop All link remains unchanged */}
            {content.promo && (
              <div className="mt-8 text-center">
                <Link
                  href={content.promo.href}
                  onClick={onNavigate}
                  className="text-[14px] font-medium text-[#3e6ae1] hover:underline"
                >
                  {content.promo.ctaLabel} →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Partners */}
        {layout === 'partners' && (
          <div>
            <h2 className="text-[28px] font-medium text-[#171a20]">
              {content.title}
            </h2>

            {content.description && (
              <p className="mt-2 max-w-xl text-[14px] text-[#5c5e62]">
                {content.description}
              </p>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.actions?.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className={cn(
                    'flex items-start gap-4 rounded-2xl bg-white p-6 transition hover:shadow-md',
                    action.variant === 'whatsapp' &&
                    'ring-1 ring-[#25D366]/30',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-full text-white',
                      action.variant === 'whatsapp'
                        ? 'bg-[#25D366]'
                        : 'bg-[#3e6ae1]',
                    )}
                  >
                    {action.variant === 'whatsapp' ? (
                      <MessageCircle className="h-5 w-5" />
                    ) : (
                      <ExternalLink className="h-5 w-5" />
                    )}
                  </span>

                  <span>
                    <span className="block text-[16px] font-medium text-[#171a20]">
                      {action.label}
                    </span>

                    <span className="mt-1 block text-[13px] text-[#5c5e62]">
                      Opens in a new tab
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Columns */}
        {layout === 'columns' && content.columns && (
          <div className="grid gap-8 sm:grid-cols-3">
            {content.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#8e8e8e]">
                  {col.title}
                </p>

                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="text-[15px] font-medium text-[#171a20] hover:text-[#3e6ae1]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}