import styled from "styled-components/macro";
import Label from "./Label";

export default function StyledSelect({
                                         name,
                                         title,
                                         value,
                                         values,
                                         onChange,
                                         create,
                                         ...props
                                     }) {
    return (
        <Label {...props}>
            {title}
            <Select
                name={name}
                value={value}
                onChange={onChange}>
                {!create && <option key="All" value={value} selected>
                    All
                </option>}
                {create && <option key="select topic" value={value} selected disabled>
                    select topic
                </option>}
                {values.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </Select>
        </Label>
    )
}

const Select = styled.select`
  width: 100%;
  font-size: 1em;
  padding: var(--size-s);
  margin-top: var(--size-s);
  border-radius: var(--size-s);
  border: none;
`