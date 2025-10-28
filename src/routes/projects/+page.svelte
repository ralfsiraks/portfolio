<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import projects from '$lib/data/projects.js';

  let selected = null;
  let open = false;

  const openModal = (p) => { selected = p; open = true; };
  const closeModal = () => { open = false; };
</script>

<h1>Projects</h1>

<div class="grid">
  {#each projects as p}
    <div
      role="button"
      tabindex="0"
      style="cursor:pointer"
      onclick={(e) => { e.preventDefault(); openModal(p); }}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(p);
        }
      }}
      aria-label={`Open ${p.title} details`}
    >
      <ProjectCard {...p} />
    </div>
  {/each}
</div>

<Modal {open} onClose={closeModal}>
  {#if selected}
    <img class="hero" src={selected.image} alt={selected.title} />
    <div class="content">
      <h2>{selected.title}</h2>
      <p>{selected.longDescription}</p>

      {#if selected.link}
        <a class="visit" href={selected.link} target="_blank" rel="noopener noreferrer">
          Visit project ↗
        </a>
      {/if}

      <button class="close" onclick={closeModal}>Close</button>
    </div>
  {/if}
</Modal>

<style lang="scss">
h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0;
}

.grid {
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  margin: 3rem;
}

/* modal inner layout */
.hero {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  user-select: none;
}

.content {
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
}

.visit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 500;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: 1px solid #333;
  background: #151515;
  color: #eaeaea;
  transition:
    transform 0.5s cubic-bezier(0.5, 0.05, 0.2, 1),
    border-color 0.2s ease;
}

.visit:hover {
  transform: translateY(-2px);
  border-color: #444;
}

.close {
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  justify-self: start;
  margin-top: 0.25rem;
  padding: 0.45rem 2rem;
  background: transparent;
  color: #cfcfcf;
  border: 1px solid #333;
  border-radius: 10px;
  transition:
    transform 0.3s cubic-bezier(0.5, 0.05, 0.2, 1),
    border-color 0.2s ease;
}

.close:hover {
  transform: translateY(-1px);
  border-color: #444;
}

@media (min-width: 900px) {
  :global(.modal .panel) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero {
    height: 100%;
    aspect-ratio: unset;
  }
}

</style>
