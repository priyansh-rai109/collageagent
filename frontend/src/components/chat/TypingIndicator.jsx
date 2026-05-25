import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 max-w-4xl w-full mx-auto"
    >
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border bg-gradient-to-br from-primary/20 to-accent/20 text-primary border-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
          <Cpu className="w-5 h-5 relative z-10" />
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
          <span className="font-semibold text-gray-400 uppercase tracking-wider">System</span>
          <span>•</span>
          <span className="animate-pulse">Processing...</span>
        </div>
        
        <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm w-fit flex items-center gap-2 h-[52px]">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </motion.div>
  );
}
