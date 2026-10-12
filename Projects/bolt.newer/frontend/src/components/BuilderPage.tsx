import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  CheckCircle, 
  Circle, 
  FolderOpen, 
  File, 
  Globe,
  ArrowLeft,
  Download,
  Eye,
  Settings,
  Terminal,
  Folder,
  FileCode,
  Image as ImageIcon,
  Palette,
  ChevronRight,
  ChevronDown,
  X,
  Code,
  Monitor
} from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  duration?: number;
}

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  icon?: React.ReactNode;
  size?: string;
  modified?: string;
  content?: string;
  language?: string;
}

const BuilderPage: React.FC = () => {
  const location = useLocation();
  const { projectId } = useParams();
  const { prompt } = location.state || { prompt: 'Custom website project' };

  const [currentStep, setCurrentStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'public']);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  async function Init() {
    const response = await axios.post(`${BACKEND_URL}/template`,{messages : prompt.trim()});
    const {prompts, uiPrompts} = response.data;
    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`,{
      messages: [...prompts,prompt].map(content=>({
        role : "user",
        content
      }))
    })
    
  }  
  useEffect(()=>{
    Init();
  },[])
  const steps: Step[] = []
  // const steps: Step[] = [
  //   {
  //     id: '1',
  //     title: 'Analyzing Requirements',
  //     description: 'Understanding your project specifications and requirements',
  //     status: 'completed',
  //     duration: 0.8
  //   },
  //   {
  //     id: '2',
  //     title: 'Generating Architecture',
  //     description: 'Creating the optimal project structure and component hierarchy',
  //     status: 'completed',
  //     duration: 1.2
  //   },
  //   {
  //     id: '3',
  //     title: 'Building Components',
  //     description: 'Generating React components with TypeScript and styling',
  //     status: 'completed',
  //     duration: 2.1
  //   },
  //   {
  //     id: '4',
  //     title: 'Styling & Design',
  //     description: 'Applying responsive design and modern CSS animations',
  //     status: 'completed',
  //     duration: 1.5
  //   },
  //   {
  //     id: '5',
  //     title: 'Optimizing Performance',
  //     description: 'Code splitting, lazy loading, and performance optimizations',
  //     status: 'running',
  //     duration: 1.8
  //   },
  //   {
  //     id: '6',
  //     title: 'Setting up Deployment',
  //     description: 'Configuring build scripts and deployment settings',
  //     status: 'pending'
  //   }
  // ];

  const getFileLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };

  const fileStructure: FileItem[] = [
    {
      name: 'public',
      type: 'folder',
      children: [
        { 
          name: 'index.html', 
          type: 'file', 
          icon: <FileCode className="w-4 h-4 text-orange-500" />, 
          size: '2.1 KB',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Website</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
        },
        { 
          name: 'favicon.ico', 
          type: 'file', 
          icon: <ImageIcon className="w-4 h-4 text-blue-500" />, 
          size: '4.2 KB',
          language: 'plaintext',
          content: 'Binary file - Favicon image'
        },
        { 
          name: 'manifest.json', 
          type: 'file', 
          icon: <FileCode className="w-4 h-4 text-green-500" />, 
          size: '0.8 KB',
          language: 'json',
          content: `{
  "name": "Generated Website",
  "short_name": "GenSite",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`
        }
      ]
    },
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            { 
              name: 'Header.tsx', 
              type: 'file', 
              icon: <FileCode className="w-4 h-4 text-blue-600" />, 
              size: '3.2 KB',
              language: 'typescript',
              content: `import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Website
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;`
            },
            { 
              name: 'Hero.tsx', 
              type: 'file', 
              icon: <FileCode className="w-4 h-4 text-blue-600" />, 
              size: '4.7 KB',
              language: 'typescript',
              content: `import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Your
            <span className="block text-yellow-300">
              Amazing Website
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            This is your AI-generated website. Customize it to match your vision
            and make it uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;`
            },
            { 
              name: 'Features.tsx', 
              type: 'file', 
              icon: <FileCode className="w-4 h-4 text-blue-600" />, 
              size: '2.9 KB',
              language: 'typescript',
              content: `import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Fast Performance',
      description: 'Optimized for speed and performance',
      icon: '⚡'
    },
    {
      title: 'Responsive Design',
      description: 'Works perfectly on all devices',
      icon: '📱'
    },
    {
      title: 'Modern UI',
      description: 'Clean and contemporary design',
      icon: '🎨'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Amazing Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need for a modern website
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;`
            },
            { 
              name: 'Footer.tsx', 
              type: 'file', 
              icon: <FileCode className="w-4 h-4 text-blue-600" />, 
              size: '1.8 KB',
              language: 'typescript',
              content: `import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Website</h3>
            <p className="text-gray-400">
              Built with AI technology for the modern web.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: hello@example.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Your Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`
            }
          ]
        },
        {
          name: 'styles',
          type: 'folder',
          children: [
            { 
              name: 'globals.css', 
              type: 'file', 
              icon: <Palette className="w-4 h-4 text-pink-500" />, 
              size: '1.2 KB',
              language: 'css',
              content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors;
  }
}`
            },
            { 
              name: 'components.css', 
              type: 'file', 
              icon: <Palette className="w-4 h-4 text-pink-500" />, 
              size: '3.8 KB',
              language: 'css',
              content: `.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`
            }
          ]
        },
        { 
          name: 'App.tsx', 
          type: 'file', 
          icon: <FileCode className="w-4 h-4 text-blue-600" />, 
          size: '2.1 KB',
          language: 'typescript',
          content: `import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;`
        },
        { 
          name: 'main.tsx', 
          type: 'file', 
          icon: <FileCode className="w-4 h-4 text-blue-600" />, 
          size: '0.4 KB',
          language: 'typescript',
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
        },
        { 
          name: 'index.css', 
          type: 'file', 
          icon: <Palette className="w-4 h-4 text-pink-500" />, 
          size: '0.8 KB',
          language: 'css',
          content: `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`
        }
      ]
    },
    { 
      name: 'package.json', 
      type: 'file', 
      icon: <FileCode className="w-4 h-4 text-green-600" />, 
      size: '1.1 KB',
      language: 'json',
      content: `{
  "name": "generated-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`
    },
    { 
      name: 'tsconfig.json', 
      type: 'file', 
      icon: <FileCode className="w-4 h-4 text-blue-500" />, 
      size: '0.6 KB',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
    },
    { 
      name: 'tailwind.config.js', 
      type: 'file', 
      icon: <FileCode className="w-4 h-4 text-cyan-500" />, 
      size: '0.3 KB',
      language: 'javascript',
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    { 
      name: 'vite.config.ts', 
      type: 'file', 
      icon: <FileCode className="w-4 h-4 text-purple-500" />, 
      size: '0.2 KB',
      language: 'typescript',
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`
    }
  ];

  useEffect(() => {
    if (isBuilding) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsBuilding(false);
            return prev;
          }
        });
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isBuilding, steps.length]);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderPath) 
        ? prev.filter(path => path !== folderPath)
        : [...prev, folderPath]
    );
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setActiveTab('code');
    }
  };

  const renderFileTree = (items: FileItem[], level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      const isExpanded = expandedFolders.includes(currentPath);
      
      return (
        <div key={index}>
          <div 
            className={`flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors group ${
              selectedFile?.name === item.name ? 'bg-blue-600/20 border border-blue-500/30' : ''
            }`}
            style={{ marginLeft: `${level * 16}px` }}
            onClick={() => {
              if (item.type === 'folder') {
                toggleFolder(currentPath);
              } else {
                handleFileClick(item);
              }
            }}
          >
            {item.type === 'folder' ? (
              <div className="flex items-center space-x-1">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-blue-400" />
                ) : (
                  <Folder className="w-4 h-4 text-blue-400" />
                )}
              </div>
            ) : (
              <div className="ml-5">
                {item.icon || <File className="w-4 h-4 text-gray-400" />}
              </div>
            )}
            <span className="text-sm flex-1 text-gray-300 group-hover:text-white">{item.name}</span>
            {item.size && (
              <span className="text-xs text-gray-500">{item.size}</span>
            )}
          </div>
          {item.type === 'folder' && item.children && isExpanded && (
            <div>
              {renderFileTree(item.children, level + 1, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  const PreviewComponent = () => (
    <div className="h-full bg-white">
      <iframe
        src="data:text/html;charset=utf-8,%3C!DOCTYPE%20html%3E%0A%3Chtml%20lang%3D%22en%22%3E%0A%3Chead%3E%0A%20%20%3Cmeta%20charset%3D%22UTF-8%22%3E%0A%20%20%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%3E%0A%20%20%3Ctitle%3EGenerated%20Website%3C%2Ftitle%3E%0A%20%20%3Cscript%20src%3D%22https%3A%2F%2Fcdn.tailwindcss.com%22%3E%3C%2Fscript%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%20%20%3Cheader%20class%3D%22bg-white%20shadow-sm%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22max-w-7xl%20mx-auto%20px-4%20sm%3Apx-6%20lg%3Apx-8%22%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22flex%20justify-between%20items-center%20py-6%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22flex%20items-center%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch1%20class%3D%22text-2xl%20font-bold%20text-gray-900%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Your%20Website%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cnav%20class%3D%22hidden%20md%3Aflex%20space-x-8%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20class%3D%22text-gray-500%20hover%3Atext-gray-900%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Home%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20class%3D%22text-gray-500%20hover%3Atext-gray-900%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20About%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20class%3D%22text-gray-500%20hover%3Atext-gray-900%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Contact%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%3C%2Fnav%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fheader%3E%0A%0A%20%20%3Csection%20class%3D%22bg-gradient-to-r%20from-blue-600%20to-purple-600%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22max-w-7xl%20mx-auto%20px-4%20sm%3Apx-6%20lg%3Apx-8%20py-24%22%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22text-center%22%3E%0A%20%20%20%20%20%20%20%20%3Ch1%20class%3D%22text-4xl%20md%3Atext-6xl%20font-bold%20text-white%20mb-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20Welcome%20to%20Your%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22block%20text-yellow-300%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Amazing%20Website%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-xl%20text-blue-100%20mb-8%20max-w-2xl%20mx-auto%22%3E%0A%20%20%20%20%20%20%20%20%20%20This%20is%20your%20AI-generated%20website.%20Customize%20it%20to%20match%20your%20vision%0A%20%20%20%20%20%20%20%20%20%20and%20make%20it%20uniquely%20yours.%0A%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22flex%20flex-col%20sm%3Aflex-row%20gap-4%20justify-center%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22bg-white%20text-blue-600%20px-8%20py-3%20rounded-lg%20font-semibold%20hover%3Abg-blue-50%20transition-colors%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Get%20Started%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cbutton%20class%3D%22border-2%20border-white%20text-white%20px-8%20py-3%20rounded-lg%20font-semibold%20hover%3Abg-white%20hover%3Atext-blue-600%20transition-colors%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Learn%20More%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fsection%3E%0A%0A%20%20%3Csection%20class%3D%22py-20%20bg-gray-50%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22max-w-7xl%20mx-auto%20px-4%20sm%3Apx-6%20lg%3Apx-8%22%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22text-center%20mb-16%22%3E%0A%20%20%20%20%20%20%20%20%3Ch2%20class%3D%22text-3xl%20font-bold%20text-gray-900%20mb-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20Amazing%20Features%0A%20%20%20%20%20%20%20%20%3C%2Fh2%3E%0A%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-lg%20text-gray-600%22%3E%0A%20%20%20%20%20%20%20%20%20%20Everything%20you%20need%20for%20a%20modern%20website%0A%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22grid%20md%3Agrid-cols-3%20gap-8%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-center%20p-6%20bg-white%20rounded-lg%20shadow-sm%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-4xl%20mb-4%22%3E%E2%9A%A1%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch3%20class%3D%22text-xl%20font-semibold%20mb-2%22%3EFast%20Performance%3C%2Fh3%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-gray-600%22%3EOptimized%20for%20speed%20and%20performance%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-center%20p-6%20bg-white%20rounded-lg%20shadow-sm%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-4xl%20mb-4%22%3E%F0%9F%93%B1%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch3%20class%3D%22text-xl%20font-semibold%20mb-2%22%3EResponsive%20Design%3C%2Fh3%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-gray-600%22%3EWorks%20perfectly%20on%20all%20devices%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-center%20p-6%20bg-white%20rounded-lg%20shadow-sm%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22text-4xl%20mb-4%22%3E%F0%9F%8E%A8%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch3%20class%3D%22text-xl%20font-semibold%20mb-2%22%3EModern%20UI%3C%2Fh3%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-gray-600%22%3EClean%20and%20contemporary%20design%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fsection%3E%0A%0A%20%20%3Cfooter%20class%3D%22bg-gray-900%20text-white%20py-12%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22max-w-7xl%20mx-auto%20px-4%20sm%3Apx-6%20lg%3Apx-8%22%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22grid%20md%3Agrid-cols-4%20gap-8%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch3%20class%3D%22text-lg%20font-semibold%20mb-4%22%3EYour%20Website%3C%2Fh3%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cp%20class%3D%22text-gray-400%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20Built%20with%20AI%20technology%20for%20the%20modern%20web.%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch4%20class%3D%22font-semibold%20mb-4%22%3EQuick%20Links%3C%2Fh4%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cul%20class%3D%22space-y-2%20text-gray-400%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%3Ca%20href%3D%22%23%22%20class%3D%22hover%3Atext-white%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%3Ca%20href%3D%22%23%22%20class%3D%22hover%3Atext-white%22%3EAbout%3C%2Fa%3E%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%3Ca%20href%3D%22%23%22%20class%3D%22hover%3Atext-white%22%3EServices%3C%2Fa%3E%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Ful%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch4%20class%3D%22font-semibold%20mb-4%22%3EContact%3C%2Fh4%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cul%20class%3D%22space-y-2%20text-gray-400%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3EEmail%3A%20hello%40example.com%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3EPhone%3A%20(555)%20123-4567%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Ful%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ch4%20class%3D%22font-semibold%20mb-4%22%3EFollow%20Us%3C%2Fh4%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class%3D%22flex%20space-x-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20class%3D%22text-gray-400%20hover%3Atext-white%22%3ETwitter%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20class%3D%22text-gray-400%20hover%3Atext-white%22%3ELinkedIn%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22border-t%20border-gray-800%20mt-8%20pt-8%20text-center%20text-gray-400%22%3E%0A%20%20%20%20%20%20%20%20%3Cp%3E%26copy%3B%202025%20Your%20Website.%20All%20rights%20reserved.%3C%2Fp%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Ffooter%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E"
        className="w-full h-full border-0"
        title="Website Preview"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">Project {projectId}</h1>
                <p className="text-sm text-gray-400 max-w-md truncate">{prompt}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Steps */}
        <div className="w-96 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Build Progress</h2>
            </div>
            <p className="text-sm text-gray-400">
              {isBuilding ? 'Building your website...' : 'Build completed successfully!'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const isActive = index === currentStep && isBuilding;
                const isCompleted = step.status === 'completed' || (!isBuilding && index <= currentStep);
                
                return (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {isActive ? (
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium ${
                        isCompleted ? 'text-white' : isActive ? 'text-blue-400' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {step.description}
                      </p>
                      {step.duration && isCompleted && (
                        <p className="text-xs text-gray-500 mt-1">
                          Completed in {step.duration}s
                        </p>
                      )}
                      {isActive && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!isBuilding && (
              <div className="mt-8 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Build Successful!</span>
                </div>
                <p className="text-sm text-green-400 mt-1">
                  Your website has been generated and is ready for preview or download.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel - File Explorer */}
        <div className="w-96 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Project Files</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Generated project structure and files
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {renderFileTree(fileStructure)}
            </div>

            {/* File Count Summary */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-400">12</div>
                <div className="text-xs text-gray-400">Total Files</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-green-400">8</div>
                <div className="text-xs text-gray-400">Components</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-400">24.7 KB</div>
                <div className="text-xs text-gray-400">Total Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code/Preview */}
        <div className="flex-1 bg-gray-900 flex flex-col">
          {/* Tab Header */}
          <div className="border-b border-gray-700 flex items-center">
            <div className="flex">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-400 bg-gray-800/50'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Code</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-400 bg-gray-800/50'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
            {selectedFile && activeTab === 'code' && (
              <div className="flex items-center space-x-3 ml-6">
                {selectedFile.icon}
                <div>
                  <span className="text-sm font-medium text-white">{selectedFile.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{selectedFile.size}</span>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-white ml-auto mr-4"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'code' ? (
              selectedFile ? (
                <Editor
                  height="100%"
                  language={selectedFile.language || getFileLanguage(selectedFile.name)}
                  value={selectedFile.content || ''}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                  }}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <FileCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No file selected</h3>
                    <p className="text-gray-500">Click on a file in the explorer to view its contents</p>
                  </div>
                </div>
              )
            ) : (
              <PreviewComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;