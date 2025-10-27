import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const config = {
  kit: {
    adapter: adapter(),           // no server adapter
    prerender: { entries: ['*'] } // crawl links & export every reachable page
  },
  preprocess: preprocess({
    scss: {
      prependData: `@use 'src/lib/styles/_tokens.scss' as *;`
    }
  }),
};

export default config;
