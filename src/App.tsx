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

// Contenedor principal con gradiente
const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

// Tarjeta de contenido con glassmorphism
const ContentCard = styled(Box)(() => ({
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '100%',
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
})

function App() {
  const questions = useQuestionStore(state => state.questions)
  
  return (
    <MainContainer maxWidth="sm" className="main-container">
      <ContentCard>
        <Stack direction="column" alignItems="center" spacing={3}>
          {/* Header section */}
          <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <JavaScriptLogo />
            <AnimatedTitle variant="h3" as="h3" fontWeight="700">
              JavaScript Quiz
            </AnimatedTitle>
          </Stack>
          
          {/* Content section */}
          <Box sx={{ width: '100%' }}>
            {questions.length === 0 && <Start />}
            {questions.length > 0 && <Game />}
          </Box>
        </Stack>
      </ContentCard>
    </MainContainer>
  )
}

export default App