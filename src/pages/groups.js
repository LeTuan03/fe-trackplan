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
  deleteProject,
  getById,
  getByMemberId,
  getProjectByAccountId,
  getProjectById,
  searchProject,
  searchClassesByAccountId,
} from "src/services/customerServices";
import { getCurrentUser } from "src/appFunctions";
import { STATUS } from "src/appConst";
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
      const data = await getById(item?.id);
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
      const data = await getById(item?.id);
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
      toast.warning("Bạn không có quyền", {
        autoClose: 1000,
      });
      // const data = await deleteProject(customer);
      // if (data?.status === STATUS.SUCCESS) {
      //   pageUpdate();
      //   handleClose();
      //   toast.success("Deleted project successfully", {
      //     autoClose: 1000,
      //   });
      // }
    } catch (error) {
      // toast.error("Delete failed project", {
      //   autoClose: 1000,
      // });
    }
  };
  const handleSearch = async (keyWord) => {
    try {
      if (keyWord !== "") {
        const data = await searchClassesByAccountId({
          userId: getCurrentUser()?.id,
          query: keyWord,
        });
        if (data?.status === STATUS.SUCCESS) {
          setListUser(data?.data);
        }
      } else {
        pageUpdate();
      }
    } catch (error) {}
  };
  const pageUpdate = async () => {
    try {
      const data = await getByMemberId();
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
        <title>Thông tin lớp học | Phần mềm quản lý học sinh phổ thông</title>
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
                <Typography variant="h4">Thông tin lớp học</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <CustomersSearch
              isPlant={true}
              handleSearch={handleSearch}
              placeHolder="Tìm kiếm theo tên lớp học"
            />
            <CustomersDialog
              title="Cập nhật thông tin"
              isViewTitle="Thông tin lớp học"
              isGroup={true}
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
              isGroup={true}
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
