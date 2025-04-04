
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CodeBlock = ({ language, title, children, className }: CodeBlockProps) => {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md mb-6", className)}>
      {title && (
        <div className="bg-gray-800 text-white px-4 py-2 font-mono text-sm flex items-center">
          <span>{title}</span>
          {language && (
            <span className="ml-2 bg-gray-700 px-2 py-0.5 rounded text-xs">{language}</span>
          )}
        </div>
      )}
      <pre className="code-block text-sm">
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;
