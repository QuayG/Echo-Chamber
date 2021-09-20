import AnswerList from "./AnswerList";
import styled from "styled-components/macro";
import Button from "./Button";

export default function Poll({poll}) {
    return (
        <Wrapper>
            <h3>{poll.title}</h3>
            <AnswerList possibleAnswers={poll.possibleAnswers}/>
            <p>No. of participants: {poll.givenAnswers.length}</p>
            <p>Created by: {poll.user.userName}</p>
            <Button>Vote</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  
  height: 80%;
  width: 260px;
  justify-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 20% 60% 10% 10%;
  border: 1px solid var(--accent);
  border-radius: var(--size-s);

  Button {
    display: block;
    width: 50%;
    margin: 10px;
    text-align: center;
  }

`