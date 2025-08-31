import { useQuestionStore } from "../store/questions"

export const useDataQuestion = () => {

    const question = useQuestionStore(state => state.questions)

    let correct = 0
    let incorrect = 0
    let unanswered = 0

    question.forEach(q => {
        const { userSelectedAnswer, correctAnswer } = q

        if (userSelectedAnswer === null) unanswered++
        if (userSelectedAnswer === correctAnswer) correct++
        if (userSelectedAnswer !== correctAnswer) incorrect++
    })

    return { correct, incorrect, unanswered }
}
