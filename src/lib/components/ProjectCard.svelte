<script>
  // Svelte 5 runes-style props
  let { title, description, href, image, tag = '' } = $props();
</script>

<a class="project-card" href={href} aria-label={`Open ${title}`}>
  <img class="thumb" src={image} alt={title} loading="lazy" />
  <div class="info">
    {#if tag}<span class="tag">{tag}</span>{/if}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
</a>

<style lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  text-decoration: none;
  background: #151515;
  color: #E5E5E5;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 1rem;
  transition: transform .5s cubic-bezier(0.5, 0.05, 0.2, 1), 
              border-color .2s ease;
  will-change: transform;

  &:hover { transform: translateY(-6px) scale(1.02); border-color: #333; }

  .thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
    background: #0e0e0e;
    user-select: none;
  }

  .info { 
    display: flex; 
    flex-direction: column; 
    gap: .25rem; 
  }
  
  .tag  { font-size: .75rem; letter-spacing: .06em; text-transform: uppercase; color: #aaa; }

  h3 { font-weight: 500; margin: 0; }
  p  { margin: 0; color: #cfcfcf; font-size: .95rem; line-height: 1.4; }
}
</style>
