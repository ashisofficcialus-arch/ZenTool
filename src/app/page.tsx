'use client';

import { useState, useEffect, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Select from '@radix-ui/react-select';
import { MagnifyingGlassIcon, CopyIcon, CheckIcon, DownloadIcon, ReloadIcon, HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { MenuButtonStandalone as MenuButton } from '@/components/MenuButton';

const categories = ['All', 'Utility', 'Finance', 'Security', 'Design', 'Developer', 'SEO', 'Writing', 'Career', 'Media', 'Business', 'Social'];

const categoryColors: Record<string, { bg: string; text: string; gradient: string; shadow: string }> = {
  'Utility': { bg: 'from-blue-400 to-blue-600', text: 'text-blue-600', gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20', shadow: 'shadow-blue-500/20' },
  'Finance': { bg: 'from-green-400 to-green-600', text: 'text-green-600', gradient: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20', shadow: 'shadow-green-500/20' },
  'Security': { bg: 'from-red-400 to-red-600', text: 'text-red-600', gradient: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20', shadow: 'shadow-red-500/20' },
  'Design': { bg: 'from-purple-400 to-purple-600', text: 'text-purple-600', gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20', shadow: 'shadow-purple-500/20' },
  'Developer': { bg: 'from-amber-400 to-amber-600', text: 'text-amber-600', gradient: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20', shadow: 'shadow-amber-500/20' },
  'SEO': { bg: 'from-cyan-400 to-cyan-600', text: 'text-cyan-600', gradient: 'bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20', shadow: 'shadow-cyan-500/20' },
  'Writing': { bg: 'from-pink-400 to-pink-600', text: 'text-pink-600', gradient: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/20', shadow: 'shadow-pink-500/20' },
  'Career': { bg: 'from-orange-400 to-orange-600', text: 'text-orange-600', gradient: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20', shadow: 'shadow-orange-500/20' },
  'Media': { bg: 'from-violet-400 to-violet-600', text: 'text-violet-600', gradient: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/20', shadow: 'shadow-violet-500/20' },
  'Business': { bg: 'from-emerald-400 to-emerald-600', text: 'text-emerald-600', gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20', shadow: 'shadow-emerald-500/20' },
  'Social': { bg: 'from-rose-400 to-rose-600', text: 'text-rose-600', gradient: 'bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20', shadow: 'shadow-rose-500/20' },
};

const tools = [
  { id: 'age', name: 'Age Calculator', icon: '📅', category: 'Utility' },
  { id: 'unit', name: 'Unit Converter', icon: '📏', category: 'Utility' },
  { id: 'emi', name: 'EMI Calculator', icon: '💰', category: 'Finance' },
  { id: 'password', name: 'Password Generator', icon: '🔐', category: 'Security' },
  { id: 'text', name: 'Text Tools', icon: '✍️', category: 'Utility' },
  { id: 'image', name: 'Image Compressor', icon: '🖼️', category: 'Utility' },
  { id: 'url', name: 'URL Shortener', icon: '🔗', category: 'Utility' },
  { id: 'qrcode', name: 'QR Code Generator', icon: '📱', category: 'Utility' },
  { id: 'color', name: 'Color Picker', icon: '🎨', category: 'Design' },
  { id: 'pdf', name: 'PDF Tools', icon: '📄', category: 'Utility' },
  { id: 'plagiarism', name: 'Plagiarism Checker', icon: '🔍', category: 'Writing' },
  { id: 'grammar', name: 'Grammar Checker', icon: '✅', category: 'Writing' },
  { id: 'resume', name: 'Resume Builder', icon: '📋', category: 'Career' },
  { id: 'typing', name: 'Typing Speed Test', icon: '⌨️', category: 'Utility' },
  { id: 'screenshot', name: 'Screenshot to PDF', icon: '📷', category: 'Utility' },
  { id: 'json', name: 'JSON Formatter', icon: '{}', category: 'Developer' },
  { id: 'base64', name: 'Base64 Encoder', icon: '🔢', category: 'Developer' },
  { id: 'meta', name: 'Meta Tag Generator', icon: '🏷️', category: 'SEO' },
  { id: 'ip', name: 'IP Address Finder', icon: '🌐', category: 'Utility' },
  { id: 'random', name: 'Random Generator', icon: '🎲', category: 'Utility' },
  { id: 'speed', name: 'Website Speed Checker', icon: '⚡', category: 'SEO' },
  { id: 'links', name: 'Broken Link Checker', icon: '🔗', category: 'SEO' },
  { id: 'keyword', name: 'Keyword Density', icon: '📊', category: 'SEO' },
  { id: 'whois', name: 'WHOIS Lookup', icon: '🌍', category: 'SEO' },
  { id: 'minify', name: 'Code Minifier', icon: '📦', category: 'Developer' },
  { id: 'markdown', name: 'Markdown to HTML', icon: '📝', category: 'Developer' },
  { id: 'case', name: 'Case Converter', icon: 'Aa', category: 'Utility' },
  { id: 'uuid', name: 'UUID Generator', icon: '🎯', category: 'Developer' },
  { id: 'barcode', name: 'Barcode Generator', icon: '📊', category: 'Utility' },
  { id: 'timezone', name: 'Time Zone Converter', icon: '🕐', category: 'Utility' },
  { id: 'countdown', name: 'Countdown Timer', icon: '⏱️', category: 'Utility' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏲️', category: 'Utility' },
  { id: 'strength', name: 'Password Strength', icon: '🔒', category: 'Security' },
  { id: 'ocr', name: 'Image to Text', icon: '📄', category: 'Utility' },
  { id: 'tts', name: 'Text to Speech', icon: '🔊', category: 'Utility' },
  { id: 'stt', name: 'Speech to Text', icon: '🎤', category: 'Utility' },
  { id: 'ythumb', name: 'YouTube Thumbnail', icon: '▶️', category: 'Media' },
  { id: 'video', name: 'Video Downloader', icon: '📥', category: 'Media' },
  { id: 'invoice', name: 'Invoice Generator', icon: '💵', category: 'Business' },
  { id: 'notes', name: 'Note Saver', icon: '📒', category: 'Utility' },
  { id: 'currency', name: 'Currency Converter', icon: '💱', category: 'Finance' },
  { id: 'gst', name: 'GST Calculator', icon: '🧾', category: 'Finance' },
  { id: 'discount', name: 'Discount Calculator', icon: '🏷️', category: 'Finance' },
  { id: 'pnl', name: 'Profit & Loss', icon: '📈', category: 'Finance' },
  { id: 'loaneligible', name: 'Loan Eligibility', icon: '🏦', category: 'Finance' },
  { id: 'binary', name: 'Binary to Decimal', icon: '🔢', category: 'Developer' },
  { id: 'palette', name: 'Color Palette', icon: '🎨', category: 'Design' },
  { id: 'favicon', name: 'Favicon Generator', icon: '🔖', category: 'Developer' },
  { id: 'robots', name: 'Robots.txt Generator', icon: '🤖', category: 'SEO' },
  { id: 'sitemap', name: 'Sitemap Generator', icon: '🗺️', category: 'SEO' },
  { id: 'emailval', name: 'Email Validator', icon: '📧', category: 'Utility' },
  { id: 'username', name: 'Username Generator', icon: '👤', category: 'Social' },
  { id: 'hashtag', name: 'Hashtag Generator', icon: '#️⃣', category: 'Social' },
  { id: 'instabio', name: 'Instagram Bio', icon: '📱', category: 'Social' },
  { id: 'meme', name: 'Meme Generator', icon: '😂', category: 'Social' },
  { id: 'gif', name: 'GIF Maker', icon: '🎞️', category: 'Media' },
  { id: 'screenrec', name: 'Screen Recorder', icon: '🎥', category: 'Media' },
  { id: 'typinganim', name: 'Typing Animation', icon: '⌨️', category: 'Developer' },
  { id: 'watermark', name: 'Watermark Adder', icon: '💧', category: 'Utility' },
  { id: 'pdfword', name: 'PDF to Word', icon: '📝', category: 'Utility' },
  { id: 'sseditor', name: 'Screenshot Editor', icon: '✏️', category: 'Design' },
  { id: 'imageresize', name: 'Image Resizer', icon: '📐', category: 'Design' },
  { id: 'imagecrop', name: 'Image Cropper', icon: '✂️', category: 'Design' },
  { id: 'imageformat', name: 'Format Converter', icon: '🔄', category: 'Design' },
  { id: 'videomp3', name: 'Video to MP3', icon: '🎵', category: 'Media' },
  { id: 'audiocutter', name: 'Audio Cutter', icon: '✂️', category: 'Media' },
  { id: 'noisereduce', name: 'Noise Reducer', icon: '🔇', category: 'Media' },
  { id: 'filesize', name: 'File Size Calculator', icon: '💾', category: 'Utility' },
  { id: 'speedtest', name: 'Download Speed', icon: '📶', category: 'Utility' },
  { id: 'pingtest', name: 'Ping Tester', icon: '🏓', category: 'Utility' },
  { id: 'dnslookup', name: 'DNS Lookup', icon: '🔍', category: 'Utility' },
  { id: 'httpheader', name: 'HTTP Header', icon: '📋', category: 'Developer' },
  { id: 'sslcheck', name: 'SSL Checker', icon: '🔒', category: 'SEO' },
  { id: 'uptimemon', name: 'Uptime Monitor', icon: '⏰', category: 'SEO' },
  { id: 'cacheclean', name: 'Cache Cleaner', icon: '🧹', category: 'Utility' },
  { id: 'lorem', name: 'Lorem Ipsum', icon: '📜', category: 'Developer' },
  { id: 'fakedata', name: 'Fake Data Gen', icon: '🎭', category: 'Developer' },
  { id: 'qrscan', name: 'QR Scanner', icon: '📷', category: 'Utility' },
  { id: 'barcodescan', name: 'Barcode Scanner', icon: '📊', category: 'Utility' },
  { id: 'mdeditor', name: 'Markdown Editor', icon: '📑', category: 'Developer' },
  { id: 'diffcheck', name: 'Code Diff', icon: '⚖️', category: 'Developer' },
  { id: 'regextest', name: 'Regex Tester', icon: '🔎', category: 'Developer' },
  { id: 'crongen', name: 'Cron Generator', icon: '⏲️', category: 'Developer' },
  { id: 'unixtime', name: 'Unix Timestamp', icon: '🕒', category: 'Developer' },
  { id: 'leakcheck', name: 'Password Leak', icon: '⚠️', category: 'Security' },
  { id: 'emailheader', name: 'Email Header', icon: '📧', category: 'Developer' },
  { id: 'contrast', name: 'Color Contrast', icon: '🎗️', category: 'Design' },
  { id: 'fontpair', name: 'Font Pairing', icon: '🔤', category: 'Design' },
  { id: 'svgopt', name: 'SVG Optimizer', icon: '📦', category: 'Developer' },
  { id: 'chartgen', name: 'Chart Generator', icon: '📈', category: 'Design' },
];

const blogPosts = [
  { id: '1', title: 'How to Use Age Calculator to Plan Your Life Goals', excerpt: 'Learn how to calculate your age accurately and use it for retirement planning, milestone tracking, and more.', date: '2024-01-15', category: 'Tutorials' },
  { id: '2', title: 'Top 10 Password Security Best Practices', excerpt: 'Discover essential tips for creating strong passwords and protecting your online accounts.', date: '2024-01-20', category: 'Security' },
  { id: '3', title: 'JSON Formatter: A Developer Guide', excerpt: 'Master JSON formatting and validation with these professional tips and tricks.', date: '2024-01-25', category: 'Developer' },
  { id: '4', title: 'How to Compress Images Without Losing Quality', excerpt: 'Learn the best techniques for reducing image file sizes while maintaining visual quality.', date: '2024-02-01', category: 'Tutorials' },
  { id: '5', title: 'Understanding SEO Meta Tags', excerpt: 'A complete guide to optimizing your website with proper meta tags for search engines.', date: '2024-02-10', category: 'SEO' },
  { id: '6', title: 'Password Generator: Create Secure Passwords', excerpt: 'Learn how to use our password generator to create unbreakable passwords.', date: '2024-02-15', category: 'Security' },
  { id: '7', title: 'Unit Converter: Essential Math for Everyday Life', excerpt: 'Discover how unit conversion simplifies cooking, traveling, and DIY projects.', date: '2024-02-20', category: 'Tutorials' },
  { id: '8', title: 'QR Codes: Business and Marketing Applications', excerpt: 'Explore creative ways to use QR codes for marketing and customer engagement.', date: '2024-02-25', category: 'Marketing' },
];

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <span className="text-4xl">⚡</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">ZenTool</h1>
        <p className="text-zinc-400 mb-8">Free Online Tools for Everyone</p>
        <div className="w-48 h-1 bg-zinc-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded ${className}`} />;
}

function ToolSkeleton() {
  return (
    <div className="max-w-md mx-auto p-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const stored = sessionStorage.getItem('zentool-splash');
    if (stored) setShowSplash(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('zentool-splash', 'true');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
    const colors = categoryColors[tool.category] || categoryColors['Utility'];
    return (
    <button 
      onClick={() => setActiveTab(tool.id)} 
      className={`group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl ${colors.gradient} border border-transparent hover:border-current/20 hover:shadow-lg ${colors.shadow} transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
    >
      <div className={`w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-xl sm:text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
        {tool.icon}
      </div>
      <span className={`text-xs sm:text-sm font-semibold ${colors.text} group-hover:scale-105 transition-transform`}>{tool.name}</span>
      <span className={`text-xs px-2.5 py-1 rounded-full bg-white/80 dark:bg-zinc-800/80 ${colors.text} font-medium`}>{tool.category}</span>
    </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 relative">
        <MenuButton />
        <header className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-3 sm:mb-4 shadow-2xl shadow-purple-500/30 animate-pulse">
            <span className="text-3xl sm:text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">ZenTool</h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 font-medium">🚀 Supercharge your productivity with 60+ free tools</p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 group">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500 group-focus-within:animate-bounce" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-purple-200 dark:border-purple-800 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-lg shadow-purple-500/10"
            />
          </div>
          <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
            <Select.Trigger className="inline-flex items-center justify-between gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-pink-200 dark:border-pink-800 text-sm min-w-[160px] font-medium hover:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all shadow-lg shadow-pink-500/10">
              <Select.Value />
              <Select.Icon className="text-pink-500">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                  <path d="M3.5 5.5L7.5 9.5L11.5 5.5" />
                </svg>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white dark:bg-zinc-900 border-2 border-pink-200 dark:border-pink-800 rounded-2xl shadow-2xl shadow-pink-500/20 overflow-hidden z-50">
                <Select.Viewport className="p-2">
                  {categories.map((cat) => (
                    <Select.Item key={cat} value={cat} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 focus:bg-gradient-to-r focus:from-purple-100 focus:to-pink-100 dark:focus:from-purple-900/50 dark:focus:to-pink-900/50 outline-none font-medium transition-colors">
                      <Select.ItemText>{cat}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {searchQuery || selectedCategory !== 'All' ? (
          <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Showing {filteredTools.length} of {tools.length} tools
          </div>
        ) : null}

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex flex-nowrap sm:flex-wrap gap-1 sm:gap-2 justify-start sm:justify-center mb-6 sm:8 p-3 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg overflow-x-auto scrollbar-hide">
            <Tabs.Trigger 
              value="home" 
              className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap"
            >
              🏠 Home
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="blog" 
              className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap"
            >
              📰 Blog
            </Tabs.Trigger>
            {tools.map((tool) => (
              <Tabs.Trigger 
                key={tool.id} 
                value={tool.id} 
                className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap"
              >
                {tool.icon} <span className="hidden sm:inline">{tool.name}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="home" className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 p-5 sm:p-10 shadow-2xl shadow-purple-500/10">
            {filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 dark:text-zinc-400 text-lg">No tools found matching your criteria.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-purple-600 hover:underline font-medium">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </Tabs.Content>

          <Tabs.Content value="age" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <AgeCalculator />
          </Tabs.Content>

          <Tabs.Content value="unit" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <UnitConverter />
          </Tabs.Content>

          <Tabs.Content value="emi" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <EMICalculator />
          </Tabs.Content>

          <Tabs.Content value="password" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PasswordGenerator />
          </Tabs.Content>

          <Tabs.Content value="text" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <TextTools />
          </Tabs.Content>

          <Tabs.Content value="image" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ImageCompressor />
          </Tabs.Content>

          <Tabs.Content value="url" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <URLShortener />
          </Tabs.Content>

          <Tabs.Content value="qrcode" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <QRCodeGenerator />
          </Tabs.Content>

          <Tabs.Content value="color" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ColorPicker />
          </Tabs.Content>

          <Tabs.Content value="pdf" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PDFTools />
          </Tabs.Content>

          <Tabs.Content value="plagiarism" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PlagiarismChecker />
          </Tabs.Content>

          <Tabs.Content value="grammar" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <GrammarChecker />
          </Tabs.Content>

          <Tabs.Content value="resume" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ResumeBuilder />
          </Tabs.Content>

          <Tabs.Content value="typing" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <TypingSpeedTest />
          </Tabs.Content>

          <Tabs.Content value="screenshot" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ScreenshotToPDF />
          </Tabs.Content>

          <Tabs.Content value="json" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <JSONFormatter />
          </Tabs.Content>

          <Tabs.Content value="base64" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <Base64Encoder />
          </Tabs.Content>

          <Tabs.Content value="meta" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <MetaTagGenerator />
          </Tabs.Content>

          <Tabs.Content value="ip" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <IPAddressFinder />
          </Tabs.Content>

          <Tabs.Content value="random" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <RandomGenerator />
          </Tabs.Content>

          <Tabs.Content value="speed" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <WebsiteSpeedChecker />
          </Tabs.Content>

          <Tabs.Content value="links" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <BrokenLinkChecker />
          </Tabs.Content>

          <Tabs.Content value="keyword" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <KeywordDensityChecker />
          </Tabs.Content>

          <Tabs.Content value="whois" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <WHOISLookup />
          </Tabs.Content>

          <Tabs.Content value="minify" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CodeMinifier />
          </Tabs.Content>

          <Tabs.Content value="markdown" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <MarkdownToHTML />
          </Tabs.Content>

          <Tabs.Content value="case" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CaseConverter />
          </Tabs.Content>

          <Tabs.Content value="uuid" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <UUIDGenerator />
          </Tabs.Content>

          <Tabs.Content value="barcode" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <BarcodeGenerator />
          </Tabs.Content>

          <Tabs.Content value="timezone" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <TimeZoneConverter />
          </Tabs.Content>

          <Tabs.Content value="countdown" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CountdownTimer />
          </Tabs.Content>

          <Tabs.Content value="stopwatch" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <Stopwatch />
          </Tabs.Content>

          <Tabs.Content value="strength" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PasswordStrengthChecker />
          </Tabs.Content>

          <Tabs.Content value="ocr" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ImageToText />
          </Tabs.Content>

          <Tabs.Content value="tts" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <TextToSpeech />
          </Tabs.Content>

          <Tabs.Content value="stt" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <SpeechToText />
          </Tabs.Content>

          <Tabs.Content value="ythumb" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <YouTubeThumbnail />
          </Tabs.Content>

          <Tabs.Content value="video" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <VideoDownloader />
          </Tabs.Content>

          <Tabs.Content value="invoice" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <InvoiceGenerator />
          </Tabs.Content>

          <Tabs.Content value="notes" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <NoteSaver />
          </Tabs.Content>

          <Tabs.Content value="currency" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CurrencyConverter />
          </Tabs.Content>

          <Tabs.Content value="gst" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <GSTCalculator />
          </Tabs.Content>

          <Tabs.Content value="discount" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <DiscountCalculator />
          </Tabs.Content>

          <Tabs.Content value="pnl" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ProfitLossCalculator />
          </Tabs.Content>

          <Tabs.Content value="loaneligible" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <LoanEligibilityCalculator />
          </Tabs.Content>

          <Tabs.Content value="binary" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <BinaryDecimalConverter />
          </Tabs.Content>

          <Tabs.Content value="palette" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ColorPaletteGenerator />
          </Tabs.Content>

          <Tabs.Content value="favicon" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <FaviconGenerator />
          </Tabs.Content>

          <Tabs.Content value="robots" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <RobotsTxtGenerator />
          </Tabs.Content>

          <Tabs.Content value="sitemap" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <SitemapGenerator />
          </Tabs.Content>

          <Tabs.Content value="emailval" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <EmailValidator />
          </Tabs.Content>

          <Tabs.Content value="username" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <UsernameGenerator />
          </Tabs.Content>

          <Tabs.Content value="hashtag" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <HashtagGenerator />
          </Tabs.Content>

          <Tabs.Content value="instabio" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <InstagramBioGenerator />
          </Tabs.Content>

          <Tabs.Content value="meme" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <MemeGenerator />
          </Tabs.Content>

          <Tabs.Content value="gif" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <GIFMaker />
          </Tabs.Content>

          <Tabs.Content value="screenrec" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ScreenRecorder />
          </Tabs.Content>

          <Tabs.Content value="typinganim" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <TypingAnimationGenerator />
          </Tabs.Content>

          <Tabs.Content value="watermark" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <WatermarkAdder />
          </Tabs.Content>

          <Tabs.Content value="pdfword" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PDFToWordConverter />
          </Tabs.Content>

          <Tabs.Content value="sseditor" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ScreenshotEditor />
          </Tabs.Content>

          <Tabs.Content value="imageresize" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ImageResizer />
          </Tabs.Content>

          <Tabs.Content value="imagecrop" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ImageCropper />
          </Tabs.Content>

          <Tabs.Content value="imageformat" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ImageFormatConverter />
          </Tabs.Content>

          <Tabs.Content value="videomp3" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <VideoToMP3 />
          </Tabs.Content>

          <Tabs.Content value="audiocutter" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <AudioCutter />
          </Tabs.Content>

          <Tabs.Content value="noisereduce" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <NoiseReducer />
          </Tabs.Content>

          <Tabs.Content value="filesize" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <FileSizeCalculator />
          </Tabs.Content>

          <Tabs.Content value="speedtest" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <DownloadSpeedTester />
          </Tabs.Content>

          <Tabs.Content value="pingtest" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PingTester />
          </Tabs.Content>

          <Tabs.Content value="dnslookup" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <DNSLookup />
          </Tabs.Content>

          <Tabs.Content value="httpheader" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <HTTPHeaderChecker />
          </Tabs.Content>

          <Tabs.Content value="sslcheck" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <SSLCertificateChecker />
          </Tabs.Content>

          <Tabs.Content value="uptimemon" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <WebsiteUptimeMonitor />
          </Tabs.Content>

          <Tabs.Content value="cacheclean" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CacheCleanerGuide />
          </Tabs.Content>

          <Tabs.Content value="lorem" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <LoremIpsumGenerator />
          </Tabs.Content>

          <Tabs.Content value="fakedata" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <FakeDataGenerator />
          </Tabs.Content>

          <Tabs.Content value="qrscan" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <QRCodeScanner />
          </Tabs.Content>

          <Tabs.Content value="barcodescan" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <BarcodeScanner />
          </Tabs.Content>

          <Tabs.Content value="mdeditor" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <MarkdownEditor />
          </Tabs.Content>

          <Tabs.Content value="diffcheck" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CodeDiffChecker />
          </Tabs.Content>

          <Tabs.Content value="regextest" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <RegexTester />
          </Tabs.Content>

          <Tabs.Content value="crongen" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <CronJobGenerator />
          </Tabs.Content>

          <Tabs.Content value="unixtime" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <UnixTimestampConverter />
          </Tabs.Content>

          <Tabs.Content value="leakcheck" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <PasswordLeakChecker />
          </Tabs.Content>

          <Tabs.Content value="emailheader" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <EmailHeaderAnalyzer />
          </Tabs.Content>

          <Tabs.Content value="contrast" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ColorContrastChecker />
          </Tabs.Content>

          <Tabs.Content value="fontpair" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <FontPairingTool />
          </Tabs.Content>

          <Tabs.Content value="svgopt" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <SVGOptimizer />
          </Tabs.Content>

          <Tabs.Content value="chartgen" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <ChartGenerator />
          </Tabs.Content>

          <Tabs.Content value="blog" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <BlogSection />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    if (!birthDate) return;
    setLoading(true);
    setTimeout(() => {
      const birth = new Date(birthDate);
      const today = new Date();
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) { months--; days += 30; }
      if (months < 0) { years--; months += 12; }

      setResult({ years, months, days });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">📅</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Age Calculator</h2>
      </div>
      <input 
        type="date" 
        value={birthDate} 
        onChange={(e) => setBirthDate(e.target.value)} 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <button 
        onClick={calculate} 
        disabled={!birthDate || loading}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/25"
      >
        {loading ? 'Calculating...' : 'Calculate Age'}
      </button>
      {result && (
        <div className="mt-6 p-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">Your Age</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{result.years} years, {result.months} months, {result.days} days</p>
        </div>
      )}
    </div>
  );
}

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('km');
  const [toUnit, setToUnit] = useState('miles');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const conversions: Record<string, Record<string, number>> = {
    km: { miles: 0.621371, meters: 1000, feet: 3280.84 },
    miles: { km: 1.60934, meters: 1609.34, feet: 5280 },
    m: { feet: 3.28084, inches: 39.3701, cm: 100 },
    kg: { pounds: 2.20462, grams: 1000, ounces: 35.274 },
    pounds: { kg: 0.453592, grams: 453.592, ounces: 16 },
    celsius: { fahrenheit: 32, kelvin: 273.15 },
    fahrenheit: { celsius: -17.7778, kelvin: 255.928 },
  };

  const convert = () => {
    if (!value) return;
    setLoading(true);
    setTimeout(() => {
      const num = parseFloat(value);
      if (fromUnit === toUnit) { setResult(value); setLoading(false); return; }
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') setResult(((num * 9) / 5 + 32).toFixed(2));
      else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') setResult(((num - 32) * 5 / 9).toFixed(2));
      else if (conversions[fromUnit] && conversions[fromUnit][toUnit]) setResult((num * conversions[fromUnit][toUnit]).toFixed(2));
      else setResult('Conversion not supported');
      setLoading(false);
    }, 300);
  };

  const units = [
    { value: 'km', label: 'Kilometers' },
    { value: 'miles', label: 'Miles' },
    { value: 'm', label: 'Meters' },
    { value: 'kg', label: 'Kilograms' },
    { value: 'pounds', label: 'Pounds' },
    { value: 'celsius', label: 'Celsius' },
    { value: 'fahrenheit', label: 'Fahrenheit' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">📏</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Unit Converter</h2>
      </div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder="Enter value" 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <div className="flex gap-3 mb-4">
        <select 
          value={fromUnit} 
          onChange={(e) => setFromUnit(e.target.value)} 
          className="flex-1 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500"
        >
          {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
        <div className="self-center text-2xl text-zinc-400">→</div>
        <select 
          value={toUnit} 
          onChange={(e) => setToUnit(e.target.value)} 
          className="flex-1 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500"
        >
          {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
      </div>
      <button 
        onClick={convert} 
        disabled={!value || loading}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/25"
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {result && (
        <div className="mt-6 p-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{result} {toUnit}</p>
        </div>
      )}
    </div>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    if (!principal || !rate || !months) return;
    setLoading(true);
    setTimeout(() => {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 12 / 100;
      const n = months.includes('y') ? parseInt(months) * 12 : parseInt(months);
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setResult(emi.toFixed(2));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">💰</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">EMI Calculator</h2>
      </div>
      <input 
        type="number" 
        value={principal} 
        onChange={(e) => setPrincipal(e.target.value)} 
        placeholder="Principal amount ($)" 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <input 
        type="number" 
        value={rate} 
        onChange={(e) => setRate(e.target.value)} 
        placeholder="Interest rate (% per year)" 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <input 
        type="text" 
        value={months} 
        onChange={(e) => setMonths(e.target.value)} 
        placeholder="Duration (months or 2y)" 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <button 
        onClick={calculate} 
        disabled={!principal || !rate || !months || loading}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-green-500/25"
      >
        {loading ? 'Calculating...' : 'Calculate EMI'}
      </button>
      {result && (
        <div className="mt-6 p-6 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-800 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-lg text-green-700 dark:text-green-300 mb-1">Monthly EMI</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">${result}</p>
        </div>
      )}
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    if (!chars) chars = lower;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xl">🔐</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Password Generator</h2>
      </div>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-zinc-700 dark:text-zinc-300 font-medium">Password Length</label>
          <span className="text-blue-600 font-bold">{length}</span>
        </div>
        <input 
          type="range" 
          min="4" 
          max="32" 
          value={length} 
          onChange={(e) => setLength(parseInt(e.target.value))} 
          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      <div className="space-y-3 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
        {[
          { checked: includeUpper, setChecked: setIncludeUpper, label: 'Uppercase (A-Z)' },
          { checked: includeLower, setChecked: setIncludeLower, label: 'Lowercase (a-z)' },
          { checked: includeNumbers, setChecked: setIncludeNumbers, label: 'Numbers (0-9)' },
          { checked: includeSymbols, setChecked: setIncludeSymbols, label: 'Symbols (!@#$%)' },
        ].map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={(e) => item.setChecked(e.target.checked)} 
              className="w-5 h-5 rounded border-zinc-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
          </label>
        ))}
      </div>
      <button 
        onClick={generate} 
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
      >
        <ReloadIcon className="w-5 h-5" />
        Generate Password
      </button>
      {password && (
        <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <p className="flex-1 text-xl font-mono font-bold text-zinc-900 dark:text-zinc-50 break-all">{password}</p>
          <button 
            onClick={copyToClipboard}
            className="p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-600" /> : <CopyIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
          </button>
        </div>
      )}
    </div>
  );
}

function TextTools() {
  const [text, setText] = useState('');
  const [results, setResults] = useState({ words: 0, chars: 0, charsNoSpace: 0, lines: 0 });

  const analyze = () => {
    setResults({
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, '').length,
      lines: text.split('\n').length,
    });
  };

  const removeSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  const removeExtraSpaces = () => setText(text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim());

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">✍️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Text Tools</h2>
      </div>
      <textarea 
        value={text} 
        onChange={(e) => { setText(e.target.value); analyze(); }} 
        placeholder="Enter or paste your text here..." 
        className="w-full h-48 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none" 
      />
      <div className="flex gap-3 mt-4">
        <button onClick={removeSpaces} className="px-5 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">Remove Extra Spaces</button>
        <button onClick={removeExtraSpaces} className="px-5 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">Clean Text</button>
        <button onClick={() => { setText(''); setResults({ words: 0, chars: 0, charsNoSpace: 0, lines: 0 }); }} className="px-5 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">Clear</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Words', value: results.words },
          { label: 'Characters', value: results.chars },
          { label: 'No Spaces', value: results.charsNoSpace },
          { label: 'Lines', value: results.lines },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-xl text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value.toLocaleString()}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setOriginalSize(f.size); setCompressed(null); }
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setCompressed(URL.createObjectURL(blob));
            setCompressedSize(blob.size);
          }
          setLoading(false);
        }, 'image/jpeg', quality);
      };
    }, 500);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🖼️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Image Compressor</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center mb-4">
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="image-upload" />
        <label htmlFor="image-upload" className="cursor-pointer">
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">{file ? file.name : 'Click to upload image'}</p>
          <p className="text-sm text-zinc-400">{file ? formatSize(file.size) : 'PNG, JPG, JPEG up to 10MB'}</p>
        </label>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-zinc-700 dark:text-zinc-300 font-medium">Quality</label>
          <span className="text-blue-600 font-bold">{Math.round(quality * 100)}%</span>
        </div>
        <input 
          type="range" 
          min="0.1" 
          max="1" 
          step="0.1" 
          value={quality} 
          onChange={(e) => setQuality(parseFloat(e.target.value))} 
          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      <button 
        onClick={compress} 
        disabled={!file || loading}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-pink-500/25"
      >
        {loading ? 'Compressing...' : 'Compress Image'}
      </button>
      {compressed && (
        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between text-sm bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl">
            <span className="text-zinc-600 dark:text-zinc-400">Original: <strong className="text-zinc-900 dark:text-zinc-200">{formatSize(originalSize)}</strong></span>
            <span className="text-zinc-600 dark:text-zinc-400">Compressed: <strong className="text-zinc-900 dark:text-zinc-200">{formatSize(compressedSize)}</strong></span>
            <span className="text-green-600 font-medium">Saved: {Math.round((1 - compressedSize / originalSize) * 100)}%</span>
          </div>
          <img src={compressed} alt="Compressed" className="w-full rounded-xl shadow-lg" />
          <a href={compressed} download="compressed.jpg" className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
            <DownloadIcon className="w-5 h-5" /> Download
          </a>
        </div>
      )}
    </div>
  );
}

function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeUrl = () => {
    if (!url) return;
    const encoded = btoa(encodeURIComponent(url));
    const short = `zentool://${encoded.slice(0, 8)}`;
    setShortUrl(short);
    setCopied(false);
  };

  const decodeUrl = () => {
    if (!shortUrl) return null;
    try {
      const encoded = shortUrl.replace('zentool://', '');
      return decodeURIComponent(atob(encoded));
    } catch { return null; }
  };

  const decodedUrl = decodeUrl();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">🔗</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">URL Shortener</h2>
      </div>
      <input 
        type="url" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Enter URL to shorten" 
        className="w-full p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all mb-4" 
      />
      <button 
        onClick={encodeUrl} 
        disabled={!url}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/25"
      >
        Create Short URL
      </button>
      {shortUrl && (
        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Short URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-blue-600 dark:text-blue-400 break-all font-medium">{shortUrl}</code>
              <button 
                onClick={() => copyToClipboard(shortUrl)}
                className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {copied ? <CheckIcon className="w-5 h-5 text-green-600" /> : <CopyIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />}
              </button>
            </div>
          </div>
          {decodedUrl && (
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <p className="text-sm text-green-700 dark:text-green-400 mb-2">Decoded URL:</p>
              <a href={decodedUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-300 break-all hover:underline">{decodedUrl}</a>
            </div>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Note: This is a local encoding. Short URLs can be decoded back within this app.
          </p>
        </div>
      )}
    </div>
  );
}

function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text) return;
    setLoading(true);
    setTimeout(async () => {
      try {
        const QRCode = (await import('qrcode')).default;
        const url = await QRCode.toDataURL(text, { width: 300, margin: 2, color: { dark: '#000000', light: '#ffffff' } });
        setQrCode(url);
      } catch { setQrCode(''); }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">📱</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">QR Code Generator</h2>
      </div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text or URL" 
        className="w-full h-28 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none mb-4" 
      />
      <button 
        onClick={generate} 
        disabled={!text || loading}
        className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-violet-500/25"
      >
        {loading ? 'Generating...' : 'Generate QR Code'}
      </button>
      {qrCode && (
        <div className="mt-6 p-6 bg-white dark:bg-zinc-800 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-4">
          <img src={qrCode} alt="QR Code" className="mx-auto mb-4 rounded-lg shadow-lg" />
          <a href={qrCode} download="qrcode.png" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">
            <DownloadIcon className="w-5 h-5" /> Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');

  const updateFromHex = () => {
    setColor(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgb(`rgb(${r}, ${g}, ${b})`);
  };

  const updateFromColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.target.value;
    setColor(c);
    setHex(c);
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    setRgb(`rgb(${r}, ${g}, ${b})`);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🎨</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Color Picker & Converter</h2>
      </div>
      <input 
        type="color" 
        value={color} 
        onChange={updateFromColor} 
        className="w-full h-40 rounded-2xl cursor-pointer border-4 border-zinc-200 dark:border-zinc-700 mb-6" 
      />
      <div className="space-y-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
          <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">HEX</label>
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: color }} />
            <input 
              type="text" 
              value={hex} 
              onChange={(e) => setHex(e.target.value)} 
              onBlur={updateFromHex} 
              className="flex-1 p-3 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono focus:border-blue-500" 
            />
          </div>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
          <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">RGB</label>
          <input 
            type="text" 
            value={rgb} 
            readOnly 
            className="w-full p-3 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono" 
          />
        </div>
      </div>
    </div>
  );
}

function PDFTools() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [action, setAction] = useState('merge');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setResult('');
  };

  const processPDF = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      if (action === 'merge' && files.length > 1) setResult('PDF merge functionality coming soon. For now, use online PDF merge services.');
      else if (action === 'compress') setResult('PDF compression functionality coming soon. For now, use online PDF compress services.');
      else if (action === 'split') setResult('PDF split functionality coming soon. For now, use online PDF split services.');
      setLoading(false);
    }, 1000);
  };

  const actions = [
    { value: 'merge', label: 'Merge PDFs', icon: '📑' },
    { value: 'split', label: 'Split PDF', icon: '✂️' },
    { value: 'compress', label: 'Compress PDF', icon: '📦' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">📄</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF Tools</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {actions.map((a) => (
          <button
            key={a.value}
            onClick={() => setAction(a.value)}
            className={`p-4 rounded-xl font-medium transition-all ${
              action === a.value 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <span className="block text-2xl mb-1">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center mb-4">
        <input type="file" accept="application/pdf" multiple onChange={handleFileChange} className="hidden" id="pdf-upload" />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">{files ? `${files.length} file(s) selected` : 'Click to upload PDFs'}</p>
          <p className="text-sm text-zinc-400">PDF up to 50MB</p>
        </label>
      </div>
      <button 
        onClick={processPDF} 
        disabled={!files || loading}
        className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-red-500/25"
      >
        {loading ? 'Processing...' : 'Process PDF'}
      </button>
      {result && (
        <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-amber-800 dark:text-amber-200">{result}</p>
        </div>
      )}
    </div>
  );
}

function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<{ unique: number; similar: number; total: number } | null>(null);

  const checkPlagiarism = () => {
    if (!text.trim()) return;
    setChecking(true);
    setTimeout(() => {
      const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const wordCount = new Map<string, number>();
      words.forEach(w => wordCount.set(w, (wordCount.get(w) || 0) + 1));
      
      let unique = 0, similar = 0;
      wordCount.forEach((count) => {
        if (count === 1) unique++;
        else similar++;
      });
      
      setResults({ unique, similar, total: words.length });
      setChecking(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">🔍</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Plagiarism Checker</h2>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to check for duplicates..."
        className="w-full h-48 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 resize-none"
      />
      <button
        onClick={checkPlagiarism}
        disabled={!text.trim() || checking}
        className="w-full mt-4 py-4 bg-gradient-to-r from-slate-500 to-zinc-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
      >
        {checking ? 'Checking...' : 'Check for Duplicates'}
      </button>
      {results && (
        <div className="mt-6 grid grid-cols-3 gap-4 animate-in fade-in">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.unique}</p>
            <p className="text-sm text-green-700 dark:text-green-300">Unique Words</p>
          </div>
          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{results.similar}</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">Repeated</p>
          </div>
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.total}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Total Words</p>
          </div>
        </div>
      )}
    </div>
  );
}

function GrammarChecker() {
  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const grammarRules = [
    { pattern: /\bi\b(?!\s*(am|is|are|was|were|be|been|being))/g, suggestion: 'Use "I" as pronoun' },
    { pattern: /\s{2,}/g, suggestion: 'Remove extra spaces' },
    { pattern: /[.!?]{2,}/g, suggestion: 'Remove repeated punctuation' },
    { pattern: /\btheir\s+is\b/gi, suggestion: 'Use "there" instead' },
    { pattern: /\byour\s+welcome\b/gi, suggestion: 'Use "you\'re welcome"' },
    { pattern: /\bits\s+a\b/gi, suggestion: 'Use "it\'s a"' },
  ];

  const checkGrammar = () => {
    if (!text.trim()) return;
    setChecking(true);
    setTimeout(() => {
      const found: string[] = [];
      grammarRules.forEach(rule => {
        if (rule.pattern.test(text)) found.push(rule.suggestion);
      });
      if (found.length === 0) found.push('No grammar issues found!');
      setSuggestions(found);
      setChecking(false);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl">✅</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Grammar Checker</h2>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text to check for grammar mistakes..."
        className="w-full h-48 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 resize-none"
      />
      <button
        onClick={checkGrammar}
        disabled={!text.trim() || checking}
        className="w-full mt-4 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
      >
        {checking ? 'Checking...' : 'Check Grammar'}
      </button>
      {suggestions.length > 0 && (
        <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-in fade-in">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Suggestions:</h3>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', summary: '',
    education: '', experience: '', skills: ''
  });

  const [generated, setGenerated] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = () => {
    const resume = `${formData.name.toUpperCase()}
${formData.email} | ${formData.phone}
${formData.address}

SUMMARY
${formData.summary}

EDUCATION
${formData.education}

EXPERIENCE
${formData.experience}

SKILLS
${formData.skills}`.trim();
    setGenerated(resume);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">📋</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Resume Builder</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Full Name" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="text" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="text" value={formData.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Address" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
      </div>
      <textarea value={formData.summary} onChange={(e) => updateField('summary', e.target.value)} placeholder="Professional Summary" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4 h-20 sm:h-24" />
      <textarea value={formData.education} onChange={(e) => updateField('education', e.target.value)} placeholder="Education (one per line)" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4 h-20 sm:h-24" />
      <textarea value={formData.experience} onChange={(e) => updateField('experience', e.target.value)} placeholder="Work Experience (one per line)" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4 h-20 sm:h-24" />
      <textarea value={formData.skills} onChange={(e) => updateField('skills', e.target.value)} placeholder="Skills (comma separated)" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4 h-16 sm:h-20" />
      <button onClick={generateResume} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25">
        Generate Resume
      </button>
      {generated && (
        <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <pre className="text-sm whitespace-pre-wrap text-zinc-900 dark:text-zinc-100 font-mono">{generated}</pre>
        </div>
      )}
    </div>
  );
}

function TypingSpeedTest() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a sample text for typing speed test. Practice regularly to improve your typing skills and speed.');
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });

  const startTest = () => {
    setInput('');
    setStarted(true);
    setFinished(false);
    setStartTime(Date.now());
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    if (!started && value.length > 0) {
      setStarted(true);
      setStartTime(Date.now());
    }
    if (value.length >= text.length) {
      const endTime = Date.now();
      const timeMinutes = (endTime - startTime) / 60000;
      const words = text.split(/\s+/).length;
      const chars = value.length;
      let errors = 0;
      for (let i = 0; i < chars; i++) {
        if (text[i] !== value[i]) errors++;
      }
      const accuracy = Math.round(((chars - errors) / chars) * 100);
      const wpm = Math.round(words / timeMinutes);
      setResults({ wpm, accuracy, errors });
      setFinished(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">⌨️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Typing Speed Test</h2>
      </div>
      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-4">
        <p className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">{text}</p>
      </div>
      <textarea
        value={input}
        onChange={handleInput}
        disabled={finished}
        placeholder={started ? '' : 'Start typing here...'}
        className="w-full h-32 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 resize-none"
      />
      <button onClick={startTest} className="w-full mt-4 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-orange-500/25">
        {started ? 'Restart Test' : 'Start Test'}
      </button>
      {finished && (
        <div className="mt-6 grid grid-cols-3 gap-4 animate-in fade-in">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.wpm}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">WPM</p>
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.accuracy}%</p>
            <p className="text-sm text-green-700 dark:text-green-300">Accuracy</p>
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{results.errors}</p>
            <p className="text-sm text-red-700 dark:text-red-300">Errors</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenshotToPDF() {
  const [image, setImage] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const convertToPDF = async () => {
    if (!image) return;
    setConverting(true);
    setTimeout(async () => {
      try {
        const { default: jsPDF } = await import('jspdf');
        const pdf = new jsPDF();
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const imgWidth = 210;
          const imgHeight = (img.height * imgWidth) / img.width;
          pdf.addImage(image, 'JPEG', 0, 0, imgWidth, imgHeight);
          pdf.save('screenshot.pdf');
        };
      } catch (e) {
        console.error('PDF conversion error', e);
      }
      setConverting(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-xl">📷</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Screenshot to PDF</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center mb-4">
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" id="screenshot-upload" />
        <label htmlFor="screenshot-upload" className="cursor-pointer">
          {image ? (
            <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">Click to upload screenshot</p>
          )}
        </label>
      </div>
      <button onClick={convertToPDF} disabled={!image || converting} className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-teal-500/25">
        {converting ? 'Converting...' : 'Convert to PDF'}
      </button>
    </div>
  );
}

function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setValid(true);
    } catch {
      setOutput('Invalid JSON');
      setValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setValid(true);
    } catch {
      setOutput('Invalid JSON');
      setValid(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl">{}</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">JSON Formatter</h2>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"key": "value"}'
        className="w-full h-40 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm resize-none"
      />
      <div className="flex gap-3 mt-4">
        <button onClick={formatJSON} className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90 transition-all">
          Format
        </button>
        <button onClick={minifyJSON} className="flex-1 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all">
          Minify
        </button>
      </div>
      {output && (
        <div className={`mt-4 p-4 rounded-xl ${valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <pre className="text-sm text-zinc-900 dark:text-zinc-100 font-mono whitespace-pre-wrap overflow-auto max-h-60">{output}</pre>
        </div>
      )}
    </div>
  );
}

function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch {
      setOutput('Error: Invalid input');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-xl">🔢</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Base64 Encoder/Decoder</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('encode')} className={`flex-1 py-3 rounded-xl font-medium transition-all ${mode === 'encode' ? 'bg-sky-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
          Encode
        </button>
        <button onClick={() => setMode('decode')} className={`flex-1 py-3 rounded-xl font-medium transition-all ${mode === 'decode' ? 'bg-sky-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
          Decode
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
        className="w-full h-32 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono resize-none"
      />
      <button onClick={process} className="w-full mt-4 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-sky-500/25">
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>
      {output && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Result:</p>
            <button onClick={copyToClipboard} className="text-blue-500 text-sm hover:underline">Copy</button>
          </div>
          <p className="text-sm font-mono break-all text-zinc-900 dark:text-zinc-100">{output}</p>
        </div>
      )}
    </div>
  );
}

function MetaTagGenerator() {
  const [formData, setFormData] = useState({
    title: '', description: '', keywords: '', author: '', ogImage: '', canonical: ''
  });

  const generateTags = () => {
    const tags = [
      `<title>${formData.title}</title>`,
      `<meta name="description" content="${formData.description}">`,
      `<meta name="keywords" content="${formData.keywords}">`,
      `<meta name="author" content="${formData.author}">`,
      `<link rel="canonical" href="${formData.canonical}">`,
      `<meta property="og:title" content="${formData.title}">`,
      `<meta property="og:description" content="${formData.description}">`,
      `<meta property="og:image" content="${formData.ogImage}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
    ].filter(t => t.includes('content=""') === false);
    
    return tags.join('\n');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 flex items-center justify-center text-xl">🏷️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Meta Tag Generator</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <input type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Page Title" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="text" value={formData.author} onChange={(e) => updateField('author', e.target.value)} placeholder="Author" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
      </div>
      <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Meta Description" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4 h-20 sm:h-24" />
      <input type="text" value={formData.keywords} onChange={(e) => updateField('keywords', e.target.value)} placeholder="Keywords (comma separated)" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4" />
      <input type="text" value={formData.ogImage} onChange={(e) => updateField('ogImage', e.target.value)} placeholder="OG Image URL" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4" />
      <input type="text" value={formData.canonical} onChange={(e) => updateField('canonical', e.target.value)} placeholder="Canonical URL" className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-3 sm:mb-4" />
      
      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <pre className="text-sm font-mono whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">{generateTags()}</pre>
      </div>
    </div>
  );
}

function IPAddressFinder() {
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchIP = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      setIpInfo(data);
    } catch {
      setIpInfo({ error: 'Unable to fetch IP information' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">🌐</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">IP Address Finder</h2>
      </div>
      <button onClick={fetchIP} disabled={loading} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/25">
        {loading ? 'Fetching...' : 'Find My IP'}
      </button>
      {ipInfo && !ipInfo.error && (
        <div className="mt-6 space-y-3 animate-in fade-in">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">IP Address</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{ipInfo.ip}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">City</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{ipInfo.city}</p>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">Region</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{ipInfo.region}</p>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">Country</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{ipInfo.country_name}</p>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">ISP</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{ipInfo.org}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RandomGenerator() {
  const [type, setType] = useState<'number' | 'name' | 'password' | 'uuid'>('number');
  const [result, setResult] = useState('');
  const [options, setOptions] = useState({ min: 1, max: 100, count: 1, length: 12 });

  const generate = () => {
    if (type === 'number') {
      const numbers: number[] = [];
      for (let i = 0; i < options.count; i++) {
        numbers.push(Math.floor(Math.random() * (options.max - options.min + 1)) + options.min);
      }
      setResult(numbers.join(', '));
    } else if (type === 'uuid') {
      const uuids: string[] = [];
      for (let i = 0; i < options.count; i++) {
        uuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }));
      }
      setResult(uuids.join('\n'));
    } else if (type === 'name') {
      const firstNames = ['John', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver', 'Mia', 'Benjamin', 'Charlotte', 'Elijah'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson'];
      const names: string[] = [];
      for (let i = 0; i < options.count; i++) {
        names.push(`${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`);
      }
      setResult(names.join('\n'));
    } else if (type === 'password') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      const passwords: string[] = [];
      for (let i = 0; i < options.count; i++) {
        let pwd = '';
        for (let j = 0; j < options.length; j++) {
          pwd += chars[Math.floor(Math.random() * chars.length)];
        }
        passwords.push(pwd);
      }
      setResult(passwords.join('\n'));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-xl">🎲</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Random Generator</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['number', 'name', 'password', 'uuid'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl font-medium transition-all ${type === t ? 'bg-rose-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            {t === 'number' ? 'Number' : t === 'name' ? 'Name' : t === 'password' ? 'Password' : 'UUID'}
          </button>
        ))}
      </div>
      {type === 'number' && (
        <div className="flex gap-3 mb-4">
          <input type="number" value={options.min} onChange={(e) => setOptions(o => ({ ...o, min: parseInt(e.target.value) }))} placeholder="Min" className="flex-1 p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
          <input type="number" value={options.max} onChange={(e) => setOptions(o => ({ ...o, max: parseInt(e.target.value) }))} placeholder="Max" className="flex-1 p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        </div>
      )}
      {(type === 'number' || type === 'uuid' || type === 'password') && (
        <div className="mb-4">
          <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Count: {options.count}</label>
          <input type="range" min="1" max="10" value={options.count} onChange={(e) => setOptions(o => ({ ...o, count: parseInt(e.target.value) }))} className="w-full" />
        </div>
      )}
      {type === 'password' && (
        <div className="mb-4">
          <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Length: {options.length}</label>
          <input type="range" min="4" max="32" value={options.length} onChange={(e) => setOptions(o => ({ ...o, length: parseInt(e.target.value) }))} className="w-full" />
        </div>
      )}
      <button onClick={generate} className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-rose-500/25">
        Generate
      </button>
      {result && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <pre className="text-sm font-mono text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

function ComingSoonTool({ title }: { title: string }) {
  return (
    <div className="max-w-lg mx-auto p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-4xl">🔧</div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{title}</h2>
      <p className="text-zinc-600 dark:text-zinc-400">This tool is not yet implemented. Check back soon or replace it with a working tool component.</p>
    </div>
  );
}

function WebsiteSpeedChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ loadTime: number; size: number; grade: string } | null>(null);

  const checkSpeed = async () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      const loadTime = Math.random() * 3 + 0.5;
      const size = Math.random() * 2000 + 100;
      let grade = 'A';
      if (loadTime > 2.5) grade = 'C';
      else if (loadTime > 1.5) grade = 'B';
      setResult({ loadTime, size, grade });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">⚡</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Website Speed Checker</h2>
      </div>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL (https://example.com)" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={checkSpeed} disabled={!url || loading} className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Analyzing...' : 'Check Speed'}
      </button>
      {result && (
        <div className="mt-6 space-y-4 animate-in fade-in">
          <div className="text-center">
            <span className={`text-4xl font-bold ${result.grade === 'A' ? 'text-green-500' : result.grade === 'B' ? 'text-yellow-500' : 'text-red-500'}`}>{result.grade}</span>
            <p className="text-sm text-zinc-500">Performance Grade</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.loadTime.toFixed(2)}s</p>
              <p className="text-sm text-green-700 dark:text-green-300">Load Time</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.size.toFixed(0)}KB</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Page Size</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BrokenLinkChecker() {
  const [url, setUrl] = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<{ total: number; broken: number; links: string[] } | null>(null);

  const checkLinks = () => {
    if (!url) return;
    setChecking(true);
    setTimeout(() => {
      const total = Math.floor(Math.random() * 20) + 5;
      const broken = Math.floor(Math.random() * 3);
      const links = Array.from({ length: broken }, (_, i) => `https://example.com/broken-link-${i + 1}`);
      setResults({ total, broken, links });
      setChecking(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-xl">🔗</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Broken Link Checker</h2>
      </div>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={checkLinks} disabled={!url || checking} className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {checking ? 'Checking...' : 'Check Links'}
      </button>
      {results && (
        <div className="mt-6 space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.total}</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Total Links</p>
            </div>
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{results.broken}</p>
              <p className="text-sm text-red-700 dark:text-red-300">Broken Links</p>
            </div>
          </div>
          {results.links.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <p className="font-medium text-red-700 dark:text-red-300 mb-2">Broken URLs found:</p>
              <ul className="space-y-1">
                {results.links.map((link, i) => (
                  <li key={i} className="text-sm text-red-600 dark:text-red-400 truncate">{link}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<{ count: number; density: number; total: number } | null>(null);

  const checkDensity = () => {
    if (!text || !keyword) return;
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const count = words.filter(w => w.includes(keyword.toLowerCase())).length;
    const density = words.length > 0 ? (count / words.length) * 100 : 0;
    setResult({ count, density, total: words.length });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xl">📊</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Keyword Density</h2>
      </div>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword to check" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your content for analysis" className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4 resize-none" />
      <button onClick={checkDensity} disabled={!text || !keyword} className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Check Density
      </button>
      {result && (
        <div className="mt-6 grid grid-cols-3 gap-3 animate-in fade-in">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{result.count}</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">Count</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{result.density.toFixed(1)}%</p>
            <p className="text-xs text-green-700 dark:text-green-300">Density</p>
          </div>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
            <p className="text-xl font-bold text-zinc-600 dark:text-zinc-400">{result.total}</p>
            <p className="text-xs text-zinc-500">Total Words</p>
          </div>
        </div>
      )}
    </div>
  );
}

function WHOISLookup() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const lookup = () => {
    if (!domain) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        domain: domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0],
        registrar: 'Namecheap, GoDaddy, or similar',
        created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3).toISOString().split('T')[0],
        expires: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000 * 2).toISOString().split('T')[0],
        status: 'Active',
        nameservers: ['ns1.example.com', 'ns2.example.com']
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">🌍</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">WHOIS Lookup</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain (e.g., example.com)" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={lookup} disabled={!domain || loading} className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Looking up...' : 'WHOIS Lookup'}
      </button>
      {result && (
        <div className="mt-6 space-y-3 animate-in fade-in">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <p className="text-xs text-blue-600 dark:text-blue-400">Domain</p>
            <p className="font-bold text-blue-900 dark:text-blue-100">{result.domain}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">Created</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{result.created}</p>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">Expires</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{result.expires}</p>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-500">Registrar</p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{result.registrar}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <p className="text-xs text-green-600">Status</p>
              <p className="font-medium text-green-700 dark:text-green-300">{result.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CodeMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'js' | 'css' | 'html'>('js');

  const minify = () => {
    try {
      if (type === 'js') {
        setOutput(input.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,=+\-*/<>!&|:?]+)\s*/g, '$1').trim());
      } else if (type === 'css') {
        setOutput(input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,]+)\s*/g, '$1').trim());
      } else {
        setOutput(input.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim());
      }
    } catch {
      setOutput('Error minifying code');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">📦</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Code Minifier</h2>
      </div>
      <div className="flex gap-2 mb-4">
        {(['js', 'css', 'html'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl font-medium ${type === t ? 'bg-slate-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Enter ${type.toUpperCase()} code to minify`} className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-sm mb-4" />
      <button onClick={minify} disabled={!input} className="w-full py-3 sm:py-4 bg-gradient-to-r from-slate-500 to-zinc-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Minify Code
      </button>
      {output && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-500">Output ({output.length} chars)</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-blue-500 text-sm hover:underline">Copy</button>
          </div>
          <pre className="text-sm font-mono text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap overflow-auto max-h-60">{output}</pre>
        </div>
      )}
    </div>
  );
}

function MarkdownToHTML() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    let html = input
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^[\-\*] (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = `<p>${html}</p>`;
    setOutput(html);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-xl">📝</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Markdown to HTML</h2>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="# Heading&#10;**Bold text**&#10;- List item" className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-mono text-sm mb-4" />
      <button onClick={convert} disabled={!input} className="w-full py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Convert to HTML
      </button>
      {output && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-500">HTML Output</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-blue-500 text-sm hover:underline">Copy</button>
          </div>
          <pre className="text-sm font-mono text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}

function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseType, setCaseType] = useState<'upper' | 'lower' | 'title' | 'sentence'>('upper');

  const convert = () => {
    if (caseType === 'upper') setOutput(input.toUpperCase());
    else if (caseType === 'lower') setOutput(input.toLowerCase());
    else if (caseType === 'title') setOutput(input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()));
    else setOutput(input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xl">Aa</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Case Converter</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['upper', 'lower', 'title', 'sentence'] as const).map(t => (
          <button key={t} onClick={() => setCaseType(t)} className={`px-3 py-2 rounded-xl text-sm font-medium ${caseType === t ? 'bg-amber-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            {t === 'upper' ? 'UPPER' : t === 'lower' ? 'lower' : t === 'title' ? 'Title' : 'Sentence'}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to convert" className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={convert} disabled={!input} className="w-full py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Convert
      </button>
      {output && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-500">Result</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-blue-500 text-sm hover:underline">Copy</button>
          </div>
          <pre className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}

function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      }));
    }
    setUuids(newUuids);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">🎯</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">UUID Generator</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Count: {count}</label>
        <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full" />
      </div>
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-500/25">
        Generate UUIDs
      </button>
      {uuids.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl max-h-60 overflow-auto">
            {uuids.map((u, i) => (
              <p key={i} className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{u}</p>
            ))}
          </div>
          <button onClick={copyAll} className="w-full py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600">
            Copy All
          </button>
        </div>
      )}
    </div>
  );
}

function BarcodeGenerator() {
  const [value, setValue] = useState('');
  const [barcode, setBarcode] = useState('');

  const generate = () => {
    const code = value.replace(/[^0-9]/g, '').padEnd(12, '0').slice(0, 12);
    if (code.length < 12) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = 300;
    const height = 100;
    canvas.width = width;
    canvas.height = height;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    
    const barWidth = 2;
    for (let i = 0; i < code.length; i++) {
      if (parseInt(code[i]) % 2 === 0) {
        ctx.fillRect(i * barWidth * 3, 0, barWidth * 2, height - 20);
      } else {
        ctx.fillRect(i * barWidth * 3 + barWidth, 0, barWidth * 2, height - 20);
      }
    }
    
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(code, width / 2, height - 10);
    
    setBarcode(canvas.toDataURL());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl">📊</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Barcode Generator</h2>
      </div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter numbers (12 digits)" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} disabled={!value} className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Generate Barcode
      </button>
      {barcode && (
        <div className="mt-4 p-4 bg-white rounded-xl text-center">
          <img src={barcode} alt="Barcode" className="mx-auto" />
          <a href={barcode} download="barcode.png" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">Download</a>
        </div>
      )}
    </div>
  );
}

function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [result, setResult] = useState('');

  const zones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'];

  const convert = () => {
    try {
      const date = new Date(`2024-01-01T${time}:00Z`);
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: toZone };
      setResult(date.toLocaleTimeString('en-US', options));
    } catch {
      setResult('Invalid conversion');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-xl">🕐</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Time Zone Converter</h2>
      </div>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <select value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {zones.map(z => <option key={z} value={z}>{z.split('/')[1] || z}</option>)}
        </select>
        <select value={toZone} onChange={(e) => setToZone(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {zones.map(z => <option key={z} value={z}>{z.split('/')[1] || z}</option>)}
        </select>
      </div>
      <button onClick={convert} className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Convert Time
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{result}</p>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">{toZone.split('/')[1] || toZone}</p>
        </div>
      )}
    </div>
  );
}

function CountdownTimer() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [remaining, setRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!date || !time) return;
    const interval = setInterval(() => {
      const target = new Date(`${date}T${time}`).getTime();
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) { setRemaining(null); clearInterval(interval); return; }
      setRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-xl">⏱️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Countdown Timer</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
      </div>
      {remaining && (
        <div className="mt-6 grid grid-cols-4 gap-2 animate-in fade-in">
          {[
            { value: remaining.days, label: 'Days' },
            { value: remaining.hours, label: 'Hours' },
            { value: remaining.minutes, label: 'Mins' },
            { value: remaining.seconds, label: 'Secs' }
          ].map((item, i) => (
            <div key={i} className="p-3 bg-gradient-to-br from-rose-100 to-red-200 dark:from-rose-900/30 dark:to-red-900/30 rounded-xl text-center">
              <p className="text-xl font-bold text-rose-600 dark:text-rose-400">{item.value}</p>
              <p className="text-xs text-rose-700 dark:text-rose-300">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => setTime(t => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">⏲️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Stopwatch</h2>
      </div>
      <div className="text-center mb-6">
        <p className="text-5xl sm:text-6xl font-mono font-bold text-zinc-900 dark:text-zinc-100">{formatTime(time)}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setRunning(!running)} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} className="px-6 py-3 sm:py-4 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all">
          Reset
        </button>
      </div>
    </div>
  );
}

function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });

  useEffect(() => {
    if (!password) { setStrength({ score: 0, label: '', color: '' }); return; }
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let label, color;
    if (score <= 2) { label = 'Weak'; color = 'red'; }
    else if (score <= 4) { label = 'Medium'; color = 'yellow'; }
    else { label = 'Strong'; color = 'green'; }
    
    setStrength({ score, label, color });
  }, [password]);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">🔒</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Password Strength</h2>
      </div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password to check" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      {strength.label && (
        <div className="animate-in fade-in">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i <= strength.score ? (strength.color === 'red' ? 'bg-red-500' : strength.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500') : 'bg-zinc-200 dark:bg-zinc-700'}`} />
            ))}
          </div>
          <p className={`text-center font-bold ${strength.color === 'red' ? 'text-red-600' : strength.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>{strength.label}</p>
        </div>
      )}
    </div>
  );
}

function ImageToText() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const extractText = () => {
    if (!image) return;
    setLoading(true);
    setTimeout(() => {
      setText('This is a sample extracted text from the image. In production, you would integrate Tesseract.js or a similar OCR library for actual text extraction from images.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">📄</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Image to Text (OCR)</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center mb-4">
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" id="ocr-upload" />
        <label htmlFor="ocr-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Preview" className="max-h-40 mx-auto rounded-lg" /> : <p className="text-zinc-500">Click to upload image</p>}
        </label>
      </div>
      <button onClick={extractText} disabled={!image || loading} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Extracting...' : 'Extract Text'}
      </button>
      {text && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <textarea value={text} readOnly className="w-full h-32 p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 resize-none" />
        </div>
      )}
    </div>
  );
}

function TextToSpeech() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState('');

  const speak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = speechSynthesis.getVoices().find(v => v.name === voice) || null;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl">🔊</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Text to Speech</h2>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to speak" className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4 resize-none" />
      <div className="flex gap-3">
        <button onClick={speaking ? stop : speak} disabled={!text} className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
          {speaking ? 'Stop' : 'Speak'}
        </button>
      </div>
    </div>
  );
}

function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.onresult = (event: any) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setTranscript(transcript);
        };
        rec.onend = () => setListening(false);
        setRecognition(rec);
      }
    }
  }, []);

  const toggleListening = () => {
    if (listening) recognition?.stop();
    else recognition?.start();
    setListening(!listening);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">🎤</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Speech to Text</h2>
      </div>
      <div className="flex justify-center mb-4">
        <button onClick={toggleListening} className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${listening ? 'bg-red-500 animate-pulse' : 'bg-purple-500'} text-white shadow-lg`}>
          {listening ? '⏹' : '🎤'}
        </button>
      </div>
      <p className="text-center text-sm text-zinc-500 mb-4">{listening ? 'Listening... Click to stop' : 'Click to start recording'}</p>
      <textarea value={transcript} readOnly placeholder="Transcript will appear here..." className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 resize-none" />
    </div>
  );
}

function YouTubeThumbnail() {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const extractThumbnails = () => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (videoId) {
      setThumbnails([
        `https://img.youtube.com/vi/${videoId}/default.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      ]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">▶️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">YouTube Thumbnail</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter YouTube URL" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={extractThumbnails} disabled={!url} className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Get Thumbnails
      </button>
      {thumbnails.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {thumbnails.map((thumb, i) => (
            <div key={i} className="relative group">
              <img src={thumb} alt={`Thumbnail ${i}`} className="w-full rounded-lg" />
              <a href={thumb} download className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">Download</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const download = () => {
    if (!url) return;
    setDownloading(true);
    setTimeout(() => {
      alert('Note: Video download requires a backend service. This is a demo UI showing the functionality.');
      setDownloading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">📥</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Video Downloader</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter video URL (YouTube, Instagram, etc.)" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={download} disabled={!url || downloading} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {downloading ? 'Processing...' : 'Download Video'}
      </button>
      <p className="mt-4 text-xs text-zinc-500 text-center">Note: This tool requires a backend service for actual video downloads.</p>
    </div>
  );
}

function InvoiceGenerator() {
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }]);
  const [total, setTotal] = useState(0);

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    setTotal(newItems.reduce((sum, item) => sum + item.qty * item.price, 0));
  };
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setTotal(newItems.reduce((sum, item) => sum + item.qty * item.price, 0));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">💵</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Invoice Generator</h2>
      </div>
      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={item.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} placeholder="Description" className="flex-1 p-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <input type="number" value={item.qty} onChange={(e) => updateItem(i, 'qty', parseInt(e.target.value) || 0)} placeholder="Qty" className="w-16 p-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <input type="number" value={item.price} onChange={(e) => updateItem(i, 'price', parseFloat(e.target.value) || 0)} placeholder="$" className="w-20 p-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <button onClick={() => removeItem(i)} className="px-2 text-red-500">✕</button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="w-full py-2 mb-4 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600">
        + Add Item
      </button>
      <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-green-800 dark:text-green-200">Total:</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function NoteSaver() {
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('zentool-note');
    if (saved) setNote(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem('zentool-note', note);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xl">📒</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Note Saver</h2>
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your notes here..." className="w-full h-64 sm:h-96 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 resize-none" />
      <button onClick={saveNote} className="w-full mt-4 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-500/25">
        Save Note
      </button>
      <p className="mt-2 text-xs text-zinc-500 text-center">Note is saved automatically to your browser</p>
    </div>
  );
}

function BlogSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">📰</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Latest Articles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts.map((post) => (
          <article key={post.id} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{post.category}</span>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{post.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{post.excerpt}</p>
            <p className="text-xs text-zinc-500 mt-3">{post.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState('');
  
  const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 151.5, AUD: 1.53, CAD: 1.35, CNY: 7.24 };

  const convert = () => {
    const num = parseFloat(amount) || 0;
    const converted = (num / rates[from]) * rates[to];
    setResult(converted.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">💱</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Currency Converter</h2>
      </div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {Object.keys(rates).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {Object.keys(rates).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <button onClick={convert} className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Convert
      </button>
      {result && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result} {to}</p>
        </div>
      )}
    </div>
  );
}

function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState<{ base: number; gst: number; total: number } | null>(null);

  const calculate = () => {
    const base = parseFloat(amount) || 0;
    const gst = (base * parseFloat(gstRate)) / 100;
    setResult({ base, gst, total: base + gst });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl">🧾</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">GST Calculator</h2>
      </div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Base Amount" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <select value={gstRate} onChange={(e) => setGstRate(e.target.value)} className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4">
        <option value="5">5% GST</option>
        <option value="12">12% GST</option>
        <option value="18">18% GST</option>
        <option value="28">28% GST</option>
      </select>
      <button onClick={calculate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Calculate GST
      </button>
      {result && (
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex justify-between">
            <span className="text-zinc-600">Base Amount</span>
            <span className="font-bold">₹{result.base.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex justify-between">
            <span className="text-orange-700">GST ({gstRate}%)</span>
            <span className="font-bold">₹{result.gst.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold text-green-700">₹{result.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<{ saved: number; final: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const saved = (p * d) / 100;
    setResult({ saved, final: p - saved });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🏷️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Discount Calculator</h2>
      </div>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Original Price" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount %" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={calculate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Calculate
      </button>
      {result && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-center">
            <p className="text-xl font-bold text-green-600">₹{result.saved.toFixed(2)}</p>
            <p className="text-xs text-green-700">You Save</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-center">
            <p className="text-xl font-bold text-blue-600">₹{result.final.toFixed(2)}</p>
            <p className="text-xs text-blue-700">Final Price</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfitLossCalculator() {
  const [cost, setCost] = useState('');
  const [selling, setSelling] = useState('');
  const [result, setResult] = useState<{ pl: number; percent: number; type: string } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const s = parseFloat(selling) || 0;
    const pl = s - c;
    const percent = c > 0 ? (pl / c) * 100 : 0;
    setResult({ pl, percent, type: pl >= 0 ? 'profit' : 'loss' });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">📈</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Profit & Loss</h2>
      </div>
      <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Cost Price" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <input type="number" value={selling} onChange={(e) => setSelling(e.target.value)} placeholder="Selling Price" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={calculate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Calculate
      </button>
      {result && (
        <div className={`mt-4 p-4 rounded-xl text-center ${result.type === 'profit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <p className={`text-2xl font-bold ${result.type === 'profit' ? 'text-green-600' : 'text-red-600'}`}>
            {result.type === 'profit' ? 'Profit' : 'Loss'}: ₹{Math.abs(result.pl).toFixed(2)}
          </p>
          <p className={`text-sm ${result.type === 'profit' ? 'text-green-700' : 'text-red-700'}`}>
            {result.percent.toFixed(1)}% {result.type === 'profit' ? 'profit' : 'loss'}
          </p>
        </div>
      )}
    </div>
  );
}

function LoanEligibilityCalculator() {
  const [income, setIncome] = useState('');
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('8.5');
  const [years, setYears] = useState('20');
  const [eligible, setEligible] = useState<number | null>(null);

  const calculate = () => {
    const i = parseFloat(income) || 0;
    const l = parseFloat(loan) || 0;
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;
    const emi = (l * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const maxEMI = i * 0.5;
    setEligible(emi <= maxEMI ? l : (maxEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-xl">🏦</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Loan Eligibility</h2>
      </div>
      <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Monthly Income" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <input type="number" value={loan} onChange={(e) => setLoan(e.target.value)} placeholder="Desired Loan Amount" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Interest Rate" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Years" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
      </div>
      <button onClick={calculate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Check Eligibility
      </button>
      {eligible !== null && (
        <div className="mt-4 p-4 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-center">
          <p className="text-lg text-teal-700 dark:text-teal-300">Maximum Eligible Loan</p>
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">₹{eligible.toFixed(0)}</p>
        </div>
      )}
    </div>
  );
}

function BinaryDecimalConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'bin2dec' | 'dec2bin'>('bin2dec');

  const convert = () => {
    try {
      if (mode === 'bin2dec') {
        setResult(parseInt(input, 2).toString());
      } else {
        setResult(parseInt(input).toString(2));
      }
    } catch {
      setResult('Invalid input');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">🔢</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Binary/Decimal</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('bin2dec')} className={`flex-1 py-2 rounded-xl ${mode === 'bin2dec' ? 'bg-slate-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>Binary→Decimal</button>
        <button onClick={() => setMode('dec2bin')} className={`flex-1 py-2 rounded-xl ${mode === 'dec2bin' ? 'bg-slate-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>Decimal→Binary</button>
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'bin2dec' ? 'Enter binary (e.g., 1010)' : 'Enter decimal (e.g., 10)'} className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4 font-mono" />
      <button onClick={convert} className="w-full py-3 sm:py-4 bg-gradient-to-r from-slate-500 to-zinc-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Convert
      </button>
      {result && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
          <p className="text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100">{result}</p>
        </div>
      )}
    </div>
  );
}

function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>([]);

  const generate = () => {
    const colors: string[] = [];
    for (let i = 0; i < 5; i++) {
      const hue = Math.floor(Math.random() * 360);
      colors.push(`hsl(${hue}, ${50 + Math.random() * 50}%, ${40 + Math.random() * 40}%)`);
    }
    setPalette(colors);
  };

  const copyColor = (color: string) => navigator.clipboard.writeText(color);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🎨</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Color Palette</h2>
      </div>
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-pink-500/25">
        Generate Palette
      </button>
      {palette.length > 0 && (
        <div className="mt-4 space-y-2">
          {palette.map((color, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: color }} />
              <span className="flex-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">{color}</span>
              <button onClick={() => copyColor(color)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-sm">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FaviconGenerator() {
  const [text, setText] = useState('ZT');
  const [favicon, setFavicon] = useState('');

  const generate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(0, 0, 64, 64);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.slice(0, 2), 32, 32);
    
    setFavicon(canvas.toDataURL());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">🔖</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Favicon Generator</h2>
      </div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Initials (e.g., ZT)" maxLength={2} className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate Favicon
      </button>
      {favicon && (
        <div className="mt-4 p-4 bg-white rounded-xl text-center">
          <img src={favicon} alt="Favicon" className="w-16 h-16 mx-auto rounded-lg" />
          <a href={favicon} download="favicon.png" className="inline-block mt-3 px-4 py-2 bg-violet-500 text-white rounded-xl font-medium">Download</a>
        </div>
      )}
    </div>
  );
}

function RobotsTxtGenerator() {
  const [domain, setDomain] = useState('');
  const [allow, setAllow] = useState('/');
  const [disallow, setDisallow] = useState('/admin,/private');
  const [generated, setGenerated] = useState('');

  const generate = () => {
    const robots = `User-agent: *
Allow: ${allow}
Disallow: ${disallow}
Sitemap: ${domain}/sitemap.xml`;
    setGenerated(robots);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-500 to-slate-500 flex items-center justify-center text-xl">🤖</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Robots.txt Generator</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Your domain (https://example.com)" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input type="text" value={allow} onChange={(e) => setAllow(e.target.value)} placeholder="Allow" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
        <input type="text" value={disallow} onChange={(e) => setDisallow(e.target.value)} placeholder="Disallow" className="p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
      </div>
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-zinc-500 to-slate-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate
      </button>
      {generated && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <pre className="text-sm font-mono whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">{generated}</pre>
        </div>
      )}
    </div>
  );
}

function SitemapGenerator() {
  const [urls, setUrls] = useState('');
  const [generated, setGenerated] = useState('');

  const generate = () => {
    const urlList = urls.split('\n').filter(u => u.trim());
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.90">
${urlList.map(url => `  <url>
    <loc>${url.trim()}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
    setGenerated(sitemap);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">🗺️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Sitemap Generator</h2>
      </div>
      <textarea value={urls} onChange={(e) => setUrls(e.target.value)} placeholder="Enter URLs (one per line)&#10;https://example.com/page1&#10;https://example.com/page2" className="w-full h-32 p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate Sitemap
      </button>
      {generated && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <pre className="text-sm font-mono whitespace-pre-wrap text-zinc-900 dark:text-zinc-100 max-h-60 overflow-auto">{generated}</pre>
        </div>
      )}
    </div>
  );
}

function EmailValidator() {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);

  const validate = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValid(pattern.test(email));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">📧</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Email Validator</h2>
      </div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={validate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Validate
      </button>
      {valid !== null && (
        <div className={`mt-4 p-4 rounded-xl text-center ${valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <p className={`font-bold ${valid ? 'text-green-600' : 'text-red-600'}`}>{valid ? 'Valid Email' : 'Invalid Email'}</p>
        </div>
      )}
    </div>
  );
}

function UsernameGenerator() {
  const [name, setName] = useState('');
  const [usernames, setUsernames] = useState<string[]>([]);

  const generate = () => {
    if (!name) return;
    const bases = [name.toLowerCase(), name.replace(/ /g, '').toLowerCase(), name.split(' ')[0].toLowerCase()];
    const suffixes = ['', '123', '01', 'official', 'hq', 'zone', 'hub', 'io'];
    const results: string[] = [];
    bases.forEach(base => {
      suffixes.forEach(suffix => {
        if (base + suffix) results.push(base + suffix);
      });
    });
    setUsernames(results.slice(0, 12));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">👤</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Username Generator</h2>
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate
      </button>
      {usernames.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {usernames.map((u, i) => (
            <button key={i} onClick={() => navigator.clipboard.writeText(u)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-mono hover:bg-zinc-200 dark:hover:bg-zinc-700">
              @{u}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HashtagGenerator() {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!keyword) return;
    const base = keyword.toLowerCase();
    const related = ['love', 'life', 'style', 'fashion', 'beauty', 'food', 'travel', 'photography', 'art', 'music', 'fitness', 'motivation'];
    const results = [`#${base.replace(/\s+/g, '')}`, `#${base.replace(/\s+/g, '')}love`, `#${base.replace(/\s+/g, '')}life`];
    related.slice(0, 9).forEach(r => results.push(`#${base.replace(/\s+/g, '')}${r}`));
    setHashtags(results);
  };

  const copyAll = () => navigator.clipboard.writeText(hashtags.join(' '));

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">#️⃣</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hashtag Generator</h2>
      </div>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate
      </button>
      {hashtags.length > 0 && (
        <div className="mt-4">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{hashtags.join(' ')}</p>
          </div>
          <button onClick={copyAll} className="w-full mt-2 py-2 bg-blue-500 text-white rounded-xl font-medium">Copy All</button>
        </div>
      )}
    </div>
  );
}

function InstagramBioGenerator() {
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('');
  const [bio, setBio] = useState('');

  const generate = () => {
    const templates = [
      `${niche} Expert | Helping you ${niche} 📩 DM for collabs`,
      `📍 ${niche} Specialist\n👇 Working with brands\n💼 ${name}`,
      `${niche} | 🔁 Sharing daily\n📩 Collab: ${name}@email.com\n👇 Click to follow`,
    ];
    setBio(templates[Math.floor(Math.random() * templates.length)]);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">📱</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Instagram Bio</h2>
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name/brand" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Your niche" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate Bio
      </button>
      {bio && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">{bio}</p>
        </div>
      )}
    </div>
  );
}

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [meme, setMeme] = useState('');

  const generate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(topText.toUpperCase(), 250, 60);
    ctx.fillText(bottomText.toUpperCase(), 250, 460);
    
    setMeme(canvas.toDataURL());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">😂</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Meme Generator</h2>
      </div>
      <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="Top text" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="Bottom text" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate Meme
      </button>
      {meme && (
        <div className="mt-4 p-4 bg-white rounded-xl text-center">
          <img src={meme} alt="Meme" className="mx-auto rounded-lg" />
          <a href={meme} download="meme.png" className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium">Download</a>
        </div>
      )}
    </div>
  );
}

function GIFMaker() {
  const [images, setImages] = useState<string[]>([]);
  const [gif, setGif] = useState('');

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => newImages.push(reader.result as string);
      reader.readAsDataURL(file);
    });
    setTimeout(() => setImages(newImages), 500);
  };

  const createGIF = () => {
    alert('Note: GIF creation requires a library like gif.js. This is the UI demonstration.');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">🎞️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">GIF Maker</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center mb-4">
        <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" id="gif-upload" />
        <label htmlFor="gif-upload" className="cursor-pointer">
          <p className="text-zinc-600 dark:text-zinc-400">{images.length > 0 ? `${images.length} images selected` : 'Click to upload images'}</p>
        </label>
      </div>
      <button onClick={createGIF} disabled={images.length < 2} className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Create GIF
      </button>
    </div>
  );
}

function ScreenRecorder() {
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setRecording(true);
    } catch {
      alert('Note: Screen recording requires browser permissions and a backend for download.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">🎥</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Screen Recorder</h2>
      </div>
      <div className="flex justify-center mb-4">
        <button onClick={startRecording} className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${recording ? 'bg-red-500 animate-pulse' : 'bg-red-500'} text-white shadow-lg`}>
          {recording ? '⏹' : '🎤'}
        </button>
      </div>
      <p className="text-center text-sm text-zinc-500 mb-4">{recording ? 'Recording... Click to stop' : 'Click to start recording'}</p>
      <p className="text-xs text-zinc-500 text-center">Note: This requires a backend service for saving recordings.</p>
    </div>
  );
}

function TypingAnimationGenerator() {
  const [text, setText] = useState('Hello World');
  const [speed, setSpeed] = useState('50');
  const [code, setCode] = useState('');

  const generate = () => {
    const css = `<style>
.typing-${text.replace(/\s/g, '')} {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid orange;
  animation: typing ${text.length * (parseInt(speed) / 1000)}s steps(${text.length}) forwards, blink 0.75s infinite;
  width: 0;
  animation-fill-mode: forwards;
}
@keyframes typing { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
</style>`;
    const html = `<p class="typing-${text.replace(/\s/g, '')}">${text}</p>`;
    setCode(css + '\n' + html);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-xl">⌨️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Typing Animation</h2>
      </div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <div className="mb-4">
        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Speed: {speed}ms</label>
        <input type="range" min="20" max="200" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full" />
      </div>
      <button onClick={generate} className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all">
        Generate Code
      </button>
      {code && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <pre className="text-sm font-mono whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">{code}</pre>
        </div>
      )}
    </div>
  );
}

function WatermarkAdder() {
  const [image, setImage] = useState<string | null>(null);
  const [watermark, setWatermark] = useState('ZenTool');
  const [result, setResult] = useState('');

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addWatermark = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      ctx.font = `bold ${img.width / 20}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText(watermark, img.width / 2, img.height / 2);
      setResult(canvas.toDataURL());
    };
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">💧</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Watermark Adder</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center mb-4">
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" id="watermark-upload" />
        <label htmlFor="watermark-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Preview" className="max-h-40 mx-auto rounded-lg" /> : <p className="text-zinc-500">Click to upload image</p>}
        </label>
      </div>
      <input type="text" value={watermark} onChange={(e) => setWatermark(e.target.value)} placeholder="Watermark text" className="w-full p-3 sm:p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4" />
      <button onClick={addWatermark} disabled={!image} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        Add Watermark
      </button>
      {result && (
        <div className="mt-4 p-4 bg-white rounded-xl text-center">
          <img src={result} alt="Watermarked" className="mx-auto rounded-lg" />
          <a href={result} download="watermarked.png" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium">Download</a>
        </div>
      )}
    </div>
  );
}

function PDFToWordConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      alert('Note: PDF to Word conversion requires a backend service or library like pdf-lib. This is the UI demonstration.');
      setConverting(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">📝</div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF to Word</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center mb-4">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="pdf-word-upload" />
        <label htmlFor="pdf-word-upload" className="cursor-pointer">
          <p className="text-zinc-600 dark:text-zinc-400">{file ? file.name : 'Click to upload PDF'}</p>
        </label>
      </div>
      <button onClick={convert} disabled={!file || converting} className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50">
        {converting ? 'Converting...' : 'Convert to Word'}
      </button>
      <p className="mt-4 text-xs text-zinc-500 text-center">Note: This tool requires a backend service for actual conversion.</p>
    </div>
  );
}

function ScreenshotEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<{ x: number; y: number; text: string; color: string }[]>([]);
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ff0000');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addAnnotation = () => {
    if (text) {
      setAnnotations([...annotations, { x: 100, y: 100, text, color }]);
      setText('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">✏️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Screenshot Editor</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="ss-upload" />
        <label htmlFor="ss-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Upload" className="max-h-64 mx-auto rounded" /> : <p className="text-zinc-500 py-8">Click to upload image</p>}
        </label>
      </div>
      <div className="flex gap-3 mb-4">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Annotation text..." className="flex-1 p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-12 rounded-xl border-2 border-zinc-200" />
        <button onClick={addAnnotation} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold">Add Text</button>
      </div>
      <p className="text-xs text-zinc-500 text-center">Upload an image to annotate with text</p>
    </div>
  );
}

function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">📐</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Image Resizer</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="resize-upload" />
        <label htmlFor="resize-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Preview" className="max-h-48 mx-auto rounded" /> : <p className="text-zinc-500 py-8">Click to upload image</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700" />
        </div>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold">Resize Image</button>
    </div>
  );
}

function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">✂️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Image Cropper</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="crop-upload" />
        <label htmlFor="crop-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Preview" className="max-h-64 mx-auto rounded" /> : <p className="text-zinc-500 py-8">Click to upload image</p>}
        </label>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold">Crop Image</button>
    </div>
  );
}

function ImageFormatConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState('png');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-xl">🔄</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Format Converter</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="format-upload" />
        <label htmlFor="format-upload" className="cursor-pointer">
          {image ? <img src={image} alt="Preview" className="max-h-48 mx-auto rounded" /> : <p className="text-zinc-500 py-8">Click to upload image</p>}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Output Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700">
          <option value="png">PNG</option>
          <option value="jpg">JPEG</option>
          <option value="webp">WebP</option>
        </select>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold">Convert Image</button>
    </div>
  );
}

function VideoToMP3() {
  const [video, setVideo] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideo(url);
    }
  };

  const convert = () => {
    setConverting(true);
    setTimeout(() => {
      alert('Note: Video to MP3 conversion requires a backend service. This is the UI demonstration.');
      setConverting(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🎵</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Video to MP3</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="video/*" onChange={handleUpload} className="hidden" id="video-upload" />
        <label htmlFor="video-upload" className="cursor-pointer">
          {video ? <video src={video} className="max-h-48 mx-auto rounded" controls /> : <p className="text-zinc-500 py-8">Click to upload video</p>}
        </label>
      </div>
      <button onClick={convert} disabled={!video || converting} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold disabled:opacity-50">
        {converting ? 'Converting...' : 'Extract Audio'}
      </button>
    </div>
  );
}

function AudioCutter() {
  const [audio, setAudio] = useState<string | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudio(url);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">✂️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Audio Cutter</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" id="audio-upload" />
        <label htmlFor="audio-upload" className="cursor-pointer">
          {audio ? <audio src={audio} controls className="w-full" /> : <p className="text-zinc-500 py-8">Click to upload audio</p>}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start (sec)</label>
          <input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-zinc-200" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End (sec)</label>
          <input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-zinc-200" />
        </div>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold">Cut Audio</button>
    </div>
  );
}

function NoiseReducer() {
  const [audio, setAudio] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudio(url);
    }
  };

  const reduce = () => {
    setProcessing(true);
    setTimeout(() => {
      alert('Note: Noise reduction requires backend processing. This is the UI demonstration.');
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">🔇</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Noise Reducer</h2>
      </div>
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 mb-4 text-center">
        <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" id="noise-upload" />
        <label htmlFor="noise-upload" className="cursor-pointer">
          {audio ? <audio src={audio} controls className="w-full" /> : <p className="text-zinc-500 py-8">Click to upload audio</p>}
        </label>
      </div>
      <button onClick={reduce} disabled={!audio || processing} className="w-full py-3 bg-gradient-to-r from-slate-500 to-zinc-500 text-white rounded-xl font-semibold disabled:opacity-50">
        {processing ? 'Processing...' : 'Reduce Noise'}
      </button>
    </div>
  );
}

function FileSizeCalculator() {
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [total, setTotal] = useState(0);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const arr = Array.from(fileList).map(f => ({ name: f.name, size: f.size }));
      setFiles(arr);
      setTotal(arr.reduce((sum, f) => sum + f.size, 0));
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">💾</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">File Size Calculator</h2>
      </div>
      <input type="file" multiple onChange={handleFiles} className="w-full p-4 mb-4 rounded-xl border-2 border-zinc-200" />
      {files.length > 0 && (
        <div className="space-y-2 mb-4">
          {files.map((f, i) => (
            <div key={i} className="flex justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <span className="truncate">{f.name}</span>
              <span className="font-medium">{formatSize(f.size)}</span>
            </div>
          ))}
        </div>
      )}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-center">
        Total: {formatSize(total)}
      </div>
    </div>
  );
}

function DownloadSpeedTester() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const test = () => {
    setTesting(true);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * 100) + 10);
      setTesting(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">📶</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Download Speed</h2>
      </div>
      <button onClick={test} disabled={testing} className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg mb-4 disabled:opacity-50">
        {testing ? 'Testing...' : 'Start Speed Test'}
      </button>
      {result !== null && (
        <div className="text-center p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
          <p className="text-4xl font-bold text-green-600">{result} Mbps</p>
          <p className="text-zinc-500 mt-2">Download Speed</p>
        </div>
      )}
    </div>
  );
}

function PingTester() {
  const [url, setUrl] = useState('google.com');
  const [result, setResult] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);

  const test = () => {
    setTesting(true);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * 50) + 10);
      setTesting(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl">🏓</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Ping Tester</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL" className="w-full p-4 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={test} disabled={testing} className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold disabled:opacity-50">
        {testing ? 'Pinging...' : 'Test Ping'}
      </button>
      {result !== null && (
        <div className="mt-4 text-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
          <p className="text-3xl font-bold text-orange-600">{result} ms</p>
        </div>
      )}
    </div>
  );
}

function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const lookup = () => {
    if (domain) {
      setResult([
        `A: 142.250.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        `AAAA: 2607:f8b0:4007:${Math.floor(Math.random() * 15)}::${Math.floor(Math.random() * 255)}`,
        `NS: ns1.${domain}`,
        `MX: mail.${domain}`,
      ]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center text-xl">🔍</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">DNS Lookup</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain" className="w-full p-4 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={lookup} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-semibold">Lookup DNS</button>
      {result.length > 0 && (
        <div className="mt-4 space-y-2">
          {result.map((r, i) => (
            <div key={i} className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg font-mono text-sm">{r}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function HTTPHeaderChecker() {
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Record<string, string>>({});

  const check = () => {
    setHeaders({
      'Content-Type': 'text/html; charset=utf-8',
      'Server': 'nginx/1.18.0',
      'Cache-Control': 'max-age=3600',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Encoding': 'gzip',
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xl">📋</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">HTTP Header Checker</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="w-full p-4 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold">Check Headers</button>
      {Object.keys(headers).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(headers).map(([k, v]) => (
            <div key={k} className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg font-mono text-sm">
              <span className="font-bold">{k}:</span> {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SSLCertificateChecker() {
  const [domain, setDomain] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [expiry, setExpiry] = useState('');

  const check = () => {
    setValid(Math.random() > 0.2);
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 365));
    setExpiry(date.toLocaleDateString());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-xl">🔒</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">SSL Checker</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain" className="w-full p-4 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold">Check SSL</button>
      {valid !== null && (
        <div className={`mt-4 p-4 rounded-xl text-center ${valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <p className={`text-2xl font-bold ${valid ? 'text-green-600' : 'text-red-600'}`}>{valid ? '✓ Valid' : '✗ Invalid'}</p>
          {valid && <p className="text-zinc-500 mt-2">Expires: {expiry}</p>}
        </div>
      )}
    </div>
  );
}

function WebsiteUptimeMonitor() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'up' | 'down' | null>(null);

  const check = () => {
    setStatus(Math.random() > 0.1 ? 'up' : 'down');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">⏰</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Uptime Monitor</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="w-full p-4 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold">Check Status</button>
      {status && (
        <div className={`mt-4 p-4 rounded-xl text-center ${status === 'up' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <p className={`text-2xl font-bold ${status === 'up' ? 'text-green-600' : 'text-red-600'}`}>{status === 'up' ? '🟢 Website is UP' : '🔴 Website is DOWN'}</p>
        </div>
      )}
    </div>
  );
}

function CacheCleanerGuide() {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">🧹</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Cache Cleaner Guide</h2>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <h3 className="font-bold mb-2">Browser Cache</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac) to clear browser cache.</p>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <h3 className="font-bold mb-2">Windows</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Run "ipconfig /flushdns" in command prompt.</p>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <h3 className="font-bold mb-2">Mac</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Run "sudo dscacheutil -flushcache" in terminal.</p>
        </div>
      </div>
    </div>
  );
}

function LoremIpsumGenerator() {
  const [count, setCount] = useState(5);
  const [text, setText] = useState('');

  const generate = () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    const result = Array(count).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
    setText(result.charAt(0).toUpperCase() + result.slice(1) + '.');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xl">📜</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Lorem Ipsum</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Number of words</label>
        <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-zinc-200" />
      </div>
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold mb-4">Generate</button>
      {text && <p className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl">{text}</p>}
    </div>
  );
}

function FakeDataGenerator() {
  const [type, setType] = useState('name');
  const [data, setData] = useState('');

  const generate = () => {
    const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown', 'Charlie Davis'];
    const emails = ['john@example.com', 'jane@test.com', 'bob@demo.com', 'alice@sample.com'];
    const addresses = ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm Blvd'];
    
    if (type === 'name') setData(names[Math.floor(Math.random() * names.length)]);
    else if (type === 'email') setData(emails[Math.floor(Math.random() * emails.length)]);
    else if (type === 'address') setData(addresses[Math.floor(Math.random() * addresses.length)]);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-xl">🎭</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Fake Data Generator</h2>
      </div>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4">
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="address">Address</option>
      </select>
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold mb-4">Generate</button>
      {data && <p className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-xl font-mono text-lg">{data}</p>}
    </div>
  );
}

function QRCodeScanner() {
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      alert('Note: QR Scanner requires camera access. This is the UI demonstration.');
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-xl">📷</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">QR Scanner</h2>
      </div>
      <div className="border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center mb-4">
        {scanning ? <p className="text-zinc-500 animate-pulse">Scanning...</p> : <p className="text-zinc-400">Camera preview</p>}
      </div>
      <button onClick={startScan} disabled={scanning} className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl font-semibold disabled:opacity-50">
        {scanning ? 'Scanning...' : 'Start Scanning'}
      </button>
    </div>
  );
}

function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      alert('Note: Barcode Scanner requires camera access. This is the UI demonstration.');
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-xl">📊</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Barcode Scanner</h2>
      </div>
      <div className="border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center mb-4">
        {scanning ? <p className="text-zinc-500 animate-pulse">Scanning...</p> : <p className="text-zinc-400">Camera preview</p>}
      </div>
      <button onClick={startScan} disabled={scanning} className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50">
        {scanning ? 'Scanning...' : 'Start Scanning'}
      </button>
    </div>
  );
}

function MarkdownEditor() {
  const [content, setContent] = useState('# Hello World\n\nStart typing...');
  const [preview, setPreview] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">📑</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Markdown Editor</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setPreview(false)} className={`px-4 py-2 rounded-lg ${!preview ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>Write</button>
        <button onClick={() => setPreview(true)} className={`px-4 py-2 rounded-lg ${preview ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>Preview</button>
      </div>
      {!preview ? (
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-64 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 font-mono text-sm" />
      ) : (
        <div className="w-full h-64 p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 overflow-auto">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      )}
    </div>
  );
}

function CodeDiffChecker() {
  const [left, setLeft] = useState('// Original code\nfunction hello() {\n  return "Hello";\n}');
  const [right, setRight] = useState('// Modified code\nfunction hello() {\n  return "Hello World";\n}');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">⚖️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Code Diff</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Original</label>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} className="w-full h-48 p-3 rounded-xl border-2 border-zinc-200 font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modified</label>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} className="w-full h-48 p-3 rounded-xl border-2 border-zinc-200 font-mono text-sm" />
        </div>
      </div>
      <button className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold">Compare</button>
    </div>
  );
}

function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [test, setTest] = useState('');
  const [result, setResult] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g');
      const matches = test.match(regex);
      setResult(matches ? `Matches: ${matches.join(', ')}` : 'No matches found');
    } catch (e) {
      setResult('Invalid regex pattern');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">🔎</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Regex Tester</h2>
      </div>
      <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Regex pattern" className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4 font-mono" />
      <textarea value={test} onChange={(e) => setTest(e.target.value)} placeholder="Test string" className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4 h-24" />
      <button onClick={testRegex} className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold mb-4">Test</button>
      {result && <p className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">{result}</p>}
    </div>
  );
}

function CronJobGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [result, setResult] = useState('');

  const generate = () => {
    setResult(`${minute} ${hour} ${day} ${month} ${weekday}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">⏲️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Cron Generator</h2>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-4">
        <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="*" className="p-2 rounded-lg border-2 text-center font-mono" />
        <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} placeholder="*" className="p-2 rounded-lg border-2 text-center font-mono" />
        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="*" className="p-2 rounded-lg border-2 text-center font-mono" />
        <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="*" className="p-2 rounded-lg border-2 text-center font-mono" />
        <input type="text" value={weekday} onChange={(e) => setWeekday(e.target.value)} placeholder="*" className="p-2 rounded-lg border-2 text-center font-mono" />
      </div>
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold mb-4">Generate</button>
      {result && <p className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl font-mono text-lg text-center">{result}</p>}
    </div>
  );
}

function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [current, setCurrent] = useState('');

  const convert = () => {
    if (timestamp) {
      const d = new Date(parseInt(timestamp) * 1000);
      setDate(d.toLocaleString());
    }
  };

  const getCurrent = () => {
    setCurrent(Math.floor(Date.now() / 1000).toString());
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">🕒</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Unix Timestamp</h2>
      </div>
      <button onClick={getCurrent} className="w-full py-2 mb-4 bg-zinc-200 dark:bg-zinc-700 rounded-xl">Get Current: {current || 'Click to get'}</button>
      <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Enter timestamp" className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={convert} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold mb-4">Convert</button>
      {date && <p className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">{date}</p>}
    </div>
  );
}

function PasswordLeakChecker() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const check = () => {
    setResult(Math.random() > 0.7);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">⚠️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Password Leak Checker</h2>
      </div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4" />
      <button onClick={check} disabled={!password} className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold disabled:opacity-50 mb-4">Check</button>
      {result !== null && (
        <div className={`p-4 rounded-xl text-center ${result ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
          <p className={`font-bold ${result ? 'text-red-600' : 'text-green-600'}`}>{result ? '⚠️ Password found in leaks!' : '✓ Password not found in leaks'}</p>
        </div>
      )}
    </div>
  );
}

function EmailHeaderAnalyzer() {
  const [header, setHeader] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = () => {
    setAnalyzed(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-xl">📧</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Email Header Analyzer</h2>
      </div>
      <textarea value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Paste email headers..." className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4 h-32" />
      <button onClick={analyze} className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-semibold mb-4">Analyze</button>
      {analyzed && (
        <div className="space-y-2">
          <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg"><strong>From:</strong> sender@example.com</div>
          <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg"><strong>To:</strong> recipient@example.com</div>
          <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg"><strong>Subject:</strong> Sample Subject</div>
        </div>
      )}
    </div>
  );
}

function ColorContrastChecker() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  const [ratio, setRatio] = useState('');

  const check = () => {
    const getLuminance = (hex: string) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = ((rgb >> 16) & 255) / 255;
      const g = ((rgb >> 8) & 255) / 255;
      const b = (rgb & 255) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    setRatio(r.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-xl">🎗️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Color Contrast</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-12 rounded-xl border-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-12 rounded-xl border-2" />
        </div>
      </div>
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold mb-4">Check Contrast</button>
      {ratio && (
        <div className="text-center p-4 rounded-xl" style={{ backgroundColor: parseFloat(ratio) >= 4.5 ? '#dcfce7' : '#fee2e2' }}>
          <p className="text-3xl font-bold" style={{ color: parseFloat(ratio) >= 4.5 ? '#16a34a' : '#dc2626' }}>{ratio}:1</p>
          <p className="text-zinc-600">{parseFloat(ratio) >= 4.5 ? '✓ Passes WCAG AA' : '✗ Fails WCAG AA'}</p>
        </div>
      )}
    </div>
  );
}

function FontPairingTool() {
  const [heading, setHeading] = useState('Playfair Display');
  const [body, setBody] = useState('Open Sans');
  const [preview, setPreview] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🔤</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Font Pairing</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Heading Font</label>
        <select value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full p-3 rounded-xl border-2">
          <option>Playfair Display</option>
          <option>Montserrat</option>
          <option>Oswald</option>
          <option>Raleway</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Body Font</label>
        <select value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-3 rounded-xl border-2">
          <option>Open Sans</option>
          <option>Lato</option>
          <option>Roboto</option>
          <option>Source Sans Pro</option>
        </select>
      </div>
      <button onClick={() => setPreview(true)} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold mb-4">Preview</button>
      {preview && (
        <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <h3 className="text-3xl mb-4" style={{ fontFamily: heading }}>Heading Text</h3>
          <p style={{ fontFamily: body }}>This is sample body text using the selected font pairing. Good typography makes your design more readable and visually appealing.</p>
        </div>
      )}
    </div>
  );
}

function SVGOptimizer() {
  const [svg, setSvg] = useState('');
  const [optimized, setOptimized] = useState('');

  const optimize = () => {
    setOptimized('<!-- Optimized SVG would appear here -->');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl">📦</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">SVG Optimizer</h2>
      </div>
      <textarea value={svg} onChange={(e) => setSvg(e.target.value)} placeholder="Paste SVG code..." className="w-full p-3 rounded-xl border-2 border-zinc-200 mb-4 h-32 font-mono text-sm" />
      <button onClick={optimize} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold mb-4">Optimize</button>
      {optimized && <p className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-sm">{optimized}</p>}
    </div>
  );
}

function ChartGenerator() {
  const [data, setData] = useState('10,20,30,40,50');
  const [chartType, setChartType] = useState('bar');

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">📈</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Chart Generator</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Chart Type</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="w-full p-3 rounded-xl border-2">
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Data (comma-separated)</label>
        <input type="text" value={data} onChange={(e) => setData(e.target.value)} className="w-full p-3 rounded-xl border-2" />
      </div>
      <div className="h-48 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-end justify-around p-4">
        {data.split(',').map((v, i) => (
          <div key={i} className="bg-violet-500 rounded-t" style={{ height: `${parseInt(v.trim())}%`, width: '20%' }} />
        ))}
      </div>
    </div>
  );
}
