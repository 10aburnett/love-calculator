import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogCardProps {
  href: string;
  emoji: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  minReadLabel: string;
  readArticleLabel: string;
  locale: string;
}

export default function BlogCard({
  href,
  emoji,
  title,
  excerpt,
  date,
  readingMinutes,
  minReadLabel,
  readArticleLabel,
  locale,
}: BlogCardProps) {
  let formattedDate = date;
  try {
    formattedDate = new Intl.DateTimeFormat(locale || 'en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  } catch {
    // keep ISO fallback
  }

  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow-lg card-hover overflow-hidden flex flex-col"
    >
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 h-40 flex items-center justify-center text-6xl">
        <span aria-hidden>{emoji}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span suppressHydrationWarning>{formattedDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingMinutes} {minReadLabel}
          </span>
        </div>
        <h2 className="text-xl font-playfair font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{excerpt}</p>
        <span className="inline-flex items-center gap-1 text-pink-600 font-semibold text-sm mt-4">
          {readArticleLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
