import styled from "styled-components/macro";

export default function ReducedPollCard({poll}){
    return (
        <Wrapper>
            <h3>{poll.title}</h3>
            <p><strong>Number of participants: </strong>{poll.participants.length}</p>
            <p><strong>Topic: </strong>{poll.topic.name}</p>
            <p><strong>Creator: </strong>{poll.creator.userName}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: block;
  height: min-content;
  width: 260px;
  color: var(--neutral-light);
  background: var(--accent-light);
  border: 1px solid var(--neutral-light);
  border-radius: var(--size-s);
`