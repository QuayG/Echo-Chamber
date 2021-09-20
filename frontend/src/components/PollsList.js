import Poll from "./Poll";
import styled from "styled-components/macro";

export default function PollsList({polls}) {
    return (
        <Wrapper>
            {polls.map(poll => (
            <li key={poll.title}>
                <Poll poll={poll}/>
            </li>
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.ul`
  height: 100%;
  width: 100%;
  padding: var(--size-s);
  display: flex;
  overflow-x: scroll;
  list-style-type: none;
  text-align: center;
  text-decoration: none;
  font-size: 1em;

  li {
    margin: 5px;
    padding: 5px;
  }
`
