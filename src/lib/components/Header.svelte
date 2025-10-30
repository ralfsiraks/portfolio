<script>
  import { page } from '$app/stores';
  $: path = $page.url.pathname.replace(/\/+$/, '') || '/';
  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href));

    function handleNav(e, href) {
    if ($page.url.pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
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
        <li><a class="nav-link" class:is-active={isActive('/')} href="/" onclick={(e) => handleNav(e, '/')}>Home</a></li>
        <li><a class="nav-link" class:is-active={isActive('/about')} href="/about" onclick={(e) => handleNav(e, '/about')}>About me</a></li>
        <li><a class="nav-link" class:is-active={isActive('/projects')} href="/projects" onclick={(e) => handleNav(e, '/projects')}>Projects</a></li>
        <li><a class="nav-link" class:is-active={isActive('/message')} href="/message" onclick={(e) => handleNav(e, '/message')}>Get In Touch</a></li>
        <li><a class="nav-link" class:is-active={isActive('/contact')} href="/contact" onclick={(e) => handleNav(e, '/contact')}>Contact</a></li>
      </ul>
    </div>
  </nav>
</header>

<style lang="scss">
header {
  font-family: "PP Neue Montreal", system-ui, sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.5rem 2rem;
  background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 1) 0%,   /* stronger opacity */
  rgba(0, 0, 0, 0.70) 70%,  /* start easing out */
  rgba(0, 0, 0, 0.30) 85%,  /* start easing out */
  rgba(0, 0, 0, 0.00) 100%  /* fully transparent */
);
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
  text-wrap: nowrap;

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
