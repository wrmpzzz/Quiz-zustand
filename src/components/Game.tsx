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
    <Card 
      variant="outlined" 
      sx={{ 
        bgcolor: "#222", 
        p: 2, 
        textAlign: "left", 
        mt: 2,
        '@media (max-width: 600px)': {
          p: 1.5,
          mt: 1.5,
        }
      }} 
      className="question-card"
    >
      <Typography 
        variant="h5" 
        component="div" 
        className="question-title"
        sx={{
          '@media (max-width: 600px)': {
            fontSize: '1.1rem !important',
            lineHeight: 1.4,
          }
        }}
      >
        {info.question}
      </Typography>

      <SyntaxHighlighter 
        language="javascript" 
        style={gradientDark}
        className="code-block"
        customStyle={{
          borderRadius: '8px',
          padding: '16px',
          fontSize: '14px',
          margin: '16px 0'
        }}
      >
        {info.code}
      </SyntaxHighlighter>

      <List 
        sx={{ 
          bgcolor: "#333", 
          borderRadius: 1,
          '@media (max-width: 600px)': {
            marginTop: '16px',
          }
        }} 
        disablePadding 
        className="answers-list"
      >
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
                },
                '@media (max-width: 600px)': {
                  padding: '12px 8px !important',
                  minHeight: '56px !important',
                }
              }}
              className="answer-button"
            >
              <ListItemText 
                primary={answer} 
                sx={{ textAlign: "center" }} 
                className="answer-text"
                primaryTypographyProps={{
                  sx: {
                    '@media (max-width: 600px)': {
                      fontSize: '0.95rem !important',
                      lineHeight: 1.3,
                    }
                  }
                }}
              />
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
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2} 
        className="game-header"
        gap={{ xs: 1, sm: 0 }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          className="question-counter"
          sx={{
            '@media (max-width: 600px)': {
              fontSize: '1.2rem !important',
              textAlign: 'center',
              marginBottom: '8px',
            }
          }}
        >
          Pregunta {currentQuestion + 1} de {questions.length}
        </Typography>
        
        <Stack direction="row" gap={1} className="navigation-buttons">
          <IconButton 
            onClick={goPreviousQuestion} 
            disabled={currentQuestion === 0}
            aria-label="Pregunta anterior"
            size="large"
            className="nav-button"
            sx={{
              '@media (max-width: 600px)': {
                width: '48px !important',
                height: '48px !important',
                padding: '12px !important',
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={goNextQuestion} 
            disabled={currentQuestion === questions.length - 1}
            aria-label="Pregunta siguiente"
            size="large"
            className="nav-button"
            sx={{
              '@media (max-width: 600px)': {
                width: '48px !important',
                height: '48px !important',
                padding: '12px !important',
              }
            }}
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