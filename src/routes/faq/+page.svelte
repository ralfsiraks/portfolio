<script>
  const faqs = [
    { q:'What stack did you use for this site?', a:`SvelteKit + SCSS, prerendered static.` },
    { q:'Where can I see your projects?', a:`Projects page — click a card to open a modal.` },
    { q:'How do I get in touch?', a:`Use the Get in touch form or the Contact page.` },
    { q:'Can I download your CV?', a:`Yes — see the CV page (PDF & PNG).` },
    { q:'Do you write anywhere?', a:`Short notes live on the Blog.` }
  ];

  let open = null; // index or null

  const toggle = (i) => {
    open = open === i ? null : i;
    // purely class-based; no inline styles
  };
</script>

<h1>FAQ</h1>

<section class="faq">
  {#each faqs as f, i}
    <article class="item" style={`--i:${i}`}>
      <button
        class="accordion"
        class:active={open === i}
        on:click={() => toggle(i)}
        aria-expanded={open === i}
        aria-controls={`panel-${i}`}
        id={`btn-${i}`}
      >
        {f.q}
        <span class="chev" aria-hidden="true">▾</span>
      </button>

      <div
        class="panel"
        class:open={open === i}
        id={`panel-${i}`}
        role="region"
        aria-labelledby={`btn-${i}`}
      >
        <div class="inner">
          <p>{@html f.a}</p>
        </div>
      </div>
    </article>
  {/each}
</section>

<style lang="scss">
/* title styled like your other pages */
h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0 2rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

/* container */
.faq {
  max-width: 860px;
  margin: 0 auto 4rem;
  padding: 0 1.25rem;
  display: grid;
  gap: .85rem;
}

/* card wrapper with staggered fade-up */
.item {
  background: #111;
  border: 1px solid #222;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) forwards;
  animation-delay: calc(var(--i, 0) * 80ms);
}

/* clickable header */
.accordion {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: .75rem;
  padding: .95rem 1rem;
  color: #e5e5e5;
}
.accordion:hover { background: #141414; }
.accordion.active { background: #161616; }
.chev { transition: transform .25s cubic-bezier(.5,.05,.2,1); }
.accordion[aria-expanded="true"] .chev { transform: rotate(180deg); }
.accordion:focus-visible {
  outline: 2px solid #444;
  outline-offset: 2px;
}

/* panel animation with only classes (no inline styles) */
:root { --panel-max: 600px; } /* raise if answers are longer */

.panel {
  display: grid;
  grid-template-rows: 0fr;      /* collapsed height */
  overflow: hidden;             /* clip contents */
  opacity: 0;                   /* fade too */
  padding-block: 0;             /* no vertical padding when closed */
  padding-inline: 1rem;         /* keep the side padding */
  border-top: 1px solid transparent;

  transition:
    grid-template-rows .28s cubic-bezier(.5,.05,.2,1),
    opacity            .28s cubic-bezier(.5,.05,.2,1),
    padding-block      .28s cubic-bezier(.5,.05,.2,1),
    border-top-color   .28s ease;
}

.panel.open {
  grid-template-rows: 1fr;      /* expands to content's natural height */
  opacity: 1;
  padding-block: .75rem;        /* add vertical padding only when open */
  border-top-color: #222;
}

/* the child that actually grows/shrinks */
.panel .inner {
  overflow: hidden;
}
/* fadeUp used across the site */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
