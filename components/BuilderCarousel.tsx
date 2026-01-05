import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BuilderProfile } from '../types';
import { FlipCard } from './FlipCard';


interface BuilderCarouselProps {
    profiles: BuilderProfile[];
    onSelect: (profile: BuilderProfile) => void;
}

export const BuilderCarousel: React.FC<BuilderCarouselProps> = ({ profiles, onSelect }) => {
    // We strictly use the "extended" length for the active index to allow infinite scrolling
    const [currentIndex, setCurrentIndex] = useState(0);

    // Create an extended list ensuring we have at least ~10 items for smooth infinite recycling
    // We append unique IDs to duplicates to ensure stable keys
    const extendedProfiles = useMemo(() => {
        if (profiles.length === 0) return [];
        let p = [...profiles];
        // Duplicate until we have at least 10 items (safe buffer for 5-card fan)
        while (p.length < 10) {
            const duplicates = profiles.map((item, i) => ({
                ...item,
                // Create a stable unique ID for the duplicate based on its "batch layer"
                // We can just append a suffix. Since we might duplicate multiple times,
                // we need to be careful. Simpler: just keep appending the whole array 
                // and give index-based IDs or something.
                // 
                // Better strategy: just duplicate 2 times (original + 2 copies = 3x).
                // 3 * 4 = 12 items. Enough.
                id: `dup-${p.length + i}-${item.id}` // Ensure unique key
            }));
            p = [...p, ...duplicates];
        }
        return p;
    }, [profiles]);

    // Reset when base profiles change drastically
    useEffect(() => {
        setCurrentIndex(0);
    }, [profiles.length]);

    const handleNext = useCallback(() => {
        if (extendedProfiles.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % extendedProfiles.length);
    }, [extendedProfiles.length]);

    const handlePrev = useCallback(() => {
        if (extendedProfiles.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + extendedProfiles.length) % extendedProfiles.length);
    }, [extendedProfiles.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    }, [handleNext, handlePrev]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (profiles.length === 0) {
        return (
            <div className="py-20 text-center glass rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-400 text-lg">No builders found matching your criteria.</p>
            </div>
        );
    }

    // Determine the visible window relative to the extended list
    const getVisibleItems = () => {
        const offsets = [-2, -1, 0, 1, 2];
        return offsets.map(offset => {
            // Standard circular math on the EXTENDED list
            const index = (currentIndex + offset + extendedProfiles.length * 10) % extendedProfiles.length;
            const profile = extendedProfiles[index];

            return {
                ...profile,
                // For interaction, we pass the original profile (stripped of duplicate ID logic if needed, 
                // but FlipCard just uses fields. However, ID might be used for something?
                // FlipCard uses profile.id? No, it just takes profile prop.
                // onSelect takes profile. We should probably pass the ORIGINAL profile object back to onSelect 
                // to avoid passing "dup-..." ID.
                originalProfile: profiles.find(p => p.name === profile.name) || profile, // Fallback find by name/match
                offset,
                // STABLE KEY is the extended ID.
                key: profile.id
            };
        });
    };

    const visibleItems = getVisibleItems();

    const getCardStyle = (offset: number) => {
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // Fan Spacing configuration
        const xOffset = offset * 260; // Wide spread
        const yOffset = Math.abs(offset) * 35; // Arch height

        const scale = 1 - absOffset * 0.1;
        const rotation = offset * 8; // Gentle rotation

        return {
            x: xOffset,
            y: yOffset,
            scale,
            rotation,
            zIndex: 20 - absOffset, // Higher z-index for center
            opacity: 1 - absOffset * 0.2, // Fade out sides
            blur: absOffset * 4 // Blur sides
        };
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center -mt-6 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
                {visibleItems.map((item) => {
                    const style = getCardStyle(item.offset);
                    return (
                        <motion.div
                            key={item.key} // Unique KEY from extended list prevents re-mounting!
                            className="absolute w-full max-w-[340px]"
                            animate={{
                                x: style.x,
                                y: style.y,
                                scale: style.scale,
                                rotateZ: style.rotation,
                                zIndex: style.zIndex,
                                opacity: style.opacity,
                                filter: `blur(${style.blur}px)`,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 120, // Softer spring for floaty feel
                                damping: 18,
                                mass: 1
                            }}
                            style={{
                                transformStyle: 'preserve-3d',
                                transformOrigin: '50% 100%', // Pivot from bottom center
                            }}
                        >
                            <div className={item.offset === 0 ? "" : "pointer-events-none"}>
                                <FlipCard
                                    profile={item.originalProfile as any} // Pass original back
                                    onClick={onSelect}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            {profiles.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-8 lg:left-32 z-30 p-4 rounded-full bg-dark-900/50 border border-white/10 text-white hover:bg-accent-purple/20 transition-all hover:scale-110 backdrop-blur-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-8 lg:right-32 z-30 p-4 rounded-full bg-dark-900/50 border border-white/10 text-white hover:bg-accent-purple/20 transition-all hover:scale-110 backdrop-blur-sm group"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </>
            )}

            {/* Pagination Dots - Mapped to ORIGINAL length */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {profiles.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            // We need to find the NEAREST instance of this index to the current one to minimize jump
                            // For simplicity, just jump to the first instance of it in the extended list?
                            // Or find (currentIndex % origLength) difference and add it.
                            const currentOriginalIndex = currentIndex % profiles.length;
                            const diff = idx - currentOriginalIndex;
                            setCurrentIndex(currentIndex + diff);
                        }}
                        className={`transition-all duration-300 rounded-full shadow-lg ${(currentIndex % profiles.length) === idx
                            ? 'w-8 h-2 bg-gradient-to-r from-accent-purple to-accent-cyan box-glow'
                            : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
