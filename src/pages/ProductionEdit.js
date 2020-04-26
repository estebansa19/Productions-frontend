import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProductionEditForm from '../components/ProductionEditForm'
import { PRODUCTION_AND_KINDS } from '../api/queries'
import { UPDATE_PRODUCTION } from '../api/mutations'
import Loading from '../components/Loading'

export default function ProductionEdit(props) {
  const productionId = parseInt(props.match.params.productionId)
  const { loading, error, data } = useQuery(PRODUCTION_AND_KINDS, { variables: { id: productionId } })

  const [updateProduction] = useMutation(UPDATE_PRODUCTION , {
    onCompleted: () => {
      props.history.push('/productions', { refresh: true })
    }
  })

  if (error) return <h1>Oops xD</h1>

  return(
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Link to="/productions">
            <IconButton edge="start" style={{color: 'white'}} aria-label="menu">
              <ArrowBackIcon />
            </IconButton>
          </Link>

          <Typography variant="h6">
            Edit production
          </Typography>
        </Toolbar>
      </AppBar>

      {loading
      ?
        <Loading />
      :
        <ProductionEditForm
          productionKinds={data.productionKinds}
          production={data.production}
          updateProductionMutation={updateProduction}
        />
      }
    </React.Fragment>
  )
}