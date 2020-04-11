import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { green } from '@material-ui/core/colors'

const defaultImageUrl = "https://external-preview.redd.it/Eoheo_N0clcaBvSqpjuAc397yq0PYEafxsMSv5-mGxE.jpg?auto=webp&s=906f15eb74ed974846a014bf8b0d741164035a37"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

export default function({ currentProduction }) {
  const classes = useStyles()

  const productionDate = () => {
    if (currentProduction.date) {
      let dateParts = currentProduction.date.split('-')
      let parsedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
      return parsedDate.toDateString()
    } else {
      return 'Sample date'
    }
  }

  return(
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AutorenewIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={currentProduction.title || 'Sample title'}
        subheader={productionDate()}
      />
      <CardMedia
        className={classes.media}
        image={currentProduction.image || defaultImageUrl}
        title="Production image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {currentProduction.description || 'Sample description'}
        </Typography>
      </CardContent>
    </Card>
  )
}