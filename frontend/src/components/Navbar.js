import styled from "styled-components/macro";

export default function Navbar({user, ...props}){
    return(
        <Wrapper {...props}>

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