import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { SvgIcon } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { COLOR, LIST_PLAN_STATUS, ROLE, ROLE_OBJECT, STATUS_OBJECT } from 'src/appConst';
import { convertTxt, getCurrentUser, renderRole, renderStatus } from 'src/appFunctions';
import { SeverityPill } from 'src/components/severity-pill';
export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isPlant,
    isAdmin,
    isGroup, isMember,
    handleClickOpen,
    handleEdit,
    handleClickOpenDelete,

  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800, minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                {isPlant && <>
                  <TableCell align='center' >
                    No
                  </TableCell>
                  <TableCell padding="checkbox"
                    align='center' >
                    Action
                  </TableCell>
                  <TableCell>
                    Name of project
                  </TableCell>
                  <TableCell>
                    Created by
                  </TableCell>
                  <TableCell align='center' >
                    Created at
                  </TableCell>
                  <TableCell align='center' >
                    Status
                  </TableCell>
                  <TableCell align='center' >
                    Updated At
                  </TableCell>
                  <TableCell>
                    Note
                  </TableCell>
                </>}
                {isMember && <>
                  <TableCell align='center' >
                    No
                  </TableCell>
                  <TableCell padding="checkbox"
                    align='center' >
                    Action
                  </TableCell>
                  <TableCell>
                    Username
                  </TableCell>
                  <TableCell align='center' >
                    Created at
                  </TableCell>
                  <TableCell align='center' >
                    Role
                  </TableCell>
                </>}
                {isGroup && <>
                  <TableCell align='center' >
                    No
                  </TableCell>
                  <TableCell padding="checkbox"
                    align='center' >
                    Action
                  </TableCell>
                  <TableCell align='center'
                    width={190}>
                    Project name
                  </TableCell>
                  <TableCell align='center'>
                    Task name
                  </TableCell>
                  <TableCell align='center'
                    width={110}>
                    Status
                  </TableCell>
                  <TableCell align='center'
                    width={120} >
                    % Done
                  </TableCell>
                  <TableCell align='center'
                    width={130}>
                    Start Date
                  </TableCell>
                  <TableCell align='center'
                    width={130}>
                    Due Date
                  </TableCell>
                  <TableCell align='center'
                    width={130} >
                    Updated At
                  </TableCell>
                </>}

                {isAdmin && <>
                  <TableCell align='center' >
                    No
                  </TableCell>
                  <TableCell padding="checkbox"
                    align='center'>
                    Action
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Phone
                  </TableCell>
                  <TableCell align='center'>
                    Created At
                  </TableCell>
                  <TableCell align='center'>
                    Role
                  </TableCell></>}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                return (
                  <TableRow
                    hover
                    key={customer.id}
                  >
                    {isPlant &&
                      <>
                        <TableCell align='center' >
                          {index + 1}
                        </TableCell>
                        <TableCell align='center' >
                          <div
                            style={{ display: "flex", justifyContent: "center", cursor: "pointer", gap: 10 }}
                          >
                            <SvgIcon fontSize="small"
                              onClick={() => handleEdit(customer)}
                            >
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>
                            {customer?.status !== STATUS_OBJECT.INPROGRESS.name && <SvgIcon fontSize="small"
                              onClick={() => {
                                handleClickOpenDelete(customer)
                              }}
                            >
                              <XMarkIcon />
                            </SvgIcon>}

                            <SvgIcon fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer)
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={customer.avatar}>
                              {getInitials(customer.name)}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {customer.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {getCurrentUser()?.username}
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.createdAt ? format(new Date(customer?.createdAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell align='center' >
                          <SeverityPill color={[renderStatus(customer?.status)]}>
                            {customer?.status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.updatedAt ? format(new Date(customer?.updatedAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell>
                          {customer?.note}
                        </TableCell>
                      </>}
                    {isMember &&
                      <>
                        <TableCell align='center' >
                          {index + 1}
                        </TableCell>
                        <TableCell align='center' >
                          <div
                            style={{ display: "flex", justifyContent: "center", cursor: "pointer", gap: 10 }}
                          >
                            <SvgIcon fontSize="small"
                              onClick={() => handleEdit(customer)}
                            >
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>
                            {customer?.status !== STATUS_OBJECT.INPROGRESS.name && <SvgIcon fontSize="small"
                              onClick={() => {
                                handleClickOpenDelete(customer)
                              }}
                            >
                              <XMarkIcon />
                            </SvgIcon>}

                            <SvgIcon fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer)
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={customer.avatar}>
                              {getInitials(customer.username)}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {customer.username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.createdAt ? format(new Date(customer?.createdAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell align='center' >
                          <SeverityPill color={[renderRole(customer?.role)]}>
                            {ROLE.find(i => i?.indexOrder === customer?.role)?.name}
                          </SeverityPill>
                        </TableCell>
                      </>}
                    {isGroup &&
                      <>
                        <TableCell align='center' >
                          {index + 1}
                        </TableCell>
                        <TableCell align='center' >
                          <div
                            style={{ display: "flex", justifyContent: "center", cursor: "pointer", gap: 10 }}
                          >
                            <SvgIcon fontSize="small"
                              onClick={() => handleEdit(customer)}
                            >
                              <PencilIcon style={{ color: COLOR.PRIMARY }} />
                            </SvgIcon>

                            <SvgIcon fontSize="small"
                              onClick={() => {
                                handleClickOpen(customer)
                              }}
                            >
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          {convertTxt(customer?.projectName, 50)}
                        </TableCell>
                        <TableCell>
                          {convertTxt(customer?.taskName, 35)}
                        </TableCell>
                        <TableCell width={100}>
                          {LIST_PLAN_STATUS.find(i => i?.code === customer?.status)?.label}
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.percentComplete}
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.startDate ? format(new Date(customer?.startDate), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.dueDate ? format(new Date(customer?.dueDate), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell align='center' >
                          {customer?.updatedAt ? format(new Date(customer?.updatedAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                      </>}

                    {isAdmin &&
                      <>
                        <TableCell align='center' >
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div
                            style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                            onClick={() => {
                              handleClickOpen(customer)
                            }} >
                            <SvgIcon fontSize="small">
                              <EyeIcon />
                            </SvgIcon>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={customer.avatar}>
                              {getInitials(customer.username
                              )}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {customer.username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {customer.email}
                        </TableCell>
                        <TableCell>
                          {customer.phone}
                        </TableCell>
                        <TableCell>
                          {customer?.createdAt ? format(new Date(customer?.createdAt), 'dd/MM/yyyy') : ""}
                        </TableCell>
                        <TableCell style={{ maxWidth: 80 }}
                          align='center'>
                          <SeverityPill color={[renderRole(customer?.role)]}>
                            {customer?.role === ROLE_OBJECT.ADMIN.indexOrder ? "ADMIN" : "SUPPER ADMIN"}
                          </SeverityPill>
                        </TableCell>
                      </>
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
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
  selected: PropTypes.array
};
