<p>“Smooth” isn’t the same as “slow”. It’s predictable timing, consistent motion curves, and transitions that explain what just happened. If an element teleports, the user’s mental model breaks. If it glides too long, it feels unresponsive.</p>

<h2>What helped</h2>
<ul>
  <li>Use the same easing for families of interactions</li>
  <li>Shorter durations than you think—200–400ms is plenty</li>
  <li>Animate opacity and transform, avoid layout thrash</li>
</ul>

<h3>Motion timing & easing cheat sheet</h3>
<div class="table-wrap">
  <table>
    <caption>Recommended timings and easing for common UI transitions</caption>
    <thead>
      <tr>
        <th scope="col">Interaction</th>
        <th scope="col">Enter (ms)</th>
        <th scope="col">Exit (ms)</th>
        <th scope="col">Easing</th>
        <th scope="col">Animate</th>
        <th scope="col">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Button hover/press</td>
        <td>120–180</td>
        <td>90–140</td>
        <td>ease-out / ease-in</td>
        <td>opacity, scale</td>
        <td>Immediate tactile feedback.</td>
      </tr>
      <tr>
        <td>Tooltip / dropdown</td>
        <td>150–220</td>
        <td>120–180</td>
        <td>cubic-bezier(0.2, 0, 0, 1)</td>
        <td>opacity, translateY</td>
        <td>Keep movement short.</td>
      </tr>
      <tr>
        <td>Modal / drawer</td>
        <td>240–320</td>
        <td>180–240</td>
        <td>ease-out / ease-in</td>
        <td>opacity, translate</td>
        <td>Backdrop slightly faster.</td>
      </tr>
      <tr>
        <td>Page transition</td>
        <td>280–400</td>
        <td>220–320</td>
        <td>cubic-bezier(0.2, 0, 0, 1)</td>
        <td>opacity, small translate</td>
        <td>Prefer subtle motion.</td>
      </tr>
      <tr>
        <td>Card/image reveal</td>
        <td>200–280</td>
        <td>—</td>
        <td>ease-out</td>
        <td>opacity, translateY</td>
        <td>Use on initial load only.</td>
      </tr>
      <tr>
        <td>Staggered list</td>
        <td>160–220</td>
        <td>—</td>
        <td>ease-out</td>
        <td>opacity, translateY</td>
        <td>Stagger 30–60ms.</td>
      </tr>
      <tr>
        <td>State change</td>
        <td>180–240</td>
        <td>140–200</td>
        <td>ease-out / ease-in</td>
        <td>opacity, scale</td>
        <td>Avoid layout shifts.</td>
      </tr>
    </tbody>
  </table>
</div>

<p>Clarity first, then flair.</p>

<style>
  .table-wrap {
    margin: 1rem 0 1.5rem;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  caption {
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  th, td {
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid #4b5563;
    vertical-align: top;
  }

  thead th {
    font-weight: 600;
    border-bottom: 1px solid #6b7280;
  }
</style>
