import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function Orb({ size = 'large' }) {
  const provider = useStore(state => state.provider);

  // Provider colors map to represent different neural configurations
  const themeMap = {
    local: {
      glow: 'from-emerald-500/30 to-teal-500/20',
      core: 'from-emerald-400 via-cyan-400 to-teal-500',
      border: 'border-emerald-500/20',
      particle: 'bg-emerald-400'
    },
    gemini: {
      glow: 'from-blue-500/30 to-cyan-500/20',
      core: 'from-blue-400 via-cyan-300 to-primary',
      border: 'border-blue-500/20',
      particle: 'bg-cyan-400'
    },
    groq: {
      glow: 'from-purple-500/30 to-pink-500/20',
      core: 'from-purple-400 via-violet-400 to-secondary',
      border: 'border-purple-500/20',
      particle: 'bg-purple-400'
    }
  };

  const currentTheme = themeMap[provider] || themeMap.local;

  const sizeClasses = size === 'large' 
    ? { container: 'w-80 h-80', core: 'w-36 h-36', ring1: 'w-64 h-64', ring2: 'w-72 h-72', ring3: 'w-80 h-80' }
    : { container: 'w-48 h-48', core: 'w-20 h-20', ring1: 'w-36 h-36', ring2: 'w-40 h-40', ring3: 'w-48 h-48' };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses.container} select-none pointer-events-none`}>
      
      {/* 1. Deep Glow Atmosphere */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentTheme.glow} filter blur-3xl opacity-40 animate-pulse-slow`}></div>

      {/* 2. Outer Orbital Ring 1 (Clockwise Rotation) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className={`absolute ${sizeClasses.ring3} rounded-full border border-dashed ${currentTheme.border} opacity-40`}
      />

      {/* 3. Outer Orbital Ring 2 (Counter-Clockwise Rotation) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        className={`absolute ${sizeClasses.ring2} rounded-full border border-double ${currentTheme.border} border-t-transparent border-b-transparent opacity-60`}
      />

      {/* 4. Interactive Tech Ring 3 (Fast Clockwise) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className={`absolute ${sizeClasses.ring1} rounded-full border border-dotted ${currentTheme.border} opacity-50`}
      />

      {/* 5. Glowing Central Neural Sphere */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.98, 1.02, 1],
          borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }}
        className={`absolute ${sizeClasses.core} bg-gradient-to-br ${currentTheme.core} shadow-[0_0_50px_rgba(59,130,246,0.5)] z-10 flex items-center justify-center overflow-hidden`}
      >
        {/* Core Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:10px_10px] opacity-40"></div>
        {/* Inner Glare highlight */}
        <div className="absolute top-2 left-4 w-8 h-8 rounded-full bg-white/20 filter blur-xs"></div>
      </motion.div>

      {/* 6. Orbital Nodes (Visual floating items) */}
      <div className="absolute w-full h-full z-10">
        <motion.span 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${currentTheme.particle} shadow-[0_0_10px_currentColor]`}
        />
        <motion.span 
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          className={`absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full ${currentTheme.particle} shadow-[0_0_8px_currentColor]`}
        />
        <motion.span 
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
          className={`absolute right-12 bottom-12 w-2.5 h-2.5 rounded-full ${currentTheme.particle} shadow-[0_0_12px_currentColor]`}
        />
      </div>

    </div>
  );
}
