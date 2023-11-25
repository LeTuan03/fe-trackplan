import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Autocomplete, Avatar, Box, Card, Grid, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { getCurrentUser } from 'src/appFunctions';
import { format } from 'date-fns';
import { LIST_STATUS, LIST_STATUS_PROJECT, STATUS_OBJECT } from 'src/appConst';
export default function CustomersDialog({ open, items, handleClose, title, isPlan }) {

  const [status, setStatus] = React.useState(LIST_STATUS.find(i => i.label === items?.status)?.code)
  const itemsDemo = [{

  }]
  const [name, setName] = React.useState("")
  const [note, setNote] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [planNumber, setPlanNumber] = React.useState(0)
  const [completeNumber, setCompleteNumber] = React.useState(0)
  const handleFormSubmit = async (event) => {

  };
  React.useEffect(() => {
    setCompleteNumber(items?.projects?.filter(item => item?.status === STATUS_OBJECT.END.name)?.length);
  }, [items])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        minHeight="500px"
      >
        <ValidatorForm
          onSubmit={handleFormSubmit}>
          <DialogTitle id="alert-dialog-title">
            {title ? title : "Add/Edit accounts"}
          </DialogTitle>
          <DialogContent>
            {isPlan ?
              <Grid container
                spacing={1}
              >
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    label={
                      <span>
                        <span>Project name</span>
                      </span>
                    }
                    value={items?.name}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    label={
                      <span>
                        <span>Created by</span>
                      </span>
                    }
                    value={getCurrentUser()?.username}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    label={
                      <span>
                        <span>Created at</span>
                      </span>
                    }
                    value={items?.createdAt ? format(new Date(items?.createdAt), 'dd/MM/yyyy') : ""}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <Autocomplete
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.label}
                    options={LIST_STATUS_PROJECT}
                    renderInput={(params) =>
                      <TextField {...params}
                        label="Status"
                        value={{
                          code: 2, label: "Inprogress"
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item
                  md={8}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    label={
                      <span>
                        <span>Note</span>
                      </span>
                    }
                    value={items?.note}
                  />
                </Grid>

              </Grid> :
              <Grid container
                spacing={1}
              >
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    label={
                      <span>
                        <span>Username</span>
                      </span>
                    }
                    value={items?.username}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    name='planNumber'
                    label={
                      <span>
                        <span>Number of plan</span>
                      </span>
                    }
                    value={items?.projects?.length}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    className='w-100'
                    name='completeNumber'
                    label={
                      <span>
                        <span>Number of completed projects</span>
                      </span>
                    }
                    value={completeNumber}
                  />
                </Grid>

                <Card className='w-100 mt-20'>
                  <Scrollbar >
                    <Box>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Project Name
                            </TableCell>
                            <TableCell>
                              Created By
                            </TableCell>
                            <TableCell>
                              Start Date
                            </TableCell>
                            <TableCell>
                              Status
                            </TableCell>
                            <TableCell>
                              Signed Up
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {itemsDemo.map((customer) => {
                            // const isSelected = selected.includes(customer.id);
                            // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                            return (
                              <TableRow
                                hover
                                key={""}
                              >

                                <TableCell>
                                  <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                  >
                                    <Typography variant="subtitle2">
                                      {customer?.name}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell>
                                  {customer?.email}
                                </TableCell>
                                <TableCell>
                                  {customer?.address?.city}, {customer?.address?.state}, {customer?.address?.country}
                                </TableCell>
                                <TableCell>
                                  {customer?.phone}
                                </TableCell>
                                <TableCell>
                                  {/* {createdAt} */}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Scrollbar>
                </Card>
              </Grid>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="error"
            >Cancle</Button>
            <Button
              type='submit'
              autoFocus
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </React.Fragment>
  );
}