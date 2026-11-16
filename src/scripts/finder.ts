import { litSquares } from '../lib/mosaic.ts';
import { matchesTokens } from '../lib/search.ts';

const input = document.querySelector<HTMLInputElement>('#finder-input');
const count = document.querySelector<HTMLElement>('#finder-count');
const empty = document.querySelector<HTMLElement>('#finder-empty');
const shown = document.querySelector<HTMLElement>('#finder-shown');
const squares = [...document.querySelectorAll<HTMLElement>('[data-mosaic] > span')];
const rows = [...document.querySelectorAll<HTMLElement>('[data-finder-row]')].map((element) => ({
  element,
  tokens: (element.dataset.tokens ?? '').split(' '),
}));

if (input && count && empty && shown) {
  const update = () => {
    let hits = 0;
    for (const { element, tokens } of rows) {
      const hit = matchesTokens(tokens, input.value);
      element.hidden = !hit;
      if (hit) hits++;
    }
    count.textContent = `${hits} of ${rows.length} entries`;
    empty.hidden = hits > 0;
    shown.textContent = input.value.trim().toLowerCase() || 'everything';
    litSquares(input.value, hits, rows.length).forEach((lit, i) => squares[i]?.toggleAttribute('data-lit', lit));
  };

  input.addEventListener('input', update);
  update();
}
