import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignIn from "./signIn/SignIn";
import { Button, Modal } from "react-bootstrap";
import Register from "./register/Register";

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
  };
}

export default function Auth(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(props);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Modal.Header>
      <Modal.Body>
        <CustomTabPanel value={value} index={0}>
          <SignIn setModalShow={props.setModalShow} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Register setModalShow={props.setModalShow} />
        </CustomTabPanel>
      </Modal.Body>
    </Modal>

    // <Box sx={{ width: '100%' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    //       <Tab label="Sign In" {...a11yProps(0)} />
    //       <Tab label="Register" {...a11yProps(1)} />
    //     </Tabs>
    //   </Box>
    //   <CustomTabPanel value={value} index={0}>
    //     Register
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={1}>
    //     <SignIn/>
    //   </CustomTabPanel>
    // </Box>
  );
}
