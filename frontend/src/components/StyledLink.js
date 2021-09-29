import styled from "styled-components/macro";
import {Link} from "react-router-dom";

export default styled(Link)`
  display: block;
  height: min-content;
  width: 260px;
  color: var(--neutral-light);
  background: var(--accent-light);
  border: 1px solid var(--accent);
  border-radius: var(--size-s);
`