import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1,
                        rotate: isDark ? -90 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Sun className="w-5 h-5 text-yellow-400" />
                </motion.div>

                {/* Moon Icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0,
                        rotate: isDark ? 0 : 90,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <Moon className="w-5 h-5 text-blue-300" />
                </motion.div>
            </div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={false}
                animate={{
                    boxShadow: isDark
                        ? '0 0 20px rgba(147, 197, 253, 0.3)'
                        : '0 0 20px rgba(250, 204, 21, 0.3)',
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};
