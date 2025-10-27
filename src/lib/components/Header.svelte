<script>
  import { page } from '$app/stores';
  $: path = $page.url.pathname.replace(/\/+$/, '') || '/';
  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href));
</script>

<header>
  <nav>
    <div>
      <a href="/" class="logo-link">
        <img class="logo" src="/images/eye.png" alt="Logo" />
      </a>
    </div>
    <div>
      <ul>
        <li><a class="nav-link" class:is-active={isActive('/')} href="/">Home</a></li>
        <li><a class="nav-link" class:is-active={isActive('/about')} href="/about">About me</a></li>
        <li><a class="nav-link" class:is-active={isActive('/projects')} href="/projects">Projects</a></li>
        <li><a class="nav-link" class:is-active={isActive('/contact')} href="/contact">Contact</a></li>
      </ul>
    </div>
  </nav>
</header>

<style lang="scss">

header {
  font-family: "PP Neue Montreal", system-ui, sans-serif;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.5rem 2rem;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.logo {
  height: 50px;
  width: auto;
  transition: transform .7s cubic-bezier(0.5, 0.05, 0.2, 1);
  user-select: none;

  &:hover { cursor: pointer; transform: rotate(180deg); }
}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  ul {
    list-style: none;
    display: flex;
    gap: 3rem;
  }

  div { width: 100%; }
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: inherit;
  padding-bottom: 4px;
  font-size: 1.5rem;
  font-weight: 400;

  /* animated underline */
  background-image: linear-gradient($orange-accent, $orange-accent);
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: 100% 100%;
  transition:
    background-size .5s cubic-bezier(0.8, 0.0, 0.2, 1),
    background-position 0s;

  &.is-active,
  &:hover {
    background-size: 100% 1px;
    background-position: 0 100%;
  }
}
</style>
