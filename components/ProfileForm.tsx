import React, { useState } from 'react';
import { BuilderProfile, SocialLink } from '../types';
import { enhanceBio } from '../services/geminiService';
import { Button } from './Button';
import { Sparkles, X, Github, Twitter, Globe, User, Briefcase, Code, Link } from 'lucide-react';
import { AVATAR_PLACEHOLDERS } from '../constants';

export interface ProfileFormProps {
  onSave: (profile: BuilderProfile) => void;
  onCancel: () => void;
  initialData?: {
    name?: string;
    avatarUrl?: string;
    role?: string;
  };
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onCancel, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    bio: '',
    avatarUrl: initialData?.avatarUrl || AVATAR_PLACEHOLDERS[Math.floor(Math.random() * AVATAR_PLACEHOLDERS.length)],
    skills: '',
    github: '',
    twitter: '',
    website: '',
  });

  const handleEnhanceBio = async () => {
    if (!formData.bio && !formData.role) return;

    setAiLoading(true);
    const skillsList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const enhanced = await enhanceBio(formData.bio, formData.role, skillsList);
    setFormData(prev => ({ ...prev, bio: enhanced }));
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const socials: SocialLink[] = [];
    if (formData.github) socials.push({ platform: 'github', url: formData.github });
    if (formData.twitter) socials.push({ platform: 'twitter', url: formData.twitter });
    if (formData.website) socials.push({ platform: 'website', url: formData.website });

    const newProfile: BuilderProfile = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      avatarUrl: formData.avatarUrl,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      projects: [], // Simplified for this demo
      socials,
    };

    setTimeout(() => {
      onSave(newProfile);
      setLoading(false);
    }, 600);
  };

  const inputClasses = "w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-purple/50 outline-none transition-all input-glow placeholder-gray-500";
  const labelClasses = "flex items-center gap-2 text-xs font-medium text-gray-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Join the Hub</h2>
          <p className="text-sm text-gray-500 mt-1">Showcase your work to the world</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-5">
        {/* Name & Role */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>
              <User className="w-3.5 h-3.5" />
              Name
            </label>
            <input
              required
              className={inputClasses}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className={labelClasses}>
              <Briefcase className="w-3.5 h-3.5" />
              Role
            </label>
            <input
              required
              className={inputClasses}
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              placeholder="Frontend Engineer"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className={labelClasses}>
            <span className="flex-1 flex items-center gap-2">
              Bio
              <span className="text-accent-purple/70 font-normal">— Describe what you build</span>
            </span>
          </label>
          <div className="relative">
            <textarea
              required
              className={`${inputClasses} h-28 resize-none pr-12`}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="I build accessible web apps that make the world better..."
            />
            <button
              type="button"
              onClick={handleEnhanceBio}
              disabled={aiLoading || !formData.bio}
              className="absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-accent-purple hover:from-accent-purple/30 hover:to-accent-blue/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              title="Enhance with AI"
            >
              <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Click the sparkle to enhance with AI
          </p>
        </div>

        {/* Skills */}
        <div>
          <label className={labelClasses}>
            <Code className="w-3.5 h-3.5" />
            Skills
            <span className="text-gray-600 font-normal">— comma separated</span>
          </label>
          <input
            className={inputClasses}
            value={formData.skills}
            onChange={e => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, TypeScript, Figma, Node.js"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <label className={labelClasses}>
            <Link className="w-3.5 h-3.5" />
            Social Links
          </label>

          <div className="relative">
            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className={`${inputClasses} pl-11`}
              value={formData.github}
              onChange={e => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="relative">
            <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className={`${inputClasses} pl-11`}
              value={formData.twitter}
              onChange={e => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://twitter.com/username"
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className={`${inputClasses} pl-11`}
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="gradient" isLoading={loading} className="flex-1">
          Create Profile
        </Button>
      </div>
    </form>
  );
};