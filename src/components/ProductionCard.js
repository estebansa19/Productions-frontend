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
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MovieIcon from '@material-ui/icons/Movie'
import TvIcon from '@material-ui/icons/Tv'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { convertStringDate } from '../utils/dates'

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
}))

export default function ProductionCard(props) {
  const { production, deleteProduction, refetchData } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const productionIcon = () => {
    switch (production.productionKind.name) {
      case 'Películas': return <MovieIcon />
      case 'Libros': return <ImportContactsIcon />
      case 'Anime': return <TvIcon />
      default: return <HelpOutlineIcon />
    }
  }

  const productionDate = () => {
    if (production.date) {
      return convertStringDate(production.date)
    } else {
      return 'Nope xD'
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {productionIcon()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        <Typography variant="body2" color="textSecondary" component="p">
          {production.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/productions/${production.id}/edit`}>
          <IconButton aria-label="add to favorites">
            <EditIcon />
          </IconButton>
        </Link>

        <IconButton aria-label="share" onClick={
          () => {
            deleteProduction(production.id)
              .then(() => {
                refetchData()
              })
          }
        } >
          <DeleteForeverIcon/>
        </IconButton>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}