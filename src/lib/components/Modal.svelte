<script>
  let { open = false, title = '', onClose = () => {}, children } = $props();
  let panel = $state(null);
  let scrollY = 0;
  let visible = $state(false);

  // Manage fade in/out mounting
  $effect(() => {
    if (open) {
      visible = true;   // mount immediately
      lockScroll();
      queueMicrotask(() => $panel?.focus());
    } else {
      // fade out then unmount
      const timeout = setTimeout(() => (visible = false), 200); // match fadeOut animation
      unlockScroll();
      return () => clearTimeout(timeout);
    }
  });

  const lockScroll = () => {
    scrollY = window.scrollY || document.documentElement.scrollTop;
    const b = document.body;
    b.style.position = 'fixed';
    b.style.top = `-${scrollY}px`;
    b.style.left = '0';
    b.style.right = '0';
    b.style.width = '100%';
  };

  const unlockScroll = () => {
    const b = document.body;
    b.style.position = '';
    b.style.top = '';
    b.style.left = '';
    b.style.right = '';
    b.style.width = '';
    window.scrollTo(0, scrollY);
  };

  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  const onBackdropClick = (e) => { if (e.target === e.currentTarget) onClose(); };
</script>


{#if visible}
  <div
    class="modal {open ? 'fade-in' : 'fade-out'}"
    role="dialog"
    aria-modal="true"
    aria-label={title}
    tabindex="0"
    onclick={onBackdropClick}
    onkeydown={onKey}
  >
    <div class="panel" bind:this={$panel} tabindex="-1">
      {@render children?.()}
    </div>
  </div>
{/if}

<style lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,.6);
  padding: 2rem;
  animation: fadeIn .2s ease-out;

  
  &.fade-in {
    animation-name: fadeIn;
  }
  &.fade-out {
    animation-name: fadeOut;
    animation-duration: .2s;
  }
}
.panel {
  width: min(1200px, 100%);
  background: #111; color: #eaeaea;
  border: 1px solid #222; border-radius: 14px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.4);
}
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
@keyframes fadeOut {
  from { opacity: 1 }
  to { opacity: 0 }
}
</style>
