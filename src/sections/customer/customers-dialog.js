import { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  Autocomplete,
  Grid,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getCurrentUser, getSelectedStatusValue, getSelectedPercentValue } from "src/appFunctions";
import {
  LIST_STATUS,
  STATUS,
  STATUS_OBJECT,
  COLOR,
  LIST_PERCENT_COMPLETE,
  LIST_PLAN_STATUS,
  ROLE_OBJECT,
} from "src/appConst";
import {
  addAccount,
  addProject,
  deleteTask,
  editProject,
  getMember,
  updateAccountById,
  updateAdds,
  updateTask,
  updateLop10,
  updateLop11,
  updateLop12,
  addLop10,
  addLop11,
  addLop12,
  updatePee,
  updateFamilys,
  deleteFamilyById,
} from "src/services/customerServices";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import CustomersTab from "./customers-tab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    className: "m-100",
  };
}

export default function CustomersDialog({
  open,
  items,
  handleClose,
  title,
  isPlan,
  isView,
  pageUpdate,
  isAdmin,
  isGroup,
  isMember,
  isGiaoVien,
  isViewTitle,
  isFinance,
}) {
  const permitsion = getCurrentUser();
  const isEditMember = permitsion?.role === ROLE_OBJECT.SUPPER_ADMIN.indexOrder;
  const isEditTeacher = permitsion?.role === ROLE_OBJECT.ADMIN.indexOrder;
  const filterAutocomplete = createFilterOptions();
  const [listTask, setListTask] = useState([]);
  const [listMember, setListMember] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [listFamilies, setListFamilies] = useState([]);
  const [familiesObj, setFamiliesObj] = useState({});

  const [formData, setFormData] = useState({});

  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    if (isView) {
      return;
    }
    const { name, value } = event.target;
    if (isEditMember) {
      if (name === "createdAt") {
      } else if (name === "startDate") {
        setFormData((prevData) => ({ ...prevData, startDate: new Date(value) }));
      } else if (name === "endDate") {
        setFormData((prevData) => ({ ...prevData, endDate: new Date(value) }));
      } else if (name === "endDate") {
        setFormData((prevData) => ({ ...prevData, endDate: new Date(value) }));
      } else if (name === "birth") {
        setFormData((prevData) => ({ ...prevData, birth: new Date(value) }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }
    if (isEditTeacher) {
      if (name === "name") {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }
  };

  const convertListTask = () => {
    let convert = listTask?.map((i) => {
      return {
        ...i,
        userId: i?.member?.userId || i?.member?.id,
        userName: i?.member?.username,
        status: i?.status?.code,
        projectName: formData?.name,
        note: i?.note,
        startDate: new Date(formData?.startDate),
        endDate: new Date(formData?.endDate),
        homeroomTeacher: formData?.createdBy?.username,
      };
    });
    return convert?.length ? convert : null;
  };
  const convertDataSubmit = (data) => {
    return {
      ...data,
      status: data?.status?.label || LIST_STATUS[0].label,
      accountId: data?.createdBy?.id,
      createdBy: data?.createdBy?.username,
      memberStudents: convertListTask(),
    };
  };
  const convertDataGroupSubmit = (data) => {
    return { ...data, percentComplete: data?.percent?.label, status: data?.status?.code };
  };
  const convertDataMemberSubmit = (data) => {
    return { ...data, role: isGiaoVien ? "1" : "3" };
  };
  const convertDataClassSubmit = (data, id) => {
    return { ...data, accountId: id };
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isPlan) {
      try {
        if (!formData?.startDate) {
          toast.error("Ngày bắt đầu không được để trống", {
            autoClose: 1000,
          });
          return;
        }
        if (!formData?.endDate) {
          toast.error("Ngày kết thúc không được để trống", {
            autoClose: 1000,
          });
          return;
        }
        if (formData?.id) {
          if (listTask.length > 0) {
            const dataTask = await updateAdds(convertListTask());
            console.log(dataTask);
            if (dataTask?.status === STATUS.ERROR) {
              toast.error("Cập nhật lớp học lỗi", {
                autoClose: 1000,
              });
              return;
            }
          }
          const data = await editProject(convertDataSubmit(formData));
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Cập nhật lớp học thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên lớp không được để trống", {
              autoClose: 1000,
            });
            return;
          }
        } else {
          const data = await addProject(convertDataSubmit(formData));
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Thêm lớp học sinh thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên lớp không được để trống", {
              autoClose: 1000,
            });
            return;
          }
        }
        setFormData({});
        await pageUpdate();
        handleClose();
      } catch (error) {
        console.log(error);
        if (error?.response?.status === STATUS.BAD_GATEWAY) {
          toast.error(error?.response?.data?.message, {
            autoClose: 1000,
          });
          return;
        }

        if (formData?.id) {
          toast.error("Lỗi cập nhật thông tin lớp học", {
            autoClose: 1000,
          });
        } else {
          toast.error("Lỗi tạo lớp học", {
            autoClose: 1000,
          });
        }
      }
    }
    if (isMember) {
      try {
        if (formData?.id) {
          const data = await updateAccountById(convertDataMemberSubmit(formData));
          if (formData?.lop10[0]?.id) {
            await updateLop10(convertDataClassSubmit(formData?.lop10[0], items?.id));
          } else {
            await addLop10(convertDataClassSubmit(formData?.lop10[0], items?.id));
          }
          if (formData?.lop11[0]?.id) {
            await updateLop11(convertDataClassSubmit(formData?.lop11[0], items?.id));
          } else {
            await addLop11(convertDataClassSubmit(formData?.lop11[0], items?.id));
          }
          if (formData?.lop12[0]?.id) {
            await updateLop12(convertDataClassSubmit(formData?.lop12[0], items?.id));
          } else {
            await addLop12(convertDataClassSubmit(formData?.lop12[0], items?.id));
          }
          const dataFamilies = await updateFamilys(listFamilies);
          if ((data?.status && dataFamilies?.status) === STATUS.SUCCESS) {
            toast.success("Cập nhật học sinh thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên học sinh không được để trống", {
              autoClose: 1000,
            });
            return;
          }
        } else {
          const data = await addAccount(convertDataMemberSubmit(formData));
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Thêm mới học sinh thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên học sinh không được để trống", {
              autoClose: 1000,
            });
            return;
          }
        }
        setFormData({});
        await pageUpdate();
        handleClose();
      } catch (error) {
        console.log(error);
        if (error?.response?.status === STATUS.BAD_GATEWAY) {
          toast.error(error?.response?.data?.message, {
            autoClose: 1000,
          });
          return;
        }
        if (formData?.id) {
          toast.error("Lỗi cập nhật học sinh", {
            autoClose: 1000,
          });
        } else {
          toast.error("Lỗi thêm mới học sinh", {
            autoClose: 1000,
          });
        }
      }
    }
    if (isGiaoVien) {
      try {
        if (formData?.id) {
          const data = await updateAccountById(convertDataMemberSubmit(formData));

          if (data?.status === STATUS.SUCCESS) {
            toast.success("Cập nhật thông tin giáo viên thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên không được để trống", {
              autoClose: 1000,
            });
            return;
          }
        } else {
          const data = await addAccount(convertDataMemberSubmit(formData));
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Thêm mới giáo viên thành công", {
              autoClose: 1000,
            });
          } else if (data?.status === STATUS.NOCONTENT) {
            toast.warn("Tên khong được để trống", {
              autoClose: 1000,
            });
            return;
          }
        }
        setFormData({});
        await pageUpdate();
        handleClose();
      } catch (error) {
        console.log(error);
        if (error?.response?.status === STATUS.BAD_GATEWAY) {
          toast.error(error?.response?.data?.message, {
            autoClose: 1000,
          });
          return;
        }

        if (formData?.id) {
          toast.error("Lỗi cập nhật thông tin giáo viên", {
            autoClose: 1000,
          });
        } else {
          toast.error("Lỗi thêm mới giáo viên", {
            autoClose: 1000,
          });
        }
      }
    }
    if (isGroup) {
      // try {
      //   if (formData?.id) {
      //     const data = await updateTask(convertDataGroupSubmit(formData));
      //     if (data?.status === STATUS.SUCCESS) {
      //       toast.success("Project updated successfully", {
      //         autoClose: 1000,
      //       });
      //     } else if (data?.status === STATUS.NOCONTENT) {
      //       toast.warn("Project name cannot be null", {
      //         autoClose: 1000,
      //       });
      //       return;
      //     }
      //   } else {
      //     if (data?.status === STATUS.SUCCESS) {
      //       toast.warning("Something wrong", {
      //         autoClose: 1000,
      //       });
      //     }
      //   }
      //   setFormData({});
      //   await pageUpdate();
      //   handleClose();
      // } catch (error) {
      //   if (error?.response?.status === STATUS.BAD_GATEWAY) {
      //     toast.error(error?.response?.data?.message, {
      //       autoClose: 1000,
      //     });
      //     return;
      //   }
      //   if (formData?.id) {
      //     toast.error("Error updating task", {
      //       autoClose: 1000,
      //     });
      //   } else {
      //     toast.error("Error creating task", {
      //       autoClose: 1000,
      //     });
      //   }
      // }
    }
    if (isFinance) {
      try {
        if (formData?.id) {
          const data = await updatePee(formData);
          if (data?.status === STATUS.SUCCESS) {
            toast.success("Cập nhật học phí thành công", {
              autoClose: 1000,
            });
          }
        }
        setFormData({});
        handleClose();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Có lỗi xảy ra", {
          autoClose: 1000,
        });
      }
    }
    setValue(0);
  };

  const handleChangeStatus = (data) => {
    setFormData((prevData) => ({ ...prevData, status: data }));
  };

  const handleChangePercent = (data) => {
    setFormData((prevData) => ({ ...prevData, percent: data }));
  };

  const handleChangememberStudentstatusItem = (data) => {
    setFormData((prevData) => ({ ...prevData, status: data }));
  };

  const handleAddTask = () => {
    setListTask((pre) => [...pre, { projectId: items?.id }]);
  };

  const handleChangeTeacher = (data) => {
    setFormData((prevData) => ({ ...prevData, createdBy: data }));
  };

  const handleChangeTask = (event, taskName, index) => {
    if (isView) {
      return;
    }
    const updatedListTask = [...listTask];
    updatedListTask[index].taskName = event.target.value;
    setListTask(updatedListTask);
  };

  const handleChangeNote = (event, note, index) => {
    if (isView) {
      return;
    }
    const updatedListTask = [...listTask];
    updatedListTask[index].note = event.target.value;
    setListTask(updatedListTask);
  };

  const handleChangePercentComplete = (event, percentComplete, index) => {
    const updatedListTask = [...listTask];
    updatedListTask[index].percentComplete = event.target.value;
    setListTask(updatedListTask);
  };

  const handleDeleteTask = async (index, item) => {
    if (item?.id) {
      try {
        await deleteTask(item.id);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra");
      }
    }

    const updatedListTask = [...listTask];
    updatedListTask.splice(index, 1);
    setListTask(updatedListTask);
  };

  const handleChangeMember = (value, index) => {
    const updatedListTask = [...listTask];
    updatedListTask[index].member = value;
    setListTask(updatedListTask);
  };
  const handleChangememberStudentstatus = (value, index) => {
    const updatedListTask = [...listTask];
    updatedListTask[index].status = value;
    setListTask(updatedListTask);
  };

  const handleChangePoint = (event, type) => {
    if (isView) {
      return;
    }
    let { name, value } = event.target;
    if (type === "10") {
      setFormData((prevData) => ({
        ...prevData,
        lop10: [{ ...prevData.lop10[0], [name]: value }],
      }));
    }
    if (type === "11") {
      setFormData((prevData) => ({
        ...prevData,
        lop11: [{ ...prevData.lop11[0], [name]: value }],
      }));
    }
    if (type === "12") {
      setFormData((prevData) => ({
        ...prevData,
        lop12: [{ ...prevData.lop12[0], [name]: value }],
      }));
    }
  };

  const handleChangeFamily = (event) => {
    const { value, name } = event.target;
    if (name === "birth") {
      setFamiliesObj((pre) => ({ ...pre, [name]: new Date(value) }));
      return;
    }
    setFamiliesObj((pre) => ({ ...pre, [name]: value }));
  };

  const handleAddFamily = () => {
    setListFamilies((pre) => [...pre, { ...familiesObj, accountId: items?.id }]);
    setFamiliesObj((pre) => ({
      ...pre,
      fullName: "",
      id: null,
      address: "",
      phone: "",
      email: "",
      address: "",
      nation: "",
      birth: new Date(),
      relationship: "",
    }));
  };

  const handleDeleteFamily = async (index, item) => {
    try {
      if (item?.id) {
        await deleteFamilyById(item);
      }
      toast.success("Xóa thông tin gia đình thành công");
    } catch (error) {
      toast.success("Có lỗi xảy ra");
    } finally {
      const updatedList = [...listFamilies];
      updatedList.splice(index, 1);
      setListFamilies(updatedList);
    }
  };

  const getListMember = async () => {
    try {
      const data = await getMember("3");
      if (data?.status === STATUS.SUCCESS && data?.data?.length > 0) {
        setListMember(data?.data);
      }
    } catch (error) {}
  };
  const getListTeacher = async () => {
    try {
      const data = await getMember("1");
      if (data?.status === STATUS.SUCCESS && data?.data?.length > 0) {
        setListTeacher(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListMember();
    getListTeacher();
    setListTask(
      items?.memberStudents?.map((i) => ({
        ...i,
        member: { username: i?.userName, userId: i?.userId },
      }))
    );
    if (isPlan) {
      setFormData({
        id: items?.id,
        status: LIST_STATUS.find((item) => item.label === items?.status) || LIST_STATUS[0],
        name: items?.name,
        note: items?.note,
        description: items?.description,
        accountId: getCurrentUser()?.id,
        startDate: items?.startDate ? new Date(items?.startDate) : new Date(),
        endDate: items?.endDate ? new Date(items?.endDate) : new Date(),
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
        createdBy: {
          username: items?.createdBy || getCurrentUser()?.username,
          id: items?.accountId || getCurrentUser()?.id,
        },
        memberStudents: items?.memberStudents,
      });
    }
    if (isGroup) {
      setFormData({
        id: items?.id,
        projectName: items?.projectName,
        taskName: items?.taskName,
        percentComplete: items?.percentComplete,
        percent: getSelectedPercentValue(items?.percentComplete),
        projectId: items?.projectId,
        userId: items?.userId,
        userName: items?.userName,
        note: items?.note,
        startDate: items?.startDate && new Date(items?.startDate),
        updatedAt: items?.updatedAt && new Date(items?.updatedAt),
        endDate: items?.endDate && new Date(items?.endDate),
        createdAt: items?.createdAt,
        spentTime: items?.spentTime,
        estimatedTime: items?.estimatedTime,
        homeroomTeacher: items?.homeroomTeacher,
        classroom: items?.classroom,
        status: getSelectedStatusValue(items?.status),
      });
    }
    if (isMember) {
      setFormData({
        id: items?.id,
        username: items?.username,
        password: items?.password,
        phone: items?.phone,
        email: items?.email,
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
        address: items?.address,
        nation: items?.nation,
        birth: items?.birth && new Date(items?.birth),
        lop10: items?.lop10,
        lop11: items?.lop11,
        lop12: items?.lop12,
        families: items?.families,
      });
      setListFamilies(items?.families);
    }
    if (isGiaoVien) {
      setFormData({
        id: items?.id,
        username: items?.username,
        password: items?.password,
        phone: items?.phone,
        email: items?.email,
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
        address: items?.address,
        nation: items?.nation,
        birth: items?.birth && new Date(items?.birth),
      });
    }
    if (isAdmin) {
      setFormData({
        id: items?.id,
        username: items?.username,
        planNumber: items?.classes?.length || 0,
        completeNumber:
          items?.classes?.filter((item) => item?.status === STATUS_OBJECT.END.name)?.length || 0,
        phone: items?.phone,
        email: items?.email,
        createdAt: items?.createdAt ? new Date(items?.createdAt) : new Date(),
        address: items?.address,
        nation: items?.nation,
        birth: items?.birth && new Date(items?.birth),
      });
    }
    if (isFinance) {
      setFormData({
        id: items?.id,
        hocPhi10: items?.hocPhi10,
        hocPhi11: items?.hocPhi11,
        hocPhi12: items?.hocPhi12,
        hocPhi10DaDong: items?.hocPhi10DaDong,
        hocPhi11DaDong: items?.hocPhi11DaDong,
        hocPhi12DaDong: items?.hocPhi12DaDong,
        accountId: items?.accountId,
      });
    }
  }, [isPlan, isAdmin, isGroup, items, items?.status, isMember, isGiaoVien, isFinance]);
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        minHeight="500px"
      >
        <ValidatorForm onSubmit={handleFormSubmit}>
          <DialogTitle id="alert-dialog-title">
            {isView ? isViewTitle : title ? title : "Add/Edit accounts"}
          </DialogTitle>
          <DialogContent
            className="no-width-scroll"
            style={{ maxHeight: 600, overflowY: "scroll" }}
          >
            {isPlan && (
              <Grid container spacing={1}>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="name"
                    label={
                      <span>
                        <span>Tên lớp học</span>
                      </span>
                    }
                    value={formData?.name}
                    validators={["required"]}
                    errorMessages={["general.required"]}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  {/* <TextValidator
                    disabled={isView}
                    className="w-100"
                    label={
                      <span>
                        <span>Giáo viên dạy</span>
                      </span>
                    }
                    value={formData?.createdBy}
                  /> */}
                  {isView ? (
                    <TextValidator
                      className="w-100"
                      label={
                        <span>
                          <span>Giáo viên dạy</span>
                        </span>
                      }
                      value={formData?.createdBy?.username}
                    />
                  ) : (
                    <Autocomplete
                      fullWidth
                      options={listTeacher}
                      value={formData?.createdBy}
                      onChange={(e, value) => handleChangeTeacher(value)}
                      getOptionLabel={(option) => option?.username}
                      renderInput={(params) => (
                        <TextField
                          label={
                            <span>
                              <span>Giáo viên dạy</span>
                            </span>
                          }
                          {...params}
                        />
                      )}
                      filterOptions={(options, params) => {
                        params.inputValue = params.inputValue.trim();
                        let filtered = filterAutocomplete(options, params);
                        return filtered;
                      }}
                      disabled={getCurrentUser()?.role === "1"}
                      noOptionsText={"No option"}
                    />
                  )}
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="startDate"
                    type="date"
                    label={
                      <span>
                        <span>Ngày bắt đầu</span>
                      </span>
                    }
                    value={formData?.startDate ? format(formData?.startDate, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="endDate"
                    type="date"
                    label={
                      <span>
                        <span>Ngày kết thúc</span>
                      </span>
                    }
                    value={formData?.endDate ? format(formData?.endDate, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                {/* <Grid item
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
                </Grid> */}
                {/* <Grid item
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
                </Grid> */}
                <Grid item md={8} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="note"
                    label={
                      <span>
                        <span>Ghi chú</span>
                      </span>
                    }
                    value={formData?.note}
                  />
                </Grid>
                {/* <Grid item
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
                </Grid> */}
                {items?.id && (
                  <>
                    {!isView && (
                      <Grid item md={12} sm={12} xs={12}>
                        <Button variant="contained" onClick={handleAddTask}>
                          Thêm học sinh
                        </Button>
                      </Grid>
                    )}
                    <Grid item md={12} sm={12} xs={12}>
                      <Table size="small" padding="none" stickyHeader={true}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" width={20}>
                              STT
                            </TableCell>
                            {!isView && (
                              <TableCell align="center" width={100}>
                                Thao tác
                              </TableCell>
                            )}
                            <TableCell width={250}>Tên học sinh</TableCell>
                            <TableCell>Mã học sinh</TableCell>
                            <TableCell>Ghi chú</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listTask?.map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                {!isView && (
                                  <TableCell align="center">
                                    <SvgIcon
                                      fontSize="small"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleDeleteTask(index, item)}
                                    >
                                      <XMarkIcon style={{ color: COLOR.SUPPORT_THIRD }} />
                                    </SvgIcon>
                                  </TableCell>
                                )}
                                <TableCell align="center">
                                  {isView ? (
                                    <TextValidator
                                      className="w-100"
                                      value={item?.member?.username}
                                    />
                                  ) : (
                                    <Autocomplete
                                      fullWidth
                                      options={listMember}
                                      value={item?.member || null}
                                      onChange={(e, value) => handleChangeMember(value, index)}
                                      getOptionLabel={(option) => option?.username}
                                      renderInput={(params) => <TextField {...params} />}
                                      filterOptions={(options, params) => {
                                        params.inputValue = params.inputValue.trim();
                                        let filtered = filterAutocomplete(options, params);
                                        return filtered;
                                      }}
                                      disabled={isView}
                                      noOptionsText={"No option"}
                                    />
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  <TextValidator
                                    className="w-100"
                                    onChange={(event) => handleChangeTask(event, "taskName", index)}
                                    name="taskName"
                                    value={item.taskName}
                                  />
                                </TableCell>
                                {/* <TableCell align="center"> */}
                                {/* {LIST_PLAN_STATUS.find((i) => i?.code === item?.status)?.label} */}
                                {/* <Autocomplete
                                fullWidth
                                options={LIST_PLAN_STATUS}
                                value={item?.label}
                                onChange={(e, value) => handleChangememberStudentstatus(value, index)}
                                getOptionLabel={(option) => option?.label}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                filterOptions={(options, params) => {
                                  params.inputValue = params.inputValue.trim();
                                  let filtered = filterAutocomplete(options, params);
                                  return filtered;
                                }}
                                disabled={isView}
                                noOptionsText={"No option"}
                              /> */}
                                {/* </TableCell> */}
                                {/* <TableCell align="center">{item?.percentComplete}</TableCell> */}
                                <TableCell align="left">
                                  <TextValidator
                                    // disabled={isView}
                                    className="w-100"
                                    onChange={(event) => handleChangeNote(event, "note", index)}
                                    name="note"
                                    value={item.note}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
            {isMember && (
              <>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                      <Tab
                        style={{ minWidth: "200px" }}
                        label="Thông tin học sinh"
                        {...a11yProps(0)}
                      />
                      <Tab
                        style={{ minWidth: "200px" }}
                        label="Quan hệ gia đình"
                        {...a11yProps(1)}
                        disabled={!items?.id}
                      />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={1}>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          onChange={handleChange}
                          name="username"
                          label={
                            <span>
                              <span>Tên học sinh</span>
                            </span>
                          }
                          value={formData?.username}
                          validators={["required"]}
                          errorMessages={["generalrequired"]}
                        />
                      </Grid>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          onChange={handleChange}
                          type="password"
                          name="password"
                          label={
                            <span>
                              <span>Mật khẩu</span>
                            </span>
                          }
                          value={formData?.password}
                          validators={["required"]}
                          errorMessages={["general.required"]}
                        />
                      </Grid>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          name="phone"
                          onChange={handleChange}
                          label={
                            <span>
                              <span>Số điện thoại</span>
                            </span>
                          }
                          value={formData?.phone}
                        />
                      </Grid>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          name="email"
                          onChange={handleChange}
                          label={
                            <span>
                              <span>Email</span>
                            </span>
                          }
                          value={formData?.email}
                        />
                      </Grid>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          onChange={handleChange}
                          name="birth"
                          type="date"
                          label={
                            <span>
                              <span>Ngày sinh</span>
                            </span>
                          }
                          value={formData?.birth ? format(formData?.birth, "yyyy-MM-dd") : ""}
                        />
                      </Grid>
                      <Grid item md={4} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          name="nation"
                          onChange={handleChange}
                          label={
                            <span>
                              <span>Dân tộc</span>
                            </span>
                          }
                          value={formData?.nation}
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <TextValidator
                          // disabled={isView}
                          className="w-100"
                          name="address"
                          onChange={handleChange}
                          label={
                            <span>
                              <span>Địa chỉ cụ thể</span>
                            </span>
                          }
                          value={formData?.address}
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        {items?.id && (
                          <CustomersTab formData={formData} handleChange={handleChangePoint} />
                        )}
                      </Grid>
                      {items?.id && isPlan && (
                        <>
                          {!isView && (
                            <Grid item md={12} sm={12} xs={12}>
                              <Button variant="contained" onClick={handleAddTask}>
                                Add memberStudents
                              </Button>
                            </Grid>
                          )}
                          <Grid item md={12} sm={12} xs={12}>
                            <Table size="small" padding="none" stickyHeader={true}>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center" width={20}>
                                    No
                                  </TableCell>
                                  {!isView && (
                                    <TableCell align="center" width={50}>
                                      Action
                                    </TableCell>
                                  )}
                                  <TableCell>Subject</TableCell>
                                  <TableCell width={250}>Tên học sinh</TableCell>
                                  <TableCell width={110} align="center">
                                    Status
                                  </TableCell>
                                  <TableCell width={100}>% Done</TableCell>
                                  <TableCell>Note</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {listTask?.map((item, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell align="center">{index + 1}</TableCell>
                                      {!isView && (
                                        <TableCell align="center">
                                          <SvgIcon
                                            fontSize="small"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDeleteTask(index, item)}
                                          >
                                            <XMarkIcon style={{ color: COLOR.SUPPORT_THIRD }} />
                                          </SvgIcon>
                                        </TableCell>
                                      )}
                                      <TableCell align="left">
                                        <TextValidator
                                          disabled={isView}
                                          className="w-100"
                                          onChange={(event) =>
                                            handleChangeTask(event, "taskName", index)
                                          }
                                          name="taskName"
                                          value={item.taskName}
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        <Autocomplete
                                          fullWidth
                                          options={listMember}
                                          value={item?.member || null}
                                          onChange={(e, value) => handleChangeMember(value, index)}
                                          getOptionLabel={(option) => option?.username}
                                          renderInput={(params) => <TextField {...params} />}
                                          filterOptions={(options, params) => {
                                            params.inputValue = params.inputValue.trim();
                                            let filtered = filterAutocomplete(options, params);
                                            return filtered;
                                          }}
                                          disabled={isView}
                                          noOptionsText={"No option"}
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          LIST_PLAN_STATUS.find((i) => i?.code === item?.status)
                                            ?.label
                                        }
                                        {/* <Autocomplete
                                  fullWidth
                                  options={LIST_PLAN_STATUS}
                                  value={item?.label}
                                  onChange={(e, value) => handleChangememberStudentstatus(value, index)}
                                  getOptionLabel={(option) => option?.label}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                  filterOptions={(options, params) => {
                                    params.inputValue = params.inputValue.trim();
                                    let filtered = filterAutocomplete(options, params);
                                    return filtered;
                                  }}
                                  disabled={isView}
                                  noOptionsText={"No option"}
                                /> */}
                                      </TableCell>
                                      <TableCell align="center">{item?.percentComplete}</TableCell>
                                      <TableCell align="left">{item?.note}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={1}>
                      {isView ? (
                        ""
                      ) : (
                        <>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              onChange={handleChangeFamily}
                              name="fullName"
                              label={
                                <span>
                                  <span>Tên</span>
                                </span>
                              }
                              value={familiesObj?.fullName}
                              validators={["required"]}
                              errorMessages={["general.required"]}
                            />
                          </Grid>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              name="phone"
                              onChange={handleChangeFamily}
                              label={
                                <span>
                                  <span>Số điện thoại</span>
                                </span>
                              }
                              value={familiesObj?.phone}
                            />
                          </Grid>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              name="email"
                              onChange={handleChangeFamily}
                              label={
                                <span>
                                  <span>Email</span>
                                </span>
                              }
                              value={familiesObj?.email}
                            />
                          </Grid>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              onChange={handleChangeFamily}
                              name="birth"
                              type="date"
                              label={
                                <span>
                                  <span>Ngày sinh</span>
                                </span>
                              }
                              value={
                                familiesObj?.birth
                                  ? format(familiesObj?.birth, "yyyy-MM-dd")
                                  : format(new Date(), "yyyy-MM-dd")
                              }
                            />
                          </Grid>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              onChange={handleChangeFamily}
                              name="relationship"
                              label={
                                <span>
                                  <span>Quan hệ với học sinh</span>
                                </span>
                              }
                              value={familiesObj?.relationship}
                            />
                          </Grid>
                          <Grid item md={4} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              name="nation"
                              onChange={handleChangeFamily}
                              label={
                                <span>
                                  <span>Dân tộc</span>
                                </span>
                              }
                              value={familiesObj?.nation}
                            />
                          </Grid>
                          <Grid item md={12} sm={12} xs={12}>
                            <TextValidator
                              disabled={isView}
                              className="w-100"
                              name="address"
                              onChange={handleChangeFamily}
                              label={
                                <span>
                                  <span>Địa chỉ cụ thể</span>
                                </span>
                              }
                              value={familiesObj?.address}
                            />
                          </Grid>
                          <Grid item md={12} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              style={{ marginRight: 10, minWidth: 100 }}
                              onClick={handleAddFamily}
                            >
                              Thêm
                            </Button>
                            {/* <Button variant="outlined" color="error" style={{ minWidth: 100 }}>
                          Hoàn tác
                        </Button> */}
                          </Grid>
                        </>
                      )}
                      <Grid item md={12} sm={12} xs={12}>
                        <Table size="small" padding="none" stickyHeader={true}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center" width={20}>
                                STT
                              </TableCell>
                              {!isView && (
                                <TableCell align="center" width={100}>
                                  Thao tác
                                </TableCell>
                              )}
                              <TableCell>Họ và tên</TableCell>
                              <TableCell>Quan hệ với học sinh</TableCell>
                              <TableCell width={200} align="center">
                                Ngày sinh
                              </TableCell>
                              <TableCell width={200} align="center">
                                Số điện thoại
                              </TableCell>
                              <TableCell align="center">Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listFamilies?.map((item, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell align="center">{index + 1}</TableCell>
                                  {!isView && (
                                    <TableCell align="center">
                                      <SvgIcon
                                        fontSize="small"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteFamily(index, item)}
                                      >
                                        <XMarkIcon style={{ color: COLOR.SUPPORT_THIRD }} />
                                      </SvgIcon>
                                    </TableCell>
                                  )}
                                  <TableCell align="left">{item?.fullName}</TableCell>
                                  <TableCell align="left">{item?.relationship}</TableCell>
                                  <TableCell align="center">
                                    {item?.birth ? format(new Date(item?.birth), "yyyy-MM-dd") : ""}
                                  </TableCell>
                                  <TableCell align="center">{item?.phone}</TableCell>
                                  <TableCell align="center">{item?.email}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </CustomTabPanel>
                </Box>
              </>
            )}
            {isGiaoVien && (
              <Grid container spacing={1}>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="username"
                    label={
                      <span>
                        <span>Tên giáo viên</span>
                      </span>
                    }
                    value={formData?.username}
                    validators={["required"]}
                    errorMessages={["general.required"]}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    label={
                      <span>
                        <span>Mật khẩu</span>
                      </span>
                    }
                    value={formData?.password}
                    validators={["required"]}
                    errorMessages={["general.required"]}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="phone"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số điện thoại</span>
                      </span>
                    }
                    value={formData?.phone}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="email"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Email</span>
                      </span>
                    }
                    value={formData?.email}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="birth"
                    type="date"
                    label={
                      <span>
                        <span>Ngày sinh</span>
                      </span>
                    }
                    value={formData?.birth ? format(formData?.birth, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="nation"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Dân tộc</span>
                      </span>
                    }
                    value={formData?.nation}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="address"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Địa chỉ cụ thể</span>
                      </span>
                    }
                    value={formData?.address}
                  />
                </Grid>
                {items?.id && isPlan && (
                  <>
                    {!isView && (
                      <Grid item md={12} sm={12} xs={12}>
                        <Button variant="contained" onClick={handleAddTask}>
                          Add memberStudents
                        </Button>
                      </Grid>
                    )}
                    <Grid item md={12} sm={12} xs={12}>
                      <Table size="small" padding="none" stickyHeader={true}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" width={20}>
                              No
                            </TableCell>
                            {!isView && (
                              <TableCell align="center" width={50}>
                                Action
                              </TableCell>
                            )}
                            <TableCell>Subject</TableCell>
                            <TableCell width={250}>Assignee</TableCell>
                            <TableCell width={110} align="center">
                              Status
                            </TableCell>
                            <TableCell width={100}>% Done</TableCell>
                            <TableCell>Note</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listTask?.map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                {!isView && (
                                  <TableCell align="center">
                                    <SvgIcon
                                      fontSize="small"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleDeleteTask(index, item)}
                                    >
                                      <XMarkIcon style={{ color: COLOR.SUPPORT_THIRD }} />
                                    </SvgIcon>
                                  </TableCell>
                                )}
                                <TableCell align="left">
                                  <TextValidator
                                    disabled={isView}
                                    className="w-100"
                                    onChange={(event) => handleChangeTask(event, "taskName", index)}
                                    name="taskName"
                                    value={item.taskName}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <Autocomplete
                                    fullWidth
                                    options={listMember}
                                    value={item?.member || null}
                                    onChange={(e, value) => handleChangeMember(value, index)}
                                    getOptionLabel={(option) => option?.username}
                                    renderInput={(params) => <TextField {...params} />}
                                    filterOptions={(options, params) => {
                                      params.inputValue = params.inputValue.trim();
                                      let filtered = filterAutocomplete(options, params);
                                      return filtered;
                                    }}
                                    disabled={isView}
                                    noOptionsText={"No option"}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {LIST_PLAN_STATUS.find((i) => i?.code === item?.status)?.label}
                                  {/* <Autocomplete
                                fullWidth
                                options={LIST_PLAN_STATUS}
                                value={item?.label}
                                onChange={(e, value) => handleChangememberStudentstatus(value, index)}
                                getOptionLabel={(option) => option?.label}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                filterOptions={(options, params) => {
                                  params.inputValue = params.inputValue.trim();
                                  let filtered = filterAutocomplete(options, params);
                                  return filtered;
                                }}
                                disabled={isView}
                                noOptionsText={"No option"}
                              /> */}
                                </TableCell>
                                <TableCell align="center">{item?.percentComplete}</TableCell>
                                <TableCell align="left">{item?.note}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
            {/* group  */}
            {isGroup && (
              <Grid container spacing={1}>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="projectName"
                    label={
                      <span>
                        <span>Tên lớp học</span>
                      </span>
                    }
                    value={formData?.projectName}
                    validators={["required"]}
                    errorMessages={["general.required"]}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    label={
                      <span>
                        <span>Giáo viên dạy</span>
                      </span>
                    }
                    value={formData?.homeroomTeacher}
                  />
                </Grid>
                {/* <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="createdAt"
                    label={
                      <span>
                        <span>Created at</span>
                      </span>
                    }
                    value={
                      formData?.createdAt ? format(new Date(formData?.createdAt), "dd/MM/yyyy") : ""
                    }
                  />
                </Grid> */}
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="startDate"
                    type="date"
                    label={
                      <span>
                        <span>Ngày bắt đầu</span>
                      </span>
                    }
                    value={formData?.startDate ? format(formData?.startDate, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="endDate"
                    type="date"
                    label={
                      <span>
                        <span>Ngày kết thúc</span>
                      </span>
                    }
                    value={formData?.endDate ? format(formData?.endDate, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                {/* <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="classroom"
                    type="number"
                    label={
                      <span>
                        <span>Phòng học</span>
                      </span>
                    }
                    value={formData?.classroom}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="estimatedTime"
                    type="number"
                    label={
                      <span>
                        <span>Estimate time</span>
                      </span>
                    }
                    value={formData?.estimatedTime}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="spentTime"
                    type="number"
                    label={
                      <span>
                        <span>Spent time</span>
                      </span>
                    }
                    value={formData?.spentTime}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <Autocomplete
                    fullWidth
                    options={LIST_PLAN_STATUS}
                    value={
                      formData?.status?.code === LIST_PLAN_STATUS[0].code
                        ? LIST_PLAN_STATUS[0]
                        : formData?.status?.code === LIST_PLAN_STATUS[1].code
                        ? LIST_PLAN_STATUS[1]
                        : formData?.status?.code === LIST_PLAN_STATUS[2].code
                        ? LIST_PLAN_STATUS[2]
                        : formData?.status?.code === LIST_PLAN_STATUS[3].code
                        ? LIST_PLAN_STATUS[3]
                        : formData?.status?.code === LIST_PLAN_STATUS[4].code
                        ? LIST_PLAN_STATUS[4]
                        : formData?.status?.code === LIST_PLAN_STATUS[5].code
                        ? LIST_PLAN_STATUS[5]
                        : null
                    }
                    onChange={(e, value) => handleChangememberStudentstatusItem(value)}
                    getOptionLabel={(option) => option?.label}
                    renderInput={(params) => <TextField {...params} label={"Status"} />}
                    filterOptions={(options, params) => {
                      params.inputValue = params.inputValue.trim();
                      let filtered = filterAutocomplete(options, params);
                      return filtered;
                    }}
                    disabled={isView}
                    noOptionsText={"No option"}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <Autocomplete
                    fullWidth
                    options={LIST_PERCENT_COMPLETE}
                    value={
                      formData?.percent?.label == LIST_PERCENT_COMPLETE[0].label
                        ? LIST_PERCENT_COMPLETE[0]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[1].label
                        ? LIST_PERCENT_COMPLETE[1]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[1].label
                        ? LIST_PERCENT_COMPLETE[1]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[2].label
                        ? LIST_PERCENT_COMPLETE[2]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[3].label
                        ? LIST_PERCENT_COMPLETE[3]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[4].label
                        ? LIST_PERCENT_COMPLETE[4]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[5].label
                        ? LIST_PERCENT_COMPLETE[5]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[6].label
                        ? LIST_PERCENT_COMPLETE[6]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[7].label
                        ? LIST_PERCENT_COMPLETE[7]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[8].label
                        ? LIST_PERCENT_COMPLETE[8]
                        : formData?.percent?.label == LIST_PERCENT_COMPLETE[9].label
                        ? LIST_PERCENT_COMPLETE[9]
                        : null
                    }
                    onChange={(e, value) => handleChangePercent(value)}
                    getOptionLabel={(option) => option?.label}
                    renderInput={(params) => <TextField {...params} label={"Percent complete"} />}
                    filterOptions={(options, params) => {
                      params.inputValue = params.inputValue.trim();
                      let filtered = filterAutocomplete(options, params);
                      return filtered;
                    }}
                    disabled={isView}
                    noOptionsText={"No option"}
                  />
                </Grid> */}
                <Grid item md={8} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    onChange={handleChange}
                    name="note"
                    label={
                      <span>
                        <span>Ghi chú</span>
                      </span>
                    }
                    value={formData?.note}
                  />
                </Grid>
              </Grid>
            )}
            {/*  account  */}
            {isAdmin && (
              <Grid container spacing={1}>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    label={
                      <span>
                        <span>Tên người dùng</span>
                      </span>
                    }
                    value={formData?.username}
                  />
                </Grid>
                {/* <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="planNumber"
                    label={
                      <span>
                        <span>Number of plan</span>
                      </span>
                    }
                    value={formData?.planNumber}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="completeNumber"
                    label={
                      <span>
                        <span>Number of completed classes</span>
                      </span>
                    }
                    value={formData?.completeNumber}
                  />
                </Grid> */}
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="Email"
                    label={
                      <span>
                        <span>Email</span>
                      </span>
                    }
                    value={formData?.email}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="phone"
                    label={
                      <span>
                        <span>Số điện thoại</span>
                      </span>
                    }
                    value={formData?.phone}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="createdAt"
                    label={
                      <span>
                        <span>Ngày tạo</span>
                      </span>
                    }
                    value={formData?.createdAt ? format(formData?.createdAt, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="birth"
                    label={
                      <span>
                        <span>Ngày sinh</span>
                      </span>
                    }
                    value={formData?.birth ? format(formData?.birth, "yyyy-MM-dd") : ""}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="nation"
                    label={
                      <span>
                        <span>Dân tộc</span>
                      </span>
                    }
                    value={formData?.nation}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <TextValidator
                    disabled={isView}
                    className="w-100"
                    name="address"
                    label={
                      <span>
                        <span>Địa chỉ</span>
                      </span>
                    }
                    value={formData?.address}
                  />
                </Grid>
              </Grid>
            )}
            {/* finance */}
            {isFinance && (
              <Grid container spacing={1}>
                <Grid item md={12} sm={12} xs={12}>
                  Học phí lớp 10
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi10"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền phải nộp học phí</span>
                      </span>
                    }
                    value={formData?.hocPhi10}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi10DaDong"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền đã đóng</span>
                      </span>
                    }
                    value={formData?.hocPhi10DaDong}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi10"
                    type="number"
                    // onChange={handleChange}
                    label={
                      <span>
                        <span>Thừa / Thiếu </span>
                      </span>
                    }
                    value={formData?.hocPhi10 - formData?.hocPhi10DaDong}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  Học phí lớp 11
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi11"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền phải nộp học phí</span>
                      </span>
                    }
                    value={formData?.hocPhi11}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi11DaDong"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền đã đóng</span>
                      </span>
                    }
                    value={formData?.hocPhi11DaDong}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi11"
                    type="number"
                    // onChange={handleChange}
                    label={
                      <span>
                        <span>Thừa / Thiếu </span>
                      </span>
                    }
                    value={formData?.hocPhi11 - formData?.hocPhi11DaDong}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  Học phí lớp 12
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi12"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền phải nộp học phí</span>
                      </span>
                    }
                    value={formData?.hocPhi12}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi12DaDong"
                    type="number"
                    onChange={handleChange}
                    label={
                      <span>
                        <span>Số tiền đã đóng</span>
                      </span>
                    }
                    value={formData?.hocPhi12DaDong}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                  <TextValidator
                    // disabled={isView}
                    className="w-100"
                    name="hocPhi12"
                    type="number"
                    // onChange={handleChange}
                    label={
                      <span>
                        <span>Thừa / Thiếu </span>
                      </span>
                    }
                    value={formData?.hocPhi12 - formData?.hocPhi12DaDong}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setValue(0);
              }}
              color="error"
              variant="outlined"
            >
              Hủy
            </Button>
            {isView === false && (
              <Button type="submit" onClick={handleFormSubmit} autoFocus variant="contained">
                Lưu
              </Button>
            )}
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </Fragment>
  );
}
