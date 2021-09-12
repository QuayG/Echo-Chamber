import styled from "styled-components/macro";
import Button from "./Button";
import {useAuth} from "../auth/AuthProvider";
import Avatar from "./Avatar";

export default function Header({title}){

    const{user, logout} = useAuth()

    return(
        <Wrapper>
            {user && <Avatar src={user.avatarUrl} alt=""/>}
            {!user && <div></div>}
            <h1>{title}</h1>
            {user && <Button onClick={logout}>Logout</Button>}
            {!user && <div></div>}
        </Wrapper>
    )
}

const Wrapper = styled.header`
  width: 100%;
  padding: var(--size-m);

  text-align: center;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  background: var(--background-dark);
  
  Button{
    margin: var(--size-s) var(--size-s);
  }
`