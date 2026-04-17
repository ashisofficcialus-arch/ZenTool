'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function MenuButton() {
  const [open, setOpen] = useState(false);

  const handleInstall = async () => {
    const handler = (e: Event) => {
      e.preventDefault();
      const prompt = e as BeforeInstallPromptEvent;
      prompt.prompt();
      prompt.userChoice.then(({ outcome }) => {
        if (outcome === 'accepted') {
          console.log('PWA installed');
        }
      });
    };
    window.addEventListener('beforeinstallprompt', handler);
    setTimeout(() => window.removeEventListener('beforeinstallprompt', handler), 1000);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="fixed top-4 right-4 z-40 p-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all transform hover:scale-105">
          <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[200px] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-2 z-50 animate-slideDown">
          
          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer outline-none transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Install App
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 my-2" />

          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer outline-none transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Privacy Policy
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer outline-none transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Us
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer outline-none transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Cookie Policy
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 my-2" />

          <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer outline-none transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Terms of Service
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>

      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </DropdownMenu.Root>
  );
}