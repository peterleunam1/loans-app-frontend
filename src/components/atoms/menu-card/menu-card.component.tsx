import { Box, Typography } from '@mui/material'
import { Card, contentStyles, Image } from './menu-card.styled'

interface MenuCardProps {
  count: number
  title: string
  img: string
}

export default function MenuCard ({ count, img, title }: MenuCardProps) {
  return (
    <Card>
      <Box sx={contentStyles}>
        <Typography variant="h4" component="h2">{count}</Typography>
        <Image src={img} alt={title} loading="lazy" />
      </Box>
      <Typography variant="body1" component="p">{title}</Typography>
    </Card>
  )
}
