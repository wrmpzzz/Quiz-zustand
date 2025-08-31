import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Box
} from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { useQuestionStore } from "../store/questions"
import type { Question } from "../types"
import Footer from "./Footer"

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  // Si el usuario no ha seleccionado nada
  if (userSelectedAnswer == null) return 'transparent'
  
  // Si es la respuesta correcta siempre verde
  if (index === correctAnswer) return '#4caf50'
  
  // Si es la respuesta seleccionada por el usuario pero incorrecta
  if (index === userSelectedAnswer) return '#f44336'
  
  // Cualquier otro caso
  return 'transparent'
}

const QuestionComponent = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    // Solo permitir seleccionar si no hay una respuesta seleccionada
    if (info.userSelectedAnswer == null) {
      selectAnswer(info.id, answerIndex)
    }
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2, textAlign: "left", mt: 2 }}>
      <Typography variant="h5" component="div">
        {info.question}
      </Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333", borderRadius: 1 }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={handleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
                '&:hover': {
                  backgroundColor: info.userSelectedAnswer == null 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : undefined
                }
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)

  if (questions.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6">No hay preguntas disponibles</Typography>
      </Box>
    )
  }

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Pregunta {currentQuestion + 1} de {questions.length}
        </Typography>
        
        <Stack direction="row" gap={1}>
          <IconButton 
            onClick={goPreviousQuestion} 
            disabled={currentQuestion === 0}
            aria-label="Pregunta anterior"
            size="large"
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={goNextQuestion} 
            disabled={currentQuestion === questions.length - 1}
            aria-label="Pregunta siguiente"
            size="large"
          >
            <ArrowForward />
          </IconButton>
        </Stack>
      </Stack>
      
      <QuestionComponent info={questionInfo} />
      <Footer />
    </>
  )
}