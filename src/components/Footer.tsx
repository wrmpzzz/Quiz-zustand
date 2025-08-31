import { Button } from "@mui/material"
import { useQuestionStore } from "../store/questions"
import { useDataQuestion } from "../hooks/useDataQuestions"

export default function Footer() {
    const { correct, incorrect, unanswered } = useDataQuestion()
    const reset = useQuestionStore(state => state.reset)

    return (
        <footer style={{ marginTop: '16px' }}>
            <strong>{correct}/{correct + incorrect + unanswered}</strong>
            <Button variant="contained" onClick={() => reset()}>
                Resetear juego
            </Button>
        </footer>
    )
}
