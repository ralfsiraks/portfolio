<script>
  import posts from '$lib/data/blog.js';
  import { page } from '$app/stores';
  let { children } = $props();

  // last path segment after /blog/posts/...
  const slug = $derived($page.url.pathname.split('/').filter(Boolean).pop());
  const post = $derived(posts.find((p) => p.slug === slug));
</script>

<nav class="blog-nav">
  <a href="/blog" aria-label="Back to blog">← Back to Blog</a>
</nav>

{#if post}
  <article class="post">
    <header class="head">
      <h1>{post.title}</h1>
      <p class="meta">
        <span class="date">{post.date}</span>
        {#if post.tags?.length}
          <span class="tags">
            {#each post.tags as t}<span class="tag">{t}</span>{/each}
          </span>
        {/if}
      </p>
    </header>

    <section class="content">
      {@render children?.()}
    </section>
  </article>
{:else}
  <!-- If someone visits /blog/posts without a slug (just in case) -->
  <div class="post-missing">
    <p>Post not found.</p>
    <p><a href="/blog">Go back to the blog</a></p>
  </div>
{/if}

<style lang="scss">
.blog-nav {
  max-width: 860px;
  margin: 2rem auto 0.5rem;
  padding: 0 1.25rem;
}
.blog-nav a {
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: 0 100%;
  transition: background-size .35s cubic-bezier(.5,.05,.2,1);
}
.blog-nav a:hover { background-size: 100% 1px; }

.post {
  max-width: 860px;
  margin: 0 auto 4rem;
  padding: 0 1.25rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}
.head { margin: 2.5rem 0 1rem; }
.head h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  margin: 0 0 .35rem;
}
.meta { color: #a9a9a9; font-size: .95rem; }

.tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: .45rem .65rem;
  margin-left: .4rem;
}
.tag {
  padding: .15rem .5rem;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  font-size: .8rem;
  color: #cfcfcf;
  background: #141414;
}

.content {
  background: #111;
  border: 1px solid #222;
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}

/* descendants come from child pages → mark them global */
.content :global(h2) {
  margin-top: 1.2rem;
  font-weight: 600;
}
.content :global(p) {
  color: #e5e5e5;
  line-height: 1.7;
}
.content :global(ul) {
  margin: .6rem 0 1rem 1.25rem;
}


.post-missing {
  max-width: 860px;
  margin: 3rem auto;
  padding: 0 1.25rem;
  color: #cfcfcf;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
