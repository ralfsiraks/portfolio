<script>
  import posts from '$lib/data/blog.js';
</script>

<h1>Blog</h1>

<section class="grid">
  {#each posts as p, i}
    <a class="post" href={`/blog/posts/${p.slug}`} style={`--i:${i}`}>
      <h3>{p.title}</h3>
      <p class="meta">
        {p.date}
        {#if p.tags?.length} · {p.tags.join(' / ')}{/if}
      </p>
      <p class="excerpt">{p.excerpt}</p>
      <span class="more">Read →</span>
    </a>
  {/each}
</section>

<style lang="scss">
h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0 1rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 1.25rem;
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding: 0 1.25rem;
}

.post {
  display: grid;
  gap: .4rem;
  padding: 1rem 1.1rem;
  background: #111;
  border: 1px solid #222;
  border-radius: 14px;
  color: inherit;
  text-decoration: none;
  transition: transform .35s cubic-bezier(.5,.05,.2,1), border-color .2s ease;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
  animation-delay: calc(var(--i, 0) * 70ms);
}
.post:hover {
  transform: translateY(-2px);
  border-color: #333;
}

h3 { margin: 0; font-weight: 600; }
.meta { color: #a9a9a9; font-size: .9rem; }
.excerpt { color: #d8d8d8; }
.more {
  width: min-content;
  text-wrap: nowrap;
  margin-top: .2rem;
  font-weight: 600;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px; background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size .35s cubic-bezier(.5,.05,.2,1);
}
.post:hover .more { background-size: 100% 1px; }

</style>
