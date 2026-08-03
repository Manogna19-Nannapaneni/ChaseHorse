'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn, APP_URL } from '@/lib/utils';
import { BrandLogo } from '@/components/brand-logo';
import { useSiteContent } from '@/components/site-content-provider';
import { MegaMenuPanel } from '@/components/mega-menu';
import { buildMegaMenus } from '@/lib/nav-menus';

const DEFAULT_NAV_LINKS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/services' },
  { label: 'Live Market', href: '/live-market' },
  { label: 'Discover', href: '/courses' },
  { label: 'HSE Shop', href: '/merchandise' },
  { label: 'Partners', href: '/partners' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const content = useSiteContent();
  const NAV_LINKS = content.navigation?.header?.length
    ? content.navigation.header.filter((l) => l.label !== 'Login')
    : DEFAULT_NAV_LINKS;
  const megaMenus = useMemo(() => buildMegaMenus(content), [content]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isProductPage =
    pathname.startsWith('/services/') &&
    !pathname.includes('/tier-') &&
    pathname !== '/services';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 160);
  };

  const toggleMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  const overHero = isProductPage && !scrolled && activeMenu === null;
  const solidHeader = !overHero || activeMenu !== null;
  const lightNav = overHero;

  const navLinkClass = lightNav
    ? 'text-white hover:bg-white/10'
    : 'text-[#171a20] hover:bg-black/[0.05]';

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-[330ms]',
          solidHeader ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div
          className="relative mx-auto flex h-[52px] max-w-[100%] items-center px-4 lg:h-[56px] lg:px-6"
          onMouseLeave={scheduleClose}
        >
          <Link href="/" className="relative z-10 shrink-0">
            <BrandLogo variant={lightNav ? 'light' : 'dark'} minimal />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((item) => {
              const menu = megaMenus[item.label];
              const isActive = activeMenu === item.label;
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => menu && openMenu(item.label)}
                >
                  {menu ? (
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.label)}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-[13px] font-medium transition-[color,background-color] duration-[330ms] xl:text-[14px]',
                        navLinkClass,
                        isActive && !lightNav && 'bg-black/[0.06]',
                        isActive && lightNav && 'bg-white/10',
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-[13px] font-medium transition-[color,background-color] duration-[330ms] xl:text-[14px]',
                        navLinkClass,
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={`${APP_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden rounded-lg px-4 py-1.5 text-[14px] font-medium transition duration-[330ms] md:inline-flex',
                lightNav
                  ? 'bg-white text-[#171a20] hover:bg-white/90'
                  : 'bg-[#171a20] text-white hover:bg-[#393c41]',
              )}
            >
              Login
            </a>
            <button
              className={cn(
                'rounded-lg p-2 lg:hidden',
                lightNav ? 'text-white' : 'text-[#171a20]',
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <AnimatePresence>
            {activeMenu && megaMenus[activeMenu] && (
              <MegaMenuPanel
                content={megaMenus[activeMenu]}
                onNavigate={() => setActiveMenu(null)}
                onMouseEnter={() => openMenu(activeMenu)}
                onMouseLeave={scheduleClose}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {activeMenu && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/25"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-white">
          <div className="flex h-14 items-center justify-between px-6">
            <BrandLogo variant="dark" minimal />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-[#171a20]" />
            </button>
          </div>
          <nav className="flex flex-col px-6 pb-10">
            {NAV_LINKS.map((item) => {
              const menu = megaMenus[item.label];
              const isOpen = openMobileItem === item.label;
              return (
                <div key={item.label} className="border-b border-[#eee]">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-4 text-[17px] font-medium text-[#171a20]"
                    >
                      {item.label}
                    </Link>
                    {menu && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label}`}
                        onClick={() => setOpenMobileItem(isOpen ? null : item.label)}
                        className="p-4"
                      >
                        <ChevronDown
                          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                        />
                      </button>
                    )}
                  </div>
                  {menu && isOpen && (
                    <div className="space-y-3 pb-4 pl-2">
                      {menu.chooser?.options.map((opt) => (
                        <Link
                          key={opt.href}
                          href={opt.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-[#393c41]"
                        >
                          {opt.label}
                        </Link>
                      ))}
                      {menu.columns?.flatMap((col) =>
                        col.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-[14px] text-[#393c41]"
                          >
                            {link.label}
                          </Link>
                        )),
                      )}
                      {menu.products?.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-[#393c41]"
                        >
                          {p.label}
                        </Link>
                      ))}
                      {menu.cards?.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-[#393c41]"
                        >
                          {c.title}
                        </Link>
                      ))}
                      {menu.actions?.map((a) => (
                        <a
                          key={a.href}
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-[#3e6ae1]"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={`${APP_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-lg bg-[#171a20] py-3 text-center text-[15px] font-medium text-white"
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
