export const getRandomColor = (): string => {
  // colores para avatar de usuario
  const randomColors = [
    '#e57373',
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65',
    '#a1887f'
  ]

  const randomIndex = Math.floor(Math.random() * randomColors.length)
  return randomColors[randomIndex]
}
