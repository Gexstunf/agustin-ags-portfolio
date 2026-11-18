import { Maximize2 } from "lucide-react";
export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}
export function Media({
  src,
  alt,
  caption,
  onExpand,
  className = "",
}: MediaItem & { onExpand: (item: MediaItem) => void; className?: string }) {
  return (
    <figure className={`media ${className}`}>
      <button
        className="media-trigger"
        onClick={() => onExpand({ src, alt, caption })}
        aria-label={`Ampliar: ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" />
        <span className="expand-icon">
          <Maximize2 size={16} />
        </span>
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
