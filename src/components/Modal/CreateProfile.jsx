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

import { countries, cardTypes } from "../../variables/general";


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
    color: 'black',
    input: {
      color: 'green'
    },
    '.MuiSelect-select': {
      color: 'green'
    }

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


export default function CreateProfile(props) {

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()

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

  const generatePassword = () => {
    const nums = '0123456789';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specials = '`~!@#$%^&*()_+-=[]{}|;:,./<>?';
    const weights = [0.2, 0.6, 1];
    const leng = 12;
    let password = '';
    for (let i=0; i<leng; i++) {
      const rnd = Math.random();
      if (rnd < weights[0]) {
        password += nums[Math.floor(Math.random() * nums.length)];
      } else if (rnd < weights[1]) {
        password += chars[Math.floor(Math.random() * chars.length)];
      } else {
        password += specials[Math.floor(Math.random() * specials.length)];
      }
    }
    console.log(password);
    dispatch(allActions.profileActions.setInfo("password", password));
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
              <GridItem xs={12} sm={12}>
                <TextField id="email" label="Email Address" variant="outlined" value={ profile.email } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("email", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="first_name" label="First Name" variant="outlined" value={ profile.firstName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("firstName", e.target.value))} />
              </GridItem>
              
              <GridItem xs={6} sm={6}>
                <TextField id="last_name" label="Last Name" variant="outlined" value={ profile.lastName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("lastName", e.target.value))} />
              </GridItem>
              
              <GridItem xs={7} sm={7}>
                <TextField id="password" label="Password" variant="outlined" value={ profile.password } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("password", e.target.value))} />
              </GridItem>

              <GridItem xs={5} sm={5}>
                <Button variant="info" size="md" onClick={generatePassword}>Generate Password</Button>
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
                    {
                      cardTypes.map((cardType) => <MenuItem value={cardType}>{cardType}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem xs={6} sm={6}>
                <FormControlLabel control={<Checkbox id="one_checkout" checked={ profile.oneCheckout } />} label="Only One Checkout" className="mb-3 mt-2" onChange={(e) => dispatch(allActions.profileActions.setInfo("oneCheckout", e.target.checked ))} />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <TextField id="cc_number" label="Card Number" variant="outlined" value={ profile.ccNumber } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccNumber", e.target.value))} />
              </GridItem>

              <GridItem xs={8} sm={8}>
                <TextField id="cc_name" label="Name on Card" variant="outlined" value={ profile.ccName } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccName", e.target.value))} />
              </GridItem>

              <GridItem xs={4} sm={4}>
                <TextField id="cc_cvv" label="CVV" variant="outlined" value={ profile.ccCVV } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccCVV", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_exp_month" label="Expiration Month" variant="outlined" value={ profile.ccExpMonth } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccExpMonth", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_exp_year" label="Expiration Year" variant="outlined" value={ profile.ccExpYear } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccExpYear", e.target.value))} />
              </GridItem>
            </GridContainer>                
          </TabPanel>

{/* Billing Address */}

          <TabPanel value={value} index={2} dir={theme.direction}>
            <GridContainer>
              <GridItem xs={12} sm={12}>
                <TextField id="cc_bill_name" label="Billing Name" variant="outlined" value={ profile.ccBillName } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBillName", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingName", e.target.value));
                  }}/>
              </GridItem>
              
              <GridItem xs={12} sm={12}>
                <TextField id="cc_bill_1" label="Billing Address" variant="outlined" value={ profile.ccBill1 } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBill1", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shipping1", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_2" label="Billing Address 2" variant="outlined" value={ profile.ccBill2 } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBill2", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shipping2", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_3" label="Billing Address 3" variant="outlined" value={ profile.ccBill3 } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBill3", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shipping3", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_city" label="Billing City" variant="outlined" value={ profile.ccBillCity } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBillCity", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingCity", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_state" label="Billing State" variant="outlined" value={ profile.ccBillState } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBillState", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingState", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={12} sm={12}>
                {/* <TextField id="" label="" variant="outlined" value={ profile. } className="w-100 mb-3" onChange={(e) => dispatch(allActions.profileActions.setInfo("ccBillCountry", e.target.value))} /> */}
                <FormControl fullWidth className="mb-3">
                  <InputLabel>Billing Country</InputLabel>
                  <Select
                    id="cc_bill_country"
                    value={ profile.ccBillCountry }
                    onChange={(e) => {
                      dispatch(allActions.profileActions.setInfo("ccBillCountry", e.target.value ));
                      if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingCountry", e.target.value ));
                    }}
                    label="Card Type"
                  >
                    {
                      countries.map((country) => <MenuItem value={country[0]}>{country[1]}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_postal" label="Billing Post Code" variant="outlined" value={ profile.ccBillPostal } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBillPostal", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingPostal", e.target.value));
                  }} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="cc_bill_phone" label="Billing Phone" variant="outlined" value={ profile.ccBillPhone } className="w-100 mb-3" 
                  onChange={(e) => {
                    dispatch(allActions.profileActions.setInfo("ccBillPhone", e.target.value));
                    if (profile.sameBillingShipping) dispatch(allActions.profileActions.setInfo("shippingPhone", e.target.value));
                  }} />
              </GridItem>
            </GridContainer>                
          </TabPanel>

{/* Shipping Address */}

          <TabPanel value={value} index={3} dir={theme.direction}>
            <GridContainer>
              <GridItem xs={12} sm={12}>
                <FormControlLabel control={<Checkbox id="sameBillingShipping" checked={ profile.sameBillingShipping } />} label="Same Billing/Shipping" className="mb-3 mt-2" onChange={(e) => dispatch(allActions.profileActions.setInfo("sameBillingShipping", e.target.checked ))} />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <TextField id="ship_name" label="Shipping Name" variant="outlined" value={ profile.shippingName } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""} onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingName", e.target.value))} />
              </GridItem>
              
              <GridItem xs={12} sm={12}>
                <TextField id="ship_1" label="Shipping Address" variant="outlined" value={ profile.shipping1 } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""} onChange={(e) => dispatch(allActions.profileActions.setInfo("shipping1", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_2" label="Shipping Address 2" variant="outlined" value={ profile.shipping2 } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shipping2", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_3" label="Shipping Address 3" variant="outlined" value={ profile.shipping3 } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shipping3", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_city" label="Shipping City" variant="outlined" value={ profile.shippingCity } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingCity", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_state" label="Shipping State" variant="outlined" value={ profile.shippingState } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingState", e.target.value))} />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <FormControl fullWidth className="mb-3">
                  <InputLabel>Shipping Country</InputLabel>
                  <Select
                    id="ship_country"
                    value={ profile.shippingCountry }
                    inputProps={{ readOnly: profile.sameBillingShipping }}
                    onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingCountry", e.target.value ))}
                    label="Card Type"
                  >
                    {
                      countries.map((country) => <MenuItem value={country[0]}>{country[1]}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_postal" label="Shipping Post Code" variant="outlined" value={ profile.shippingPostal } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingPostal", e.target.value))} />
              </GridItem>

              <GridItem xs={6} sm={6}>
                <TextField id="ship_phone" label="Shipping Phone" variant="outlined" value={ profile.shippingPhone } className="w-100 mb-3" disabled = { profile.sameBillingShipping? "disabled" : ""}  onChange={(e) => dispatch(allActions.profileActions.setInfo("shippingPhone", e.target.value))} />
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