'use client';

import Script from 'next/script';

export default function AdBanner() {
  return (
    <>
      <Script
        src="https://quge5.com/88/tag.min.js"
        data-zone="230611"
        async
        data-cfasync="false"
        strategy="afterInteractive"
      />
    </>
  );
}