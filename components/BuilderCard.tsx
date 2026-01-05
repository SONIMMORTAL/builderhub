import React from 'react';
import { Github, Twitter, Globe, Linkedin, ArrowUpRight } from 'lucide-react';
import { BuilderProfile } from '../types';
import { Badge } from './Badge';
import { LetterSwapHover } from './LetterSwapHover';

interface BuilderCardProps {
  profile: BuilderProfile;
  onClick: (profile: BuilderProfile) => void;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({ profile, onClick }) => {
  return (
    <div
      onClick={() => onClick(profile)}
      className="group relative flex flex-col p-6 glass-card rounded-2xl glow-on-hover card-shine cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-accent-purple/0 via-accent-blue/0 to-accent-cyan/0 group-hover:from-accent-purple/40 group-hover:via-accent-blue/30 group-hover:to-accent-cyan/40 transition-all duration-500 pointer-events-none" />

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple/0 to-accent-blue/0 group-hover:from-accent-purple/5 group-hover:to-accent-blue/5 transition-all duration-500 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-4 z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Avatar glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan rounded-full opacity-0 group-hover:opacity-60 blur transition-all duration-300" />
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="relative w-14 h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-white/20 transition-all"
            />
            {profile.featured && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full border-2 border-dark-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-purple transition-all duration-300">
              <LetterSwapHover>{profile.name}</LetterSwapHover>
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{profile.role}</p>
          </div>
        </div>
        <button className="p-2 text-gray-600 group-hover:text-white group-hover:bg-white/10 rounded-xl transition-all">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <p className="relative text-sm text-gray-400 line-clamp-3 mb-6 z-10 flex-grow leading-relaxed">
        {profile.bio}
      </p>

      <div className="relative flex flex-wrap gap-2 mb-6 z-10">
        {profile.skills.slice(0, 3).map(skill => (
          <Badge key={skill} variant="outline">{skill}</Badge>
        ))}
        {profile.skills.length > 3 && (
          <Badge variant="outline">+{profile.skills.length - 3}</Badge>
        )}
      </div>

      <div className="relative flex items-center gap-2 mt-auto pt-4 border-t border-white/5 z-10">
        {profile.socials.map((social, idx) => {
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
              className="p-2 text-gray-500 hover:text-white hover:bg-accent-purple/20 rounded-lg transition-all hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};