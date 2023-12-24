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

const generateSubjectList = (lopData) => [
  { name: "Toán", value: lopData?.maths, label: "maths" },
  { name: "Lý", value: lopData?.physics, label: "physics" },
  { name: "Hoá học", value: lopData?.chemistry, label: "chemistry" },
  { name: "Sinh học", value: lopData?.biology, label: "biology" },
  { name: "Địa lý", value: lopData?.geography, label: "geography" },
  { name: "Ngữ văn", value: lopData?.literature, label: "literature" },
  { name: "Tiếng anh", value: lopData?.english, label: "english" },
  { name: "Giáo dục công dân", value: lopData?.civicEducation, label: "civicEducation" },
  { name: "Lịch sử", value: lopData?.history, label: "history" },
];

const Page = () => {
  const { user, isAuthenticated } = useAuth();
  const [values, setValues] = useState({
    username: user?.username,
    password: user?.password,
    email: user?.email,
    phone: user?.phone,
  });
  const [objSubject, setObjSubject] = useState([]);
  const [classes, setClasses] = useState(null);
  const [listLop, setListLop] = useState(null);
  const [lop, setLop] = useState(null);
  const [selectClass, setSelectClass] = useState(null);
  const filterAutocomplete = createFilterOptions();

  const handleChangeClasses = (value) => {
    setClasses(value);
    if (value?.name.toLowerCase()) {
      const selectedClassData = listLop?.[value?.name.toLowerCase()] || {};
      setObjSubject(generateSubjectList(selectedClassData));
    } else {
      setObjSubject([]);
    }
  };

  const getDetailAccount = async () => {
    try {
      const { data } = await getAccountById(user?.id);
      setListLop({ lop10: data?.lop10[0], lop11: data?.lop11[0], lop12: data?.lop12[0] });
    } catch (error) {}
  };

  useEffect(() => {
    getDetailAccount();
  }, []);

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
              <Typography variant="h5">Thông tin chi tiết điểm học sinh</Typography>
            </div>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item xs={4} md={12}>
                    <b>Tên học sinh:</b> {values?.username}
                  </Grid>
                  <Grid item xs={4} md={12}>
                    <b>Email: </b>
                    {values?.email}
                  </Grid>
                  <Grid item xs={4} md={12}>
                    <b>Số điện thoại: </b> {values?.phone}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            <div>
              <Typography variant="h5">Danh sách điểm </Typography>
            </div>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Grid item xs={4} md={12} sx={{ marginBottom: 4 }}>
                    <Autocomplete
                      fullWidth
                      style={{
                        width: 300,
                      }}
                      options={LIST_CLASSES}
                      value={classes ?? null}
                      onChange={(e, value) => handleChangeClasses(value)}
                      getOptionLabel={(option) => option?.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Lớp học"
                          name="classes"
                          placeholder="-- Chọn lớp học --"
                        />
                      )}
                      filterOptions={(options, params) => {
                        params.inputValue = params.inputValue.trim();
                        return filterAutocomplete(options, params);
                      }}
                      noOptionsText={"No option"}
                    />
                  </Grid>
                </Box>
                <Grid item xs={12} md={12}>
                  <Table size="small" padding="none" stickyHeader={true}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" width={20}>
                          STT
                        </TableCell>
                        <TableCell>Môn học</TableCell>
                        <TableCell>Điểm thi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {objSubject.map((i, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="left">{i?.name}</TableCell>
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
