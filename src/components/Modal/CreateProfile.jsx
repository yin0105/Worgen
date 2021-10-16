import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box, InputLabel, Typography, Modal, AppBar, Tabs, Tab, MenuItem, FormControl, Select, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { FormLabel, InputAdornment } from "@material-ui/core";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import allActions from "../../redux/actions"


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
    color: 'black'
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


export default function CreateProfile(props) {

  const theme = useTheme();
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
                <TextField id="first_name" label="First Name" variant="outlined" value={ profile.firstName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("firstName", e.target.value))} />
              </GridItem>
              <GridItem xs={6} sm={6}>
                <TextField id="last_name" label="Last Name" variant="outlined" value={ profile.lastName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("lastName", e.target.value))} />
              </GridItem>
              <GridItem xs={12} sm={12}>
                <TextField id="password" label="Password" variant="outlined" value={ profile.password } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("password", e.target.value))} />
              </GridItem>
            </GridContainer>
          </TabPanel>

{/* Card Info */}

          <TabPanel value={value} index={1} dir={theme.direction}>
            <GridContainer>
              <GridItem xs={6} sm={6}>
                <FormControl fullWidth className="mb-3">
                  <InputLabel>Card Type</InputLabel>
                  <Select
                    // labelId="demo-simple-select-standard-label"
                    id="card_type"
                    value={ profile.cardType }
                    onChange={(e) => dispatch(allActions.profileActions.setInfo("cardType", e.target.value ))}
                    label="Card Type"
                  >                    
                    <MenuItem value={'0% Intro APR'}>0% Intro APR</MenuItem>
                    <MenuItem value={'Airline & Miles'}>Airline &amp; Miles</MenuItem>
                    <MenuItem value={'Bad Credit'}>Bad Credit</MenuItem>
                    <MenuItem value={'Balance Transfer'}>Balance Transfer</MenuItem>
                    <MenuItem value={'Canadian Cards'}>Canadian Cards</MenuItem>
                    <MenuItem value={'Cash Back'}>Cash Back</MenuItem>
                    <MenuItem value={'Excellent Credit'}>Excellent Credit</MenuItem>
                    <MenuItem value={'Fair Credit'}>Fair Credit</MenuItem>
                    <MenuItem value={'Featured Cards'}>Featured Cards</MenuItem>
                    <MenuItem value={'Gas Rewards'}>Gas Rewards</MenuItem>
                    <MenuItem value={'Good Credit'}>Good Credit</MenuItem>
                    <MenuItem value={'Hotel Rewards'}>Hotel Rewards</MenuItem>
                    <MenuItem value={'Limited or No Credit'}>Limited or No Credit</MenuItem>
                    <MenuItem value={'Low Ongoing Rate'}>Low Ongoing Rate</MenuItem>
                    <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                    <MenuItem value={'Military & Govt'}>Military &amp; Govt</MenuItem>
                    <MenuItem value={'No Annual Fee'}>No Annual Fee</MenuItem>
                    <MenuItem value={'No Foreign Fee'}>No Foreign Fee</MenuItem>
                    <MenuItem value={'Premium'}>Premium</MenuItem>
                    <MenuItem value={'Prepaid & Debit'}>Prepaid &amp; Debit</MenuItem>
                    <MenuItem value={'Rewards Cards'}>Rewards Cards</MenuItem>
                    <MenuItem value={'Secured Cards'}>Secured Cards</MenuItem>
                    <MenuItem value={'Small Business'}>Small Business</MenuItem>
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Travel Rewards'}>Travel Rewards</MenuItem>
                    <MenuItem value={'Visa'}>Visa</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem xs={6} sm={6}>
                <FormControlLabel control={<Checkbox id="one_checkout" checked={ profile.oneCheckout } />} label="Only One Checkout" className="mb-3 mt-2" onChange={(e) => dispatch(allActions.profileActions.setInfo("oneCheckout", e.target.checked ))} />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <TextField id="cc_number" label="Credit Card Number" variant="outlined" value={ profile.ccNumber } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccNumber", e.target.value))} />
              </GridItem>

              <GridItem xs={8} sm={8}>
                <TextField id="cc_name" label="Full Name on Credit Card" variant="outlined" value={ profile.ccName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccName", e.target.value))} />
              </GridItem>

              <GridItem xs={4} sm={4}>
                <TextField id="cc_cvv" label="CC CVV" variant="outlined" value={ profile.ccCVV } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccCVV", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_exp_month" label="CC Expiration Month" variant="outlined" value={ profile.ccExpMonth } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccExpMonth", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_exp_year" label="CC Expiration Year" variant="outlined" value={ profile.ccExpYear } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccExpYear", e.target.value))} />
              </GridItem>

              {/* <GridItem xs={12} sm={12}>
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
              </GridItem> */}
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
          <Button variant="primary" size="sm">
            { props.openMode == 'create' && <span>Create</span> }
            { props.openMode == 'edit' && <span>Save</span> }
            {/* Save */}
          </Button>
          <Button variant="success" size="md" onClick={handleClose}>Close</Button>
        </div>
      </Box>
    </Modal>
  ) 
}

