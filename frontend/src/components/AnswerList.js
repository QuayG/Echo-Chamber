import styled from "styled-components/macro";

export default function AnswerList({possibleAnswers}) {
    return (
        <Wrapper>
            {possibleAnswers.map(answer => (
                <li key={possibleAnswers.indexOf(answer)}>{answer}</li>
            ))}
        </Wrapper>)
}

const Wrapper = styled.ul`
  display: grid;
  color: var(--accent-light);
  place-items: center;
  grid-gap: var(--size-xxs);
  padding: var(--size-xxs);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  
  li{
    list-style-type: none;
  }
`