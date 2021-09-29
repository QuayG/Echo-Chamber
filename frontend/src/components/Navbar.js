import {NavLink} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import styled from "styled-components/macro";

export default function Navbar(){

    const {user} = useAuth()

    return(
        <Wrapper>
            <NavLink to="/polls">Polls</NavLink>
            <NavLink to="/results">Results</NavLink>
            {user.role === 'admin' && <NavLink to="/delete">Delete polls</NavLink>}
        </Wrapper>
    )
}

const Wrapper = styled.nav`
  border-top: 1px solid var(--neutral-dark);
  width: 100%;
  padding: var(--size-m);
  display: flex;
  overflow-y: scroll;
  
  a{
    flex-grow: 1;
    margin: 0 var(--size-l);
    text-align: center;
    text-decoration: none;
    color: var(--dark-neutral);
  }
  
  a.active{
    background-color: var(--accent);
    border-radius: 5px;
  }
`