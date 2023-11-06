interface GetDudeDatesParams {
  date: Date
  frequence: string
  nFees: number
}
export const getDudeDates = ({ date, frequence, nFees }: GetDudeDatesParams): Date[] => {
  const fechasPago: Date[] = []
  const nuevaFecha = new Date(date)
  frequence = frequence.toLowerCase()
  if (frequence === 'mensual') {
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1)
  } else if (frequence === 'quincenal') {
    nuevaFecha.setDate(nuevaFecha.getDate() + 15)
  }

  for (let i = 0; i < nFees; i++) {
    fechasPago.push(new Date(nuevaFecha))
    if (frequence === 'mensual') {
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1)
    } else if (frequence === 'quincenal') {
      nuevaFecha.setDate(nuevaFecha.getDate() + 15)
    }
  }

  return fechasPago
}
