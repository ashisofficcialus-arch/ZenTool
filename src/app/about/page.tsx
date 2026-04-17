import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - ZenTool',
  description: 'Learn about ZenTool - 97+ free online tools for everyone.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-purple-200/50 dark:border-purple-800/50 p-8 sm:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            About ZenTool
          </h1>
          <p className="text-zinc-500 mt-2">Version 1.0.0</p>
        </div>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">Who We Are</h2>
            <p>ZenTool is a free online toolkit featuring 97+ tools designed to boost your productivity. Our mission is to make powerful utilities accessible to everyone, anywhere, anytime.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">What We Offer</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {[
                { count: '97+', label: 'Tools', color: 'purple' },
                { count: '12', label: 'Categories', color: 'pink' },
                { count: '100%', label: 'Free', color: 'blue' },
                { count: '∞', label: 'Usage', color: 'green' },
              ].map((stat, i) => (
                <div key={i} className={`p-4 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl text-center`}>
                  <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.count}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">Our Categories</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Utility', 'Finance', 'Security', 'Design', 'Developer', 'SEO', 'Writing', 'Career', 'Media', 'Business', 'Social'].map((cat) => (
                <span key={cat} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  {cat}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">Why ZenTool?</h2>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>✓ Completely free to use</li>
              <li>✓ No registration required</li>
              <li>✓ Privacy-focused</li>
              <li>✓ Regular updates</li>
              <li>✓ Mobile-friendly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">Our Vision</h2>
            <p>We believe that powerful tools should be accessible to everyone. ZenTool is built with the vision of democratizing productivity utilities for students, professionals, developers, and everyday users.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">Contact Us</h2>
            <p>Have suggestions or feedback? We'd love to hear from you!</p>
            <p className="mt-2 font-medium text-purple-600">support@zentool.app</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500">
          <p>© 2026 ZenTool. Made with ❤️ for productivity.</p>
        </div>
      </div>
    </div>
  );
}