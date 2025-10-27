<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.scss'; // global SCSS
</script>

<svelte:head>
  <title>Ralfs — Portfolio</title>
</svelte:head>

<Header />
<main><slot /></main>
<Footer />
