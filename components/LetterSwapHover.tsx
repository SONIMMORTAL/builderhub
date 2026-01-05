import React, { useState, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence, Transition } from 'motion/react';

interface LetterSwapHoverProps {
    children: string;
    className?: string;
    as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    style?: CSSProperties;
}

export function LetterSwapHover({
    children,
    className = '',
    as: Component = 'span',
    style,
}: LetterSwapHoverProps) {
    const [isHovered, setIsHovered] = useState(false);
    const letters = children.split('');

    const transition: Transition = {
        type: 'spring',
        damping: 25,
        stiffness: 400,
    };

    return (
        <Component
            className={`inline-block cursor-pointer ${className}`}
            style={{ ...style, position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="sr-only">{children}</span>
            <span aria-hidden="true" className="inline-flex overflow-hidden">
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className="inline-block relative"
                        style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                    >
                        <motion.span
                            className="inline-block"
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? '-100%' : 0 }}
                            transition={{
                                ...transition,
                                delay: index * 0.02,
                            }}
                        >
                            {letter}
                        </motion.span>
                        <motion.span
                            className="inline-block absolute left-0 top-full"
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? '-100%' : 0 }}
                            transition={{
                                ...transition,
                                delay: index * 0.02,
                            }}
                        >
                            {letter}
                        </motion.span>
                    </span>
                ))}
            </span>
        </Component>
    );
}
