import {InitialUserState} from "./InitialUserState";
import {InitialAnswerState} from "./InitialAnswerState";
import {InitialPossibleAnswerState} from "./InitialPossibleAnswerState";

export const InitialPollState =
     {
        title: "",
        givenAnswers: [InitialAnswerState],
        possibleAnswers: [InitialPossibleAnswerState],
        creator: InitialUserState,
        participants: [InitialUserState],
    }
