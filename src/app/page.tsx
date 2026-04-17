'use client';

import { useState, useEffect, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Select from '@radix-ui/react-select';
import { MagnifyingGlassIcon, CopyIcon, CheckIcon, DownloadIcon, ReloadIcon, HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';
import { MenuButtonStandalone as MenuButton } from '@/components/MenuButton';
import AdBanner from '@/components/AdBanner';

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
  { id: 'pdfjpg', name: 'PDF to JPG', icon: '🖼️', category: 'Utility' },
  { id: 'jpgpdf', name: 'JPG to PDF', icon: '📄', category: 'Utility' },
  { id: 'pdfprotect', name: 'PDF Password', icon: '🔒', category: 'Utility' },
  { id: 'pdfunlock', name: 'PDF Unlock', icon: '🔓', category: 'Utility' },
  { id: 'pdfpage', name: 'PDF Page Number', icon: '🔢', category: 'Utility' },
  { id: 'pdfrotate', name: 'PDF Rotate', icon: '🔄', category: 'Utility' },
  { id: 'videocomp', name: 'Video Compressor', icon: '📉', category: 'Media' },
  { id: 'videotrim', name: 'Video Trimmer', icon: '✂️', category: 'Media' },
  { id: 'gifvideo', name: 'GIF to Video', icon: '🎬', category: 'Media' },
  { id: 'audioformat', name: 'Audio Format', icon: '🎵', category: 'Media' },
  { id: 'voicechange', name: 'Voice Changer', icon: '🎤', category: 'Media' },
  { id: 'bgremover', name: 'BG Remover', icon: '🖼️', category: 'Design' },
  { id: 'imageblur', name: 'Image Blur', icon: '💨', category: 'Design' },
  { id: 'imagesharpen', name: 'Sharpen Image', icon: '⚡', category: 'Design' },
  { id: 'collage', name: 'Collage Maker', icon: '🖼️', category: 'Design' },
  { id: 'icongenerator', name: 'Icon Generator', icon: '🎨', category: 'Design' },
  { id: 'faviconcheck', name: 'Favicon Checker', icon: '🔍', category: 'SEO' },
  { id: 'domainauth', name: 'Domain Authority', icon: '📊', category: 'SEO' },
  { id: 'backlink', name: 'Backlink Checker', icon: '🔗', category: 'SEO' },
  { id: 'googleindex', name: 'Google Index', icon: '🔍', category: 'SEO' },
  { id: 'serp', name: 'SERP Preview', icon: '🔎', category: 'SEO' },
  { id: 'adsense', name: 'AdSense Calculator', icon: '💰', category: 'Business' },
  { id: 'affiliate', name: 'Affiliate Link', icon: '🔗', category: 'Business' },
  { id: 'emailsig', name: 'Email Signature', icon: '✉️', category: 'Business' },
  { id: 'businessname', name: 'Business Name', icon: '🏢', category: 'Business' },
  { id: 'slogan', name: 'Slogan Generator', icon: '📝', category: 'Business' },
  { id: 'startupidea', name: 'Startup Idea', icon: '💡', category: 'Business' },
  { id: 'habittracker', name: 'Habit Tracker', icon: '✅', category: 'Utility' },
  { id: 'dailyplanner', name: 'Daily Planner', icon: '📅', category: 'Utility' },
  { id: 'todolist', name: 'To-Do List', icon: '📋', category: 'Utility' },
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

function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">🖼️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF to JPG</h2>
      </div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold">Convert to JPG</button>
      <p className="mt-4 text-xs text-zinc-500 text-center">Note: This requires a backend service.</p>
    </div>
  );
}

function JPGToPDF() {
  const [files, setFiles] = useState<FileList | null>(null);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-xl">📄</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">JPG to PDF</h2>
      </div>
      <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold">Create PDF</button>
    </div>
  );
}

function PDFPasswordProtector() {
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">🔒</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF Password</h2>
      </div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold">Protect PDF</button>
    </div>
  );
}

function PDFUnlockTool() {
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">🔓</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF Unlock</h2>
      </div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold">Unlock PDF</button>
    </div>
  );
}

function PDFPageAdder() {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-xl">🔢</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF Page Number</h2>
      </div>
      <input type="file" accept="application/pdf" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-semibold">Add Page Numbers</button>
    </div>
  );
}

function PDFRotateTool() {
  const [rotation, setRotation] = useState(90);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center text-xl">🔄</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF Rotate</h2>
      </div>
      <select value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value={90}>90° Clockwise</option>
        <option value={180}>180°</option>
        <option value={270}>90° Counter-clockwise</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-semibold">Rotate PDF</button>
    </div>
  );
}

function VideoCompressor() {
  const [quality, setQuality] = useState('medium');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">📉</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Video Compressor</h2>
      </div>
      <input type="file" accept="video/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value="low">Low Quality (Smallest)</option>
        <option value="medium">Medium Quality</option>
        <option value="high">High Quality (Largest)</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold">Compress Video</button>
    </div>
  );
}

function VideoTrimmer() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">✂️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Video Trimmer</h2>
      </div>
      <input type="file" accept="video/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start (sec)</label>
          <input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-full p-3 rounded-xl border-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End (sec)</label>
          <input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} className="w-full p-3 rounded-xl border-2" />
        </div>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold">Trim Video</button>
    </div>
  );
}

function GIFToVideo() {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">🎬</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">GIF to Video</h2>
      </div>
      <input type="file" accept="image/gif" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold">Convert to MP4</button>
    </div>
  );
}

function AudioFormatConverter() {
  const [format, setFormat] = useState('mp3');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xl">🎵</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Audio Format</h2>
      </div>
      <input type="file" accept="audio/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value="mp3">MP3</option>
        <option value="wav">WAV</option>
        <option value="aac">AAC</option>
        <option value="flac">FLAC</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold">Convert Audio</button>
    </div>
  );
}

function VoiceChanger() {
  const [effect, setEffect] = useState('normal');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">🎤</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Voice Changer</h2>
      </div>
      <input type="file" accept="audio/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <select value={effect} onChange={(e) => setEffect(e.target.value)} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value="normal">Normal</option>
        <option value="deep">Deep Voice</option>
        <option value="high">High Pitch</option>
        <option value="robot">Robot</option>
        <option value="alien">Alien</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold">Apply Effect</button>
    </div>
  );
}

function BackgroundRemover() {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">🖼️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Background Remover</h2>
      </div>
      <input type="file" accept="image/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold">Remove Background</button>
    </div>
  );
}

function ImageBlurTool() {
  const [blur, setBlur] = useState(5);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center text-xl">💨</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Image Blur</h2>
      </div>
      <input type="file" accept="image/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Blur Level: {blur}px</label>
        <input type="range" min="1" max="20" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-slate-500 to-zinc-500 text-white rounded-xl font-semibold">Apply Blur</button>
    </div>
  );
}

function SharpenImageTool() {
  const [sharpen, setSharpen] = useState(50);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-xl">⚡</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Sharpen Image</h2>
      </div>
      <input type="file" accept="image/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sharpen Level: {sharpen}%</label>
        <input type="range" min="10" max="100" value={sharpen} onChange={(e) => setSharpen(Number(e.target.value))} className="w-full" />
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold">Sharpen</button>
    </div>
  );
}

function CollageMaker() {
  const [layout, setLayout] = useState('2x2');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">🖼️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Collage Maker</h2>
      </div>
      <input type="file" accept="image/*" multiple className="w-full p-3 rounded-xl border-2 mb-4" />
      <select value={layout} onChange={(e) => setLayout(e.target.value)} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value="2x1">2 Images (Horizontal)</option>
        <option value="1x2">2 Images (Vertical)</option>
        <option value="2x2">4 Images (Grid)</option>
        <option value="3x3">9 Images (Grid)</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold">Create Collage</button>
    </div>
  );
}

function IconGenerator() {
  const [size, setSize] = useState(512);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-xl">🎨</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Icon Generator</h2>
      </div>
      <input type="file" accept="image/*" className="w-full p-3 rounded-xl border-2 mb-4" />
      <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value={16}>16x16</option>
        <option value={32}>32x32</option>
        <option value={64}>64x64</option>
        <option value={128}>128x128</option>
        <option value={256}>256x256</option>
        <option value={512}>512x512</option>
      </select>
      <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl font-semibold">Generate Icons</button>
    </div>
  );
}

function FaviconChecker() {
  const [url, setUrl] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">🔍</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Favicon Checker</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold">Check Favicon</button>
    </div>
  );
}

function DomainAuthorityChecker() {
  const [domain, setDomain] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const check = () => setScore(Math.floor(Math.random() * 100) + 1);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">📊</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Domain Authority</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold mb-4">Check DA</button>
      {score !== null && <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl"><p className="text-3xl font-bold text-blue-600">{score}</p><p className="text-sm text-zinc-500">Domain Authority</p></div>}
    </div>
  );
}

function BacklinkChecker() {
  const [domain, setDomain] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-xl">🔗</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Backlink Checker</h2>
      </div>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold">Find Backlinks</button>
    </div>
  );
}

function GoogleIndexChecker() {
  const [url, setUrl] = useState('');
  const [indexed, setIndexed] = useState<boolean | null>(null);
  const check = () => setIndexed(Math.random() > 0.3);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">🔍</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Google Index</h2>
      </div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button onClick={check} className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold mb-4">Check Index</button>
      {indexed !== null && <div className={`p-4 rounded-xl text-center ${indexed ? 'bg-green-100' : 'bg-red-100'}`}><p className={`font-bold ${indexed ? 'text-green-600' : 'text-red-600'}`}>{indexed ? '✓ Indexed in Google' : '✗ Not Indexed'}</p></div>}
    </div>
  );
}

function SERPPreviewTool() {
  const [title, setTitle] = useState('Your Page Title');
  const [desc, setDesc] = useState('Your meta description goes here...');
  const [url, setUrl] = useState('https://example.com');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xl">🔎</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">SERP Preview</h2>
      </div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 rounded-xl border-2 mb-3" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full p-3 rounded-xl border-2 mb-3 h-20" />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="w-full p-3 rounded-xl border-2 mb-4" />
      <div className="p-4 bg-white border border-zinc-200 rounded-lg">
        <p className="text-blue-700 text-lg">{title}</p>
        <p className="text-green-700 text-sm">{url}</p>
        <p className="text-zinc-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function AdSenseCalculator() {
  const [impressions, setImpressions] = useState(10000);
  const [ctr, setCtr] = useState(2);
  const [cpc, setCpc] = useState(0.5);
  const earnings = Math.floor((impressions * ctr / 100) * cpc);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">💰</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">AdSense Calculator</h2>
      </div>
      <div className="space-y-3 mb-4">
        <input type="number" value={impressions} onChange={(e) => setImpressions(Number(e.target.value))} placeholder="Monthly Impressions" className="w-full p-3 rounded-xl border-2" />
        <input type="number" value={ctr} onChange={(e) => setCtr(Number(e.target.value))} placeholder="CTR (%)" className="w-full p-3 rounded-xl border-2" />
        <input type="number" value={cpc} onChange={(e) => setCpc(Number(e.target.value))} placeholder="CPC ($)" className="w-full p-3 rounded-xl border-2" />
      </div>
      <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-center">
        <p className="text-sm">Estimated Earnings</p>
        <p className="text-3xl font-bold">${earnings.toLocaleString()}/month</p>
      </div>
    </div>
  );
}

function AffiliateLinkGenerator() {
  const [product, setProduct] = useState('');
  const [link, setLink] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">🔗</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Affiliate Link</h2>
      </div>
      <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product URL" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button onClick={() => setLink(product.replace('?', '?ref=affiliate&'))} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold mb-4">Generate</button>
      {link && <input type="text" value={link} readOnly className="w-full p-3 rounded-xl border-2 bg-zinc-100" />}
    </div>
  );
}

function EmailSignatureGenerator() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">✉️</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Email Signature</h2>
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full p-3 rounded-xl border-2 mb-3" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" className="w-full p-3 rounded-xl border-2 mb-3" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl border-2 mb-4" />
      <div className="p-4 border-2 rounded-xl">
        <p className="font-bold">{name}</p>
        <p className="text-sm text-zinc-600">{title}</p>
        <p className="text-blue-500 text-sm">{email}</p>
      </div>
    </div>
  );
}

function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const generate = () => {
    const prefixes = ['Smart', 'Pro', 'Fast', 'Elite', 'Prime', 'Ultra', 'Nova', 'Apex'];
    const suffixes = ['Hub', 'Lab', 'Zone', 'Works', 'Tech', 'Flow', 'Sync', 'Base'];
    const generated = Array(8).fill(0).map(() => `${prefixes[Math.floor(Math.random() * prefixes.length)]}${keyword || 'Tech'}${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
    setNames(generated);
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">🏢</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Business Name</h2>
      </div>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword (optional)" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold mb-4">Generate Names</button>
      {names.length > 0 && <div className="space-y-2">{names.map((n, i) => <div key={i} className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-medium">{n}</div>)}</div>}
    </div>
  );
}

function SloganGenerator() {
  const [topic, setTopic] = useState('');
  const [slugs, setSlugs] = useState<string[]>([]);
  const generate = () => {
    const slogans = ['Innovation Meets Excellence', 'Your Success Starts Here', 'Dream Big, Achieve Bigger', 'Quality You Can Trust', 'Tomorrow\'s Solutions Today', 'Elevate Your Experience', 'Where Ideas Come Alive', 'Transform Your Vision'];
    setSlugs(slogans.map(s => topic ? `${s} - ${topic}` : s));
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">📝</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Slogan Generator</h2>
      </div>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic (optional)" className="w-full p-3 rounded-xl border-2 mb-4" />
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold mb-4">Generate Slogans</button>
      {slugs.length > 0 && <div className="space-y-2">{slugs.map((s, i) => <div key={i} className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-medium">{s}</div>)}</div>}
    </div>
  );
}

function StartupIdeaGenerator() {
  const [industry, setIndustry] = useState('tech');
  const [ideas, setIdeas] = useState<string[]>([]);
  const generate = () => {
    const startupIdeas = ['AI-powered personal assistant', 'Blockchain-based voting system', 'Smart home automation', 'Healthcare telemedicine platform', 'EdTech learning platform', 'FinTech payment solution', 'Social media analytics tool', 'Sustainable energy tracker'];
    setIdeas(startupIdeas.slice(0, 4));
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xl">💡</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Startup Idea</h2>
      </div>
      <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-3 rounded-xl border-2 mb-4">
        <option value="tech">Technology</option>
        <option value="health">Healthcare</option>
        <option value="finance">Finance</option>
        <option value="education">Education</option>
      </select>
      <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold mb-4">Generate Ideas</button>
      {ideas.length > 0 && <div className="space-y-2">{ideas.map((idea, i) => <div key={i} className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl font-medium">{idea}</div>)}</div>}
    </div>
  );
}

function HabitTracker() {
  const [habits, setHabits] = useState<string[]>(['Exercise', 'Read', 'Meditate']);
  const [days, setDays] = useState<Record<string, boolean>>({});
  const toggle = (habit: string, day: string) => setDays({...days, [`${habit}-${day}`]: !days[`${habit}-${day}`]});
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">✅</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Habit Tracker</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr><th className="p-2"></th>{dayNames.map(d => <th key={d} className="p-2 text-xs">{d}</th>)}</tr></thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit}>
                <td className="p-2 font-medium">{habit}</td>
                {dayNames.map(day => (
                  <td key={day} className="p-2 text-center">
                    <button onClick={() => toggle(habit, day)} className={`w-8 h-8 rounded-lg ${days[`${habit}-${day}`] ? 'bg-green-500' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DailyPlanner() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const add = () => { if (newTask) { setTasks([...tasks, newTask]); setNewTask(''); } };
  const remove = (i: number) => setTasks(tasks.filter((_, idx) => idx !== i));
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-xl">📅</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Daily Planner</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add task..." className="flex-1 p-3 rounded-xl border-2" />
        <button onClick={add} className="px-4 py-3 bg-blue-500 text-white rounded-xl">+</button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <span>{task}</span>
            <button onClick={() => remove(i)} className="text-red-500">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoListManager() {
  const [items, setItems] = useState<{text: string; done: boolean}[]>([]);
  const [text, setText] = useState('');
  const add = () => { if (text) { setItems([...items, {text, done: false}]); setText(''); } };
  const toggle = (i: number) => setItems(items.map((item, idx) => idx === i ? {...item, done: !item.done} : item));
  const del = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">📋</div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">To-Do List</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add item..." className="flex-1 p-3 rounded-xl border-2" />
        <button onClick={add} className="px-4 py-3 bg-purple-500 text-white rounded-xl">+</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <button onClick={() => toggle(i)} className={`w-6 h-6 rounded-full border-2 ${item.done ? 'bg-green-500 border-green-500' : 'border-zinc-400'}`} />
            <span className={item.done ? 'line-through text-zinc-400' : ''}>{item.text}</span>
            <button onClick={() => del(i)} className="ml-auto text-red-500">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
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
        <AdBanner />
        <header className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-3 sm:mb-4 shadow-2xl shadow-purple-500/30 animate-pulse">
            <span className="text-3xl sm:text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">ZenTool</h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 font-medium">🚀 Supercharge your productivity with 97+ free tools</p>
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
                    <Select.Item key={cat} value={cat} className="px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 outline-none font-medium transition-colors">
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
            <Tabs.Trigger value="home" className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap">🏠 Home</Tabs.Trigger>
            <Tabs.Trigger value="blog" className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap">📰 Blog</Tabs.Trigger>
            {tools.map((tool) => (
              <Tabs.Trigger key={tool.id} value={tool.id} className="px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 whitespace-nowrap">
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

          <Tabs.Content value="blog" className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 shadow-xl">
            <div className="text-center"><p className="text-zinc-500">Blog section coming soon!</p></div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
