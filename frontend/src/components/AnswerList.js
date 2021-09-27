import styled from "styled-components/macro";
import {useState} from "react";
import Button from "./Button";
import {Redirect} from "react-router-dom";

export default function AnswerList({possibleAnswers, vote, pollId}) {

    const [voted, setVoted] = useState(false)

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

    const handleVoteClick = () =>{
        vote(selectedAnswerId).then(()=>setVoted(true))
    }

    if (voted){
        return <Redirect to={`/result/${pollId}`}/>
    }


    return (
        <Wrapper>
            {possibleAnswers.map(answer => (
                <li className={activeClassname(answer)}
                    onClick={() => select(answer.id)}
                    key={answer.id}>{answer.possibleAnswer}</li>
            ))}
            <Button onClick={handleVoteClick}>Vote</Button>
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
