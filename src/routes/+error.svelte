<script>
  // SvelteKit provides these to +error.svelte
  export let error;
  export let status;
</script>

<section class="error">
  {#if status === 404}
    <h2>This page does not exist.</h2>
  {:else}
    <h2>Something went wrong.</h2>
    {#if error?.message}
      <p class="reason">{error.message}</p>
    {/if}
  {/if}
  <a href="/">← Back home</a>
</section>

<style lang="scss">
.error {
  text-align: center;
  padding: 6rem 2rem;
  display: grid;
  place-items: center;
  gap: 1rem;

  h2 { font-size: 1.5rem; font-weight: 400; opacity: .85; }
  .reason { opacity: .65; max-width: 42rem; }

  a {
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: 0 100%;
  transition: background-size .35s cubic-bezier(.5,.05,.2,1);
  }

  a:hover { background-size: 100% 1px; }
}
</style>
