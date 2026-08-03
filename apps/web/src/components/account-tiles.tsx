'use client';

import Link from 'next/link';
import {
  FileText,
  Package,
  GraduationCap,
  BookOpen,
  FolderOpen,
  HeadphonesIcon,
  Truck,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccountTile {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const PORTAL_ACCOUNT_TILES: AccountTile[] = [
  {
    label: 'Courses',
    description: 'Training modules for your team',
    href: '/portal/courses',
    icon: GraduationCap,
    featured: true,
  },
  {
    label: 'Invoices',
    description: 'Billing and payment history',
    href: '/portal/invoices',
    icon: CreditCard,
  },
  {
    label: 'Orders',
    description: 'Book and manage shipments',
    href: '/portal',
    icon: Package,
  },
  {
    label: 'Track',
    description: 'Live shipment visibility',
    href: '/portal/track',
    icon: Truck,
  },
  {
    label: 'Knowledge',
    description: 'Guides and playbooks',
    href: '/portal/courses',
    icon: BookOpen,
  },
  {
    label: 'Documents',
    description: 'Shared files and reports',
    href: '/portal/invoices',
    icon: FolderOpen,
  },
  {
    label: 'Support',
    description: 'Raise a ticket or chat',
    href: '/portal/support',
    icon: HeadphonesIcon,
  },
];

export const COMPANY_ACCOUNT_TILES: AccountTile[] = [
  {
    label: 'Courses',
    description: 'Team learning and certifications',
    href: '/company/courses',
    icon: GraduationCap,
    featured: true,
  },
  {
    label: 'Billing',
    description: 'Invoices and subscriptions',
    href: '/company/billing',
    icon: FileText,
  },
  {
    label: 'Orders',
    description: 'Shipments across branches',
    href: '/company/shipments',
    icon: Package,
  },
  {
    label: 'Knowledge',
    description: 'Ops playbooks and SOPs',
    href: '/company/courses',
    icon: BookOpen,
  },
  {
    label: 'Documents',
    description: 'Reports and exports',
    href: '/company/reports',
    icon: FolderOpen,
  },
  {
    label: 'Support',
    description: 'Help and escalations',
    href: '/company/support',
    icon: HeadphonesIcon,
  },
];

export function AccountTilesGrid({
  tiles,
  title = 'My account',
}: {
  tiles: AccountTile[];
  title?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Jump to invoices, orders, courses, and more.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={`${tile.href}-${tile.label}`}
              href={tile.href}
              className={cn(
                'group flex items-start gap-4 rounded-2xl border border-border/80 bg-muted/40 p-5 transition hover:border-primary/30 hover:bg-muted/70 hover:shadow-sm',
                tile.featured && 'ring-1 ring-primary/20 sm:col-span-2',
              )}
            >
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm',
                  tile.featured && 'bg-primary/10 text-primary',
                )}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium text-foreground">{tile.label}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {tile.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
