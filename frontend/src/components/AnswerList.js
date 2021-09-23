import styled from "styled-components/macro";
import {useState} from "react";
import {giveAnswer} from "../service/api-service";
import Button from "./Button";
import {useAuth} from "../auth/AuthProvider";
import Error from "./Error";

export default function AnswerList({possibleAnswers, setPolls}) {

    const {token} = useAuth();
    const [error, setError] = useState()
    const [selectedAnswerId, setSelectedAnswerId] = useState()

    const select = id => {
        setSelectedAnswerId(id)
    }

    const activeClassname = answer => {
        if (answer.id === selectedAnswerId) {
            return "active"
        }
        return ""
    }

    const vote = event => {
        event.preventDefault()
        setError()
        giveAnswer(selectedAnswerId, token)
            .catch(error => setError(error))
            .finally(response => setPolls(response))
    }

    return (
        <Wrapper>
            {possibleAnswers.map((answer) => (
                <li className={activeClassname(answer)}
                    onClick={() => select(answer.id)}
                    key={answer.possibleAnswer}>{answer.possibleAnswer}</li>
            ))}
            <Button onClick={vote}>Vote</Button>
            {error && <Error>{error.message}</Error>}
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
    display: grid;
    grid-template-rows: 80% 20%;
    justify-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
  }

  li.active {
    background-color: var(--accent-light);
  }

  Button {
    align-self: flex-end;
    width: 50%;
    margin: 10px;
    text-align: center;
  }
`
