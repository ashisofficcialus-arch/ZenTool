'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
}

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'install',
      title: 'Install App',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>At ZenTool, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Data Collection</h4>
            <p>We collect minimal data necessary for our tools to function. No personal information is stored unless you explicitly provide it.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Cookies</h4>
            <p>We use essential cookies to improve your experience. You can disable cookies in your browser settings.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Third-Party</h4>
            <p>We do not share your data with third parties except as required for service functionality.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
    {
      id: 'about',
      title: 'About Us',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">ZenTool</h3>
              <p className="text-zinc-500">Version 1.0.0</p>
            </div>
          </div>
          <p>ZenTool is a free online toolkit with 97+ tools designed to boost your productivity. Our mission is to make powerful utilities accessible to everyone.</p>
          <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">97+</p>
              <p className="text-xs">Tools</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">12</p>
              <p className="text-xs">Categories</p>
            </div>
          </div>
          <p className="text-center text-zinc-500">© 2026 ZenTool. All rights reserved.</p>
        </div>
      ),
    },
    {
      id: 'cookie',
      title: 'Cookie Policy',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>We use cookies to enhance your experience. This policy explains how we use cookies.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Essential Cookies</h4>
            <p>Required for basic site functionality. These cannot be disabled.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Analytics</h4>
            <p>We use anonymous analytics to understand how visitors use our site.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Managing Cookies</h4>
            <p>You can disable cookies in your browser. This may affect some features.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>By using ZenTool, you agree to these terms.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Use of Service</h4>
            <p>Our tools are provided free for personal and commercial use.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Limitations</h4>
            <p>You may not misuse our tools or attempt to gain unauthorized access.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Disclaimer</h4>
            <p>Tools are provided "as is" without warranty. Use at your own risk.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'install') {
      const handler = (e: Event) => {
        e.preventDefault();
        const prompt = e as any;
        prompt.prompt();
        prompt.userChoice.then(({ outcome }: any) => {
          if (outcome === 'accepted') console.log('PWA installed');
        });
      };
      window.addEventListener('beforeinstallprompt', handler);
      setTimeout(() => window.removeEventListener('beforeinstallprompt', handler), 1000);
    } else {
      setActiveItem(id);
      setOpen(true);
    }
  };

  const currentItem = menuItems.find(item => item.id === activeItem);

  return (
    <>
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer transition-all"
          >
            <span className="text-purple-500">{item.icon}</span>
            {item.title}
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-6 z-50 animate-scaleIn">
            <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {currentItem?.title || 'Menu'}
            </Dialog.Title>
            {currentItem?.content && <div>{currentItem.content}</div>}
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </>
  );
}

export function MenuButtonStandalone() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'install',
      title: 'Install App',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>At ZenTool, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Data Collection</h4>
            <p>We collect minimal data necessary for our tools to function. No personal information is stored unless you explicitly provide it.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Cookies</h4>
            <p>We use essential cookies to improve your experience. You can disable cookies in your browser settings.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Third-Party</h4>
            <p>We do not share your data with third parties except as required for service functionality.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
    {
      id: 'about',
      title: 'About Us',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">ZenTool</h3>
              <p className="text-zinc-500">Version 1.0.0</p>
            </div>
          </div>
          <p>ZenTool is a free online toolkit with 97+ tools designed to boost your productivity. Our mission is to make powerful utilities accessible to everyone.</p>
          <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">97+</p>
              <p className="text-xs">Tools</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">12</p>
              <p className="text-xs">Categories</p>
            </div>
          </div>
          <p className="text-center text-zinc-500">© 2026 ZenTool. All rights reserved.</p>
        </div>
      ),
    },
    {
      id: 'cookie',
      title: 'Cookie Policy',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>We use cookies to enhance your experience. This policy explains how we use cookies.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Essential Cookies</h4>
            <p>Required for basic site functionality. These cannot be disabled.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Analytics</h4>
            <p>We use anonymous analytics to understand how visitors use our site.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Managing Cookies</h4>
            <p>You can disable cookies in your browser. This may affect some features.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>By using ZenTool, you agree to these terms.</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Use of Service</h4>
            <p>Our tools are provided free for personal and commercial use.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Limitations</h4>
            <p>You may not misuse our tools or attempt to gain unauthorized access.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Disclaimer</h4>
            <p>Tools are provided "as is" without warranty. Use at your own risk.</p>
          </div>
          <p className="text-xs text-zinc-500">Last updated: April 2026</p>
        </div>
      ),
    },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'install') {
      const handler = (e: Event) => {
        e.preventDefault();
        const prompt = e as any;
        prompt.prompt();
        prompt.userChoice.then(({ outcome }: any) => {
          if (outcome === 'accepted') console.log('PWA installed');
        });
      };
      window.addEventListener('beforeinstallprompt', handler);
      setTimeout(() => window.removeEventListener('beforeinstallprompt', handler), 1000);
    } else {
      setActiveItem(id);
      setOpen(true);
    }
  };

  const currentItem = menuItems.find(item => item.id === activeItem);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="fixed top-4 right-4 z-40 p-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all transform hover:scale-105">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-6 z-50 animate-scaleIn">
            <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {currentItem?.title || 'Menu'}
            </Dialog.Title>
            {currentItem?.content ? (
              <div>{currentItem.content}</div>
            ) : (
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer transition-all"
                  >
                    <span className="text-purple-500">{item.icon}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            )}
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </>
  );
}