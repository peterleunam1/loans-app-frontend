import { Box, Typography } from '@mui/material'
import { Card, contentStyles, Image } from './menu-card.styled'
import { getCapitalize } from 'utils'
import { useNavigation } from 'hooks'
import { privateRoutes } from 'constant'

interface MenuCardProps {
  count: number
  title: string
  img: string
}

export default function MenuCard ({ count, img, title }: MenuCardProps) {
  const { goTo } = useNavigation()

  const titleCapitalized = getCapitalize(title)

  const navigate = () => {
    goTo(`/${privateRoutes.PRIVATE}/${title}`)
  }

  return (
    <Card onClick={navigate}>
      <Box sx={contentStyles}>
        <Typography variant="h4" component="h2">{count}</Typography>
        <Image src={img} alt={title} loading="lazy" />
      </Box>
      <Typography variant="body1" component="p">{titleCapitalized}</Typography>
    </Card>
  )
}
