import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import TvIcon from '@material-ui/icons/Tv';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/productionKindsList.css'
import { PRODUCTION_KINDS } from '../api/queries'

function ProductionKindsList(props) {
  const { loading, error, data } = useQuery(PRODUCTION_KINDS)
  if (loading) return <CircularProgress className='loader' />
  if (error) return <h1>Oops xD</h1>
  if (data.productionKinds.length === 0) return <h1>There's nothing to see unu</h1>

  function setIcon(productionKindName) {
    switch (productionKindName) {
      case 'Películas': return <MovieIcon />
      case 'Libros': return <ImportContactsIcon />
      case 'Anime': return <TvIcon />
      default: return <HelpOutlineIcon />
    }
  }

  return(
    <List>
      {data.productionKinds.map((productionKind) => (
        <ListItem button key={productionKind.id} onClick={(e) => props.change_kind(productionKind.id)}>
          <ListItemIcon>{setIcon(productionKind.name)}</ListItemIcon>
          <ListItemText primary={productionKind.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default ProductionKindsList