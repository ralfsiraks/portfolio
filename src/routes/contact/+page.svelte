<script>
  const EMAIL = 'it24075@lbtu.lv';
  const PHONE = '+371 12345678';
  const LOCATION_LABEL = 'Rīga, Latvia';
  const MAP_EMBED =
    'https://www.google.com/maps?q=Riga%2C%20Latvia&output=embed';
</script>

<h1>CONTACT</h1>

<section class="contact-wrap">
  <div class="info">

    <dl class="list">
      <div class="row">
        <dt>E-mail</dt>
        <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
      </div>

      <div class="row">
        <dt>Phone</dt>
        <dd><a href={`tel:${PHONE.replace(/\s/g,'')}`}>{PHONE}</a></dd>
      </div>

      <div class="row">
        <dt>Socials</dt>
        <dd class="social">
          <a href="https://github.com/ralfsiraks" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ralfs-%C5%A1iraks-0aa02b289/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/message">Message</a>
        </dd>
      </div>
    </dl>
  </div>

  <div class="map">
    <div class="map-card" aria-label={`Karte:`}>
      <iframe
        title={`Google Maps — Riga`}
        src={MAP_EMBED}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</section>

<style lang="scss">

h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0 1.5rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

.contact-wrap {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto 4rem;
  padding: 0 1.25rem;
}

.info {
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) .06s both;
}

.list {
  display: grid;
  gap: .85rem;
  margin-top: .5rem;
}

.row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: baseline;
  gap: 1rem;
}

dt {
  color: #cfcfcf;
  font-weight: 600;
}

dd {
  margin: 0;
  color: #e5e5e5;
}

a {
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient($orange-accent, $orange-accent);
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: 0 100%;
  transition: background-size .35s cubic-bezier(.5,.05,.2,1);
}
a:hover { background-size: 100% 1px; }

.social {
  display: inline-flex;
  flex-wrap: wrap;
  gap: .75rem 1rem;
}

/* Map block */
.map {
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) .12s both;
}

.map-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}

.map-card iframe {
  display: block;
  width: 100%;
  height: 420px;
  border: 0;
  filter: saturate(.95) contrast(1.05);
}

@media (max-width: 900px) {
  .contact-wrap { grid-template-columns: 1fr; }
  .map-card iframe { height: 360px; }
  .row { grid-template-columns: 120px 1fr; }
}
@media (max-width: 560px) {
  .row { grid-template-columns: 100px 1fr; }
  .map-card iframe { height: 300px; }
}
</style>
