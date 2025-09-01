import { Container, Stack, Typography, Box, keyframes } from '@mui/material'
import { styled } from '@mui/material/styles'
import './App.css'
import { JavaScriptLogo } from './components/LogoJavaScript'
import { Start } from './components/Start'
import { useQuestionStore } from './store/questions'
import { Game } from './components/Game'

// Animación suave para el título
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`

// Contenedor principal
const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  '@media (max-width: 600px)': {
    padding: '16px !important',
    alignItems: 'flex-start',
    paddingTop: '40px !important',
  },
}))

// Tarjeta de contenido
const ContentCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  padding: theme.spacing(4),
  
  '@media (max-width: 600px)': {
    padding: theme.spacing(2),
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
}))

// Título con animación
const AnimatedTitle = styled(Typography)({
  animation: `${fadeIn} 0.8s ease-out`,
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
  marginBottom: '16px',
  fontWeight: '700',
  
  '@media (max-width: 600px)': {
    fontSize: '1.8rem !important',
    lineHeight: 1.2,
    marginBottom: '12px',
  },
  
  '@media (max-width: 375px)': {
    fontSize: '1.5rem !important',
  },
})

function App() {
  const questions = useQuestionStore(state => state.questions)
  
  return (
    <MainContainer maxWidth="sm" className="main-container">
      <ContentCard>
        <Stack direction="column" alignItems="center" spacing={3}>
          {/* Header section */}
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center" justifyContent="center">
            <JavaScriptLogo />
            <AnimatedTitle variant="h3" as="h1">
              JavaScript Quiz
            </AnimatedTitle>
          </Stack>
          
          {/* Content section */}
          <Box sx={{ width: '100%' }} className="game-container">
            {questions.length === 0 && <Start />}
            {questions.length > 0 && <Game />}
          </Box>
        </Stack>
      </ContentCard>
    </MainContainer>
  )
}

export default App