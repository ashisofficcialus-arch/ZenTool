import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - ZenTool',
  description: 'ZenTool Cookie Policy - Learn about the cookies we use and how to manage them.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🍪</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-zinc-500 mt-2">Last updated: April 2026</p>
        </div>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit websites. They help remember your preferences and improve your browsing experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">2. Cookies We Use</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-semibold text-green-700 dark:text-green-400">Essential Cookies</h3>
                <p className="text-sm mt-1">Required for basic site functionality. These cannot be disabled as they are necessary for the site to work.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400">Analytics Cookies</h3>
                <p className="text-sm mt-1">Help us understand how visitors use our site. This data is anonymous and helps us improve.</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-semibold text-purple-700 dark:text-purple-400">Preference Cookies</h3>
                <p className="text-sm mt-1">Remember your settings and preferences for a personalized experience.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">3. Managing Cookies</h2>
            <p>You can control or delete cookies in your browser settings. Here's how:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy → Clear browsing data</li>
              <li><strong>Firefox:</strong> Options → Privacy → Clear Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy → Clear browsing data</li>
            </ul>
            <p className="mt-3 text-sm">Note: Disabling cookies may affect some site features.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">4. Third-Party Cookies</h2>
            <p>We do not use third-party advertising cookies. Any third-party services we use only collect anonymous, aggregated data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">5. Updates to Policy</h2>
            <p>We may update this Cookie Policy occasionally. Any changes will be posted on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">6. Contact</h2>
            <p>Questions about our Cookie Policy? Contact us at:</p>
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