<script>
  import { onMount } from 'svelte';
  let time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  let t;
  onMount(() => {
  t = setInterval(() => {
    time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  }, 1000);
  return () => clearInterval(t);
});
</script>

<footer>
  <div class="footer-bottom">
    <p>@ralfsiraks</p>
    <p>Copyright © 2025</p>
    <p id="liveTime">{time}</p>
  </div>
</footer>

<style lang="scss">

footer {
  padding: 2rem 2rem;

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;

    > p:first-child { text-transform: none; }
  }
}
</style>
