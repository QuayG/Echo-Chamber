import styled from "styled-components/macro";

export default function AnswerList({possibleAnswers}) {
    return (
        <Wrapper>
            {possibleAnswers && possibleAnswers.map((answer, id) => (
                <li key={id}>{answer}</li>
            ))}
        </Wrapper>)
}

const Wrapper = styled.ul`
  color: var(--accent-light);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`
