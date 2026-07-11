import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom components for MDX rendering
export const mdxComponents = {
  // Headings
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-display text-4xl md:text-5xl font-bold tracking-tighter mt-14 mb-6 text-foreground leading-[1.05]",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-display text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-4 text-foreground leading-[1.1]",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-display text-xl md:text-2xl font-bold tracking-tight mt-10 mb-3 text-foreground leading-[1.15]",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-display text-lg font-bold tracking-tight mt-8 mb-2 text-foreground",
        className
      )}
      {...props}
    />
  ),

  // Paragraph
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-base md:text-lg text-muted-foreground leading-relaxed mb-6",
        className
      )}
      {...props}
    />
  ),

  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "list-disc list-inside space-y-2 mb-6 text-muted-foreground marker:text-electric",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "list-decimal list-inside space-y-2 mb-6 text-muted-foreground marker:text-electric marker:font-display marker:font-bold",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn("text-base md:text-lg leading-relaxed pl-1", className)}
      {...props}
    />
  ),

  // Blockquote
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-2 border-electric pl-6 py-3 my-8 bg-electric/5 rounded-r-xl italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),

  // Inline code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-electric/10 text-electric px-1.5 py-0.5 rounded text-sm font-mono border border-electric/20",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "bg-zinc-900 border border-black/10 text-zinc-100 p-6 rounded-xl overflow-x-auto mb-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] max-w-full",
        className
      )}
      {...props}
    />
  ),

  // Links
  a: ({ className, href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-electric hover:underline font-medium transition-colors",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "text-electric hover:underline font-medium transition-colors",
          className
        )}
        {...props}
      />
    );
  },

  // Images
  img: ({ className, alt = "", src = "" }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const imageSrc = typeof src === "string" ? src : "/services/strategy.png";
    return (
      <div className="my-8 relative">
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={450}
          className={cn(
            "rounded-2xl border border-black/10 w-full object-cover shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]",
            className
          )}
        />
      </div>
    );
  },

  // Horizontal rule — refined gradient divider
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn("my-12 border-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent", className)}
      {...props}
    />
  ),

  // Strong and emphasis
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("font-bold text-foreground", className)}
      {...props}
    />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em
      className={cn("italic text-foreground/80", className)}
      {...props}
    />
  ),

  // Tables
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-black/10">
      <table
        className={cn("w-full border-collapse", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "font-display border-b border-black/10 bg-zinc-50 px-4 py-3 text-left font-bold text-foreground",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border-b border-black/10 px-4 py-3 text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
};
