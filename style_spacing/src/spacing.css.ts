import { CSSResult, css } from 'lit';

const remTokens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function computePaddingsRem(): CSSResult[] {
  const paddings: CSSResult[] = [];
  for (const rem of remTokens) {
    paddings.push(css`
      .pa-${rem}--rem {
        padding: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pt-${rem}--rem {
        padding-top: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pb-${rem}--rem {
        padding-bottom: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pl-${rem}--rem {
        padding-left: ${rem}rem;
      }
    `);
    paddings.push(css`
      .pr-${rem}--rem {
        padding-right: ${rem}rem;
      }
    `);
    paddings.push(css`
      .px-${rem}--rem {
        padding-right: ${rem}rem;
        padding-left: ${rem}rem;
      }
    `);
    paddings.push(css`
      .py-${rem}--rem {
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
      .ma-${rem}--rem {
        margin: ${rem}rem;
      }
    `);
    margins.push(css`
      .mt-${rem}--rem {
        margin-top: ${rem}rem;
      }
    `);
    margins.push(css`
      .mb-${rem}--rem {
        margin-bottom: ${rem}rem;
      }
    `);
    margins.push(css`
      .ml-${rem}--rem {
        margin-left: ${rem}rem;
      }
    `);
    margins.push(css`
      .mr-${rem}--rem {
        margin-right: ${rem}rem;
      }
    `);
    margins.push(css`
      .mx-${rem}--rem {
        margin-right: ${rem}rem;
        margin-left: ${rem}rem;
      }
    `);
    margins.push(css`
      .my-${rem}--rem {
        margin-top: ${rem}rem;
        margin-bottom: ${rem}rem;
      }
    `);
  }

  return margins;
}

export const marginsRem = computeMarginsRem();
export const paddingsRem = computePaddingsRem();
