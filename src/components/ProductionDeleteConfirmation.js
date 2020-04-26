import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_PRODUCTION } from '../api/mutations'

export default function ProductionDeleteConfirmation(props) {
  const refetchData = props.refetchData
  const [open, setOpen] = React.useState(false)

  const [deleteProduction] = useMutation(DELETE_PRODUCTION, {
    onCompleted: () => {
      refetchData()
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteProduction = () => {
    deleteProduction({ variables: { id: props.production.id } })
    setOpen(false)
  }

  return (
    <div>
      <IconButton aria-label="Delete production" onClick={handleClickOpen} >
        <DeleteForeverIcon/>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Estás seguro? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No se podrá recuperar este registro, piénsalo bien, ¯\_(ツ)_/¯.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteProduction} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}