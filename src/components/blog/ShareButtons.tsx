'use client';

import { useState } from 'react';
import { Link2, Check, Twitter, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  shareLabel: string;
}

export default function ShareButtons({ url, title, shareLabel }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available; no-op
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-gray-500">{shareLabel}:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center text-gray-700 hover:text-pink-600 transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center text-gray-700 hover:text-pink-600 transition-colors"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center text-gray-700 hover:text-pink-600 transition-colors"
      >
        {copied ? <Check className="w-5 h-5 text-green-600" /> : <Link2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
