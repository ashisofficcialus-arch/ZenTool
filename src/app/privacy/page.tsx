import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ZenTool',
  description: 'ZenTool Privacy Policy - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 mt-2">Last updated: April 2026</p>
        </div>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">1. Introduction</h2>
            <p>At ZenTool, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">2. Data Collection</h2>
            <p>We collect minimal data necessary for our tools to function. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Session data for tool functionality</li>
              <li>Local storage preferences you set</li>
              <li>Anonymous analytics data</li>
            </ul>
            <p className="mt-2">We do not collect personal information unless you explicitly provide it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">3. Cookies</h2>
            <p>We use essential cookies to improve your experience. These cookies are necessary for the website to function and cannot be switched off.</p>
            <div className="mt-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <p className="text-sm"><strong>Cookie Types:</strong></p>
              <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                <li>Essential - Required for basic functionality</li>
                <li>Analytics - Anonymous usage statistics</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">4. Data Usage</h2>
            <p>We use collected data for:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Providing and improving our tools</li>
              <li>Analyzing usage patterns</li>
              <li>Enhancing user experience</li>
              <li>Technical troubleshooting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">5. Third-Party Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Service providers who assist our operations</li>
              <li>Legal obligations when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">6. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access your data</li>
              <li>Request data deletion</li>
              <li>Opt-out of analytics</li>
              <li>Disable cookies in browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">8. Changes to Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2 font-medium text-purple-600">support@zentool.app</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500">
          <p>© 2026 ZenTool. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}