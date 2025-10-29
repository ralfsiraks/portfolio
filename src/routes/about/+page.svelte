<script>
  import timeline from '$lib/data/timeline.js';
</script>

<section class="timeline">
  <div class="rail" aria-hidden="true"></div>

  {#each timeline as event, i}
      <div class="dot" style="grid-row: {i + 1};" aria-hidden="true"></div>
      <div class="date" style="grid-row: {i + 1};">{event.period}</div>
      <div class="card {event.side}" style="grid-row: {i + 1};">
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
  .timeline {
  display: grid;
  grid-template-columns: 1fr 56px 1fr;
  grid-auto-rows: min-content;
  column-gap: 2rem;
  row-gap: 2.2rem;
  max-width: 1100px;
  margin: 2rem auto 3rem;
  padding: 1rem 4rem;
  position: relative;

  .rail {
    grid-column: 2;
    grid-row: 1 / span 4;
    justify-self: center;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.28),
       rgba(255, 255, 255, 0.28)
    );
    position: relative;
  top: 5rem;  // move downward approx half a dot's height
  bottom: 1.5rem; // leave space at bottom too
  height: calc(100% - 10rem); // reduce height by the top+bottom offset combined
  }

  .left {
    grid-column: 1;
    justify-self: end;
  }

  .right {
    grid-column: 3;
    justify-self: start;
  }

  .dot {
    grid-column: 2;
    justify-self: center;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff4c24;
    box-shadow: 0 0 0 3px rgba(255, 76, 36, 0.2);
    align-self: center;
    z-index: 2;
  }

  .date {
    grid-column: 2;
    justify-self: center;
    padding: 0 0.6rem;
    font-size: 0.8rem;
    color: #bbb;
    background: #0e0e0e;
    border: 1px solid #232323;
    border-radius: 999px;
    line-height: 1.8;
    white-space: nowrap;
    transform: translateY(1.5rem);
    align-self: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    width: min(520px, 100%);
    background: #111;
    color: #eaeaea;
    border: 1px solid #222;
    border-radius: 14px;
    padding: 1rem 1.25rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    animation: fadeUp 0.55s cubic-bezier(0.5, 0.05, 0.2, 1) forwards;

    & p {
      margin-top: .5rem;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: .1rem;

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
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 820px) {
    grid-template-columns: 28px 1fr;
    column-gap: 12px;

    .rail,
    .dot,
    .date {
      grid-column: 1;
    }

    .card {
      grid-column: 2;
      justify-self: start;
      margin-left: 2rem;
    }

    .date {
      transform: translateY(-140%);
    }
  }
}
</style>
