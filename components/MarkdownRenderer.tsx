"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ className, ...props }) => (
          <h1
            className={cn(
              "font-display text-4xl md:text-5xl font-bold tracking-tighter mt-14 mb-6 text-foreground leading-[1.05]",
              className
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              "font-display text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-4 text-foreground leading-[1.1]",
              className
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              "font-display text-xl md:text-2xl font-bold tracking-tight mt-10 mb-3 text-foreground leading-[1.15]",
              className
            )}
            {...props}
          />
        ),
        h4: ({ className, ...props }) => (
          <h4
            className={cn(
              "font-display text-lg font-bold tracking-tight mt-8 mb-2 text-foreground",
              className
            )}
            {...props}
          />
        ),

        // Paragraph
        p: ({ className, ...props }) => (
          <p
            className={cn(
              "text-base md:text-lg text-white/70 leading-relaxed mb-6",
              className
            )}
            {...props}
          />
        ),

        // Lists
        ul: ({ className, ...props }) => (
          <ul
            className={cn(
              "list-disc list-inside space-y-2 mb-6 text-white/70 marker:text-electric",
              className
            )}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn(
              "list-decimal list-inside space-y-2 mb-6 text-white/70 marker:text-electric marker:font-display marker:font-bold",
              className
            )}
            {...props}
          />
        ),
        li: ({ className, ...props }) => (
          <li className={cn("text-base md:text-lg leading-relaxed pl-1", className)} {...props} />
        ),

        // Blockquote
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn(
              "border-l-2 border-electric pl-6 py-3 my-8 bg-electric/5 rounded-r-xl italic text-white/70",
              className
            )}
            {...props}
          />
        ),

        // Code
        code: ({ className, children, ...props }) => {
          const isInline = !className?.includes("language");
          return isInline ? (
            <code
              className={cn(
                "bg-white/10 text-electric px-1.5 py-0.5 rounded text-sm font-mono border border-white/5",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ) : (
            <pre
              className={cn(
                "bg-black/40 border border-white/10 text-white/90 p-6 rounded-xl overflow-x-auto mb-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]",
                className
              )}
            >
              <code className="text-sm font-mono" {...props}>
                {children}
              </code>
            </pre>
          );
        },

        // Links
        a: ({ className, href = "", ...props }) => (
          <a
            href={href}
            className={cn(
              "text-electric hover:underline font-medium transition-colors",
              className
            )}
            {...props}
          />
        ),

        // Strong and emphasis
        strong: ({ className, ...props }) => (
          <strong
            className={cn("font-bold text-foreground", className)}
            {...props}
          />
        ),
        em: ({ className, ...props }) => (
          <em className={cn("italic text-white/80", className)} {...props} />
        ),

        // Horizontal rule — refined gradient divider
        hr: ({ className, ...props }) => (
          <hr className={cn("my-12 border-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent", className)} {...props} />
        ),

        // Tables
        table: ({ className, ...props }) => (
          <div className="overflow-x-auto mb-6 rounded-xl border border-white/10">
            <table
              className={cn("w-full border-collapse", className)}
              {...props}
            />
          </div>
        ),
        th: ({ className, ...props }) => (
          <th
            className={cn(
              "font-display border-b border-white/10 bg-white/5 px-4 py-3 text-left font-bold text-foreground",
              className
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={cn(
              "border-b border-white/10 px-4 py-3 text-white/70",
              className
            )}
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
