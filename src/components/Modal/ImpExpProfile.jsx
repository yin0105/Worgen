import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Modal, Typography, AppBar, Tabs, Tab } from '@mui/material';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { InputAdornment } from "@material-ui/core";
import { Close, PriorityHigh } from "@material-ui/icons";

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
    span: {
        color: 'black'
    },
    header: {
        span: {
            color: 'white',
        }
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

let formData = {
  firstName: "ab",
  lastName: "cd",
  password: "ef"
}

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// function that returns true if value is email, false otherwise
// verifyEmail(value) {
//   var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (emailRex.test(value)) {
//     return true;
//   }
//   return false;
// }
// // function that verifies if a string has a given length or not
// const verifyLength = (value, minValue, maxValue) => {
//   console.log("verifyLeng: ", value, minValue, maxValue);
//   if (value.length < minValue) return false;
//   if (maxValue > 0) {
//     if (value.length > maxValue) {
//       return false;
//     }
//   }
//   console.log("true");
//   return true;
// }
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

// const change = (event, stateName, type, stateNameEqualTo, minValue, maxValue) => {  
//   switch (type) {
//     case "email":
//       if (verifyEmail(event.target.value)) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "password":
//       if (verifyLength(event.target.value, 1)) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "equalTo":
//       if (compare(event.target.value, state[stateNameEqualTo])) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "checkbox":
//       if (event.target.checked) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "number":
//       if (verifyNumber(event.target.value)) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "length":
//       console.log(event.target.value, minValue, maxValue)
//       return verifyLength(event.target.value, minValue, maxValue);
//       break;
//     case "max-length":
//       if (!verifyLength(event.target.value, stateNameEqualTo + 1)) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "url":
//       if (verifyUrl(event.target.value)) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "min-value":
//       if (
//         verifyNumber(event.target.value) &&
//         event.target.value >= stateNameEqualTo
//       ) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "max-value":
//       if (
//         verifyNumber(event.target.value) &&
//         event.target.value <= stateNameEqualTo
//       ) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     case "range":
//       if (
//         verifyNumber(event.target.value) &&
//         event.target.value >= stateNameEqualTo &&
//         event.target.value <= maxValue
//       ) {
//         setState({ [stateName + "State"]: "success" });
//       } else {
//         setState({ [stateName + "State"]: "error" });
//       }
//       break;
//     default:
//       break;
//   }
//   switch (type) {
//     case "checkbox":
//       setState({ [stateName]: event.target.checked });
//       break;
//     default:
//       setState({ [stateName]: event.target.value });
//       break;
//   }
// }


export default function ImpExpProfile(props) {

    const theme = useTheme();
    const [isImport, setIsImport] = useState(true);
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
    props.closeImpExpProfile();
        dispatch(allActions.profileActions.setInfo("clear", ""))
    }
    
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleChangeIndex = (index) => {
    setValue(index);
    };

    const handleChangeImpExp = (event) => {
        setIsImport(event.target.value == "import");
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
                <FormControl component="fieldset" className="w-100 mt-4">
                    <RadioGroup row aria-label="gender" className="w-100" onChange={handleChangeImpExp} name="rbg-type">
                        <div className="d-flex w-100" style={{ justifyContent: "space-evenly" }}>
                            <FormControlLabel value="import" control={<Radio />} label="Import" checked={isImport}/>
                            <FormControlLabel value="export" control={<Radio />} label="Export" checked={!isImport}/>
                        </div>
                    </RadioGroup>
                </FormControl>
            </AppBar>
            { isImport && 
                <>
                    <FormControl component="fieldset" style={{ marginLeft: '180px', marginTop: '30px' }}>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="rbg-import-type"
                        >
                            <FormControlLabel value="append" control={<Radio />} label="Append to existing data" />
                            <FormControlLabel value="replace" control={<Radio />} label="Replace with new data" />
                        </RadioGroup>
                    </FormControl>
                    <div className="d-flex mt-4 mb-3" style={{ justifyContent: "space-evenly" }}>
                        <Button variant="primary" size="sm">Import</Button>
                        <Button variant="success" size="md" onClick={handleClose}>Close</Button>
                    </div>            
                </>
            }
            { !isImport && 
                <div className="d-flex mt-4 mb-3" style={{ justifyContent: "space-evenly" }}>
                    <Button variant="primary" size="sm">Export</Button>
                    <Button variant="success" size="md" onClick={handleClose}>Close</Button>
                </div>
            }
        </Box>
        </Modal>
    )
    
    
}

