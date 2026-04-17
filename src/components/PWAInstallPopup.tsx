'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem('pwa-install-dismissed');
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
      }
    } else {
      alert('To install ZenTool:\n\n• On Mobile: Tap Share → Add to Home Screen\n• On Desktop: Look for install icon in address bar');
    }
    setShow(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!mounted || !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={handleDismiss} />
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        <button onClick={handleDismiss} className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 animate-pulse-slow opacity-75" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
              <span className="text-5xl">⚡</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full blur-md" />
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Install ZenTool App
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
            Add to your home screen for instant access, offline support, and a native app experience!
          </p>
          
          <div className="flex gap-3 mb-2">
            <button onClick={handleDismiss} className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all transform hover:scale-[1.02]">
              Maybe Later
            </button>
            <button onClick={handleInstall} className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
              Install Now
            </button>
          </div>
          
          {deferredPrompt ? (
            <p className="text-xs text-green-500">✓ Available for installation</p>
          ) : (
            <p className="text-xs text-zinc-400">Tap Install to add to your device</p>
          )}
        </div>
        
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}