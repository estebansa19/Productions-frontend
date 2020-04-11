import React from 'react'
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
    handleChange,
    handleDateChange,
    currentProduction,
    createNewProduction
  } = props

  const calendarDate = () => {
    let currentDate = new Date(currentProduction.date)
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
          <NewProductionCard currentProduction={currentProduction} />
        </div>
        <div className="production-new-form">
          <Typography variant="h6">
            Form
          </Typography>

          <form className={classes.root}>
            <TextField name="title" required={true} onChange={handleChange} label="title" type="text" variant="outlined" />
            <br />

            <label>Description</label>
            <br />

            <textarea name="description" onChange={handleChange}></textarea>
            <br />

            <TextField name="rate" required={true} onChange={handleChange} label="Rate" type="number" variant="outlined" />
            <br />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required={false}
                name="date"
                label="Date"
                format="dd/MM/yyyy"
                value={calendarDate()}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <br />

            <TextField name="image" required={false} onChange={handleChange} label="Image URL (optional)" type="text" variant="outlined" />
            <br />

            <FormControl>
              <InputLabel>Production Kind</InputLabel>
              <Select
                name="productionKindId"
                onChange={handleChange}
                value={currentProduction.productionKindId}
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
        <Button variant="contained" color="primary" onClick={createNewProduction}>
          Crear
        </Button>

        <Link to='/productions'>Ir atrás</Link>
      </div>
    </React.Fragment>
  )
}