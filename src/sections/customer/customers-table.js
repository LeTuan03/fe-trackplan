import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { SvgIcon } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { COLOR, LIST_PLAN_STATUS, ROLE, ROLE_OBJECT, STATUS_OBJECT } from "src/appConst";
import {
  convertTxt,
  getCurrentUser,
  renderRole,
  renderStatus,
  statusTable,
} from "src/appFunctions";
import { SeverityPill } from "src/components/severity-pill";
export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isPlant,
    isAdmin,
    isGroup,
    isMember,
    handleClickOpen,
    handleEdit,
    handleClickOpenDelete,
    isGiaoVien,
    isDelete,
    handlePrint,
  } = props;

  const permitsion = getCurrentUser();
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800, minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                {isPlant && (
                  <>
                    <TableCell align="center">STT</TableCell>
                    <TableCell padding="checkbox" align="center">
                      Thao tác
                    </TableCell>
                    <TableCell>Tên lớp học</TableCell>
                    <TableCell>Giáo viên dạy</TableCell>
                    <TableCell align="center">Sĩ số lớp</TableCell>
                    {/* <TableCell align='center' >
                    Status
                  </TableCell>
                  <TableCell align='center' >
                    Updated At
                  </TableCell>
                  <TableCell>
                    Note
                  </TableCell> */}
                  </>
                )}
                {isMember && (
                  <>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                    <TableCell>Tên học sinh</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Email</TableCell>
                    {/* <TableCell align="center">Created at</TableCell>
                    <TableCell align="center">Role</TableCell> */}
                  </>
                )}
                {isGiaoVien && (
                  <>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                    <TableCell>Tên giáo viên</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Email</TableCell>
                  </>
                )}
                {isGroup && (
                  <>
                    <TableCell width={20}>STT</TableCell>
                    <TableCell width={100}>Thao tác</TableCell>
                    <TableCell>Tên lớp học</TableCell>
                    <TableCell>Giáo viên dạy</TableCell>
                    {/* <TableCell align="center" width={110}>
                      Status
                    </TableCell>
                    <TableCell align="center" width={120}>
                      % Done
                    </TableCell>
                    <TableCell align="center" width={130}>
                      Start Date
                    </TableCell>
                    <TableCell align="center" width={130}>
                      Due Date
                    </TableCell>
                    <TableCell align="center" width={130}>
                      Updated At
                    </TableCell> */}
                  </>
                )}

                {isAdmin && (
                  <>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center" width={100}>
                      Thao tác
                    </TableCell>
                    <TableCell>Tên người dùng</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Vai trò</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                return (
                  <TableRow hover key={customer.id}>
                    {isPlant && (
                      <>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              gap: 10,
                            }}
                          >
                            <SvgIcon fontSize="small" onClick={() => handleEdit(customer)}>
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>
                            {customer?.status !== STATUS_OBJECT.INPROGRESS.name && (
                              <SvgIcon
                                fontSize="small"
                                onClick={() => {
                                  handleClickOpenDelete(customer);
                                }}
                              >
                                <XMarkIcon />
                              </SvgIcon>
                            )}

                            <SvgIcon
                              fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer);
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                            <Typography variant="subtitle2">{customer.name}</Typography>
                          </Stack>
                        </TableCell>
                        {/* <TableCell>{getCurrentUser()?.username}</TableCell> */}
                        <TableCell>{customer?.createdBy}</TableCell>
                        <TableCell align="center">
                          {/* {customer?.createdAt
                            ? format(new Date(customer?.createdAt), "dd/MM/yyyy")
                            : ""} */}
                          {customer?.memberStudents?.length}
                        </TableCell>
                        {/* <TableCell align='center' >
                          <SeverityPill color={[renderStatus(customer?.status)]}>
                            {customer?.status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.updatedAt ? format(new Date(customer?.updatedAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell>
                          {customer?.note}
                        </TableCell> */}
                      </>
                    )}
                    {isMember && (
                      <>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              gap: 10,
                            }}
                          >
                            <SvgIcon fontSize="small" onClick={() => handleEdit(customer)}>
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>
                            {isDelete && (
                              <SvgIcon
                                fontSize="small"
                                onClick={() => {
                                  handleClickOpenDelete(customer);
                                }}
                              >
                                <XMarkIcon />
                              </SvgIcon>
                            )}

                            <SvgIcon
                              fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer);
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                            {permitsion?.isAdmin && handlePrint  && (
                              <SvgIcon
                                fontSize="small"
                                onClick={() => {
                                  handlePrint(customer);
                                }}
                              >
                                <AcademicCapIcon />
                              </SvgIcon>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={customer.avatar}>{getInitials(customer.username)}</Avatar>
                            <Typography variant="subtitle2">{customer.username}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{customer?.phone}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{customer?.email}</Typography>
                        </TableCell>
                        {/* <TableCell align="center">
                          {customer?.createdAt
                            ? format(new Date(customer?.createdAt), "dd/MM/yyyy")
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          <SeverityPill color={[renderRole(customer?.role)]}>
                            {ROLE.find((i) => i?.indexOrder === customer?.role)?.name}
                          </SeverityPill>
                        </TableCell> */}
                      </>
                    )}
                    {isGiaoVien && (
                      <>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              gap: 10,
                            }}
                          >
                            <SvgIcon fontSize="small" onClick={() => handleEdit(customer)}>
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>
                            {customer?.status !== STATUS_OBJECT.INPROGRESS.name && (
                              <SvgIcon
                                fontSize="small"
                                onClick={() => {
                                  handleClickOpenDelete(customer);
                                }}
                              >
                                <XMarkIcon />
                              </SvgIcon>
                            )}

                            <SvgIcon
                              fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer);
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={customer.avatar}>{getInitials(customer.username)}</Avatar>
                            <Typography variant="subtitle2">{customer.username}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{customer?.phone}</TableCell>
                        <TableCell align="center">
                          {customer?.email}
                          {/* <SeverityPill color={[renderRole(customer?.role)]}>
                            {ROLE.find((i) => i?.indexOrder === customer?.role)?.name}
                          </SeverityPill> */}
                        </TableCell>
                      </>
                    )}
                    {isGroup && (
                      <>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              gap: 10,
                            }}
                          >
                            {/* <SvgIcon fontSize="small" onClick={() => handleEdit(customer)}>
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon> */}

                            <SvgIcon
                              fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer);
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>{convertTxt(customer?.projectName, 50)}</TableCell>
                        <TableCell>{convertTxt(customer?.homeroomTeacher, 35)}</TableCell>
                        {/* <TableCell width={100}>
                          {LIST_PLAN_STATUS.find((i) => i?.code === customer?.status)?.label}
                        </TableCell>
                        <TableCell align="center">{customer?.percentComplete}</TableCell>
                        <TableCell align="center">
                          {customer?.startDate
                            ? format(new Date(customer?.startDate), "dd/MM/yyyy")
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          {customer?.dueDate
                            ? format(new Date(customer?.dueDate), "dd/MM/yyyy")
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          {customer?.updatedAt
                            ? format(new Date(customer?.updatedAt), "dd/MM/yyyy")
                            : ""}
                        </TableCell> */}
                      </>
                    )}

                    {isAdmin && (
                      <>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>
                          <div
                            style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                            onClick={() => {
                              handleClickOpen(customer);
                            }}
                          >
                            <SvgIcon fontSize="small">
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={customer.avatar}>{getInitials(customer.username)}</Avatar>
                            <Typography variant="subtitle2">{customer.username}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          {customer?.createdAt
                            ? format(new Date(customer?.createdAt), "dd/MM/yyyy")
                            : ""}
                        </TableCell>
                        <TableCell style={{ maxWidth: 80 }} align="center">
                          <SeverityPill color={[renderRole(customer?.role)]}>
                            {statusTable(customer?.role)}
                          </SeverityPill>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        labelRowsPerPage="Số hàng mỗi trang"
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
