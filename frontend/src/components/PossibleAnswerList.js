import styled from "styled-components/macro";

export default function PossibleAnswerList({possibleAnswers}) {
    return (
        <Wrapper>
            {possibleAnswers.map(answer => (
            <li key={answer.possibleAnswer}>{answer.possibleAnswer}</li>
            ))}
        </Wrapper>)
}

const Wrapper = styled.ul`
  width: 220px;
  margin: 5px;
  padding: 5px;
  list-style: none;
  justify-items: center;
  justify-content: center;

  li {
    border: 1px solid var(--accent);
    border-radius: var(--size-s);
    justify-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
    text-align: center;
  }
`
