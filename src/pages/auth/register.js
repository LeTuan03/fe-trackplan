import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, Autocomplete, createFilterOptions } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { ROLE } from 'src/appConst';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const [role, setRole] = useState(ROLE[0])
  const filterAutocomplete = createFilterOptions();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      role: null,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255),
      username: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      role: Yup
        .string()
        .max(255)
        .required('Role is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.username, values.password, values.role);
        router.push('/');
      } catch (err) {
        console.log(err)
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleChangeRole = (value) => {
    setRole(value);
    formik.setFieldValue('role', value.code);
  }

  return (
    <>
      <Head>
        <title>
          Đăng ký | Phần mềm quản lý học sinh phổ thông
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Đăng ký
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Bạn đẵ có tài khoản?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Đăng nhập
                </Link>
              </Typography>
            </Stack>
            <form
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <Autocomplete
                  fullWidth
                  options={ROLE}
                  value={role}
                  onChange={(e, value) => handleChangeRole(value)}
                  getOptionLabel={(option) => option?.name}
                  renderInput={(params) => (
                    <TextField {...params}
                      name='role'
                      label={'Vai trò'}
                    />
                  )}
                  filterOptions={(options, params) => {
                    params.inputValue = params.inputValue.trim();
                    let filtered = filterAutocomplete(options, params);
                    return filtered;
                  }}
                  noOptionsText={"No option"}
                />
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Tên đăng nhập"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mật khẩu"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Đăng ký
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

RegisterPage.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default RegisterPage;
