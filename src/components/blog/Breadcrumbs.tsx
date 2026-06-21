import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string; // omit for the current (last) page
}

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by
 *  the page so the two stay in sync. */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center flex-wrap gap-1">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="hover:text-pink-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-gray-700 font-medium' : ''} aria-current={isLast ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
