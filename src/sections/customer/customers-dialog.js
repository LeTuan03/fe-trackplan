import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Avatar, Box, Card, Grid, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';

export default function CustomersDialog({ open, items, handleClose }) {
  const itemsDemo = [{

  }]
  const handleFormSubmit = async (event) => {

  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <ValidatorForm
          onSubmit={handleFormSubmit}>
          <DialogTitle id="alert-dialog-title">
            {"Add/Edit accounts"}
          </DialogTitle>
          <DialogContent>
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
                      <span>Number of plan</span>
                    </span>
                  }
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
                      <span>Number of completed projects</span>
                    </span>
                  }
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
            </Grid>
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