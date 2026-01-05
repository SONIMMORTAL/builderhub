import { useCallback, useState, useEffect } from 'react';

type SoundName = 'click' | 'open' | 'close' | 'success' | 'hover';

// Using Web Audio API for lightweight sound synthesis
const createAudioContext = () => {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
};

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = createAudioContext();
    }
    return audioContext;
};

// Sound synthesis functions for each effect
const soundGenerators: Record<SoundName, () => void> = {
    click: () => {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    },

    open: () => {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    },

    close: () => {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.12);
    },

    success: () => {
        const ctx = getAudioContext();

        // Play two notes for a pleasant "ding ding"
        [0, 0.1].forEach((delay, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(i === 0 ? 523 : 784, ctx.currentTime + delay); // C5, G5

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime + delay);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.2);

            oscillator.start(ctx.currentTime + delay);
            oscillator.stop(ctx.currentTime + delay + 0.2);
        });
    },

    hover: () => {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.03);
    },
};

interface UseSoundEffectsReturn {
    play: (sound: SoundName) => void;
    isMuted: boolean;
    toggleMute: () => void;
}

export const useSoundEffects = (): UseSoundEffectsReturn => {
    const [isMuted, setIsMuted] = useState(() => {
        const stored = localStorage.getItem('builderhub-sound-muted');
        return stored === 'true';
    });

    useEffect(() => {
        localStorage.setItem('builderhub-sound-muted', String(isMuted));
    }, [isMuted]);

    const play = useCallback((sound: SoundName) => {
        if (isMuted) return;

        try {
            soundGenerators[sound]();
        } catch (error) {
            // Silently fail if audio context isn't available
            console.debug('Sound playback failed:', error);
        }
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    return { play, isMuted, toggleMute };
};
