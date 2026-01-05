import React, { useState, useRef } from 'react';
import { Github, Twitter, Globe, Linkedin, ArrowUpRight, Sparkles, Code2, Rocket } from 'lucide-react';
import { BuilderProfile } from '../types';
import { Badge } from './Badge';
import { LetterSwapHover } from './LetterSwapHover';

interface FlipCardProps {
    profile: BuilderProfile;
    onClick: (profile: BuilderProfile) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({ profile, onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Spotlight Effect logic
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    const handleViewProfile = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick(profile);
    };

    return (
        <div
            className="flip-card-container group"
            style={{ perspective: '1200px' }}
        >
            <div
                className={`flip-card-inner relative w-full h-[520px] transition-transform duration-700 ease-out ${isFlipped ? 'flip-card-flipped' : ''
                    }`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front Side */}
                <div
                    ref={divRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`flip-card-front absolute inset-0 rounded-2xl overflow-hidden ${isFlipped ? 'pointer-events-none' : ''}`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-dark-950">
                        {/* Full Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full object-cover transition-transform duration-700 scale-110 group-hover:scale-125"
                            />
                            {/* Dark Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-90" />
                        </div>

                        {/* Spotlight Overlay */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10 mix-blend-overlay"
                            style={{
                                opacity,
                                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`,
                            }}
                        />

                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple opacity-50" />

                        {/* Content */}
                        <div className="relative flex flex-col justify-end h-full p-6 z-10">
                            {/* Featured badge */}
                            {profile.featured && (
                                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-accent-purple/50 shadow-lg shadow-accent-purple/20">
                                    <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
                                    <span className="text-xs font-bold text-accent-purple tracking-wide uppercase">Featured</span>
                                </div>
                            )}

                            {/* Name & Role */}
                            <div className="mb-4">
                                <h3 className="text-3xl font-bold text-white mb-1 tracking-tight drop-shadow-md">
                                    <LetterSwapHover>{profile.name}</LetterSwapHover>
                                </h3>
                                <p className="text-base text-gray-300 flex items-center gap-2 font-medium">
                                    <Code2 className="w-4 h-4 text-accent-cyan" />
                                    {profile.role}
                                </p>
                            </div>

                            {/* Skills Tag Cloud */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {profile.skills.slice(0, 3).map(skill => (
                                    <Badge key={skill} variant="outline" className="bg-black/30 backdrop-blur-sm border-white/20 text-white/90">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            {/* View Details Button */}
                            <button
                                onClick={handleFlip}
                                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <span className="tracking-wide">View Details</span>
                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className={`flip-card-back absolute inset-0 rounded-2xl overflow-hidden ${!isFlipped ? 'pointer-events-none' : ''}`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="relative h-full flex flex-col glass-premium rounded-2xl">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-blue/10" />

                        {/* Header */}
                        <div className="relative p-4 border-b border-white/5 z-10">
                            <div className="flex items-center gap-3">
                                <img
                                    src={profile.avatarUrl}
                                    alt={profile.name}
                                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/20"
                                />
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-semibold text-white truncate">{profile.name}</h4>
                                    <p className="text-xs text-gray-400 truncate">{profile.role}</p>
                                </div>
                                {/* Socials */}
                                <div className="flex items-center gap-1">
                                    {profile.socials.slice(0, 3).map((social, idx) => {
                                        const Icon = {
                                            github: Github,
                                            twitter: Twitter,
                                            linkedin: Linkedin,
                                            website: Globe
                                        }[social.platform];

                                        return (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                onClick={(e) => e.stopPropagation()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-gray-500 hover:text-white hover:bg-accent-purple/20 rounded-lg transition-all hover:scale-110"
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="relative flex-grow p-4 overflow-y-auto scrollbar-hide z-10">
                            <div className="mb-4">
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h5>
                                <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">{profile.bio}</p>
                            </div>

                            {/* All Skills */}
                            <div className="mb-4">
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills</h5>
                                <div className="flex flex-wrap gap-1.5">
                                    {profile.skills.map(skill => (
                                        <span
                                            key={skill}
                                            className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            {profile.projects.length > 0 && (
                                <div>
                                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</h5>
                                    <div className="space-y-2">
                                        {profile.projects.slice(0, 2).map((project, idx) => (
                                            <a
                                                key={idx}
                                                href={project.url}
                                                onClick={(e) => e.stopPropagation()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/project"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-white group-hover/project:text-accent-purple transition-colors"><LetterSwapHover>{project.name}</LetterSwapHover></span>
                                                    <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover/project:text-accent-purple transition-colors" />
                                                </div>
                                                {project.description && (
                                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{project.description}</p>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="relative flex gap-2 p-4 border-t border-white/5 z-10">
                            <button
                                onClick={handleFlip}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <LetterSwapHover>Flip Back</LetterSwapHover>
                            </button>
                            <button
                                onClick={handleViewProfile}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent-purple to-accent-blue hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                            >
                                <LetterSwapHover>Full Profile</LetterSwapHover>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
