import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import CustomersDialog from "src/sections/customer/customers-dialog";
import { getAll, getProjectByAccountId, searchAccount } from "src/services/customerServices";
import { STATUS } from "src/appConst";
import { getCurrentUser } from "src/appFunctions";

const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [listUser, setListUser] = useState([]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const getPaginatedData = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return listUser?.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  const handleSearch = async (keyWord) => {
    try {
      if (keyWord !== "") {
        const data = await searchAccount({ query: keyWord });
        if (data?.status === STATUS.SUCCESS) {
          setListUser(data?.data);
        }
      } else {
        pageUpdate();
      }
    } catch (error) {}
  };

  const handleClickOpen = (item) => {
    setOpen(true);
    setCustomer(item);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer(null);
  };

  const pageUpdate = async () => {
    try {
      const data = await getAll();
      if (data?.status === STATUS.SUCCESS) {
        setListUser(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    pageUpdate();
  }, []);
  return (
    <>
      <Head>
        <title>Danh sách người dùng | Phần mềm quản lý học sinh phổ thông</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Danh sách người dùng</Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                {/* <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <CustomersSearch
              handleSearch={handleSearch}
              placeHolder={"Tìm kiếm theo tên người dùng"}
            />
            <CustomersDialog
              title={"Thông tin người dùng"}
              isViewTitle="Thông tin người dùng"
              open={open}
              handleClose={handleClose}
              items={customer}
              isView={true}
              isAdmin={true}
            />
            <CustomersTable
              isAdmin={true}
              handleClickOpen={handleClickOpen}
              count={listUser.length}
              items={paginatedData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
