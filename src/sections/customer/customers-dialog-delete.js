import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
        Bạn có chắc chắc muốn xóa {data?.name || data?.username}?
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Hủy
        </Button>
        <Button autoFocus onClick={handleYes} variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
