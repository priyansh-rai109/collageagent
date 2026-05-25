import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { User, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function MessageBubble({ message, isLast }) {
  const isAI = message.role === 'ai';

  const timeString = useMemo(() => {
    try {
      return format(new Date(message.timestamp), 'HH:mm');
    } catch {
      return format(new Date(), 'HH:mm');
    }
  }, [message.timestamp]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-4 max-w-4xl w-full mx-auto",
        !isAI && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border",
          isAI 
            ? "bg-gradient-to-br from-primary/20 to-accent/20 text-primary border-primary/30" 
            : "bg-white/10 text-white border-white/10"
        )}>
          {isAI ? <Cpu className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex flex-col gap-1 min-w-[100px]",
        !isAI && "items-end"
      )}>
        <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
          <span className="font-semibold text-gray-400 uppercase tracking-wider">{isAI ? 'System' : 'User'}</span>
          <span>•</span>
          <span>{timeString}</span>
        </div>
        
        <div className={cn(
          "px-5 py-4 rounded-2xl relative group",
          isAI 
            ? "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm" 
            : "bg-primary text-white rounded-tr-sm shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
        )}>
          {isAI ? (
            <div className="prose prose-invert max-w-none text-sm md:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</div>
          )}
          
          {/* Glowing dot for streaming */}
          {isAI && isLast && !message.content.endsWith('.') && message.content.length > 0 && (
            <span className="inline-block w-2 h-2 ml-1 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
