export const InitialUserState =
    {
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatedPassword: '',
    }

export const InitialPossibleAnswerState =
    {
        id: "",
        possibleAnswer: "",
    }

export const InitialAnswerState =
    {
        user: InitialUserState,
        answer: "",
    }

export const InitialPollState =
    {
        title: "",
        givenAnswers: [InitialAnswerState],
        possibleAnswers: [InitialPossibleAnswerState],
        creator: InitialUserState,
        participants: [InitialUserState],
    }

export const InitialWelcomeInfo =
    {
        numberOfUsers: "",
        numberOfPolls: "",
        numberOfAnswers: "",
    }