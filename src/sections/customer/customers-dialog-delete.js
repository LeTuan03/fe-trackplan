import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function CustomersDialogDelete({ open, handleClose, handleYes, data }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete {data?.name || data?.username}?
      </DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
        >Cancle</Button>
        <Button
          autoFocus
          onClick={handleYes}
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}