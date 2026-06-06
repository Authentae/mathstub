import type { BlogBlock } from '@/content/blog/registry';

interface Props {
  blocks: BlogBlock[];
  /**
   * Average adult reading speed for non-technical prose is ~250 wpm. We
   * default to 220 to account for the math-heavy posts that take longer
   * to absorb than the raw word count suggests.
   */
  wordsPerMinute?: number;
}

function countWordsInBlock(block: BlogBlock): number {
  if (block.type === 'p' || block.type === 'h2' || block.type === 'h3' || block.type === 'callout' || block.type === 'quote') {
    return block.text.split(/\s+/).filter(Boolean).length;
  }
  if (block.type === 'ul' || block.type === 'ol') {
    return block.items.reduce((sum, it) => sum + it.split(/\s+/).filter(Boolean).length, 0);
  }
  return 0;
}

export function ReadTime({ blocks, wordsPerMinute = 220 }: Props) {
  const words = blocks.reduce((sum, b) => sum + countWordsInBlock(b), 0);
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));

  return (
    <span className="text-xs text-slate-500 dark:text-slate-400">
      {minutes} min read · {words.toLocaleString()} words
    </span>
  );
}
