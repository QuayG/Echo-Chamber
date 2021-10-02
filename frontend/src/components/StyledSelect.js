import styled from "styled-components/macro";
import Label from "./Label";

export default function Select({
    name,
    title,
    value,
    values,
    onChange,
    ...props
}){
    return(
        <Label {...props}>
            {title}
            <StyledSelect
                name={name}
                value={value}
                onChange={onChange}>
                {values.map(value=>(
                    <option key={value.name} value={value}>
                        {value}
                    </option>
                ))}
            </StyledSelect>
        </Label>
    )
}

const StyledSelect = styled.select`
  width: 100%;
  font-size: 1em;
  padding: var(--size-s);
  border: none;
`