import AnswerList from "./AnswerList";
import styled from "styled-components/macro";

export default function PollCard({poll, vote}) {

    return (
        <Wrapper>
            <h1>{poll.title}</h1>
            <AnswerList possibleAnswers={poll.possibleAnswers} vote={vote} pollId={poll.id}/>
            <p>No. of participants: {poll.givenAnswers.length}</p>
            <p>Created by: {poll.creator.userName}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  height: 90%;
  width: 300px;
  justify-items: center;
  display: grid;
  grid-template-rows: 20% 60% 10% 10%;
  border: 2px solid var(--accent);
  border-radius: var(--size-s);
  text-align: center;
`