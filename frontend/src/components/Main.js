import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-rows: 25% 10% 10% 5% 5% 15%;
  place-items: center;
  grid-gap: var(--size-xxl);
  padding: var(--size-xl);
  height: 100%;
  width: 100%;
  text-align: center;
  overflow-y: scroll;
`