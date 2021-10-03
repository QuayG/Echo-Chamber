import styled from "styled-components/macro";
import ListWrapper from "./ListWrapper";

export default function PossibleAnswerList({possibleAnswers, removePossibleAnswer}) {

    return (
        <DIV>
            <h3>List of possible answers:</h3>
            <ListWrapper>
                {possibleAnswers.map(answer => (
                    <PAWrapper>
                        <li key={answer.possibleAnswer}>
                            <p>{answer.possibleAnswer}</p>
                            <button onClick={() => removePossibleAnswer(answer.possibleAnswer)}>x</button>
                        </li>
                    </PAWrapper>
                ))}
            </ListWrapper>
        </DIV>)
}

const PAWrapper = styled.div`
  width: 100%;
  
  li {
    display: grid;
    grid-template-columns: 80% 1fr;
    justify-items: center;
    align-items: center;
    border: 1px solid var(--neutral-light);
    border-radius: var(--size-s);

    p {
      margin: 0;
    }
    
    button{
      border-radius: 50%;
    }
  }
`

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;

  background-color: var(--accent);
  margin: 5px;
  padding: 5px;
  list-style-type: none;
  border: 1px solid var(--accent);
  border-radius: var(--size-m);

  h3 {
    margin: 0;
  }
`
