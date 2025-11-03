<script>
  let { open = false, onClose = () => {}, children } = $props();

  let visible = $state(false);
  let hideTimer = null;
  const DURATION = 400; // ms — change once, used in CSS via --dur too

  $effect(() => {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

    if (open) {
      visible = true; // mount instantly
    } else if (visible) {
      // fade out then unmount
      hideTimer = setTimeout(() => {
        hideTimer = null;
        if (!open) visible = false; // only unmount if not reopened
      }, DURATION);
    }
  });

  const handleClose = () => onClose();
</script>

{#if visible}
  <div
    class="modal {open ? 'fade-in' : 'fade-out'}"
    style={`--dur:${DURATION}ms`}
    role="dialog"
    aria-modal="true"
    aria-label="Project details"
    tabindex="0"
    onclick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    onkeydown={(e) => { if (e.key === 'Escape') handleClose(); }}
  >
    <div class="panel">
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
  background: rgba(0, 0, 0, 0.6);
  animation-duration: .4s;
  animation-fill-mode: forwards;
}

.panel {
  margin: 5rem;
  max-width: 1200px;
  background: #111;
  color: #eaeaea;
  border: 1px solid #222;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.fade-in {
  animation-name: fadeUp;
}

.fade-out {
  animation-name: fadeDown;
}

@media (min-width: $bp-md) {
  .modal .panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: $bp-sm) {
  .panel {
      margin: 2rem;
  }
}

</style>
