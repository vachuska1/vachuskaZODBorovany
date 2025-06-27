'use client';

import { useEffect } from 'react';

export default function FacebookSDK() {
  useEffect(() => {
    // Load Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      // Only run on client-side
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v18.0';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.nonce = 'RANDOM_STRING';
        document.body.appendChild(script);

        return () => {
          // Cleanup
          document.body.removeChild(script);
        };
      }
    };

    loadFacebookSDK();
  }, []);

  return <div id="fb-root"></div>;
}
