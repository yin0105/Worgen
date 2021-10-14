import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormLabel, InputAdornment } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
// import Button from "../CustomButtons/Button.jsx";
// import Card from "../Card/Card.jsx";
// import CardHeader from "../Card/CardHeader.jsx";
// import CardText from "../Card/CardText.jsx";
// import CardIcon from "../Card/CardIcon.jsx";
// import CardBody from "../Card/CardBody.jsx";
// import CardFooter from "../Card/CardFooter.jsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#BFB375',
    border: '2px solid white',
    borderRadius: '20px',
    boxShadow: 24,
    p: 0,
};

const inputStyle = {
  input: {
    '::placeholer': {
      color: '#333333'
    }
  }
}

const buttonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    backgroundColor: "transparent",
    color: 'white'

};

let formData = {
  firstName: "ab",
  lastName: "cd",
  password: "ef"
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// function that returns true if value is email, false otherwise
// verifyEmail(value) {
//   var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (emailRex.test(value)) {
//     return true;
//   }
//   return false;
// }
// // function that verifies if a string has a given length or not
const verifyLength = (value, minValue, maxValue) => {
  console.log("verifyLeng: ", value, minValue, maxValue);
  if (value.length < minValue) return false;
  if (maxValue > 0) {
    if (value.length > maxValue) {
      return false;
    }
  }
  console.log("true");
  return true;
}
// // function that verifies if two strings are equal
// compare(string1, string2) {
//   if (string1 === string2) {
//     return true;
//   }
//   return false;
// }
// // function that verifies if value contains only numbers
// verifyNumber(value) {
//   var numberRex = new RegExp("^[0-9]+$");
//   if (numberRex.test(value)) {
//     return true;
//   }
//   return false;
// }
// // verifies if value is a valid URL
// verifyUrl(value) {
//   try {
//     new URL(value);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }

const change = (event, stateName, type, stateNameEqualTo, minValue, maxValue) => {
  switch (type) {
    case "email":
      if (verifyEmail(event.target.value)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "password":
      if (verifyLength(event.target.value, 1)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "equalTo":
      if (compare(event.target.value, state[stateNameEqualTo])) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "checkbox":
      if (event.target.checked) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "number":
      if (verifyNumber(event.target.value)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "length":
      console.log(event.target.value, minValue, maxValue)
      return verifyLength(event.target.value, minValue, maxValue);
      break;
    case "max-length":
      if (!verifyLength(event.target.value, stateNameEqualTo + 1)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "url":
      if (verifyUrl(event.target.value)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "min-value":
      if (
        verifyNumber(event.target.value) &&
        event.target.value >= stateNameEqualTo
      ) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "max-value":
      if (
        verifyNumber(event.target.value) &&
        event.target.value <= stateNameEqualTo
      ) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    case "range":
      if (
        verifyNumber(event.target.value) &&
        event.target.value >= stateNameEqualTo &&
        event.target.value <= maxValue
      ) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
      break;
    default:
      break;
  }
  switch (type) {
    case "checkbox":
      setState({ [stateName]: event.target.checked });
      break;
    default:
      setState({ [stateName]: event.target.value });
      break;
  }
}

function GeneralInfo(props) {

  
  
  return (
    <form>
      
    </form>
  );
}

export default function CreateProfile(props) {

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const [firstNameVal, setFirstNameVal] = useState("")
    const [lastNameVal, setLastNameVal] = useState("")
    const [password, setPassword] = useState("")

    const [ccName, setCCName] = useState("")
    const [ccNumber, setCCNumber] = useState("")
    const [ccExpMonth, setCCExpMonth] = useState("")
    const [ccExpYear, setCCExpYear] = useState("")
    const [ccCVV, setCCCVV] = useState("")
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => props.closeCreateProfile();
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const { classes } = props;
    
    return(
        <Modal
          open={props.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AppBar position="static" style={{ backgroundColor: '#615A3E', color: 'white', borderRadius: '20px 20px 0px 0px'}}>
              <div>
                <button onClick={handleClose} style={buttonStyles}>
                  &times;
                </button>
              </div>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                style={{ marginTop: '20px'}}
              >
                <Tab label="General Info" {...a11yProps(0)} />
                <Tab label="Card Info" {...a11yProps(1)} />
                <Tab label="Billing Address" {...a11yProps(2)} />
                <Tab label="Shipping Address" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >

{/* General Info */}

              <TabPanel value={value} index={0} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={firstNameVal}
                      error={!firstNameVal}
                      id="first_name"
                      labelText="First Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 1 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event =>
                        setFirstNameVal(change(event, "First Name", "length", 0, 1, 36)),
                        type: "text",
                        value: formData.firstName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="last_name"
                      labelText="Last Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Last Name", "length", 0 , 1, 36)),
                        type: "text"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="password"
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Password", "length", 0 , 6, 24)),
                        type: "password"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                </GridContainer>
              </TabPanel>

{/* Card Info */}

              <TabPanel value={value} index={1} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccName}
                      error={!ccName}
                      id="cc_name"
                      labelText="Full Name on Credit Card"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 3 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event =>
                        setCCName(change(event, "CC Name", "length", 0, 3, 36)),
                        type: "text",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccNumber}
                      error={!ccNumber}
                      id="cc_number"
                      labelText="Credit Card Number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 14 characters and be less than 19` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event =>
                        setCCNumber(change(event, "CC Number", "length", 0, 14, 19)),
                        type: "text",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={5} sm={5}>
                    <CustomInput
                      success={ccExpMonth}
                      error={!ccExpMonth}
                      id="cc_exp_month"
                      labelText="CC Expiration Month"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setCCExpMonth(change(event, "CC Expiration Month", "length", 0 , 1, 2)),
                        type: "text"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={5} sm={5}>
                    <CustomInput
                      success={ccExpYear}
                      error={!ccExpYear}
                      id="cc_exp_year"
                      labelText="CC Expiration Year"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setCCExpYear(change(event, "CC Expiration Year", "length", 0 , 4, 4)),
                        type: "text"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2}>
                    <CustomInput
                      success={ccCVV}
                      error={!ccCVV}
                      id="cc_cvv"
                      labelText="CC CVV"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setCCCVV(change(event, "CC CVV", "length", 0 , 3, 4)),
                        type: "text"
                      }}
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>

{/* Billing Address */}

              <TabPanel value={value} index={2} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={firstNameVal}
                      error={!firstNameVal}
                      id="first_name"
                      labelText="First Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 1 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event =>
                        setFirstNameVal(change(event, "First Name", "length", 0, 1, 36)),
                        type: "text",
                        value: formData.firstName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="last_name"
                      labelText="Last Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Last Name", "length", 0 , 1, 36)),
                        type: "text"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="password"
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Password", "length", 0 , 6, 24)),
                        type: "password"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>

{/* Shipping Address */}

              <TabPanel value={value} index={3} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={firstNameVal}
                      error={!firstNameVal}
                      id="first_name"
                      labelText="First Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 1 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event =>
                        setFirstNameVal(change(event, "First Name", "length", 0, 1, 36)),
                        type: "text",
                        value: formData.firstName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="last_name"
                      labelText="Last Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Last Name", "length", 0 , 1, 36)),
                        type: "text"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={lastNameVal}
                      error={!lastNameVal}
                      id="password"
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          setLastNameVal(change(event, "Password", "length", 0 , 6, 24)),
                        type: "password"
                      }}
                      value={ formData.lastName }
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>
            </SwipeableViews>
            <div className="d-flex justify-center">
              <Button>Save</Button>
              <Button >Close</Button>
            </div>
          </Box>
        </Modal>
    )
    
    
}

