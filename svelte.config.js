import adapter from '@sveltejs/adapter-static';
import path from 'path';
const config = {
  kit: {
    adapter: adapter(),
    prerender: { entries: ['*'] }
  },
  vite: {
    resolve: {
      alias: {
        $lib: path.resolve('./src/lib')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          // ✅ This makes tokens available in every <style lang="scss">
          additionalData: `@use "$lib/styles/tokens" as *;`
        }
      }
    }
  }
};

export default config;
