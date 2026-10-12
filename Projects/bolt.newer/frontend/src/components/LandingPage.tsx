import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Code, 
  Palette, 
  Rocket, 
  ArrowRight, 
  Sparkles,
  Globe,
  Layout,
  Smartphone
} from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const LandingPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    //  const response = await axios.post(`${BACKEND_URL}/template`,{messages : prompt.trim()});
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a unique project ID
    const projectId = Math.random().toString(36).substr(2, 9);
    
    // Navigate to builder with the prompt as state
    navigate(`/builder/${projectId}`, { 
      state: { 
        prompt: prompt.trim(),
        timestamp: Date.now()
      } 
    });
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate complete websites in seconds with AI-powered code generation"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Production-ready code with modern frameworks and best practices"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Design",
      description: "Stunning designs with responsive layouts and smooth animations"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deploy Ready",
      description: "One-click deployment to major hosting platforms"
    }
  ];

  const examples = [
    "A modern e-commerce store for selling vintage clothing",
    "A portfolio website for a photographer with image galleries",
    "A SaaS landing page with pricing tables and testimonials",
    "A restaurant website with online menu and reservation system"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SiteForge</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#examples" className="hover:text-white transition-colors">Examples</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-500/20">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Website Generation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build Websites with
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                Just Words
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Describe your dream website and watch our AI transform your ideas into beautiful, 
              production-ready code in seconds. No technical skills required.
            </p>

            {/* Main Input Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-2">
                  <div className="flex flex-col md:flex-row items-stretch">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your website... (e.g., 'A modern portfolio website for a graphic designer with dark theme and smooth animations')"
                      className="flex-1 bg-transparent text-white placeholder-gray-500 px-6 py-4 rounded-xl resize-none focus:outline-none min-h-[120px] md:min-h-[60px]"
                      rows={1}
                    />
                    <button
                      type="submit"
                      disabled={!prompt.trim() || isGenerating}
                      className="mt-2 md:mt-0 md:ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Building...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Example Prompts */}
            <div className="mb-20">
              <p className="text-gray-500 mb-6">Try these example prompts:</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 text-gray-400 hover:text-white"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose SiteForge?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the future of web development with our cutting-edge AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-400">Websites Generated</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="text-4xl font-bold text-white mb-2">2.5s</div>
                <div className="text-gray-400">Average Generation Time</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SiteForge</span>
            </div>
            <p className="text-gray-500">
              © 2025 SiteForge. Building the future of web development.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;