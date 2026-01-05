import React, { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';
import { motion, useAnimationFrame } from 'motion/react';

interface SimpleMarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    gap?: number;
    className?: string;
    innerClassName?: string;
}

export function SimpleMarquee({
    children,
    speed = 50,
    direction = 'left',
    pauseOnHover = true,
    gap = 24,
    className = '',
    innerClassName = '',
}: SimpleMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const x = useRef(0);

    useEffect(() => {
        if (innerRef.current) {
            setContentWidth(innerRef.current.offsetWidth);
        }
    }, [children]);

    useAnimationFrame((_, delta) => {
        if (pauseOnHover && isHovered) return;
        if (!contentWidth) return;

        const moveAmount = (speed * delta) / 1000;

        if (direction === 'left') {
            x.current -= moveAmount;
            if (x.current <= -(contentWidth + gap)) {
                x.current = 0;
            }
        } else {
            x.current += moveAmount;
            if (x.current >= 0) {
                x.current = -(contentWidth + gap);
            }
        }

        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${x.current}px)`;
        }
    });

    const contentStyle: CSSProperties = {
        display: 'flex',
        flexShrink: 0,
        gap: `${gap}px`,
    };

    return (
        <div
            className={`overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={containerRef}
                className={`flex ${innerClassName}`}
                style={{ ...contentStyle, willChange: 'transform' }}
            >
                <div ref={innerRef} className="flex gap-inherit shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
                <div className="flex gap-inherit shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
                <div className="flex gap-inherit shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
