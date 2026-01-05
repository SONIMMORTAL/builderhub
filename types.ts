export interface Project {
  name: string;
  url: string;
  description?: string;
}

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'website';
  url: string;
}

export interface BuilderProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  projects: Project[];
  socials: SocialLink[];
  fullBio?: string;
  featured?: boolean;
}

export enum ModalType {
  NONE,
  ADD_PROFILE,
  VIEW_PROFILE,
  AUTH_SELECTION,
  AUTH_SIGNUP,
  SKILL_DEFINITION,
}