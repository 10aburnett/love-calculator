import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface BlogContentProps {
  markdown: string;
  locale: string;
}

/**
 * Renders a post's markdown body. Internal links written as "/love-calculator"
 * are automatically prefixed with the active locale (e.g. "/es/love-calculator")
 * so authors can write them once and they work in every language.
 */
export default function BlogContent({ markdown, locale }: BlogContentProps) {
  return (
    <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-pink-300 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const target = href ?? '#';
            if (target.startsWith('/')) {
              const localized = locale === 'en' ? target : `/${locale}${target}`;
              return (
                <Link
                  href={localized}
                  className="text-pink-600 font-medium underline decoration-pink-300 underline-offset-2 hover:text-pink-700"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={target}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 font-medium underline decoration-pink-300 underline-offset-2 hover:text-pink-700"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
