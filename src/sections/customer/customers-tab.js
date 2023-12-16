import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TableClass from "./table-class";
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

export default function CustomersTab({ formData, handleChange }) {
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab style={{ minWidth: "200px" }} label="LỚP 10" {...a11yProps(0)} />
          <Tab style={{ minWidth: "200px" }} label="LỚP 11" {...a11yProps(1)} />
          <Tab style={{ minWidth: "200px" }} label="LỚP 12" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableClass
          handleChange={handleChange}
          type={"10"}
          lop={formData?.lop10?.length && formData?.lop10[0]}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableClass
          handleChange={handleChange}
          type={"11"}
          lop={formData?.lop11?.length && formData?.lop11[0]}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TableClass
          handleChange={handleChange}
          type={"12"}
          lop={formData?.lop12?.length && formData?.lop12[0]}
        />
      </CustomTabPanel>
    </Box>
  );
}
