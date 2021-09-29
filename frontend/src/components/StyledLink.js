import styled from "styled-components/macro";
import {Link} from "react-router-dom";

export default styled(Link)`
  text-decoration: none;
  padding: var(--size-m);
  background: var(--neutral-dark);
  border: 1px solid var(--neutral-light);
  color: var(--neutral-light);
  margin: var(--size-l);
  font-size: var(--size-l);
  border-radius: var(--size-s);
`