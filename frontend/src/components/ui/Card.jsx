export default function Card({ children, className = '', title, icon: Icon, glowing = false }) {
  return (
    <div className={`relative group ${className}`}>
      {glowing && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      )}
      <div className="relative h-full bg-surface/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-white/20 transition-colors">
        {title && (
          <div className="flex items-center gap-3 mb-4">
            {Icon && (
              <div className="p-2 rounded-lg bg-white/5 text-primary">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <h3 className="font-semibold text-white tracking-wide">{title}</h3>
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
