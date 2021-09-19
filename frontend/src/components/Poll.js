import AnswerList from "./AnswerList";
import styled from "styled-components/macro";

export default function Poll({poll}) {
    return (
        <Wrapper>
            <li key={poll.title}>
                <h3>{poll.title}</h3>
                <AnswerList possibleAnswers={poll.possibleAnswers}/>
                <p>No. of participants: {poll.givenAnswers.length}</p>
                <p>Created by: {poll.user.userName}</p>
            </li>
        </Wrapper>
    )
}

const Wrapper = styled.div`

  li {
    margin: 20px;
    justify-items: center;
    align-items: center;
    width: inherit;
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
  }
`