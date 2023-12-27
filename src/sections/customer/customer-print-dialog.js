import { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
export default function CustomerPrintDialog({ open, handleClose, items }) {
  const [itemPrint, setItemPrint] = useState(items);
  const convertSubject = (subject) => {
    return {
      maths: Number(subject?.maths || 0),
      physics: Number(subject?.physics || 0),
      // chemistry: Number(subject?.chemistry || 0),
      biology: Number(subject?.biology || 0),
      geography: Number(subject?.geography || 0),
      fineArt: Number(subject?.fineArt || 0),
      literature: Number(subject?.literature || 0),
      history: Number(subject?.history || 0),
      english: Number(subject?.english || 0),
      civicEducation: Number(subject?.civicEducation || 0),
    };
  };

  const calculateAverage = (subject) => {
    const grades = Object.values(convertSubject(subject)).filter(
      (value) => typeof value === "number"
    );
    if (!grades || grades.length === 0) {
      return 0;
    }
    const total = grades.reduce((acc, grade) => acc + grade, 0);
    return total / grades.length;
  };

  const handleFormSubmit = () => {
    let content = document.getElementById("divcontents");
    let pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);

    pri.document.close();
    pri.focus();
    pri.print();
  };
  useEffect(() => {
    setItemPrint(items);
  }, [items]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
      minHeight="500px"
    >
      <div>
        <iframe
          id="ifmcontentstoprint"
          style={{
            height: "0px",
            width: "0px",
            position: "absolute",
            print: { size: "auto", margin: "0mm" },
          }}
        ></iframe>
        <ValidatorForm onSubmit={handleFormSubmit}>
          <DialogTitle id="alert-dialog-title">Học bạ</DialogTitle>
          <DialogContent>
            <div>
              <div id="divcontents">
                <div style={{ display: "flex" }} className="ml-50">
                  <div style={{ flex: 4 }}>Họ và tên: {itemPrint?.username}</div>
                  <div style={{ flex: 2 }}>Năm học: 20...... - 20 ......</div>
                </div>
                <table
                  border="1"
                  style={{ width: "80%", margin: "20px auto", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th rowSpan="2">Môn học/Hoạt động GĐ</th>
                      <th colSpan="3">Điểm trung bình hoặc xếp loại các môn</th>
                    </tr>
                    <tr>
                      <th>Lớp 10</th>
                      <th>Lớp 11</th>
                      <th>Lớp 12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Toán
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.maths : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.maths : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.maths : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Vật lý
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.physics : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.physics : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.physics : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Ngữ Văn
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.literature : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.literature : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.literature : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Lịch sử
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.history : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.history : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.history : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Địa lý
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.geography : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.geography : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.geography : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Tiếng anh
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.english : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.english : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.english : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Hóa học
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.fineArt : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.fineArt : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.fineArt : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Sinh học
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.biology : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.biology : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.biology : ""}
                      />
                    </tr>
                    <tr>
                      <th align="left" style={{ paddingLeft: 20 }}>
                        Giáo dục công dân
                      </th>
                      <DiemMonHoc
                        diem={itemPrint?.lop10?.length ? itemPrint?.lop10[0]?.civicEducation : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop11?.length ? itemPrint?.lop11[0]?.civicEducation : ""}
                      />
                      <DiemMonHoc
                        diem={itemPrint?.lop12?.length ? itemPrint?.lop12[0]?.civicEducation : ""}
                      />
                    </tr>
                    <tr>
                      <th>Điểm trung bình</th>
                      <DiemMonHoc
                        diem={calculateAverage(itemPrint?.lop10?.length ? itemPrint?.lop10[0] : {})}
                      />
                      <DiemMonHoc
                        diem={calculateAverage(itemPrint?.lop11?.length ? itemPrint?.lop11[0] : {})}
                      />
                      <DiemMonHoc
                        diem={calculateAverage(itemPrint?.lop12?.length ? itemPrint?.lop12[0] : {})}
                      />
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ flex: 5, display: "flex", justifyContent: "center" }}>
                    <b>Xác nhận của giáo viên chủ nhiệm</b>
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}></div>
                  <div style={{ flex: 5, display: "flex", justifyContent: "center" }}>
                    <b>Xác nhận của hiệu trưởng</b>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ flex: 5, display: "flex", justifyContent: "center" }}>
                    <i><small>(Kí và ghi rõ họ tên)</small></i>
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}></div>
                  <div style={{ flex: 5, display: "flex", justifyContent: "center" }}>
                    <i><small>(Kí, ghi rõ họ tên và đóng dấu)</small></i>
                  </div>
                </div>
                <div
                  style={{
                    minHeight: 100,
                  }}
                ></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose} variant="outlined">
              Hủy
            </Button>
            <Button type="submit" autoFocus variant="contained">
              In
            </Button>
          </DialogActions>
        </ValidatorForm>
      </div>
    </Dialog>
  );
}

const DiemMonHoc = ({ diem }) => <th>{diem}</th>;
