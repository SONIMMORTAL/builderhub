import React, { useState, useEffect } from 'react';
import { LayoutGrid, Plus, Search, X, Briefcase, Github, Twitter, Heart } from 'lucide-react';
import { BuilderProfile, ModalType } from './types';
import { INITIAL_PROFILES, SKILL_DEFINITIONS } from './constants';
import { FlipCard } from './components/FlipCard';
import { ProfileForm } from './components/ProfileForm';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { TextRotate } from './components/TextRotate';
import { SimpleMarquee } from './components/SimpleMarquee';
import { AnimatedShinyButton } from './components/eldoraui/AnimatedShinyButton';
import { BlurIn } from './components/eldoraui/BlurIn';
import { Grid } from './components/eldoraui/Grid';
import { CobeGlobe } from './components/eldoraui/CobeGlobe';
import { SlideInText, MultiDirectionSlideText } from './components/eldoraui/MultiDirectionSlide';
import { motion, AnimatePresence } from 'motion/react';
import { BuilderCarousel } from './components/BuilderCarousel';

import { LetterSwapHover } from './components/LetterSwapHover';
import { AuthSignUp } from './components/AuthSignUp';
import { Particles } from './components/ui/particles';
import { MatrixIntro } from './components/MatrixIntro';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [profiles, setProfiles] = useState<BuilderProfile[]>(INITIAL_PROFILES);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [selectedProfile, setSelectedProfile] = useState<BuilderProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [prefilledData, setPrefilledData] = useState<{ name?: string; avatarUrl?: string; role?: string } | undefined>(undefined);

  const handleAddProfile = (newProfile: BuilderProfile) => {
    setProfiles([newProfile, ...profiles]);
    setModalType(ModalType.NONE);
  };

  const handleCardClick = (profile: BuilderProfile) => {
    setSelectedProfile(profile);
    setModalType(ModalType.VIEW_PROFILE);
  };

  const closeModal = () => {
    setModalType(ModalType.NONE);
    setSelectedProfile(null);
  };

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Global ESC key handler to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalType !== ModalType.NONE) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalType]);

  return (
    <>
      {/* Matrix Intro Animation */}
      <AnimatePresence>
        {showIntro && <MatrixIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.div
        className="relative min-h-screen bg-dark-950 text-white overflow-hidden selection:bg-accent-purple/30 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Particles
          className="absolute inset-0 z-0"
          quantity={200}
          ease={40}
          color="#ffffff"
          refresh
          staticity={30}
        />

        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-purple w-[600px] h-[600px] -top-40 -left-40 animate-float-slow" />
          <div className="orb orb-blue w-[500px] h-[500px] top-1/4 right-0 animate-float-slower" />
          <div className="orb orb-pink w-[400px] h-[400px] bottom-0 left-1/3 animate-float" />
          <div className="orb orb-cyan w-[300px] h-[300px] top-1/2 left-1/4 animate-float-slow" style={{ animationDelay: '-3s' }} />
        </div>

        {/* Eldora Grid Background */}
        <Grid columns={8} rows={6} showPlus={true} className="opacity-30" />

        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-transparent border-b border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Removed */}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-purple transition-colors" />
                <input
                  type="text"
                  placeholder="Search builders..."
                  className="bg-dark-900/50 border border-white/10 rounded-full pl-10 pr-5 py-2 text-sm w-64 focus:w-80 transition-all focus:border-accent-purple/50 focus:outline-none placeholder-gray-500 input-glow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <AnimatedShinyButton onClick={() => setModalType(ModalType.AUTH_SELECTION)}>
                <Plus className="w-4 h-4" />
                Add Profile
              </AnimatedShinyButton>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setModalType(ModalType.AUTH_SELECTION)}>
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Cobe Globe Background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -top-40 sm:-top-24 md:-top-16">
            <div className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]">
              <CobeGlobe
                phi={0}
                theta={0.2}
                mapSamples={16000}
                mapBrightness={1.8}
                mapBaseBrightness={0.05}
                diffuse={3}
                dark={1.1}
                baseColor="#8b5cf6"
                markerColor="#fb6415"
                markerSize={0.05}
                glowColor="#a855f7"
                scale={1.0}
                offsetX={0.0}
                offsetY={0.0}
                opacity={0.5}
                pulseColors={true}
                pulseSpeed={0.5}
              />
            </div>
          </div>
          <div className="mb-16 text-center max-w-4xl mx-auto space-y-6">

            {/* Title */}
            <div className="mb-8 space-y-1">
              <h1 className="font-display text-center font-bold drop-shadow-sm text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.02em] leading-tight">
                <BlurIn text="Discover the next" className="text-white" delay={0} />
              </h1>
              <h1 className="font-display text-center font-bold drop-shadow-sm text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.02em] leading-tight inline-flex items-baseline justify-center w-full flex-nowrap gap-x-3">
                <span className="text-white">generation of</span>
                <TextRotate
                  texts={['Makers', 'Builders', 'Founders', 'Creators', 'Dreamers']}
                  mainClassName="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan"
                  staggerFrom="last"
                  staggerDuration={0.025}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  interval={2500}
                />
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              <BlurIn
                text="A curated directory of engineers, designers, and makers."
                className="text-gray-400"
                delay={0.3}
              />
              <br />
              <BlurIn
                text="Connect, collaborate, and see what they are shipping."
                className="text-gray-300"
                delay={0.8}
              />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up-delay-2">
              <Button variant="outline" onClick={() => document.getElementById('builders-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                <LetterSwapHover>Explore Builders</LetterSwapHover>
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pt-4 animate-slide-up-delay-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, role, or skill..."
                  className="w-full glass rounded-2xl pl-12 pr-5 py-4 text-base focus:border-accent-purple/50 focus:outline-none placeholder-gray-500 input-glow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-12 text-center animate-slide-up-delay-3">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-static">{profiles.length}</div>
              <div className="text-sm text-gray-500 mt-1">Builders</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-static">{profiles.reduce((acc, p) => acc + p.projects.length, 0)}</div>
              <div className="text-sm text-gray-500 mt-1">Projects</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-static">{[...new Set(profiles.flatMap(p => p.skills))].length}</div>
              <div className="text-sm text-gray-500 mt-1">Skills</div>
            </div>
          </div>


          {/* Builder Carousel */}
          <div id="builders-grid" className="py-8">
            <BuilderCarousel profiles={filteredProfiles} onSelect={handleCardClick} />
          </div>

          {/* Skills Marquee - Moved to bottom */}
          <div className="mb-8 mt-12 -mx-4 sm:-mx-6 lg:-mx-8 animate-slide-up-delay-3">
            <SimpleMarquee speed={40} gap={16} pauseOnHover={true} className="py-4">
              {[...new Set(profiles.flatMap(p => p.skills))].map((skill, index) => (
                <span
                  key={skill}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setModalType(ModalType.SKILL_DEFINITION);
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium text-gray-300 hover:border-accent-purple/30 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {skill}
                </span>
              ))}
            </SimpleMarquee>
          </div>
        </main >

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Footer */}
        <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12 border-t border-white/5">
          <div className="flex flex-col gap-8">
            {/* Top Row - Logo and Social Links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-accent-purple" />
                <span className="text-lg font-bold text-white">BuilderHub</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-accent-blue/20 hover:border-accent-blue/50 transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Middle Row - Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button
                onClick={() => document.getElementById('builders-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Browse Builders
              </button>
              <button
                onClick={() => setModalType(ModalType.AUTH_SELECTION)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Add Your Profile
              </button>
            </div>

            {/* Bottom Row - Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span>© 2026 BuilderHub</span>
              </div>
              <p className="flex items-center gap-1.5">
                Made with <Heart className="w-3.5 h-3.5 text-accent-purple fill-accent-purple animate-pulse" /> for builders everywhere
              </p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        {
          modalType !== ModalType.NONE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-dark-950/80 backdrop-blur-md"
                onClick={closeModal}
              />

              {modalType === ModalType.ADD_PROFILE && (
                <motion.div
                  className="w-full max-w-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ProfileForm
                    onSave={(profile) => {
                      handleAddProfile(profile);
                      setPrefilledData(undefined);
                    }}
                    onCancel={() => {
                      setModalType(ModalType.NONE);
                      setPrefilledData(undefined);
                    }}
                    initialData={prefilledData}
                  />
                </motion.div>
              )}
              {modalType === ModalType.AUTH_SELECTION && (
                <motion.div
                  className="p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Command Center Status Bar */}
                  <motion.div
                    className="flex items-center justify-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.1 }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent-cyan"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-bold text-accent-cyan uppercase tracking-[0.3em]">
                      Command Center
                    </span>
                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent-cyan"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Title with gradient */}
                  <motion.h2
                    className="text-3xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.15 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan">
                      Join BuilderHub
                    </span>
                  </motion.h2>

                  <motion.p
                    className="text-gray-400 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.2 }}
                  >
                    <SlideInText direction="up" delay={0.25} staggerChildren>
                      Select your mission
                    </SlideInText>
                  </motion.p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Builder Option */}
                    <motion.button
                      onClick={() => setModalType(ModalType.AUTH_SIGNUP)}
                      className="group relative p-6 bg-dark-900/80 rounded-2xl text-left border border-white/10 overflow-hidden"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated gradient border on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(34, 211, 238, 0.3))',
                          padding: '1px',
                        }}
                      />
                      <div className="absolute inset-[1px] bg-dark-900/95 rounded-2xl group-hover:bg-dark-900/80 transition-colors" />

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-2xl" />
                      </div>

                      {/* Icon container */}
                      <motion.div
                        className="absolute top-6 right-6 p-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 border border-accent-purple/20 text-accent-purple"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <LayoutGrid className="w-5 h-5" />
                        </motion.div>
                      </motion.div>

                      <div className="relative">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-purple transition-colors">
                          <LetterSwapHover>I'm a Builder</LetterSwapHover>
                        </h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pr-12">
                          Showcase your projects and join the community.
                        </p>

                        {/* Arrow indicator on hover */}
                        <motion.div
                          className="absolute right-0 bottom-0 text-accent-purple opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <span className="text-lg">→</span>
                        </motion.div>
                      </div>
                    </motion.button>

                    {/* Employer Option */}
                    <motion.button
                      onClick={() => alert("Employer signup coming soon!")}
                      className="group relative p-6 bg-dark-900/80 rounded-2xl text-left border border-white/10 overflow-hidden"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated gradient border on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(59, 130, 246, 0.3))',
                          padding: '1px',
                        }}
                      />
                      <div className="absolute inset-[1px] bg-dark-900/95 rounded-2xl group-hover:bg-dark-900/80 transition-colors" />

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-2xl" />
                      </div>

                      {/* Icon container */}
                      <motion.div
                        className="absolute top-6 right-6 p-3 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/20 text-accent-blue"
                        whileHover={{ rotate: -10, scale: 1.1 }}
                      >
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <Briefcase className="w-5 h-5" />
                        </motion.div>
                      </motion.div>

                      <div className="relative">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-blue transition-colors">
                          <LetterSwapHover>I'm an Employer</LetterSwapHover>
                        </h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pr-12">
                          Discover and hire exceptional builders.
                        </p>

                        {/* Coming soon badge */}
                        <motion.span
                          className="absolute right-0 bottom-0 text-xs font-medium text-accent-cyan/60 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          Coming Soon
                        </motion.span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Escape hint */}
                  <motion.p
                    className="text-xs text-gray-600 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Press <kbd className="px-1.5 py-0.5 bg-dark-800 rounded text-gray-400 text-[10px] font-mono">ESC</kbd> or click outside to close
                  </motion.p>
                </motion.div>
              )}

              {modalType === ModalType.AUTH_SIGNUP && (
                <AuthSignUp
                  onBack={() => setModalType(ModalType.AUTH_SELECTION)}
                  onSuccess={(provider) => {
                    // Simulate fetching user data from provider
                    const simulatedData = {
                      name: provider === 'google' ? 'Alex Rivera' : 'Sarah Chen',
                      avatarUrl: provider === 'google'
                        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                      role: provider === 'github' ? 'Open Source Developer' : undefined
                    };
                    setPrefilledData(simulatedData);
                    setModalType(ModalType.ADD_PROFILE);
                  }}
                />
              )}

              {modalType === ModalType.SKILL_DEFINITION && selectedSkill && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="p-6 text-center max-w-md w-full bg-dark-900 border border-white/10 rounded-2xl shadow-xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 rounded-2xl pointer-events-none" />
                  <h2 className="text-2xl font-bold text-white mb-4 relative z-10">{selectedSkill}</h2>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg relative z-10">
                    {SKILL_DEFINITIONS[selectedSkill] || "A key technology in the modern builder's stack."}
                  </p>
                  <Button variant="outline" onClick={closeModal} className="w-full justify-center relative z-10">
                    Close
                  </Button>
                </motion.div>
              )}

              {modalType === ModalType.ADD_PROFILE && (
                <ProfileForm onSave={handleAddProfile} onCancel={closeModal} />
              )}

              {modalType === ModalType.VIEW_PROFILE && selectedProfile && (
                <motion.div
                  key={`profile-modal-${selectedProfile.id}`}
                  className="relative w-full max-w-lg bg-dark-950/90 border border-white/10 rounded-2xl p-6 shadow-2xl glass-premium overflow-y-auto max-h-[85vh] scrollbar-hide space-y-6"
                  initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header with avatar and info */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-5">
                      {/* Avatar with animated glow */}
                      <motion.div
                        className="relative group"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.05 }}
                      >
                        <div className="absolute -inset-1.5 bg-gradient-to-br from-accent-purple via-accent-blue to-accent-cyan rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition-all duration-500" />
                        <div className="absolute -inset-1 bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl opacity-80" />
                        <img
                          src={selectedProfile.avatarUrl}
                          alt={selectedProfile.name}
                          className="relative w-24 h-24 rounded-2xl object-cover border-2 border-white/10"
                        />
                      </motion.div>
                      <div className="pt-1">
                        {/* Multi-direction slide for name - first name left, last name right */}
                        <h2 className="text-2xl font-bold text-white mb-1">
                          <span key={`name-${selectedProfile.id}`}>
                            <MultiDirectionSlideText
                              textLeft={selectedProfile.name.split(' ')[0] || ''}
                              textRight={selectedProfile.name.split(' ').slice(1).join(' ') || ''}
                            />
                          </span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                          <span key={`role-${selectedProfile.id}`}>
                            <SlideInText direction="up" delay={0.25} staggerChildren>{selectedProfile.role}</SlideInText>
                          </span>
                        </p>
                        {/* Staggered social icons */}
                        <div className="flex gap-2 mt-4">
                          {selectedProfile.socials.map((s, i) => (
                            <motion.a
                              key={i}
                              href={s.url}
                              target="_blank"
                              rel="noopener"
                              className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-all hover:scale-110 text-gray-400 hover:text-white"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.3 + i * 0.08 }}
                              whileHover={{ scale: 1.15, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {s.platform === 'github' && <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" className="w-4 h-4 invert opacity-80" alt="GitHub" />}
                              {s.platform === 'twitter' && <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg" className="w-4 h-4 invert opacity-80" alt="X" />}
                              {s.platform === 'linkedin' && <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" className="w-4 h-4 invert opacity-80" alt="LinkedIn" />}
                              {s.platform === 'website' && <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlechrome.svg" className="w-4 h-4 invert opacity-80" alt="Web" />}
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={closeModal}
                      className="p-2.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* About Section */}
                  <motion.div
                    className="relative bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl p-5 border border-white/10 overflow-hidden"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.35 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 rounded-2xl" />
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-accent-purple/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <h3 className="relative text-xs font-bold text-accent-purple uppercase tracking-widest mb-3 flex items-center gap-2">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-accent-purple"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span key={`about-${selectedProfile.id}`}>
                        <SlideInText direction="left" delay={0.4}>About</SlideInText>
                      </span>
                    </h3>
                    <motion.p
                      className="relative text-gray-300 leading-relaxed whitespace-pre-line"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      {selectedProfile.fullBio || selectedProfile.bio}
                    </motion.p>
                  </motion.div>

                  {/* Skills Section */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.45 }}
                  >
                    <h3 className="text-xs font-bold text-accent-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <span key={`skills-${selectedProfile.id}`}>
                        <SlideInText direction="right" delay={0.5}>Skills</SlideInText>
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skills.map((s, i) => (
                        <motion.div
                          key={s}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.55 + i * 0.05 }}
                          whileHover={{ scale: 1.08, y: -2 }}
                        >
                          <Badge variant="glow">{s}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Projects Section */}
                  {selectedProfile.projects.length > 0 && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.55 }}
                    >
                      <h3 className="text-xs font-bold text-accent-purple uppercase tracking-widest mb-4 flex items-center gap-2">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-accent-purple"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <span key={`projects-${selectedProfile.id}`}>
                          <SlideInText direction="left" delay={0.6}>Featured Projects</SlideInText>
                        </span>
                      </h3>
                      <div className="grid gap-3">
                        {selectedProfile.projects.map((p, i) => (
                          <motion.a
                            key={i}
                            href={p.url}
                            target="_blank"
                            rel="noopener"
                            className="block p-4 bg-gradient-to-br from-white/[0.03] to-transparent rounded-xl border border-white/10 hover:border-accent-purple/40 hover:bg-white/5 transition-all group"
                            initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.65 + i * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white group-hover:text-accent-purple transition-colors">
                                <LetterSwapHover>{p.name}</LetterSwapHover>
                              </span>
                              <motion.span
                                className="text-xs font-medium text-accent-purple flex items-center gap-1"
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                              >
                                View <span className="text-lg">→</span>
                              </motion.span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1.5">{p.description}</p>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Footer */}
                  <motion.div
                    className="pt-4 border-t border-white/10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150, delay: 0.75 }}
                  >
                    <Button variant="outline" className="w-full justify-center" onClick={closeModal}>
                      <LetterSwapHover>Close</LetterSwapHover>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )
        }
      </motion.div>
    </>
  );
}

export default App;