import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormLabel, InputAdornment } from "@material-ui/core";
import { Close, PriorityHigh } from "@material-ui/icons";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import allActions from "../../redux/actions"
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

    const [firstNameVal, setFirstNameVal] = useState(false)
    const [lastNameVal, setLastNameVal] = useState(false)
    const [passwordVal, setPasswordVal] = useState(false)

    const [ccNameVal, setCCNameVal] = useState(false)
    const [ccNumberVal, setCCNumberVal] = useState(false)
    const [ccExpMonthVal, setCCExpMonthVal] = useState(false)
    const [ccExpYearVal, setCCExpYearVal] = useState(false)
    const [ccCVVVal, setCCCVVVal] = useState(false)

    const [ccBill1Val, setCCBill1Val] = useState(false)
    const [ccBill2Val, setCCBill2Val] = useState(false)
    const [ccBillCityVal, setCCBillCityVal] = useState(false)
    const [ccBillStateVal, setCCBillStateVal] = useState(false)
    const [ccBillCountryVal, setCCBillCountryVal] = useState(false)
    const [ccBillPostalVal, setCCBillPostalVal] = useState(false)
    const [ccBillPhoneVal, setCCBillPhoneVal] = useState(false)

    const [shippingNameVal, setShippingNameVal] = useState(false)
    const [shipping1Val, setShipping1Val] = useState(false)
    const [shipping2Val, setShipping2Val] = useState(false)
    const [shippingCityVal, setShippingCityVal] = useState(false)
    const [shippingStateVal, setShippingStateVal] = useState(false)
    const [shippingCountryVal, setShippingCountryVal] = useState(false)
    const [shippingPostalVal, setShippingPostalVal] = useState(false)
    const [shippingPhoneVal, setShippingPhoneVal] = useState(false)

    const profile = useSelector((state) => state.profile)

    const dispatch = useDispatch()

    useEffect(() => {

      setFirstNameVal(false)
      setLastNameVal(false)
      setPasswordVal(false)

      setCCNameVal(false)
      setCCNumberVal(false)
      setCCExpMonthVal(false)
      setCCExpYearVal(false)
      setCCCVVVal(false)

      setCCBill1Val(false)
      setCCBill2Val(false)
      setCCBillCityVal(false)
      setCCBillStateVal(false)
      setCCBillCountryVal(false)
      setCCBillPostalVal(false)
      setCCBillPhoneVal(false)

      setShippingNameVal(false)
      setShipping1Val(false)
      setShipping2Val(false)
      setShippingCityVal(false)
      setShippingStateVal(false)
      setShippingCountryVal(false)
      setShippingPostalVal(false)
      setShippingPhoneVal(false)

  }, [props]);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      props.closeCreateProfile();
      dispatch(allActions.profileActions.setInfo("clear", ""))
    }
    
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
                style={{ marginTop: '30px'}}
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
                        onChange: event => {
                          setFirstNameVal(change(event, "First Name", "length", 0, 1, 36)),
                          dispatch(allActions.profileActions.setInfo("firstName", event.target.value))                          
                        },
                        type: "text",
                        value: profile.firstName
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
                        onChange: event => {
                          setLastNameVal(change(event, "Last Name", "length", 0 , 1, 36)),
                          dispatch(allActions.profileActions.setInfo("lastName", event.target.value))
                        },
                        type: "text",
                        value: profile.lastName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={passwordVal}
                      error={!passwordVal}
                      id="password"
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => {
                          setPasswordVal(change(event, "Password", "length", 0 , 6, 24)),
                          dispatch(allActions.profileActions.setInfo("password", event.target.value))
                        },
                        type: "password",
                        value: profile.password
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </TabPanel>

{/* Card Info */}

              <TabPanel value={value} index={1} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccNameVal}
                      error={!ccNameVal}
                      id="cc_name"
                      labelText="Full Name on Credit Card"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 3 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCNameVal(change(event, "CC Name", "length", 0, 3, 36)),
                          dispatch(allActions.profileActions.setInfo("ccName", event.target.value))
                        },
                        type: "text",
                        value: profile.ccName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccNumberVal}
                      error={!ccNumberVal}
                      id="cc_number"
                      labelText="Credit Card Number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 14 characters and be less than 19` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCNumberVal(change(event, "CC Number", "length", 0, 14, 19)),
                          dispatch(allActions.profileActions.setInfo("ccNumber", event.target.value))
                        },
                        type: "text",
                        value: profile.ccNumber
                      }}
                    />
                  </GridItem>
                  <GridItem xs={5} sm={5}>
                    <CustomInput
                      success={ccExpMonthVal}
                      error={!ccExpMonthVal}
                      id="cc_exp_month"
                      labelText="CC Expiration Month"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => {
                          setCCExpMonthVal(change(event, "CC Expiration Month", "length", 0 , 1, 2)),
                          dispatch(allActions.profileActions.setInfo("ccExpMonth", event.target.value))
                        },
                        type: "text",
                        value: profile.ccExpMonth
                      }}
                    />
                  </GridItem>
                  <GridItem xs={5} sm={5}>
                    <CustomInput
                      success={ccExpYearVal}
                      error={!ccExpYearVal}
                      id="cc_exp_year"
                      labelText="CC Expiration Year"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => {
                          setCCExpYearVal(change(event, "CC Expiration Year", "length", 0 , 4, 4)),
                          dispatch(allActions.profileActions.setInfo("ccExpYear", event.target.value))
                        },
                        type: "text",
                        value: profile.ccExpYear
                      }}
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2}>
                    <CustomInput
                      success={ccCVVVal}
                      error={!ccCVVVal}
                      id="cc_cvv"
                      labelText="CC CVV"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => {
                          setCCCVVVal(change(event, "CC CVV", "length", 0 , 3, 4)),
                          dispatch(allActions.profileActions.setInfo("ccCVV", event.target.value))
                        },
                        type: "text",
                        value: profile.ccCVV
                      }}
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>

{/* Billing Address */}

              <TabPanel value={value} index={2} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccBill1Val}
                      error={!ccBill1Val}
                      id="cc_bill_1"
                      labelText="Address Line 1"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 6 characters and be less than 48` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBill1Val(change(event, "CC Bill 1", "length", 0, 6, 48)),
                          dispatch(allActions.profileActions.setInfo("ccBill1", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBill1
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={ccBill2Val}
                      error={!ccBill2Val}
                      id="cc_bill_2"
                      labelText="Address Line 2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 0 characters and be less than 48` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBill2Val(change(event, "CC Bill 2", "length", 0, 0, 48)),
                          dispatch(allActions.profileActions.setInfo("ccBill2", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBill2
                      }}
                    />
                  </GridItem>

                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={ccBillCityVal}
                      error={!ccBillCityVal}
                      id="cc_bill_city"
                      labelText="Billing City"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 49` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBillCityVal(change(event, "CC Bill City", "length", 0, 2, 49)),
                          dispatch(allActions.profileActions.setInfo("ccBillCity", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBillCity
                      }}
                    />
                  </GridItem>

                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={ccBillStateVal}
                      error={!ccBillStateVal}
                      id="cc_bill_state"
                      labelText="Billing State"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 2` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBillStateVal(change(event, "CC Bill State", "length", 0, 2, 2)),
                          dispatch(allActions.profileActions.setInfo("ccBillState", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBillState
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={ccBillCountryVal}
                      error={!ccBillCountryVal}
                      id="cc_bill_country"
                      labelText="Billing Country"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 2` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBillCountryVal(change(event, "CC Bill Country", "length", 0, 2, 2)),
                          dispatch(allActions.profileActions.setInfo("ccBillCountry", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBillCountry
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={ccBillPostalVal}
                      error={!ccBillPostalVal}
                      id="cc_bill_postal"
                      labelText="Billing Postal"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 5 characters and be less than 10` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBillPostalVal(change(event, "CC Bill Postal", "length", 0, 5, 10)),
                          dispatch(allActions.profileActions.setInfo("ccBillPostal", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBillPostal
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={ccBillPhoneVal}
                      error={!ccBillPhoneVal}
                      id="cc_bill_phone"
                      labelText="Billing Phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 10 characters and be less than 24` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setCCBillPhoneVal(change(event, "CC Bill Phone", "length", 0, 10, 24)),
                          dispatch(allActions.profileActions.setInfo("ccBillPhone", event.target.value))
                        },
                        type: "text",
                        value: profile.ccBillPhone
                      }}
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>

{/* Shipping Address */}

              <TabPanel value={value} index={3} dir={theme.direction}>
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={shippingNameVal}
                      error={!shippingNameVal}
                      id="ship_name"
                      labelText="Full Name of Shipping Address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 36` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingNameVal(change(event, "Shipping Name", "length", 0, 2, 36)),
                          dispatch(allActions.profileActions.setInfo("shippingName", event.target.value))
                        },
                        type: "text",
                        value: profile.shippingName
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={shipping1Val}
                      error={!shipping1Val}
                      id="ship_1"
                      labelText="Address Line 1"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 6 characters and be less than 48` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShipping1Val(change(event, "Shipping 1", "length", 0, 6, 48)),
                          dispatch(allActions.profileActions.setInfo("shipping1", event.target.value))
                        },
                        type: "text",
                        value: profile.shipping1
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      success={shipping2Val}
                      error={!shipping2Val}
                      id="ship_2"
                      labelText="Address Line 2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 0 characters and be less than 48` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShipping2Val(change(event, "Shipping 2", "length", 0, 0, 48)),
                          dispatch(allActions.profileActions.setInfo("shipping2", event.target.value))
                        },
                        type: "text",
                        value: profile.shipping2
                      }}
                    />
                  </GridItem>

                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={shippingCityVal}
                      error={!shippingCityVal}
                      id="ship_city"
                      labelText="Shipping City"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 49` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingCityVal(change(event, "Shipping City", "length", 0, 2, 49)),
                          dispatch(allActions.profileActions.setInfo("shippingCity", event.target.value))                          
                        },
                        type: "text",
                        value: profile.shippingCity
                      }}
                    />
                  </GridItem>

                  <GridItem xs={6} sm={6}>
                    <CustomInput
                      success={shippingStateVal}
                      error={!shippingStateVal}
                      id="ship_state"
                      labelText="Shipping State"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 2` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingStateVal(change(event, "Shipping State", "length", 0, 2, 2)),
                          dispatch(allActions.profileActions.setInfo("shippingState", event.target.value))
                        },
                        type: "text",
                        value: profile.shippingState
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={shippingCountryVal}
                      error={!shippingCountryVal}
                      id="ship_country"
                      labelText="Shipping Country"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 2 characters and be less than 2` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingCountryVal(change(event, "Shipping Country", "length", 0, 2, 2)),
                          dispatch(allActions.profileActions.setInfo("shippingCountry", event.target.value))
                        },
                        type: "text",
                        value: profile.shippingCountry
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={shippingPostalVal}
                      error={!shippingPostalVal}
                      id="ship_postal"
                      labelText="Shipping Postal"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 5 characters and be less than 10` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingPostalVal(change(event, "Shipping Postal", "length", 0, 5, 10)),
                          dispatch(allActions.profileActions.setInfo("shippingPostal", event.target.value))
                        },
                        type: "text",
                        value: profile.shippingPostal
                      }}
                    />
                  </GridItem>

                  <GridItem xs={4} sm={4}>
                    <CustomInput
                      success={shippingPhoneVal}
                      error={!shippingPhoneVal}
                      id="ship_phone"
                      labelText="Shipping Phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      helpText={`this field must contain at least 10 characters and be less than 24` }
                      style={ inputStyle }
                      inputProps={{
                        onChange: event => {
                          setShippingPhoneVal(change(event, "Shipping Phone", "length", 0, 10, 24)),
                          dispatch(allActions.profileActions.setInfo("shippingPhone", event.target.value))
                        },
                        type: "text",
                        value: profile.shippingPhone
                      }}
                    />
                  </GridItem>
                </GridContainer>                
              </TabPanel>
            </SwipeableViews>
            <div className="d-flex mb-3" style={{ justifyContent: "space-evenly" }}>
              <Button variant="primary" size="sm">Save</Button>
              <Button variant="success" size="md" onClick={handleClose}>Close</Button>
            </div>
          </Box>
        </Modal>
    )
    
    
}

