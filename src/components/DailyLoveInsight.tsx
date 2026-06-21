'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, Quote as QuoteIcon, CalendarHeart } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { dailyLabels } from '@/content/rotational/labels';
import type { Locale } from '@/i18n/request';
import type { DailyInsight } from '@/lib/dailyContentTypes';

interface DailyLoveInsightProps {
  insight: DailyInsight;
}

export default function DailyLoveInsight({ insight }: DailyLoveInsightProps) {
  const { locale } = useTranslations();
  const L = dailyLabels[locale as Locale] ?? dailyLabels.en;

  let formattedDate = insight.date;
  try {
    formattedDate = new Intl.DateTimeFormat(locale || 'en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${insight.date}T00:00:00Z`));
  } catch {
    // keep ISO fallback
  }

  const cards = [
    {
      icon: Lightbulb,
      iconClass: 'text-pink-600',
      bgClass: 'bg-pink-100',
      label: L.insightOfTheDay,
      body: insight.tip,
    },
    {
      icon: Sparkles,
      iconClass: 'text-purple-600',
      bgClass: 'bg-purple-100',
      label: L.didYouKnow,
      body: insight.fact,
    },
  ];

  return (
    <section
      aria-labelledby="daily-love-insight-heading"
      className="py-12 bg-gradient-to-r from-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/70 border border-pink-200 rounded-full px-4 py-1.5 mb-4">
              <CalendarHeart className="w-4 h-4 text-pink-500" />
              <span
                className="text-sm font-semibold text-pink-700"
                suppressHydrationWarning
              >
                {L.updatedDaily} · {formattedDate}
              </span>
            </div>
            <h2
              id="daily-love-insight-heading"
              className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3"
            >
              {L.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {L.subheading}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg card-hover flex gap-4"
                >
                  <div
                    className={`w-12 h-12 shrink-0 ${card.bgClass} rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${card.iconClass}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                      {card.label}
                    </h3>
                    <p className="text-gray-800 leading-relaxed">{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 shadow-xl text-center"
          >
            <QuoteIcon className="w-8 h-8 text-white/80 mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-playfair font-medium text-white leading-relaxed mb-4">
              “{insight.quote.text}”
            </blockquote>
            <figcaption className="text-white/90 font-semibold">
              — {insight.quote.author}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
