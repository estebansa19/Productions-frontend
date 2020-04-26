import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProductionForm from '../components/ProductionForm'
import { PRODUCTION_KINDS } from '../api/queries'
import { ADD_PRODUCTION } from '../api/mutations'
import { formatDate } from '../utils/dates'

export default function ProductionNew(props) {
  const [state, setState] = useState({ productionKindId: 2, date: formatDate(new Date()), image: null })
  const { loading, error, data } = useQuery(PRODUCTION_KINDS)

  const [createProduction] = useMutation(ADD_PRODUCTION, {
    onCompleted: () => {
      props.history.push('/productions')
    },
    onError: (error) => {
      alert('Algo salió mal :c')
    },
  })

  const createNewProduction = e => {
    e.preventDefault()
    createProduction({ variables: state })
  }

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.name === 'rate' ? parseInt(e.target.value) : e.target.value.toString()
    })
  }

  const handleDateChange = newDate => {
    setState({
      ...state,
      date: formatDate(newDate)
    })
  }

  if (loading) return <h1>Loading... xD</h1>
  if (error) return <h1>:c</h1>

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
            New production
          </Typography>
        </Toolbar>
      </AppBar>

      <ProductionForm
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        createNewProduction={createNewProduction}
        productionKinds={data.productionKinds}
        currentProduction={state}
      />
    </React.Fragment>
  )
}