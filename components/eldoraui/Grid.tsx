import React from 'react';

interface GridProps {
    columns?: number;
    rows?: number;
    showPlus?: boolean;
    className?: string;
}

export function Grid({
    columns = 4,
    rows = 4,
    showPlus = true,
    className = '',
}: GridProps) {
    const cells = Array.from({ length: columns * rows });

    return (
        <div
            className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
            style={{
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            }}
        >
            <div
                className="w-full h-full grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {cells.map((_, index) => {
                    const col = index % columns;
                    const row = Math.floor(index / columns);
                    const showPlusIcon = showPlus && col < columns - 1 && row < rows - 1;

                    return (
                        <div
                            key={index}
                            className="relative border-r border-b border-white/5"
                        >
                            {showPlusIcon && (
                                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-10">
                                    <svg
                                        className="w-3 h-3 text-white/20"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
