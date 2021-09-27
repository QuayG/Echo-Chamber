import styled from "styled-components/macro";
import {Link} from "react-router-dom";

export default function ReducedPollCard({poll}){
    return (
        <LinkStyled to={`/vote/${poll.id}`}>
            <h3>{poll.title}</h3>
            <p>Number of participants: {poll.participants.length}</p>
            <p>Creator: {poll.creator.userName}</p>
            <p>Topic: TO DO</p>
        </LinkStyled>
    )
}

const LinkStyled = styled(Link)`
  display: block;
  height: min-content;
  width: 260px;
  color: var(--neutral-light);
  background: var(--accent-light);
  border: 1px solid var(--accent);
  border-radius: var(--size-s);
`