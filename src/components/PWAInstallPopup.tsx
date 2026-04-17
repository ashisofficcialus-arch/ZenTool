'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pwa-install-dismissed');
    if (stored) setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!stored) setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleDismiss} />
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden animate-[bounceIn_0.5s_ease-out]">
        <button onClick={handleDismiss} className="absolute top-3 right-3 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-[float_3s_ease-in-out_infinite]">
            <span className="text-4xl">⚡</span>
          </div>
          
          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Install ZenTool
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Add to your home screen for quick access and offline support!
          </p>
          
          <div className="flex gap-3">
            <button onClick={handleDismiss} className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              Not now
            </button>
            <button onClick={handleInstall} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25">
              Install
            </button>
          </div>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 animate-[shimmer_2s_infinite]" />
      </div>
      
      <style jsx global>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}