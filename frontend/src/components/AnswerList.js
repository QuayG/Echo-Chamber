import styled from "styled-components/macro";

export default function AnswerList({possibleAnswers}) {
    return (
        <Wrapper>
            {possibleAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
            ))}
        </Wrapper>)
}

const Wrapper = styled.ul`
  width: 220px;
  margin: 5px;
  padding: 5px;
  list-style: none;

  li {
    border: 1px solid var(--accent);
    border-radius: var(--size-s);
    display-inside: ruby;
    justify-content: center;
    margin: 5px;
    padding: 5px;
  }
`
