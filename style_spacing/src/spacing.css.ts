import { CSSResult, css, unsafeCSS } from 'lit';

const remTokens = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const pxTokens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ,30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

function computePaddingsRem(): CSSResult[] {
  const paddings: CSSResult[] = [];
  for (const rem of remTokens) {
    paddings.push(css`
      .pa-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pt-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-top: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pb-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-bottom: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pl-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-left: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pr-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-right: ${rem}rem;
      }
    `);
    paddings.push(css`
      .px-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-right: ${rem}rem;
        padding-left: ${rem}rem;
      }
    `);
    paddings.push(css`
      .py-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        padding-top: ${rem}rem;
        padding-bottom: ${rem}rem;
      }
    `);
  }
  return paddings;
}

function computeMarginsRem(): CSSResult[] {
  const margins: CSSResult[] = [];
  for (const rem of remTokens) {
    // Margins
    margins.push(css`
      .ma-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin: ${rem}rem;
      }
    `);
    margins.push(css`
      .mt-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-top: ${rem}rem;
      }
    `);
    margins.push(css`
      .mb-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-bottom: ${rem}rem;
      }
    `);
    margins.push(css`
      .ml-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-left: ${rem}rem;
      }
    `);
    margins.push(css`
      .mr-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-right: ${rem}rem;
      }
    `);
    margins.push(css`
      .mx-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-right: ${rem}rem;
        margin-left: ${rem}rem;
      }
    `);
    margins.push(css`
      .my-${unsafeCSS(rem.toString().replace('.', ''))}--rem {
        margin-top: ${rem}rem;
        margin-bottom: ${rem}rem;
      }
    `);
  }

  return margins;
}

function computePaddingsPx(): CSSResult[] {
  const paddings: CSSResult[] = [];
  for (const px of pxTokens) {
    paddings.push(css`
      .pa-${px}--px {
        padding: ${px}px;
      }
    `);
    paddings.push(css`
      .pt-${px}--px {
        padding-top: ${px}px;
      }
    `);
    paddings.push(css`
      .pb-${px}--px {
        padding-bottom: ${px}px;
      }
    `);
    paddings.push(css`
      .pl-${px}--px {
        padding-left: ${px}px;
      }
    `);
    paddings.push(css`
      .pr-${px}--px {
        padding-right: ${px}px;
      }
    `);
    paddings.push(css`
      .px-${px}--rem {
        padding-right: ${px}px;
        padding-left: ${px}px;
      }
    `);
    paddings.push(css`
      .py-${px}--px {
        padding-top: ${px}px;
        padding-bottom: ${px}px;
      }
    `);
  }
  return paddings;
}

function computeMarginsPx(): CSSResult[] {
  const margins: CSSResult[] = [];
  for (const px of pxTokens) {
    // Margins
    margins.push(css`
      .ma-${px}--px {
        margin: ${px}px;
      }
    `);
    margins.push(css`
      .mt-${px}--px {
        margin-top: ${px}px;
      }
    `);
    margins.push(css`
      .mb-${px}--px {
        margin-bottom: ${px}px;
      }
    `);
    margins.push(css`
      .ml-${px}--px {
        margin-left: ${px}px;
      }
    `);
    margins.push(css`
      .mr-${px}--px {
        margin-right: ${px}px;
      }
    `);
    margins.push(css`
      .mx-${px}--px {
        margin-right: ${px}px;
        margin-left: ${px}px;
      }
    `);
    margins.push(css`
      .my-${px}--px {
        margin-top: ${px}px;
        margin-bottom: ${px}px;
      }
    `);
  }

  return margins;
}

export const marginsRem = computeMarginsRem();
export const paddingsRem = computePaddingsRem();
export const marginsPx = computeMarginsPx();
export const paddingsPx = computePaddingsPx();
