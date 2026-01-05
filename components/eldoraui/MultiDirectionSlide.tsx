import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MultiDirectionSlideTextProps {
    textLeft: string;
    textRight: string;
    className?: string;
}

/**
 * MultiDirectionSlideText - Text slides in from opposite directions
 * Left text slides in from the left, right text slides in from the right
 * Uses AnimatePresence and text-based keys to re-animate on content change
 */
export function MultiDirectionSlideText({
    textLeft,
    textRight,
    className = '',
}: MultiDirectionSlideTextProps) {
    return (
        <div className={`flex items-center justify-start gap-2 ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={`left-${textLeft}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 100,
                        delay: 0.1,
                    }}
                    className="inline-block"
                >
                    {textLeft}
                </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
                <motion.span
                    key={`right-${textRight}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 100,
                        delay: 0.2,
                    }}
                    className="inline-block"
                >
                    {textRight}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

interface SlideInTextProps {
    children: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    className?: string;
    staggerChildren?: boolean;
}

/**
 * SlideInText - Text slides in from specified direction
 * Can animate entire text or stagger individual characters
 * Uses AnimatePresence and content-based keys to re-animate on content change
 */
export function SlideInText({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    staggerChildren = false,
}: SlideInTextProps) {
    const getInitialPosition = () => {
        switch (direction) {
            case 'left': return { x: -40, y: 0 };
            case 'right': return { x: 40, y: 0 };
            case 'up': return { x: 0, y: 30 };
            case 'down': return { x: 0, y: -30 };
        }
    };

    const initial = { ...getInitialPosition(), opacity: 0 };

    if (staggerChildren) {
        const chars = children.split('');
        return (
            <AnimatePresence mode="wait">
                <motion.span
                    key={`stagger-${children}`}
                    className={`inline-flex ${className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {chars.map((char, index) => (
                        <motion.span
                            key={`${char}-${index}-${children}`}
                            initial={initial}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 150,
                                delay: delay + index * 0.03,
                            }}
                            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={`slide-${children}`}
                initial={initial}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{ ...initial }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 150,
                    delay,
                }}
                className={`inline-block ${className}`}
            >
                {children}
            </motion.span>
        </AnimatePresence>
    );
}

export default { MultiDirectionSlideText, SlideInText };

