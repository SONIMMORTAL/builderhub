import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'glow';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const styles = {
    default: "bg-dark-800/80 text-gray-200 border border-white/10",
    outline: "border border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 hover:text-gray-300 transition-all",
    glow: "bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-white border border-accent-purple/30 shadow-sm shadow-accent-purple/20",
  }[variant];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
};