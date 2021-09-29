import styled from "styled-components/macro";

export default styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: var(--size-s);
  overflow-y: scroll;
  list-style-type: none;
  text-align: center;
  text-decoration: none;
  font-size: 1em;

  li {
    display: list-item;
    margin: 5px;
    padding: 5px;
  }

  li.active {
    background-color: var(--neutral-light);
    border-radius: var(--size-s);
  }
`