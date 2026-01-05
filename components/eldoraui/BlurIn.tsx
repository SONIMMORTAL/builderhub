import React from 'react';
import { motion } from 'motion/react';

interface BlurInProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function BlurIn({
    text,
    className = '',
    delay = 0,
    duration = 0.5,
}: BlurInProps) {
    const words = text.split(' ');

    return (
        <motion.span className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            className="inline-block"
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)',
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'blur(0px)',
                            }}
                            transition={{
                                duration: duration,
                                delay: delay + (wordIndex * word.length + charIndex) * 0.03,
                                ease: 'easeOut',
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    );
}
