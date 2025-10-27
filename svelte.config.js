import adapter from '@sveltejs/adapter-static';
import preprocessor from 'svelte-preprocess';
const config = {
  kit: {
    adapter: adapter(),           // no server adapter
    prerender: { entries: ['*'] } // crawl links & export every reachable page
  },
  preprocess: preprocessor()
};

export default config;
