import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom components for MDX rendering
export const mdxComponents = {
  // Headings
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-4xl md:text-5xl font-black tracking-tighter mt-12 mb-6 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 text-foreground",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "text-lg font-bold tracking-tight mt-6 mb-2 text-foreground",
        className
      )}
      {...props}
    />
  ),

  // Paragraph
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-lg text-zinc-600 leading-relaxed mb-6",
        className
      )}
      {...props}
    />
  ),

  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "list-disc list-inside space-y-2 mb-6 text-zinc-600",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "list-decimal list-inside space-y-2 mb-6 text-zinc-600",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn("text-lg leading-relaxed", className)}
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
        "border-l-4 border-primary pl-6 py-2 my-8 bg-primary/5 rounded-r-xl",
        className
      )}
      {...props}
    />
  ),

  // Code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-zinc-100 text-foreground px-2 py-1 rounded text-sm font-mono",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "bg-foreground text-white p-6 rounded-2xl overflow-x-auto mb-6",
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
            "text-primary hover:underline font-medium",
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
          "text-primary hover:underline font-medium",
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
            "rounded-2xl w-full object-cover",
            className
          )}
        />
      </div>
    );
  },

  // Horizontal rule
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn("border-[#cb6ce6]/30 my-12", className)}
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
      className={cn("italic", className)}
      {...props}
    />
  ),

  // Tables
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        className={cn("w-full border-collapse", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "border-b-2 border-[#cb6ce6]/30 px-4 py-3 text-left font-bold text-foreground",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border-b border-[#cb6ce6]/30 px-4 py-3 text-zinc-600",
        className
      )}
      {...props}
    />
  ),
};
