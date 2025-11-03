<script>
  // adjust paths based on where you put assets
  const CV_JPG = '/cv/cv.jpg';
  const CV_PDF = '/cv/cv.pdf';

  const downloads = [
    { label: 'Download PDF', href: CV_PDF },
    { label: 'Download JPG', href: CV_JPG }
  ];
</script>

<h1>Curriculum Vitae</h1>

<section class="cv">
  <img src={CV_JPG} alt="Curriculum Vitae preview" class="preview" />

  <div class="actions">
    {#each downloads as d}
      <a class="download" href={d.href} download>{d.label}</a>
    {/each}
  </div>
</section>

<style lang="scss">
h1 {
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin: 3rem 0 2rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

img {
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

.cv {
  display: grid;
  place-items: center;
  margin-bottom: 4rem;
}

.preview {
  width: min(800px, 90vw);
  border: 1px solid #222;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  animation: fadeUp .5s cubic-bezier(.5,.05,.2,1) both;
}

.download {
  border: 1px solid #333;
  padding: .6rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  background: #151515;
  color: #eaeaea;
  transition: transform .3s cubic-bezier(.5,.05,.2,1), border-color .2s ease;
}

.download:hover {
  transform: translateY(-2px);
  border-color: #444;
}

@media (max-width: $bp-xsm) {
  .actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
