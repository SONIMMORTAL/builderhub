import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MatrixIntroProps {
    onComplete: () => void;
}

const SKILLS = [
    { name: 'PYTHON', percent: 95 },
    { name: 'JAVASCRIPT', percent: 97 },
    { name: 'CYBERSECURITY', percent: 88 },
    { name: 'CLOUD ARCHITECTURE', percent: 86 },
    { name: 'AI/ML', percent: 75 },
    { name: 'BLOCKCHAIN', percent: 70 },
];

const generateBar = (percent: number): string => {
    const fullBlocks = Math.floor(percent / 10);
    const partialBlock = percent % 10;
    const partialChars = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '▉', '▉'];

    let bar = '█'.repeat(fullBlocks);
    if (partialBlock > 0 && fullBlocks < 10) {
        bar += partialChars[partialBlock];
    }
    return bar;
};

export const MatrixIntro: React.FC<MatrixIntroProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [skillIndex, setSkillIndex] = useState(-1);
    const [skillProgress, setSkillProgress] = useState<number[]>([]);

    // Phase 0: "Confirming identity..."
    // Phase 1: "Welcome to The Nexus.."
    // Phase 2: Skills animation
    // Phase 3: "Securing connection..."
    // Phase 4: Fade out

    const messages = [
        'Confirming identity...',
        'Welcome to The Nexus..',
        '', // Skills phase
        'Securing connection...',
    ];

    // Typewriter effect for text phases
    useEffect(() => {
        if (phase === 2) return; // Skip for skills phase
        if (phase >= messages.length) return;

        const message = messages[phase];
        if (!message) {
            // Move to next phase immediately for empty messages
            const timer = setTimeout(() => setPhase(phase + 1), 100);
            return () => clearTimeout(timer);
        }

        let charIndex = 0;
        setDisplayedText('');

        const typeInterval = setInterval(() => {
            if (charIndex < message.length) {
                setDisplayedText(message.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                // Pause then move to next phase
                setTimeout(() => {
                    if (phase < 3) {
                        setPhase(phase + 1);
                    } else {
                        // Final phase - fade out and complete
                        setPhase(4);
                        setTimeout(onComplete, 800);
                    }
                }, phase === 0 ? 600 : phase === 1 ? 800 : 600);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [phase, onComplete]);

    // Skills animation
    useEffect(() => {
        if (phase !== 2) return;

        // Initialize progress array
        setSkillProgress(SKILLS.map(() => 0));

        let currentSkill = 0;

        const animateNextSkill = () => {
            if (currentSkill >= SKILLS.length) {
                // All skills done, move to next phase
                setTimeout(() => setPhase(3), 400);
                return;
            }

            setSkillIndex(currentSkill);
            const targetPercent = SKILLS[currentSkill].percent;
            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += 8;
                if (progress >= targetPercent) {
                    progress = targetPercent;
                    clearInterval(progressInterval);

                    setSkillProgress(prev => {
                        const newProgress = [...prev];
                        newProgress[currentSkill] = progress;
                        return newProgress;
                    });

                    currentSkill++;
                    setTimeout(animateNextSkill, 100);
                } else {
                    setSkillProgress(prev => {
                        const newProgress = [...prev];
                        newProgress[currentSkill] = progress;
                        return newProgress;
                    });
                }
            }, 25);
        };

        const startTimer = setTimeout(animateNextSkill, 200);
        return () => clearTimeout(startTimer);
    }, [phase]);

    return (
        <AnimatePresence>
            {phase < 4 && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Matrix rain effect background */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-green-500 font-mono text-xs whitespace-nowrap"
                                style={{ left: `${i * 5}%` }}
                                initial={{ y: -100 }}
                                animate={{ y: '100vh' }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: 'linear',
                                }}
                            >
                                {[...Array(30)].map((_, j) => (
                                    <div key={j} style={{ opacity: Math.random() * 0.8 + 0.2 }}>
                                        {String.fromCharCode(0x30A0 + Math.random() * 96)}
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
                    }} />

                    {/* CRT glow effect */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        boxShadow: 'inset 0 0 150px rgba(0, 255, 100, 0.1)',
                    }} />

                    {/* Main terminal content */}
                    <div className="relative z-10 font-mono text-green-400 max-w-2xl w-full px-8">
                        {/* Terminal header */}
                        <motion.div
                            className="flex items-center gap-2 mb-6 pb-4 border-b border-green-500/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 text-green-500/60 text-sm">nexus_terminal v2.0.26</span>
                        </motion.div>

                        {/* Phase 0 & 1: Text messages */}
                        {(phase === 0 || phase === 1) && (
                            <motion.div
                                className="text-xl md:text-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="text-cyan-400">&gt; </span>
                                <span>{displayedText}</span>
                                <motion.span
                                    className="inline-block w-3 h-6 bg-green-400 ml-1"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            </motion.div>
                        )}

                        {/* Phase 2: Skills */}
                        {phase === 2 && (
                            <div className="space-y-2">
                                {SKILLS.map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        className="flex items-center gap-3 text-sm md:text-base"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: i <= skillIndex ? 1 : 0.3,
                                            x: i <= skillIndex ? 0 : -20,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="text-cyan-400">&gt;</span>
                                        <span className="w-44 text-green-300">{skill.name}:</span>
                                        <span className="text-green-500 tracking-tighter">
                                            {generateBar(skillProgress[i] || 0)}
                                        </span>
                                        <span className="text-green-400 w-12 text-right">
                                            {skillProgress[i] || 0}%
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Phase 3: Securing connection */}
                        {phase === 3 && (
                            <motion.div
                                className="text-xl md:text-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="text-cyan-400">&gt; </span>
                                <span>{displayedText}</span>
                                <motion.span
                                    className="inline-block w-3 h-6 bg-green-400 ml-1"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            </motion.div>
                        )}

                        {/* Loading indicator */}
                        <motion.div
                            className="mt-8 flex items-center gap-3 text-green-500/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="flex gap-1"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-2 h-2 bg-green-500 rounded-full"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </motion.div>
                            <span className="text-xs">SYSTEM ACTIVE</span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
