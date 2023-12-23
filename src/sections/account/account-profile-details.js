import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "src/hooks/use-auth";

import { getAccountById, updateAccountById } from "src/services/customerServices";

export const AccountProfileDetails = () => {
  const { user, isAuthenticated } = useAuth();
  const [values, setValues] = useState({
    username: user?.username,
    password: user?.password,
    email: user?.email,
    phone: user?.phone,
  });

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const getDetail = async () => {
    try {
      const data = await getAccountById(user?.id);
      setValues(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await updateAccountById(values);
      toast.success("Cập nhật thông tin thành công !!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Tên người dùng"
                  name="username"
                  onChange={handleChange}
                  value={values?.username}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values?.password}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values?.email}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  value={values?.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Lưu thông tin
          </Button>
        </CardActions>
      </Card>
      <ToastContainer />
    </form>
  );
};
