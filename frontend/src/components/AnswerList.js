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
  width: 260px;
  margin: 0;
  padding: 0;

  li {
    display-inside: ruby;
    justify-content: center;
    margin: 15px;
    padding: 15px;
  }
`
