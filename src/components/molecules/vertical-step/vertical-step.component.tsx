import {
  Box,
  Button,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Typography,
  Paper
} from '@mui/material'
import { useState } from 'react'

const steps = [
  {
    label: 'Información de la tienda (prestamista)',
    description: 'En este paso usted debe ingresar la información de la tienda (prestamista) y su numero de documento, para que el sistema pueda identificarlo y realizar el pago correspondiente.'
  },
  {
    label: 'Monto a pagar',
    description:
      'Se le mostrará el total de su deuda y podrá ingresar el monto a pagar.'
  },
  {
    label: 'Pago',
    description: 'En este paso podrá visulaizar las diferenes opciones de pago que tiene disponibles, para realizar el pago de su deuda.'
  },
  {
    label: 'Confirmación',
    description: 'En este paso se le mostrará un resumen de la información ingresada, para que pueda confirmar el pago.'
  }
]

export default function VerticalStepper () {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box
      sx={{
        width: '40%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 1
      }}
    >
      <Typography variant="h6" component="h2">
        Flujo para realizar sus pagos
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1
                  ? (
                  <Typography variant="caption">Último paso...</Typography>
                    )
                  : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent sx={{ width: '70%' }}>
              <Typography variant='subtitle2' component='p' sx={{ fontWeight: '300' }}>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    size="small"
                    sx={{ mt: 1, mr: 1, textTransform: 'none' }}
                  >
                    {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                  </Button>
                  <Button
                    size='small'
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Regresar
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}
