import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import ProductionDeleteConfirmation from '../components/ProductionDeleteConfirmation'
import { convertStringDate } from '../utils/dates'
import { setProductionIcon, setProductionIconByRate } from '../utils/icons'
import { limitProductionDescription } from '../utils/texts'

const defaultImageUrl = "https://external-preview.redd.it/Eoheo_N0clcaBvSqpjuAc397yq0PYEafxsMSv5-mGxE.jpg?auto=webp&s=906f15eb74ed974846a014bf8b0d741164035a37"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
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
}))

export default function ProductionCard(props) {
  const { production, refetchData } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const productionDate = () => {
    return production.date ? convertStringDate(production.date) : ''
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {setProductionIcon(production.productionKind.name)}
          </Avatar>
        }
        title={production.title}
        subheader={productionDate()}
      />

      <CardMedia
        className={classes.media}
        image={production.image || defaultImageUrl}
        title="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{wordWrap: 'break-word'}}>
          {limitProductionDescription(production.description)}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Link to={`/productions/${production.id}/edit`}>
          <IconButton aria-label="Edit production.">
            <EditIcon />
          </IconButton>
        </Link>

        <ProductionDeleteConfirmation production={production} refetchData={refetchData} />

        <IconButton>
          {setProductionIconByRate(production.rate)} -
          <Typography color="textSecondary" component="p">
            {production.rate}
          </Typography>
        </IconButton>

        {production.description.length > 30
          ?
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          :
          null
        }
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p' paragraph
            style={{wordWrap: 'break-word'}}
          >
            {production.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}