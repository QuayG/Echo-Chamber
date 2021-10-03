import styled from "styled-components/macro";
import Button from "./Button";
import {useAuth} from "../auth/AuthProvider";
import MyLogo from "./MyLogo";

export default function Header({title}){

    const{user, logout} = useAuth()

    return(
        <Wrapper>
            <MyLogo src="../echo.jpg" alt='Logo'/>
            <h2>{title}</h2>
            {user && <Button onClick={logout}>Logout</Button>}
            {!user && <div/>}
        </Wrapper>
    )
}

const Wrapper = styled.header`
  width: 100%;
  padding: var(--size-m);
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 30% 40% 30%;
  background: var(--background-dark);
  border-bottom: 2px solid var(--neutral-dark);
  
  Button{
    width: 100px;
    margin: var(--size-s);
    padding: var(--size-s);
  }
`