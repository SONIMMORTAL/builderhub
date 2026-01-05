import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useMemo } from 'react';
import { AnimatePresence, motion, Transition, Variant } from 'motion/react';

export interface TextRotateProps {
    texts: string[];
    auto?: boolean;
    interval?: number;
    splitBy?: 'words' | 'characters' | 'lines' | 'string';
    splitString?: string;
    staggerDuration?: number;
    staggerFrom?: 'first' | 'last' | 'center' | number;
    transition?: Transition;
    initial?: Variant;
    animate?: Variant;
    exit?: Variant;
    animatePresenceMode?: 'wait' | 'popLayout' | 'sync';
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    className?: string;
    mainClassName?: string;
    splitLevelClassName?: string;
}

export interface TextRotateRef {
    next: () => void;
    previous: () => void;
    jumpTo: (index: number) => void;
    reset: () => void;
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
    (
        {
            texts,
            auto = true,
            interval = 3000,
            splitBy = 'words',
            splitString,
            staggerDuration = 0.03,
            staggerFrom = 'first',
            transition = { type: 'spring', damping: 25, stiffness: 300 },
            initial = { y: '100%', opacity: 0 },
            animate = { y: 0, opacity: 1 },
            exit = { y: '-100%', opacity: 0 },
            animatePresenceMode = 'wait',
            animatePresenceInitial = true,
            className,
            mainClassName,
            splitLevelClassName,
        },
        ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        const next = useCallback(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, [texts.length]);

        const previous = useCallback(() => {
            setCurrentIndex((prev) => (prev - 1 + texts.length) % texts.length);
        }, [texts.length]);

        const jumpTo = useCallback(
            (index: number) => {
                setCurrentIndex(index % texts.length);
            },
            [texts.length]
        );

        const reset = useCallback(() => {
            setCurrentIndex(0);
        }, []);

        useImperativeHandle(ref, () => ({
            next,
            previous,
            jumpTo,
            reset,
        }));

        useEffect(() => {
            if (!auto) return;
            const timer = setInterval(next, interval);
            return () => clearInterval(timer);
        }, [auto, interval, next]);

        const splitText = useCallback(
            (text: string): string[] => {
                switch (splitBy) {
                    case 'words':
                        return text.split(' ');
                    case 'characters':
                        return text.split('');
                    case 'lines':
                        return text.split('\n');
                    case 'string':
                        return text.split(splitString || '');
                    default:
                        return [text];
                }
            },
            [splitBy, splitString]
        );

        const getStaggerDelay = useCallback(
            (index: number, total: number): number => {
                let origin: number;
                if (staggerFrom === 'first') {
                    origin = 0;
                } else if (staggerFrom === 'last') {
                    origin = total - 1;
                } else if (staggerFrom === 'center') {
                    origin = Math.floor(total / 2);
                } else {
                    origin = Number(staggerFrom);
                }
                return Math.abs(index - origin) * staggerDuration;
            },
            [staggerFrom, staggerDuration]
        );

        const elements = useMemo(() => {
            const currentText = texts[currentIndex];
            const parts = splitText(currentText);

            return parts.map((part, index) => (
                <span
                    key={index}
                    className={`inline-block overflow-hidden ${splitLevelClassName || ''}`}
                    style={{ whiteSpace: splitBy === 'characters' ? 'pre' : 'pre-wrap' }}
                >
                    <motion.span
                        className="inline-block"
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                            ...transition,
                            delay: getStaggerDelay(index, parts.length),
                        }}
                    >
                        {part}
                        {splitBy === 'words' && index < parts.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                </span>
            ));
        }, [currentIndex, texts, splitText, initial, animate, exit, transition, getStaggerDelay, splitBy, splitLevelClassName]);

        return (
            <span className={`inline-flex flex-wrap ${mainClassName || ''}`}>
                <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                    <motion.span
                        key={currentIndex}
                        className={`inline-flex flex-wrap ${className || ''}`}
                    >
                        {elements}
                    </motion.span>
                </AnimatePresence>
            </span>
        );
    }
);

TextRotate.displayName = 'TextRotate';

export { TextRotate };
