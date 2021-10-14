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
import { FormLabel } from "@material-ui/core";

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
    width: 800,
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
const verifyLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
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

const change = (event, stateName, type, stateNameEqualTo, maxValue) => {
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
      if (verifyLength(event.target.value, stateNameEqualTo)) {
        setState({ [stateName + "State"]: "success" });
      } else {
        setState({ [stateName + "State"]: "error" });
      }
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
      <GridContainer>
        <GridItem xs={6} sm={6}>
          <CustomInput
            // success={state.minLengthState === "success"}
            // error={state.minLengthState === "error"}
            id="first_name"
            labelText="First Name"
            formControlProps={{
              fullWidth: true
            }}
            style={ inputStyle }
            inputProps={{
              onChange: event =>
                change(event, "minLength", "length", 5),
              type: "text",
              // endAdornment:
              //   state.minLengthState === "error" ? (
              //     <InputAdornment position="end">
              //       <Close />
              //     </InputAdornment>
              //   ) : (
              //     undefined
              //   )
            }}
          />
        </GridItem>
        <GridItem xs={6} sm={6}>
          <CustomInput
            // success={state.minLengthState === "success"}
            // error={state.minLengthState === "error"}
            id="last_name"
            labelText="Last Name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                change(event, "minLength", "length", 5),
              type: "text",
              // endAdornment:
              //   state.minLengthState === "error" ? (
              //     <InputAdornment position="end">
              //       <Close />
              //     </InputAdornment>
              //   ) : (
              //     undefined
              //   )
            }}
          />
        </GridItem>
        {/* <GridItem xs={12} sm={3}>
          <FormLabel className={classes.labelLeftHorizontal}>
            <code>minLength="5"</code>
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={2}>
          <FormLabel className={classes.labelHorizontal}>
            Max Length
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            success={state.maxLengthState === "success"}
            error={state.maxLengthState === "error"}
            id="maxlength"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                change(event, "maxLength", "max-length", 5),
              type: "text",
              endAdornment:
                state.maxLengthState === "error" ? (
                  <InputAdornment position="end">
                    <Close className={classes.danger} />
                  </InputAdornment>
                ) : (
                  undefined
                )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormLabel className={classes.labelLeftHorizontal}>
            <code>maxLength="5"</code>
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={2}>
          <FormLabel className={classes.labelHorizontal}>
            Range
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            success={state.rangeState === "success"}
            error={state.rangeState === "error"}
            id="range"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                change(event, "range", "range", 6, 10),
              type: "text",
              endAdornment:
                state.rangeState === "error" ? (
                  <InputAdornment position="end">
                    <Close className={classes.danger} />
                  </InputAdornment>
                ) : (
                  undefined
                )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormLabel className={classes.labelLeftHorizontal}>
            <code>range="[6,10]"</code>
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={2}>
          <FormLabel className={classes.labelHorizontal}>
            Min Value
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            success={state.minValueState === "success"}
            error={state.minValueState === "error"}
            id="minvalue"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                change(event, "minValue", "min-value", 6),
              type: "text",
              endAdornment:
                state.minValueState === "error" ? (
                  <InputAdornment position="end">
                    <Close className={classes.danger} />
                  </InputAdornment>
                ) : (
                  undefined
                )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormLabel className={classes.labelLeftHorizontal}>
            <code>min="6"</code>
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={2}>
          <FormLabel className={classes.labelHorizontal}>
            Max Value
          </FormLabel>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            success={state.maxValueState === "success"}
            error={state.maxValueState === "error"}
            id="maxvalue"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                change(event, "maxValue", "max-value", 6),
              type: "text",
              endAdornment:
                state.maxValueState === "error" ? (
                  <InputAdornment position="end">
                    <Close className={classes.danger} />
                  </InputAdornment>
                ) : (
                  undefined
                )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <FormLabel className={classes.labelLeftHorizontal}>
            <code>max="6"</code>
          </FormLabel>
        </GridItem> */}
      </GridContainer>
    </form>
  );
}

export default function CreateProfile(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => props.closeCreateProfile();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

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
          {/* <Box sx={style}>
            <button onClick={handleClose} style={buttonStyles}>
              &times;
            </button>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box> */}
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
              <TabPanel value={value} index={0} dir={theme.direction}>
                <GeneralInfo />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Modal>
    )
    
    
}

