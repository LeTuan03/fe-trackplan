import * as React from "react";
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

import { COLOR } from "src/appConst";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import CustomersTab from "./customers-tab";

export default function TableClass({ lop, handleChange, type }) {
  const [objSubject, setObjSubject] = React.useState([]);

  React.useEffect(() => {
    setObjSubject([
      { name: "Toán", value: lop?.maths, lable: "maths" },
      { name: "Lý", value: lop?.physics, lable: "physics" },
      { name: "Sinh học", value: lop?.biology, lable: "biology" },
      { name: "Địa lý", value: lop?.geography, lable: "geography" },
      { name: "Hóa học", value: lop?.fineArt, lable: "fineArt" },
      { name: "Ngữ văn", value: lop?.literature, lable: "literature" },
      { name: "Tiếng anh", value: lop?.english, lable: "english" },
      { name: "Giáo dục công dân", value: lop?.civicEducation, lable: "civicEducation" },
      { name: "Lịch sử", value: lop?.history, lable: "history" },
      { name: "Hạnh kiểm", value: lop?.conduct, lable: "conduct" },
      { name: "Học lực", value: lop?.classification, lable: "classification" },
    ]);
  }, [lop]);

  return (
    <Table size="small" padding="none" stickyHeader={true}>
      <TableHead>
        <TableRow>
          <TableCell align="center" width={20}>
            STT
          </TableCell>
          <TableCell>Môn học</TableCell>
          <TableCell>Điểm</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {objSubject.map((i, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="left">{i?.name}</TableCell>
              <TableCell align="center">
                <TextValidator
                  className="w-100"
                  type={i?.lable === "conduct" || i?.lable === "classification" ? "text" : "number"}
                  name={i?.lable}
                  value={i?.value}
                  onChange={(event) => handleChange(event, type)}
                  // validators={["required"]}
                  // errorMessages={["general.required"]}
                  required
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
