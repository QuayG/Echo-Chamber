import ReducedPollCard from "./ReducedPollCard";
import StyledLink from "./StyledLink";
import ListWrapper from "./ListWrapper";

export default function ResultsList({polls}) {

    return (
        <ListWrapper>
            {polls.map(poll => (
                <li key={poll.title}>
                    <StyledLink to={`/results/${poll.id}`}>
                        <ReducedPollCard poll={poll}/>
                    </StyledLink>
                </li>
            ))}
        </ListWrapper>
    )
}