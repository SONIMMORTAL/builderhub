import { BuilderProfile } from './types';

export const INITIAL_PROFILES: BuilderProfile[] = [
  {
    id: '3',
    name: 'Robert Petillo',
    role: 'Builder & Entrepreneur',
    bio: 'A multidisciplinary entrepreneur and AI developer bridging the gap between practical engineering and technology. Founder of MY NY Brands and a full-stack AI Builder.',
    fullBio: `A multidisciplinary entrepreneur and AI developer who bridges the gap between practical engineering and cutting-edge technology. Based in New York, I'd describe myself as an "AI Builder" and I currently manage a diverse portfolio of seven brands spanning food and beverage, fashion, wellness, and technology.

I transitioned from a career as an HVAC engineer to become a full-stack AI developer. This unique background allows me to approach technical building with a grounded, practical mindset aimed at solving real-world business problems.

Key Focus Areas:

AI Development: Specializes in building RAG (Retrieval-Augmented Generation) systems, API integration, and intelligent automation. My technical stack includes TypeScript, JavaScript, and Python, with active repositories for projects like Auro and ProductSearch.

Brand Building: I am the founder of "MY NY Brands" and is actively building ventures such as Black Orchyd (an innovative black hot sauce company), AI Wear, Healthy Press, and Agnes.

Strategic Growth: Beyond coding, I operate as a growth partner for businesses, offering strategic planning and product innovation to help scalable ventures thrive.`,
    avatarUrl: '/robert-petillo.jpg',
    skills: ['Product', 'Strategy', 'Leadership', 'Innovation'],
    projects: [
      { name: 'Portfolio', url: 'https://portfolio-rho-opal-62.vercel.app/', description: 'Personal portfolio showcasing projects and work' }
    ],
    socials: [
      { platform: 'github', url: 'https://github.com/newyorkiswork' },
      { platform: 'website', url: 'https://portfolio-rho-opal-62.vercel.app/' }
    ],
    featured: true,
  },
  {
    id: '1',
    name: 'Samuel McFarlane',
    role: 'AI/ML Engineer & Full-Stack Developer',
    bio: 'AI/ML Engineer specializing in Rust backend development, machine learning systems, and automation workflows. Building intelligent systems from first principles.',
    fullBio: `Samuel McFarlane grew up in Crown Heights, Brooklyn, and spent part of his youth in the South Bronx, developing an early understanding of how diverse communities adapt and thrive. Coming from a bilingual Panamanian household, he learned to navigate cultural diversity while fostering curiosity and discipline. His early fascination with systems and problem-solving evolved into a deep interest in how technology could improve real-world experiences.

Before joining Pursuit, Samuel worked as a freelance developer and technical consultant, delivering end-to-end solutions for small businesses. His focus on automation, AI integration, and intelligent system design gave him a strong foundation in both backend logic and frontend interaction.

Technical Focus:
Samuel's work spans Rust backend development, machine learning systems, and automation workflows. Notable projects include momentum scoring algorithms for cybersecurity startup analysis, property investment intelligence platforms, and AI-powered streaming architectures with real-time subtitle translation. A builder at heart, he prefers constructing systems from first principles—currently exploring custom large language model development and mobile-optimized local LLM deployments for offline coding assistance.

Through Pursuit's AI Native Program, Samuel continues refining his expertise in machine learning, prompt engineering, and cloud-native architectures. Beyond technical work, he maintains interests in VR gaming and property investment analysis—reflecting a philosophy of continuous learning and hands-on experimentation.`,
    avatarUrl: '/samuel-mcfarlane.jpg',
    skills: ['Rust', 'Python', 'ML/AI', 'TypeScript', 'Cloud Architecture'],
    projects: [
      { name: 'AI Streaming Architecture', url: 'https://github.com/SamMcfarlane-pursuit', description: 'Real-time subtitle translation with AI-powered streaming.' },
      { name: 'Auction Intel', url: 'https://auction-intel.vercel.app/', description: 'Property investment intelligence platform.' }
    ],
    socials: [
      { platform: 'github', url: 'https://github.com/SamMcfarlane-pursuit' }
    ],
    featured: true,
  },
  {
    id: '2',
    name: 'Jacob Williams',
    role: 'AI Researcher & Dev',
    bio: 'Brooklyn-based designer bridging the gap between visual effects and product design. Specializing in Generative AI and prompt engineering to craft immersive, user-centric digital experiences.',
    fullBio: `Hi, I’m Jacob H. Williams. I am a Product Designer, Multi-Media Artist, and Prompt Engineer based in Brooklyn, NY.

My journey into design wasn't linear—it started in the fast-paced world of Visual Effects (VFX). For years, I helped bring creative visions to life for broadcast and brand standards, honing my skills in motion graphics, digital asset management, and visual storytelling. Today, I channel that obsession with detail and composition into UI/UX Design and AI Solutions.

I believe the best digital products feel as effortless as a well-lit city street. Whether I'm refining a user journey in Figma, engineering prompts for LLMs, or building in Webflow, my goal remains the same: to create accessible, inclusive, and engaging experiences. When I'm not designing, you can find me exploring Bed-Stuy, soaking in New York's artistic energy, or experimenting with the latest in Generative AI.`,
    avatarUrl: '/JAKE.jpg',
    skills: ['UI/UX', 'Figma', 'GenAI', 'Webflow', 'Prompt Eng'],
    projects: [
      {
        name: 'VFX to AI-Driven UX',
        url: 'https://www.jacobhwilliams.me/',
        description: 'Innovative digital solutions merging cinematic visual storytelling with artificial intelligence workflows.'
      }
    ],
    socials: [
      { platform: 'github', url: 'https://github.com/El-Pollo-Loco22' },
      { platform: 'website', url: 'https://www.jacobhwilliams.me/' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/jacob-h-williams/' }
    ],
    featured: false,
  },
  {
    id: '4',
    name: 'Don Grier',
    role: 'Full Stack Engineer',
    bio: 'Passionate builder creating impactful web experiences. Focused on community-driven platforms and interactive applications.',
    fullBio: `Don Grier is a Full Stack Engineer dedicated to building technology that serves communities. With a focus on modern web frameworks and interactive design, he creates platforms that are both functional and engaging.`,
    avatarUrl: '/DonGrier.jpg',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    projects: [
      { name: 'Public Advocates', url: 'https://www.publicadvocatessocialsociety.org/', description: 'Community social society platform.' },
      { name: 'Resource Re-entry Map', url: 'https://graceful-mermaid-e2de1a.netlify.app/', description: 'Interactive web application.' }
    ],
    socials: [
      { platform: 'github', url: 'https://github.com/SONIMMORTAL' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/arimmortal/' }
    ],
    featured: false
  }
];

export const AVATAR_PLACEHOLDERS = [
  'https://picsum.photos/seed/1/400/400',
  'https://picsum.photos/seed/2/400/400',
  'https://picsum.photos/seed/3/400/400',
  'https://picsum.photos/seed/4/400/400',
  'https://picsum.photos/seed/5/400/400',
];

export const SKILL_DEFINITIONS: Record<string, string> = {
  'React': 'A JavaScript library for building user interfaces.',
  'Node.js': 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
  'TypeScript': 'TypeScript is a strongly typed programming language that builds on JavaScript.',
  'UI/UX': 'User Interface and User Experience Design focused on creating effective and enjoyable user journeys.',
  'Figma': 'A collaborative web application for interface design.',
  'GenAI': 'Generative Artificial Intelligence capable of generating text, images, or other media.',
  'Webflow': 'A SaaS application that allows designers to build responsive websites with browser-based visual editing software.',
  'Prompt Eng': 'Prompt Engineering: The art of crafting inputs (prompts) to guide Generative AI models to produce optimal outputs.',
  'Go': 'An open source programming language supported by Google that makes it easy to build simple, reliable, and efficient software.',
  'Kubernetes': 'An open-source container orchestration system for automating application deployment, scaling, and management.',
  'PostgreSQL': 'A powerful, open source object-relational database system.',
  'Redis': 'An in-memory data structure store, used as a database, cache, and message broker.',
  'Product': "Product Management: The practice of strategically driving the development, market launch, and continual support and improvement of a company's products.",
  'Strategy': 'The formulation and implementation of major goals and initiatives taken by a company.',
  'Leadership': 'The action of leading a group of people or an organization.',
  'Innovation': 'The practical implementation of ideas that result in the introduction of new goods or services.',
  'Rust': 'A systems programming language focused on safety, speed, and concurrency.',
  'Python': 'A versatile programming language known for its readability and extensive ecosystem in data science and AI.',
  'ML/AI': 'Machine Learning and Artificial Intelligence: Building systems that learn from data and make intelligent decisions.',
  'Cloud Architecture': 'Designing and managing cloud computing systems for scalability, reliability, and performance.',
};