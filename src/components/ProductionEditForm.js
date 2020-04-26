import React, { useState } from 'react'
import NewProductionCard from '../components/NewProductionCard'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import '../styles/productionForm.css'
import { formatDate } from '../utils/dates'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: '8px 8px 8px 0px',
      width: '90%',
    },
  }
}))

export default function ProductionForm(props) {
  const {
    productionKinds,
    production,
    updateProductionMutation
  } = props

  const [state, setState] = useState({
    id: parseInt(production.id),
    title: production.title,
    description: production.description,
    date: production.date,
    image: production.image || '',
    rate: parseInt(production.rate),
    productionKindId: parseInt(production.productionKind.id)
  })

  const updateProduction = e => {
    e.preventDefault()
    updateProductionMutation({ variables: state })
  }

  const handleChange = e => {
    let value

    if (e.target.name === 'rate' || e.target.name === 'productionKindId') {
      value = parseInt(e.target.value)
    } else {
      value = e.target.value.toString()
    }

    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const handleDateChange = newDate => {
    setState({
      ...state,
      date: formatDate(newDate)
    })
  }

  const calendarDate = () => {
    let currentDate = new Date(state.date)
    currentDate.setDate(currentDate.getDate() + 1)
    return currentDate
  }

  const classes = useStyles()

  return(
    <React.Fragment>
      <div className="production-new-container">
        <div className="production-new-card">
          <Typography variant="h6" className="production-new-card-subtitle">
            Preview
          </Typography>
          <NewProductionCard currentProduction={state} />
        </div>
        <div className="production-new-form">
          <Typography variant="h6">
            Form
          </Typography>

          <form className={classes.root}>
            <TextField
              name="title"
              required={true}
              onChange={handleChange}
              label="title"
              type="text"
              variant="outlined"
              value={state.title}
            />
            <br />

            <label>Description</label>
            <br />

            <textarea name="description" onChange={handleChange} value={state.description}></textarea>
            <br />

            <TextField
              name="rate"
              required={true}
              onChange={handleChange}
              label="Rate"
              type="number"
              variant="outlined"
              value={state.rate}
            />
            <br />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required={false}
                name="date"
                label="Date (DD/MM/YYYY)"
                format="dd/MM/yyyy"
                value={calendarDate()}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <br />

            <TextField
              name="image"
              required={false}
              onChange={handleChange}
              label="Image URL (optional)"
              type="text"
              variant="outlined"
              value={state.image || ''}
            />
            <br />

            <FormControl>
              <InputLabel>Production Kind</InputLabel>
              <Select
                name="productionKindId"
                onChange={handleChange}
                value={parseInt(state.productionKindId)}
              >
                {
                  productionKinds.map(productionKind => {
                    return(
                      <MenuItem
                        key={productionKind.id}
                        value={productionKind.id}
                      >
                        {productionKind.name}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <br />
          </form>
        </div>
      </div>

      <div className="production-new-actions">
        <Button variant="contained" color="primary" onClick={updateProduction}>
          Editar
        </Button>

        <Link to='/productions'>Ir atrás</Link>
      </div>
    </React.Fragment>
  )
}