import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ZenTool',
  description: 'ZenTool Terms of Service - Terms and conditions for using ZenTool.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">📜</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-zinc-500 mt-2">Last updated: April 2026</p>
        </div>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using ZenTool, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">2. Use of Service</h2>
            <p>ZenTool provides free online tools for both personal and commercial use. You may:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use our tools for any lawful purpose</li>
              <li>Access all features available on the site</li>
              <li>Share links to our tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">3. Prohibited Activities</h2>
            <p>You may not:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use tools for illegal purposes</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Upload malicious content</li>
              <li>Scrape or copy tool functionality</li>
              <li>Resell our services without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">4. Intellectual Property</h2>
            <p>The content, design, and code of ZenTool are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify our content without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">5. Disclaimer</h2>
            <p>Our tools are provided "as is" without warranty of any kind. We do not guarantee the accuracy, reliability, or completeness of any tool results. Use at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">6. Limitation of Liability</h2>
            <p>ZenTool shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">7. User Data</h2>
            <p>You are responsible for any data you input into our tools. We recommend not entering sensitive personal information into any tool.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of ZenTool constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">9. Termination</h2>
            <p>We may terminate or suspend access to our service without prior notice for any violation of these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">10. Contact</h2>
            <p>Questions about these terms? Contact us at:</p>
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