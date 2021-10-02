import styled from "styled-components/macro";

export default function ReducedPollCard({poll}){
    return (
        <Wrapper>
            <h3>{poll.title}</h3>
            <p>Number of participants: {poll.participants.length}</p>
            <p>Creator: {poll.creator.userName}</p>
            <p>Topic: {poll.topic.name}</p>
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