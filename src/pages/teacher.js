import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import CustomersDialog from "src/sections/customer/customers-dialog";
import {
  deleteAccountById,
  getAccountById,
  getMember,
  getProjectByAccountId,
  getProjectById,
  searchAccByRole,
} from "src/services/customerServices";
import { getCurrentUser } from "src/appFunctions";
import { STATUS, ROLE_OBJECT } from "src/appConst";
import CustomersDialogDelete from "src/sections/customer/customers-dialog-delete";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [customer, setCustomer] = useState("");
  const [listUser, setListUser] = useState([]);
  const [isView, setIsView] = useState(false);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const getPaginatedData = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return listUser?.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  const handleClickOpen = async (item) => {
    try {
      const data = await getAccountById(item?.id);
      if (data?.status === STATUS.SUCCESS) {
        setCustomer(data?.data);
        setOpen(true);
        setIsView(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    try {
      const data = await getAccountById(item?.id);
      if (data?.status === STATUS.SUCCESS) {
        setCustomer(data?.data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpenDelete = (data) => {
    setCustomer(data);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setCustomer(null);
    setOpen(false);
    setOpenDelete(false);
    setIsView(false);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteAccountById(customer);
      if (data?.status === STATUS.SUCCESS) {
        pageUpdate();
        handleClose();
        toast.success("Xóa giáo viên thành công", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Xóa giáo viên thất bại", {
        autoClose: 1000,
      });
    }
  };
  const handleSearch = async (keyWord) => {
    try {
      if (keyWord !== "") {
        const data = await searchAccByRole({ role: ROLE_OBJECT?.ADMIN?.indexOrder, query: keyWord });
        if (data?.status === STATUS.SUCCESS) {
          setListUser(data?.data);
        }
      } else {
        pageUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pageUpdate = async () => {
    try {
      const data = await getMember("1");
      if (data?.status === STATUS.SUCCESS) {
        setListUser(data?.data);
      } else {
        setListUser([]);
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
        <title>Giáo viên | Phần mềm quản lý học sinh phổ thông</title>
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
                <Typography variant="h4">Danh sách giáo viên</Typography>
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
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Thêm mới
                </Button>
              </div>
            </Stack>
            <CustomersSearch
              isPlant={true}
              handleSearch={handleSearch}
              placeHolder={"Tìm kiếm theo tên giáo viên"}
            />
            <CustomersDialog
              title="Thêm mới/Cập nhật giáo viên"
              isViewTitle="Thông tin giáo viên"
              isGiaoVien={true}
              open={open}
              handleClose={handleClose}
              items={customer}
              isView={isView}
              pageUpdate={pageUpdate}
            />
            <CustomersDialogDelete
              open={openDelete}
              handleClose={handleClose}
              handleYes={handleDelete}
              data={customer}
            />
            <CustomersTable
              isGiaoVien={true}
              handleClickOpen={handleClickOpen}
              handleClickOpenDelete={handleClickOpenDelete}
              handleEdit={handleEdit}
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
      <ToastContainer />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
