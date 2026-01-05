import React from 'react';
import { motion } from 'motion/react';

const animationProps = {
    initial: { '--x': '100%', scale: 0.8 },
    animate: { '--x': '-100%', scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: 'spring',
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface AnimatedShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    url?: string;
}

export function AnimatedShinyButton({
    children,
    className = '',
    onClick,
    url,
}: AnimatedShinyButtonProps) {
    const Component = url ? motion.a : motion.button;
    const linkProps = url ? { href: url } : {};

    return (
        <Component
            {...animationProps}
            {...linkProps}
            onClick={onClick}
            className={`relative rounded-xl px-6 py-3 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow hover:shadow-[#06b6d4]/50 ${className}`}
            style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
            }}
        >
            <span
                className="relative flex items-center justify-center gap-2 text-sm tracking-wide text-white"
                style={{
                    maskImage:
                        'linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,1) calc(var(--x) + 100%))',
                    WebkitMaskImage:
                        'linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,1) calc(var(--x) + 100%))',
                }}
            >
                {children}
            </span>
            <span
                className="absolute inset-0 z-10 block rounded-xl"
                style={{
                    background:
                        'linear-gradient(-75deg, rgba(6, 182, 212, 0.1) calc(var(--x) + 20%), rgba(6, 182, 212, 0.5) calc(var(--x) + 25%), rgba(6, 182, 212, 0.1) calc(var(--x) + 100%))',
                    maskImage: 'linear-gradient(black, black)',
                    WebkitMaskImage: 'linear-gradient(black, black)',
                }}
            />
        </Component>
    );
}
