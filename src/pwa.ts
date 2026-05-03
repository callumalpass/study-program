import { registerSW } from 'virtual:pwa-register';

export function registerPwa(): void {
  if (import.meta.env.DEV) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .then((results) => {
          if (results.some(Boolean) && navigator.serviceWorker.controller) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.warn('Failed to unregister development service worker:', error);
        });
    }

    if ('caches' in window) {
      window.caches.keys()
        .then((keys) => Promise.all(keys.map((key) => window.caches.delete(key))))
        .catch((error) => {
          console.warn('Failed to clear development caches:', error);
        });
    }

    return;
  }

  registerSW({
    immediate: true,
    onRegisteredSW(swUrl, registration) {
      if (!registration) return;

      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      console.info(`PWA service worker registered: ${swUrl}`);
    },
    onRegisterError(error) {
      console.error('PWA service worker registration failed:', error);
    },
  });
}
