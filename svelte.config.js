import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter(),           // no server adapter
    prerender: { entries: ['*'] } // crawl links & export every reachable page
  }
};

export default config;
