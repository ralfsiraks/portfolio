<script>
  import timeline from '$lib/data/timeline.js';
  import { onMount } from 'svelte';

  let container; // .timeline
  let rail;      // .rail

  function positionRail() {
    if (!container || !rail) return;
    const dots = container.querySelectorAll('.dot');
    if (!dots.length) return;

    const c = container.getBoundingClientRect();
    const first = dots[0].getBoundingClientRect();
    const last  = dots[dots.length - 1].getBoundingClientRect();

    // center of first/last dots relative to container
    const firstCenter = first.top - c.top + first.height / 2;
    const lastCenter  = last.top  - c.top + last.height  / 2;

    const top = Math.max(0, firstCenter);
    const height = Math.max(0, lastCenter - firstCenter);

    rail.style.setProperty('--rail-top', `${top}px`);
    rail.style.setProperty('--rail-height', `${height}px`);
  }

  function rafPosition() {
    // Run twice to catch layout shifts (fonts, images)
    requestAnimationFrame(() => {
      positionRail();
      requestAnimationFrame(positionRail);
    });
  }

  onMount(() => {
    rafPosition();
    const ro = new ResizeObserver(rafPosition);
    ro.observe(document.documentElement);
    ro.observe(container);
    window.addEventListener('load', rafPosition);
    window.addEventListener('resize', rafPosition);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', rafPosition);
      window.removeEventListener('resize', rafPosition);
    };
  });
</script>

<h1>TIMELINE</h1>

<section class="timeline" bind:this={container}>
  <!-- real, absolutely positioned rail -->
  <div class="rail" bind:this={rail} aria-hidden="true"></div>

  {#each timeline as event, i}
    <div class="dot"  style="grid-row: {i + 1}" aria-hidden="true"></div>
    <div class="date" style="grid-row: {i + 1}">{event.period}</div>

    <div class="card {event.side}" style="grid-row: {i + 1}; animation-delay: {i * 120}ms;">
      <h3>{event.title}</h3>
      <h4>{event.subtitle}</h4>
      <p>{event.body}</p>
      <ul class="tags">
        {#each event.tags as tag}
          <li>{tag}</li>
        {/each}
      </ul>
    </div>
  {/each}
</section>

<style lang="scss">
h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0 2rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

.timeline {
  position: relative; /* anchor for the rail */

  display: grid;
  grid-template-columns: 1fr 56px 1fr; /* left | rail | right */
  grid-auto-rows: min-content;
  column-gap: 2rem;
  row-gap: 2.2rem;

  max-width: 1100px;
  margin: 2rem auto 3rem;
  padding: 1rem 4rem;

  /* --- RAIL (absolute; top/height set via JS) --- */
  .rail {
    position: absolute;
    /* desktop: center on middle column */
    left: 50%;
    transform: translateX(-50%);

    width: 2px;
    top: var(--rail-top, 0px);
    height: var(--rail-height, 100%);

    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.28),
      rgba(255, 255, 255, 0.28)
    );

    pointer-events: none;
    will-change: transform, height, top;
  }

  /* sides for cards */
  .left  { grid-column: 1; justify-self: end;  }
  .right { grid-column: 3; justify-self: start; }

  /* dot centered in the middle column */
  .dot {
    grid-column: 2;
    justify-self: center;
    align-self: center;

    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff4c24;
    box-shadow: 0 0 0 3px rgba(255, 76, 36, 0.2);
    z-index: 2;
  }

  /* date pill */
  .date {
    grid-column: 2;
    justify-self: center;
    align-self: center;

    padding: 0 0.6rem;
    font-size: 0.8rem;
    color: #bbb;
    background: #0e0e0e;
    border: 1px solid #232323;
    border-radius: 999px;
    line-height: 1.8;
    white-space: nowrap;
    transform: translateY(1.5rem);
    user-select: none;
  }

  /* card */
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    width: min(520px, 100%);
    background: #111;
    color: #eaeaea;
    border: 1px solid #222;
    border-radius: 14px;
    padding: 1rem 1.25rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

    animation: fadeUp 0.55s cubic-bezier(0.5, 0.05, 0.2, 1) forwards;
    animation-fill-mode: both;

    & p { margin-top: 0.5rem; }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.1rem;

    li {
      padding: 0.25rem 0.5rem;
      border: 1px solid #2a2a2a;
      border-radius: 999px;
      font-size: 0.8rem;
      color: #cfcfcf;
      background: #141414;
      list-style: none;
    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Mobile: 2 columns (gutter/rail | content) */
  @media (max-width: $bp-md) {
    grid-template-columns: 30px 1fr;  /* gutter (rail ~15px center) | content */
    column-gap: 12px;

    .dot,
    .date { grid-column: 1; }

    .card {
      grid-column: 2;
      justify-self: start;
      margin-left: 2rem;
    }

    .date { transform: translateY(100%); }

    /* pin rail to the gutter center (15px from left) */
    .rail {
      grid-column: 1;
      left: 15px;
    }
  }
}
</style>
