# BuilderHub

> **Discover the Next Generation of Builders** — A curated directory of engineers, designers, and makers.

![BuilderHub Preview](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop)

## ✨ Features

- **🎴 Interactive Builder Cards** — Flip cards with spotlight effects and smooth animations
- **🌍 3D Globe Visualization** — Dynamic Cobe globe with pulsing accent colors
- **🎬 Matrix Intro Animation** — Terminal-style intro with typewriter effects
- **🔍 Smart Search** — Filter builders by name, role, or skills
- **📱 Fully Responsive** — Optimized for all device sizes
- **⌨️ Keyboard Navigation** — ESC to close modals, arrow keys for carousel

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast development
- **Motion** (Framer Motion) for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Cobe** for 3D globe rendering

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/builderhub.git
cd builderhub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Vite and configures build settings
4. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify Dashboard](https://app.netlify.com/start)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click "Deploy"

## 📁 Project Structure

```
builderhub/
├── components/          # React components
│   ├── eldoraui/       # Fancy UI components
│   └── ui/             # Base UI components
├── public/             # Static assets
├── services/           # API services
├── App.tsx             # Main application
├── constants.ts        # Builder profiles & data
├── types.ts            # TypeScript types
└── index.html          # Entry HTML
```

## 📄 License

MIT © 2026 BuilderHub
