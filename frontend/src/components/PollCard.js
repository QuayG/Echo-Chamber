import AnswerList from "./AnswerList";
import styled from "styled-components/macro";

export default function PollCard({poll, reloadPolls}) {
    return (
        <Wrapper>
            <h3>{poll.title}</h3>
            <AnswerList possibleAnswers={poll.possibleAnswers} reloadPolls={reloadPolls}/>
            <p>No. of participants: {poll.givenAnswers.length}</p>
            <p>Created by: {poll.user.userName}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  
  height: 100%;
  width: 260px;
  justify-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 20% 60% 10% 10%;
  border: 1px solid var(--accent);
  border-radius: var(--size-s);
  
`