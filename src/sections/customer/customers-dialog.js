import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Autocomplete, Box, Card, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, createFilterOptions } from '@mui/material';
import { format } from 'date-fns';
import { toast } from 'react-toastify';


import { Scrollbar } from 'src/components/scrollbar';
import { getCurrentUser } from 'src/appFunctions';
import { LIST_STATUS, STATUS, STATUS_OBJECT } from 'src/appConst';
import { addProject, editProject } from 'src/services/customerServices';

export default function CustomersDialog({ open, items, handleClose, title, isPlan, isView, pageUpdate }) {
  const filterAutocomplete = createFilterOptions();
  const itemsDemo = [{

  }]
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "createdAt") {
    } else if (name === "startDate") {
      setFormData((prevData) => ({ ...prevData, startDate: new Date(value) }));
    } else if (name === "endDate") {
      setFormData((prevData) => ({ ...prevData, endDate: new Date(value) }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const convertDataSubmit = (data) => {
    return { ...data, status: data?.status?.label || LIST_STATUS[0].label }
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isPlan) {
      try {
        if (formData?.id) {
          const data = await editProject(convertDataSubmit(formData))
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Project updated successfully", {
              autoClose: 1000
            })
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Project name cannot be null", {
              autoClose: 1000
            })
            return;
          }
        } else {
          const data = await addProject(convertDataSubmit(formData))
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Added new project successfully", {
              autoClose: 1000
            })
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Project name cannot be null", {
              autoClose: 1000
            })
            return;
          }
        }
        setFormData({})
        await pageUpdate();
        handleClose();
      } catch (error) {
        if (error?.response?.status === STATUS.BAD_GATEWAY) {
          toast.error(error?.response?.data?.message, {
            autoClose: 1000
          })
          return;
        }

        if (formData?.id) {
          toast.error("Error updating project", {
            autoClose: 1000
          })
        } else {
          toast.error("Error creating project", {
            autoClose: 1000
          })
        }

      }
    }
  };
  const handleChangeStatus = (data) => {
    setFormData((prevData) => ({ ...prevData, status: data }));
  }

  useEffect(() => {
    if (isPlan) {
      setFormData({
        id: items?.id,
        status: LIST_STATUS.find(item => item.label === items?.status) || LIST_STATUS[0],
        name: items?.name,
        note: items?.note,
        description: items?.description,
        accountId: getCurrentUser()?.id,
        startDate: items?.startDate ? new Date(items?.startDate) : new Date(),
        endDate: items?.endDate ? new Date(items?.endDate) : new Date(),
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
      });
    } else {
      setFormData({
        id: items?.id,
        username: items?.username,
        planNumber: items?.projects?.length || 0,
        completeNumber: items?.projects?.filter(item => item?.status === STATUS_OBJECT.END.name)?.length || 0,
        phone: items?.phone,
        email: items?.email,
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
      });
    }
  }, [isPlan, items, items?.status]);


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
                    validators={["required"]}
                    errorMessages={["general.required"]}
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
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    onChange={handleChange}
                    name="startDate"
                    type='date'
                    label={
                      <span>
                        <span>Start date</span>
                      </span>
                    }
                    value={formData?.startDate ? format(formData?.startDate, 'yyyy-MM-dd') : ""}
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
                    name='endDate'
                    type='date'
                    label={
                      <span>
                        <span>End date</span>
                      </span>
                    }
                    value={formData?.endDate ? format(formData?.endDate, 'yyyy-MM-dd') : ""}
                  />
                </Grid>
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <Autocomplete
                    fullWidth
                    options={LIST_STATUS}
                    value={
                      formData?.status?.label === STATUS_OBJECT.NEW.name
                        ? LIST_STATUS[0]
                        : formData?.status?.label === STATUS_OBJECT.INPROGRESS.name
                          ? LIST_STATUS[1]
                          : formData?.status?.label === STATUS_OBJECT.END.name
                            ?
                            LIST_STATUS[2] : LIST_STATUS[0]
                    }
                    onChange={(e, value) => handleChangeStatus(value)}
                    getOptionLabel={(option) => option?.label}
                    renderInput={(params) => (
                      <TextField {...params}
                        label={'Status'} />
                    )}
                    filterOptions={(options, params) => {
                      params.inputValue = params.inputValue.trim();
                      let filtered = filterAutocomplete(options, params);
                      return filtered;
                    }}
                    disabled={isView}
                    noOptionsText={"No option"}
                  />
                </Grid>
                <Grid item
                  md={12}
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
                <Grid item
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    rows="10"
                    onChange={handleChange}
                    name="description"
                    label={
                      <span>
                        <span>Description</span>
                      </span>
                    }
                    value={formData?.description}
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
                <Grid item
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <TextValidator
                    disabled={isView}
                    className='w-100'
                    name='Email'
                    label={
                      <span>
                        <span>Email</span>
                      </span>
                    }
                    value={formData?.email}
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
                    name='phone'
                    label={
                      <span>
                        <span>Phone number</span>
                      </span>
                    }
                    value={formData?.phone}
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
                    name='createdAt'
                    label={
                      <span>
                        <span>Registration date</span>
                      </span>
                    }
                    value={formData?.createdAt ? format(formData?.createdAt, 'yyyy-MM-dd') : ""}
                  />
                </Grid>
              </Grid>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="error"
            >Cancle</Button>
            {isView === false && <Button
              type='submit'
              onClick={handleFormSubmit}
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