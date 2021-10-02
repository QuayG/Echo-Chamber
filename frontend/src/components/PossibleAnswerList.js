import styled from "styled-components/macro";

export default function PossibleAnswerList({possibleAnswers}) {
    return (
        <Wrapper>
            <h3>List of possible answers:</h3>
            {possibleAnswers.map(answer => (
            <li key={answer.possibleAnswer}>{answer.possibleAnswer}</li>
            ))}
        </Wrapper>)
}

const Wrapper = styled.ul`
  text-align: center;
  height: 100%;
  width: 100%;
  background-color: var(--accent);
  margin: 5px;
  padding: 5px;
  list-style: none;
  justify-items: center;
  justify-content: center;
  border: 1px solid var(--accent);
  border-radius: var(--size-m);
  
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
