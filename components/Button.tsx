import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed text-sm";

  const variants = {
    primary: "bg-white text-dark-950 hover:bg-gray-100 focus:ring-white shadow-lg shadow-white/10 hover:shadow-white/20",
    secondary: "bg-dark-800 text-white hover:bg-dark-700 focus:ring-dark-700 border border-white/10",
    outline: "border border-white/20 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 bg-transparent focus:ring-white/50",
    ghost: "text-gray-400 hover:text-white hover:bg-white/10 focus:ring-white/50",
    gradient: "btn-gradient text-white font-semibold shadow-lg hover:shadow-accent-purple/30",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};