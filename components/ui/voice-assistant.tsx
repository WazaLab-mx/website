'use client';

import { useEffect, useState } from 'react';

interface VoiceAssistantProps {
  agentId: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id': string;
          'region': string;
        },
        HTMLElement
      >;
    }
  }
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function VoiceAssistant({ agentId }: VoiceAssistantProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const handleWidgetError = (event: any) => {
      console.error('ElevenLabs widget error:', event);
      if (event.detail?.error) {
        const errorMessage = event.detail.error;
        if (errorMessage.includes('authorize') || errorMessage.includes('permission')) {
          setError('Agent authorization failed. Please check that your ElevenLabs agent is set to Public and Authentication is Disabled in the Advanced settings.');
        } else {
          setError(`Widget error: ${errorMessage}`);
        }
      }
    };

    const addPreconnect = () => {
      // Add preconnect for ElevenLabs domains
      ['https://elevenlabs.io'].forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    const loadScript = () => {
      addPreconnect();

      // Check if script is already loaded
      const scriptUrl = 'https://elevenlabs.io/convai-widget/index.js';
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      if (existingScript) {
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.type = 'text/javascript';

      script.onload = () => {
        console.log('ElevenLabs widget script loaded successfully');
        setIsLoading(false);
        setError(null);

        // Add event listeners for widget errors
        document.addEventListener('elevenlabs-convai:error', handleWidgetError);

        // Check for widget initialization
        setTimeout(() => {
          if (!customElements.get('elevenlabs-convai')) {
            console.warn('Widget custom element not registered after load');
            // Try to force a re-render
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 100);
          }
        }, 1000);
      };

      script.onerror = (e) => {
        console.error('Failed to load ElevenLabs widget script, attempt:', retryCount + 1, e);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadScript, 2000 * retryCount);
        } else {
          setError('Failed to load the ElevenLabs widget. Please try refreshing the page or check your internet connection.');
          setIsLoading(false);
        }
      };

      document.body.appendChild(script);
    };

    if (typeof window !== 'undefined') {
      setIsMounted(true);

      // Check for AudioWorklet support
      if (!window.AudioWorklet) {
        setError('Your browser does not support AudioWorklet. Please use a modern browser like Chrome, Firefox, or Edge.');
        setIsLoading(false);
        return;
      }

      // Check if the browser supports the required features
      const checkBrowserSupport = () => {
        if (!window.WebSocket) {
          return 'Your browser does not support WebSocket connections.';
        }
        if (!window.AudioContext && !window.webkitAudioContext) {
          return 'Your browser does not support AudioContext.';
        }
        return null;
      };

      const browserError = checkBrowserSupport();
      if (browserError) {
        setError(browserError);
        setIsLoading(false);
        return;
      }

      loadScript();
    }

    return () => {
      // Clean up scripts and preconnect links
      const scriptUrl = 'https://elevenlabs.io/convai-widget/index.js';
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      // Remove event listeners
      document.removeEventListener('elevenlabs-convai:error', handleWidgetError);

      ['https://elevenlabs.io'].forEach(domain => {
        const preconnect = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
        if (preconnect) {
          document.head.removeChild(preconnect);
        }
      });
    };
  }, []);

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <p className="text-foreground">Loading ElevenLabs widget...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg shadow-lg max-w-sm">
        <p className="text-gray-600 dark:text-gray-200 text-sm mb-2">{error}</p>
        {error.includes('authorization') && (
          <div className="text-xs text-gray-500 dark:text-gray-300 mb-3">
            <p className="mb-1">Quick fix:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Set agent to "Public" in Advanced settings</li>
              <li>Disable "Authentication" in Advanced settings</li>
              <li>Add your domain to Security allowlist</li>
            </ul>
          </div>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 underline"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <elevenlabs-convai
        agent-id={agentId}
        region="us"
      ></elevenlabs-convai>
    </div>
  );
}