import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MatrixIntroProps {
    onComplete: () => void;
}

// Profile data to display in terminal
const PROFILE_DATA = {
    name: 'BUILDERHUB',
    title: 'BUILDER DISCOVERY PLATFORM',
    location: '[NEW YORK CITY]',
    status: 'ACTIVE // ACCESS LEVEL: NEXUS',
};

const SKILLS = [
    { name: 'REACT', percent: 95, color: '#00d4ff' },
    { name: 'TYPESCRIPT', percent: 92, color: '#00d4ff' },
    { name: 'AI/ML', percent: 88, color: '#00d4ff' },
    { name: 'NODE.JS', percent: 85, color: '#00d4ff' },
    { name: 'FULL-STACK', percent: 90, color: '#00d4ff' },
];

const PROJECTS = [
    { year: '2026', name: 'BUILDERHUB PLATFORM - LIVE' },
    { year: '2025', name: 'AI NATIVE PROGRAM - PURSUIT' },
    { year: '2024', name: 'COMMUNITY BUILDER NETWORK' },
];

export const MatrixIntro: React.FC<MatrixIntroProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [profileLines, setProfileLines] = useState<number>(0);
    const [skillIndex, setSkillIndex] = useState(-1);
    const [skillProgress, setSkillProgress] = useState<number[]>([]);
    const [projectIndex, setProjectIndex] = useState(-1);

    // Phase 0: Loading bar
    // Phase 1: Profile data typewriter
    // Phase 2: Skills animation
    // Phase 3: Projects
    // Phase 4: Access granted, fade out

    // Loading animation
    useEffect(() => {
        if (phase !== 0) return;

        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setPhase(1), 300);
                    return 100;
                }
                return prev + 4;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [phase]);

    // Profile lines reveal
    useEffect(() => {
        if (phase !== 1) return;

        const interval = setInterval(() => {
            setProfileLines(prev => {
                if (prev >= 4) {
                    clearInterval(interval);
                    setTimeout(() => setPhase(2), 400);
                    return 4;
                }
                return prev + 1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [phase]);

    // Skills animation
    useEffect(() => {
        if (phase !== 2) return;

        setSkillProgress(SKILLS.map(() => 0));
        let currentSkill = 0;

        const animateNextSkill = () => {
            if (currentSkill >= SKILLS.length) {
                setTimeout(() => setPhase(3), 300);
                return;
            }

            setSkillIndex(currentSkill);
            const targetPercent = SKILLS[currentSkill].percent;
            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += 6;
                if (progress >= targetPercent) {
                    progress = targetPercent;
                    clearInterval(progressInterval);

                    setSkillProgress(prev => {
                        const newProgress = [...prev];
                        newProgress[currentSkill] = progress;
                        return newProgress;
                    });

                    currentSkill++;
                    setTimeout(animateNextSkill, 80);
                } else {
                    setSkillProgress(prev => {
                        const newProgress = [...prev];
                        newProgress[currentSkill] = progress;
                        return newProgress;
                    });
                }
            }, 15);
        };

        setTimeout(animateNextSkill, 200);
    }, [phase]);

    // Projects reveal
    useEffect(() => {
        if (phase !== 3) return;

        const interval = setInterval(() => {
            setProjectIndex(prev => {
                if (prev >= PROJECTS.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setPhase(4), 600);
                    return PROJECTS.length - 1;
                }
                return prev + 1;
            });
        }, 250);

        return () => clearInterval(interval);
    }, [phase]);

    // Final fade out
    useEffect(() => {
        if (phase === 4) {
            setTimeout(onComplete, 800);
        }
    }, [phase, onComplete]);

    return (
        <AnimatePresence>
            {phase < 5 && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)',
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.8, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Scanline overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                        }}
                    />

                    {/* 3D Terminal Container */}
                    <motion.div
                        className="relative"
                        style={{
                            perspective: '1000px',
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="relative bg-[#0a0a14]/95 border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl"
                            style={{
                                width: 'min(600px, 90vw)',
                                minHeight: '400px',
                                transform: 'rotateX(5deg)',
                                transformStyle: 'preserve-3d',
                                boxShadow: '0 0 60px rgba(0, 212, 255, 0.15), 0 0 100px rgba(0, 212, 255, 0.1), inset 0 0 60px rgba(0, 212, 255, 0.05)',
                            }}
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d1a] border-b border-cyan-500/20">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="ml-4 text-cyan-400/60 text-xs font-mono tracking-wider">
                                    user@cyberterminal:~
                                </span>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm space-y-4">
                                {/* Loading Phase */}
                                {phase >= 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <span>Initializing system...Loading profile data...</span>
                                            <div className="flex-1 h-2 bg-gray-800 rounded overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-green-400"
                                                    style={{ width: `${loadingProgress}%` }}
                                                />
                                            </div>
                                            <span className="text-cyan-400 w-12">{loadingProgress}%</span>
                                        </div>
                                        {loadingProgress >= 100 && (
                                            <motion.div
                                                className="text-green-400 mt-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <span className="text-cyan-400">&gt;</span> Welcome to CYBER TERMINAL // ACCESS GRANTED
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Profile Section */}
                                {phase >= 1 && (
                                    <motion.div
                                        className="space-y-1 mt-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="text-cyan-400 text-xs tracking-widest mb-2">&gt;&gt; SYSTEM USER PROFILE &lt;&lt;</div>
                                        {profileLines >= 1 && (
                                            <div className="text-gray-300">
                                                <span className="text-cyan-400">&gt;</span> NAME: <span className="text-cyan-300">{PROFILE_DATA.name}</span>
                                            </div>
                                        )}
                                        {profileLines >= 2 && (
                                            <div className="text-gray-300">
                                                <span className="text-cyan-400">&gt;</span> TITLE: <span className="text-cyan-300">{PROFILE_DATA.title}</span>
                                            </div>
                                        )}
                                        {profileLines >= 3 && (
                                            <div className="text-gray-300">
                                                <span className="text-cyan-400">&gt;</span> LOCATION: <span className="text-yellow-400">{PROFILE_DATA.location}</span>
                                            </div>
                                        )}
                                        {profileLines >= 4 && (
                                            <div className="text-gray-300">
                                                <span className="text-cyan-400">&gt;</span> STATUS: <span className="text-green-400">{PROFILE_DATA.status}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Skills Matrix */}
                                {phase >= 2 && (
                                    <motion.div
                                        className="space-y-2 mt-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="text-cyan-400 text-xs tracking-widest mb-2">&gt;&gt; SKILL MATRIX &lt;&lt;</div>
                                        {SKILLS.map((skill, i) => (
                                            <motion.div
                                                key={skill.name}
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{
                                                    opacity: i <= skillIndex ? 1 : 0.3,
                                                    x: i <= skillIndex ? 0 : -20,
                                                }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <span className="text-cyan-400">&gt;</span>
                                                <span className="text-gray-300 w-28">{skill.name}:</span>
                                                <div className="flex-1 h-3 bg-gray-800/50 rounded overflow-hidden border border-cyan-500/20">
                                                    <motion.div
                                                        className="h-full rounded"
                                                        style={{
                                                            width: `${skillProgress[i] || 0}%`,
                                                            background: `linear-gradient(90deg, ${skill.color}, #00ff88)`,
                                                            boxShadow: `0 0 10px ${skill.color}`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-cyan-400 w-12 text-right">{skillProgress[i] || 0}%</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Project History */}
                                {phase >= 3 && (
                                    <motion.div
                                        className="space-y-1 mt-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="text-cyan-400 text-xs tracking-widest mb-2">&gt;&gt; PROJECT HISTORY &lt;&lt;</div>
                                        {PROJECTS.map((project, i) => (
                                            <motion.div
                                                key={i}
                                                className="text-gray-300"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{
                                                    opacity: i <= projectIndex ? 1 : 0,
                                                    x: i <= projectIndex ? 0 : -10,
                                                }}
                                            >
                                                <span className="text-cyan-400">&gt;</span> [{project.year}] {project.name}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Access Granted */}
                                {phase >= 4 && (
                                    <motion.div
                                        className="mt-6 text-center"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 animate-pulse">
                                            // ENTERING THE NEXUS //
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Glow effect at bottom */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to top, rgba(0, 212, 255, 0.1), transparent)',
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Corner decorations */}
                    <div className="absolute bottom-4 left-4 text-cyan-500/30 text-xs font-mono">
                        BuilderHub v2.0
                    </div>
                    <div className="absolute bottom-4 right-4 text-cyan-500/30 text-xs font-mono">
                        [NEXUS PROTOCOL]
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
