import React from 'react'
import MovieIcon from '@material-ui/icons/Movie'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import TvIcon from '@material-ui/icons/Tv'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import GradeIcon from '@material-ui/icons/Grade'
import FavoriteIcon from '@material-ui/icons/Favorite'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import FaceIcon from '@material-ui/icons/Face';

export function setProductionIcon(productionKindName)   {
  switch (productionKindName) {
    case 'Películas': return <MovieIcon />
    case 'Libros': return <ImportContactsIcon />
    case 'Anime': return <TvIcon />
    default: return <HelpOutlineIcon />
  }
}

export function setProductionIconByRate(productionRate) {
  switch(true) {
    case(productionRate > 9): return <GradeIcon />
    case(productionRate > 7): return <FavoriteIcon />
    case(productionRate > 5): return <InsertEmoticonIcon />
    default: return <FaceIcon />
  }
 }