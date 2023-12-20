import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Autocomplete,
  TextField,
  createFilterOptions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { LIST_CLASSES } from "src/appConst";
import { useAuth } from "src/hooks/use-auth";
import { getAccountById } from "src/services/customerServices";

const Page = () => {
  const { user, isAuthenticated } = useAuth();
  const [values, setValues] = useState({
    username: user?.username,
    password: user?.password,
    email: user?.email,
    phone: user?.phone,
  });
  const [objSubject, setObjSubject] = useState([
    { lop: "lop10", name: "Lớp 10" },
    { lop: "lop10", name: "Lớp 11" },
    { lop: "lop10", name: "Lớp 12" },
  ]);

  return (
    <>
      <Head>
        <title>Kết quả học tập | Phần mềm quản lý học sinh phổ thông</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h5">Thông tin chi tài chính</Typography>
            </div>
            <Card>
              <CardContent>
                <Grid item xs={12} md={12}>
                  <Table size="small" padding="none" stickyHeader={true}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" width={20}>
                          STT
                        </TableCell>
                        <TableCell>LỚP HỌC</TableCell>
                        <TableCell>Số tiền phải nộp</TableCell>
                        <TableCell>Số tiền đã nộp</TableCell>
                        <TableCell>Thừa thiếu</TableCell>
                        <TableCell>Đã nộp</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {objSubject.map((i, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="left">{i?.name}</TableCell>
                          <TableCell align="left">{i?.value}</TableCell>
                          <TableCell align="left">{i?.value}</TableCell>
                          <TableCell align="left">{i?.value}</TableCell>
                          <TableCell align="left">{i?.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
