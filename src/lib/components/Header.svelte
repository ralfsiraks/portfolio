<script>
  import { page } from '$app/stores';

  $: path = $page.url.pathname.replace(/\/+$/, '') || '/';
  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href));

  let menuOpen = false;        // intent: open/close
  let drawerVisible = false;   // actually mounted?
  let closing = false;         // playing slide-out?

  // open/close helpers
  function openMenu() {
    drawerVisible = true;
    closing = false;
    menuOpen = true;
  }
  function startClose() {
    if (!drawerVisible) return;
    closing = true;            // play slide-out
    menuOpen = false;
  }

  function handleNav(e, href) {
    if ($page.url.pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    startClose();
  }

  // burger click
  const toggleMenu = () => (menuOpen ? startClose() : openMenu());

  // after slide-out ends, unmount
  function onDrawerAnimEnd() {
    if (closing) {
      drawerVisible = false;
      closing = false;
    }
  }
</script>

<header>
  <a href="/" class="logo-link" aria-label="Home" onclick={startClose}>
    <img class="logo" src="/images/eye.png" alt="Logo" />
  </a>

  <nav class="desktop">
    <ul>
      <li><a class="nav-link" class:is-active={isActive('/')} href="/" onclick={(e)=>handleNav(e,'/')}>Home</a></li>
      <li><a class="nav-link" class:is-active={isActive('/about')} href="/about" onclick={(e)=>handleNav(e,'/about')}>About</a></li>
      <li><a class="nav-link" class:is-active={isActive('/projects')} href="/projects" onclick={(e)=>handleNav(e,'/projects')}>Projects</a></li>
      <li><a class="nav-link" class:is-active={isActive('/blog')} href="/blog" onclick={(e)=>handleNav(e,'/blog')}>Blog</a></li>
      <li><a class="nav-link" class:is-active={isActive('/message')} href="/message" onclick={(e)=>handleNav(e,'/message')}>Get in touch</a></li>
      <li><a class="nav-link" class:is-active={isActive('/contact')} href="/contact" onclick={(e)=>handleNav(e,'/contact')}>Contact</a></li>
      <li><a class="nav-link" class:is-active={isActive('/cv')} href="/cv" onclick={(e)=>handleNav(e,'/cv')}>CV</a></li>
      <li><a class="nav-link" class:is-active={isActive('/faq')} href="/faq" onclick={(e)=>handleNav(e,'/faq')}>FAQ</a></li>
    </ul>
  </nav>

  <button class="burger" aria-label="Open menu" aria-expanded={menuOpen} onclick={toggleMenu}>
    <img src="/images/burger.png" alt="" />
  </button>
</header>

{#if drawerVisible}
  <div
    class="drawer {closing ? 'slide-out' : 'slide-in'}"
    role="dialog"
    aria-modal="true"
    onanimationend={onDrawerAnimEnd}
  >
    <button class="close" aria-label="Close" onclick={startClose}>×</button>
    <ul>
      <li><a class:is-active={isActive('/')} href="/"         onclick={(e)=>handleNav(e,'/')}>Home</a></li>
      <li><a class:is-active={isActive('/about')} href="/about"   onclick={(e)=>handleNav(e,'/about')}>About</a></li>
      <li><a class:is-active={isActive('/projects')} href="/projects" onclick={(e)=>handleNav(e,'/projects')}>Projects</a></li>
      <li><a class:is-active={isActive('/blog')} href="/blog"     onclick={(e)=>handleNav(e,'/blog')}>Blog</a></li>
      <li><a class:is-active={isActive('/message')} href="/message" onclick={(e)=>handleNav(e,'/message')}>Get in touch</a></li>
      <li><a class:is-active={isActive('/contact')} href="/contact" onclick={(e)=>handleNav(e,'/contact')}>Contact</a></li>
      <li><a class:is-active={isActive('/cv')} href="/cv"       onclick={(e)=>handleNav(e,'/cv')}>CV</a></li>
      <li><a class:is-active={isActive('/faq')} href="/faq"     onclick={(e)=>handleNav(e,'/faq')}>FAQ</a></li>
    </ul>
  </div>
{/if}

<style lang="scss">
header {
  position: sticky; top: 0; z-index: 100; padding: .5rem 2rem;
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1rem;
  background: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.7) 70%, rgba(0,0,0,.3) 85%, rgba(0,0,0,0) 100%);
}
.logo { height: 50px; user-select: none; transition: transform .7s cubic-bezier(.5,.05,.2,1); }
.logo:hover { transform: rotate(180deg); }

nav.desktop { justify-self: center; }
nav.desktop ul { list-style: none; display: flex; gap: 3rem; margin: 0; padding: 0; }

.nav-link {
  position: relative; text-decoration: none; color: inherit; padding-bottom: 4px;
  font-size: 1.5rem; font-weight: 400; text-wrap: nowrap;
  background-image: linear-gradient($orange-accent, $orange-accent);
  background-repeat: no-repeat; background-size: 0% 1px; background-position: 100% 100%;
  transition: background-size .5s cubic-bezier(.8,0,.2,1), background-position 0s;
}
.nav-link.is-active, .nav-link:hover { background-size: 100% 1px; background-position: 0 100%; }

.burger { border: 0; background: transparent; padding: .25rem; cursor: pointer; display: none; }
.burger img { width: 28px; height: 28px; display: block; }

@media (max-width: $bp-lg) {
  header { grid-template-columns: 1fr auto 1fr; }

  nav.desktop { display: none; }

  .logo-link {
    grid-column: 2;
    justify-self: center;
  }

  /* burger on the right */
  .burger {
    display: block;
    grid-column: 3;
    justify-self: end;
  }
}

/* Drawer */
.drawer {
  position: fixed; inset: 0; background: #0e0e0e; z-index: 1000;
  display: grid; grid-template-rows: auto 1fr; padding: 1rem 1.25rem;
}
.drawer.slide-in  { animation: slideIn  .25s cubic-bezier(.4,0,.2,1) forwards; }
.drawer.slide-out { animation: slideOut .25s cubic-bezier(.4,0,.2,1) forwards; }

.drawer .close { justify-self: end; border: 0; background: transparent; color: #e5e5e5; font-size: 2rem; cursor: pointer; }
.drawer ul { list-style: none; margin: .5rem 0 0; padding: 0; display: grid; gap: .75rem; align-content: start; }
.drawer a {
  display: block; padding: .9rem 1rem; text-decoration: none; color: #e5e5e5;
  border: 1px solid #222; border-radius: 12px; background: #111;
  transition: transform .2s cubic-bezier(.5,.05,.2,1), border-color .2s ease;
}
.drawer a:hover, .drawer a.is-active { transform: translateY(-1px); border-color: #2e2e2e; }

@keyframes slideIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes slideOut { from { transform: translateX(0); }     to { transform: translateX(100%); } }
</style>
