import ReducedPollCard from "./ReducedPollCard";
import StyledLink from "./StyledLink";
import ListWrapper from "./ListWrapper";

export default function PollsList({polls, setPolls}) {

    return (
        <ListWrapper>
            {polls.map(poll => (
                <li key={poll.title}>
                    <StyledLink to={`/vote/${poll.id}`}>
                        <ReducedPollCard setPolls={setPolls} poll={poll}/>
                    </StyledLink>
                </li>
            ))}
        </ListWrapper>
    )
}