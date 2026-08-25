'use client';

import { useEffect } from 'react';

const localApiPrefix = 'http://127.0.0.1:4000/api/v1';

export default function ApiUrlBridge() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);
    const publicApiBase = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

    window.fetch = (input, init) => {
      if (typeof input === 'string' && input.startsWith(localApiPrefix)) {
        input = `${publicApiBase}${input.slice(localApiPrefix.length)}`;
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
