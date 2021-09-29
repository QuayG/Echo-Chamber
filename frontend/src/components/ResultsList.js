import styled from "styled-components/macro";
import ReducedPollCard from "./ReducedPollCard";
import StyledLink from "./StyledLink";

export default function ResultsList({polls}) {

    return (
        <Wrapper>
            {polls.map(poll => (
                <li key={poll.title}>
                    <StyledLink to={`/results/${poll.id}`}>
                        <ReducedPollCard poll={poll}/>
                    </StyledLink>

                </li>
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.ul`
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
`