<script>
  // Svelte 5 (runes) — JS only
  const initial = () => ({
    name: '',
    email: '',
    subject: '',
    message: '',
    agree: false
  });

  let form = $state(initial());
  let errors = $state({});
  let sent = $state(false);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateField(key, value) {
    switch (key) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters.';
      case 'email':
        return EMAIL_RE.test(value.trim()) ? '' : 'Please enter a valid email address.';
      case 'subject':
        return value.trim().length >= 3 ? '' : 'Subject must be at least 3 characters.';
      case 'message':
        return value.trim().length >= 10 ? '' : 'Message must be at least 10 characters.';
      case 'agree':
        return value ? '' : 'Please confirm you agree to the terms.';
      default:
        return '';
    }
  }

  function validateAll() {
    const next = {};
    for (const [k, v] of Object.entries(form)) {
      const msg = validateField(k, v);
      if (msg) next[k] = msg;
    }
    errors = next;
    return Object.keys(next).length === 0;
  }

  function handleInput(key, value) {
    form = { ...form, [key]: value };
    // live-validate just this field
    const msg = validateField(key, value);
    errors = { ...errors, [key]: msg };
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;
    // Fake send
    sent = true;
      // reset form after “send”
      form = initial();
      errors = {};
  }
</script>

<h1>GET IN TOUCH</h1>

<div class="container">
    {#if sent}
      <p class="banner success" role="status">
        Thanks! Your (pretend) message was submitted successfully. ✨
      </p>
    {/if}
<form class="contactForm" onsubmit={onSubmit} novalidate>
  <div class="field">
    <label for="name">Name *</label>
    <input
      id="name"
      name="name"
      type="text"
      placeholder="Your name"
      value={form.name}
      oninput={(e) => handleInput('name', e.currentTarget.value)}
      aria-invalid={!!errors.name}
      aria-describedby="name-error"
      required
    />
    {#if errors.name}<p id="name-error" class="error">{errors.name}</p>{/if}
  </div>

  <div class="field">
    <label for="email">Email *</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="you@example.com"
      value={form.email}
      oninput={(e) => handleInput('email', e.currentTarget.value)}
      aria-invalid={!!errors.email}
      aria-describedby="email-error"
      required
    />
    {#if errors.email}<p id="email-error" class="error">{errors.email}</p>{/if}
  </div>

  <div class="field">
    <label for="subject">Subject *</label>
    <input
      id="subject"
      name="subject"
      type="text"
      placeholder="What’s this about?"
      value={form.subject}
      oninput={(e) => handleInput('subject', e.currentTarget.value)}
      aria-invalid={!!errors.subject}
      aria-describedby="subject-error"
      required
    />
    {#if errors.subject}<p id="subject-error" class="error">{errors.subject}</p>{/if}
  </div>

  <div class="field">
    <label for="message">Message *</label>
    <textarea
      id="message"
      name="message"
      rows="6"
      placeholder="Tell me a bit about your project..."
      oninput={(e) => handleInput('message', e.currentTarget.value)}
      aria-invalid={!!errors.message}
      aria-describedby="message-error"
      required
    >{form.message}</textarea>
    {#if errors.message}<p id="message-error" class="error">{errors.message}</p>{/if}
  </div>

  <div class="check">
    <label class="checkbox">
      <input
        type="checkbox"
        checked={form.agree}
        onchange={(e) => handleInput('agree', e.currentTarget.checked)}
        aria-invalid={!!errors.agree}
        aria-describedby="agree-error"
        required
      />
      <span>This doesn't do anything, but you have to agree to this*</span>
    </label>
    {#if errors.agree}<p id="agree-error" class="error">{errors.agree}</p>{/if}
  </div>

  <div class="actions">
    <button type="submit" class="submit">Send message</button>
    <p class="hint">* Required fields</p>
  </div>
</form>
</div>
<style lang="scss">

h1 {
  animation: fadeUp 0.5s cubic-bezier(0.5, 0.05, 0.2, 1) forwards;
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0;
}

.container {
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner {
  width: 40%;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: #131313;
  color: #e5e5e5;
  animation: fadeUp 0.5s cubic-bezier(0.5, 0.05, 0.2, 1) forwards;
}

.success {
  border-color: #2e7d32;
  background: #102315;
}

.contactForm {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  animation: fadeUp 0.5s cubic-bezier(0.5, 0.05, 0.2, 1) forwards;
}

.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

label {
  font-size: 0.95rem;
  color: #cfcfcf;
}

textarea {
  min-height: 50px;
  min-width: 300px;
}

input,
textarea {
  width: 100%;
  font: inherit;
  color: #e5e5e5;
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: .8rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: #7a7a7a;
}

input:focus,
textarea:focus {
  border-color: $orange-accent; /* $orange-accent if tokens are global */
  box-shadow: 0 0 0 3px rgba(255, 76, 36, 0.15);
}

.error {
  margin: -0.2rem 0 0;
  font-size: 0.85rem;
  color: #ff6b6b;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  user-select: none;
}

.checkbox input {
  width: 18px;
  height: 18px;
  accent-color: #ff4c24;
  cursor: pointer;
}

.actions {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.1rem;
  border-radius: 10px;
  border: 1px solid #333;
  background: #151515;
  color: #eaeaea;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.25s cubic-bezier(0.5, 0.05, 0.2, 1),
    border-color 0.2s ease;
}

.submit:hover {
  transform: translateY(-1px);
  border-color: #444;
}

.hint {
  color: #9a9a9a;
  font-size: 0.9rem;
}


/* mobile */
@media (max-width: 720px) {
  .contactForm {
    grid-template-columns: 1fr;
    margin: 1.25rem;
    gap: 1rem;
  }
}
</style>
