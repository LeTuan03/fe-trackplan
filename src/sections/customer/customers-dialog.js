import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Autocomplete, Avatar, Box, Card, Grid, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography, createFilterOptions } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { getCurrentUser } from 'src/appFunctions';
import { format } from 'date-fns';
import { LIST_STATUS, LIST_STATUS_PROJECT, STATUS_OBJECT } from 'src/appConst';
export default function CustomersDialog({ open, items, handleClose, title, isPlan, isView }) {
  const filterAutocomplete = createFilterOptions();
  const itemsDemo = [{

  }]
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "createdAt") {
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFormSubmit = async (event) => {
    console.log(formData)
  };

  useEffect(() => {
    if (isPlan) {
      setFormData({
        status: items?.status,
        name: items?.name,
        note: items?.note,
        createdAt: items?.createdAt,
        createdBy: items?.createdBy || getCurrentUser()?.username
      });
    } else {
      setFormData({
        username: items?.username,
        planNumber: items?.projects?.length || 0,
        completeNumber: items?.projects?.filter(item => item?.status === STATUS_OBJECT.END.name)?.length || 0,
      });
    }
  }, [isPlan, items]);


  return (
    <Fragment>
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
            {isView ? "Information" : title ? title : "Add/Edit accounts"}
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
                    disabled={isView}
                    className='w-100'
                    onChange={handleChange}
                    name="name"
                    label={
                      <span>
                        <span>Project name</span>
                      </span>
                    }
                    value={formData?.name}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    onChange={handleChange}
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
                    disabled={isView}
                    className='w-100'
                    name="createdAt"
                    label={
                      <span>
                        <span>Created at</span>
                      </span>
                    }
                    value={formData?.createdAt ? format(new Date(formData?.createdAt), 'dd/MM/yyyy') : ""}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  {/* <Autocomplete
                    fullWidth
                    options={LIST_STATUS}
                    value={status}
                    onChange={(e, value) => handleChangeStatus(value)}
                    getOptionLabel={(option) => option?.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={'Status'}
                      />
                    )}
                    filterOptions={(options, params) => {
                      params.inputValue = params.inputValue.trim()
                      let filtered = filterAutocomplete(options, params)
                      return filtered
                    }}
                    noOptionsText={"No option"}
                  /> */}
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    onChange={handleChange}
                    name="status"
                    label={
                      <span>
                        <span>Status</span>
                      </span>
                    }
                    value={formData?.status}
                  />
                </Grid>
                <Grid item
                  md={8}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    onChange={handleChange}
                    name="note"
                    label={
                      <span>
                        <span>Note</span>
                      </span>
                    }
                    value={formData?.note}
                  />
                </Grid>

              </Grid> :
              // account 
              <Grid container
                spacing={1}
              >
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    label={
                      <span>
                        <span>Username</span>
                      </span>
                    }
                    value={formData?.username}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    name='planNumber'
                    label={
                      <span>
                        <span>Number of plan</span>
                      </span>
                    }
                    value={formData?.planNumber}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    name='completeNumber'
                    label={
                      <span>
                        <span>Number of completed projects</span>
                      </span>
                    }
                    value={formData?.completeNumber}
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
            {isView === false && <Button
              type='submit'
              autoFocus
              variant="contained"
            >
              Save
            </Button>}
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </Fragment>
  );
}