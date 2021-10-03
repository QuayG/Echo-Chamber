import styled from "styled-components/macro";
import {css} from "styled-components";

export default styled.button`
  padding: var(--size-m);
  background: var(--neutral-dark);
  border: 1px solid var(--neutral-light);
  color: var(--neutral-light);
  font-size: var(--size-l);
  border-radius: var(--size-s);
  margin: 10px;
  width: 150px;

  :disabled {
    border-color: var(--neutral-dark);
    background: var(--neutral-light);
    color: var(--neutral-light);
  }

  ${props =>
          props.secondary &&
          css`
      background: none;
      color: var(--accent);
      border: 1px solid var(--accent);

      :disabled {
        border-color: var(--neutral-dark);
        background: none;
        color: var(--neutral-dark);
      }
    `}
`