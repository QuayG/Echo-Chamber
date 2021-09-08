import {NavLink} from "react-router-dom";
import styled from "styled-components/macro";

export default function Navbar({user, ...props}){
    return(
        <Wrapper {...props}>
            <NavLink exact to="/">Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
            <NavLink to="/polls">Polls</NavLink>
            <NavLink to="/echo">Echo-Chambers</NavLink>
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
    color: var(--accent);
  }
`