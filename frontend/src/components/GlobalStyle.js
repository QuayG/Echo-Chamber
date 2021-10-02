import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --background-dark: #111;
    --background-light: #222;
    --accent: #484747;
    --accent-light: #666;
    --neutral-dark: #414040;
    --neutral-light: #efefef;
    --error: var(--accent);

    --size-xxs: 2px;
    --size-xs: 4px;
    --size-s: 8px;
    --size-m: 12px;
    --size-l: 16px;
    --size-xl: 24px;
    --size-xxl: 32px;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    font-family: monospace;
  }
`