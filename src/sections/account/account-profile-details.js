import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';


export const AccountProfileDetails = () => {
  const { user, isAuthenticated } = useAuth();
  const [values, setValues] = useState({
    username: user?.username,
    password: user?.password,
    email: user?.email,
    phone: user?.phone,
  });

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(values)
    },
    []
  );

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  value={values?.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type='password'
                  onChange={handleChange}
                  value={values?.password}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type='email'
                  onChange={handleChange}
                  value={values?.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type='number'
                  onChange={handleChange}
                  value={values?.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            type='submit'
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
