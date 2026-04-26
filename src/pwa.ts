import { registerSW } from 'virtual:pwa-register';

export function registerPwa(): void {
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
