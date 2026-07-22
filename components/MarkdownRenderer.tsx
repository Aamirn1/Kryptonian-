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
              "text-4xl md:text-5xl font-black tracking-tighter mt-12 mb-6 text-foreground",
              className
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4 text-foreground",
              className
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              "text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 text-foreground",
              className
            )}
            {...props}
          />
        ),
        h4: ({ className, ...props }) => (
          <h4
            className={cn(
              "text-lg font-bold tracking-tight mt-6 mb-2 text-foreground",
              className
            )}
            {...props}
          />
        ),

        // Paragraph
        p: ({ className, ...props }) => (
          <p
            className={cn(
              "text-lg text-zinc-600 leading-relaxed mb-6",
              className
            )}
            {...props}
          />
        ),

        // Lists
        ul: ({ className, ...props }) => (
          <ul
            className={cn(
              "list-disc list-inside space-y-2 mb-6 text-zinc-600",
              className
            )}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn(
              "list-decimal list-inside space-y-2 mb-6 text-zinc-600",
              className
            )}
            {...props}
          />
        ),
        li: ({ className, ...props }) => (
          <li className={cn("text-lg leading-relaxed", className)} {...props} />
        ),

        // Blockquote
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn(
              "border-l-4 border-primary pl-6 py-2 my-8 bg-primary/5 rounded-r-xl italic",
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
                "bg-zinc-100 text-foreground px-2 py-1 rounded text-sm font-mono",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ) : (
            <pre
              className={cn(
                "bg-foreground text-white p-6 rounded-2xl overflow-x-auto mb-6 max-w-full",
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
              "text-primary hover:underline font-medium",
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
          <em className={cn("italic", className)} {...props} />
        ),

        // Horizontal rule
        hr: ({ className, ...props }) => (
          <hr className={cn("border-[#cb6ce6]/30 my-12", className)} {...props} />
        ),

        // Tables
        table: ({ className, ...props }) => (
          <div className="overflow-x-auto mb-6 max-w-full">
            <table
              className={cn("w-full border-collapse", className)}
              {...props}
            />
          </div>
        ),
        th: ({ className, ...props }) => (
          <th
            className={cn(
              "border-b-2 border-[#cb6ce6]/30 px-4 py-3 text-left font-bold text-foreground",
              className
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={cn(
              "border-b border-[#cb6ce6]/30 px-4 py-3 text-zinc-600",
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
