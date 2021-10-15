import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Modal, AppBar, Button, Stack } from '@mui/material';
// import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { InputAdornment } from "@material-ui/core";
import { Close, PriorityHigh } from "@material-ui/icons";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import allActions from "../../redux/actions"

import { styled } from '@mui/material/styles';
import CSVReader from 'react-csv-reader'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
    },
    '.csv-label': {
        display: 'none'
    },
    '.csv-reader-input': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
};

const Input = styled('input')({
    display: 'none',
});

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


export default function ImpExpProfile(props) {

    const theme = useTheme();
    const [isImport, setIsImport] = useState(true);
    const [isImportAppend, setIsImportAppend] = useState(true);
    const [profiles, setProfiles] = useState(true);

    const profile = useSelector((state) => state.profile)

    const dispatch = useDispatch()

    useEffect(() => {
    
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

    const handleChangeImportType = (event) => {
        setIsImportAppend(event.target.value == "append");
    };   
    
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

    // const readCSV = (e) => {
    //     e.preventDefault()
    //     const reader = new FileReader()
    //     reader.onload = async (e) => { 
    //         const text = (e.target.result)
    //         console.log(text)
    //         alert(text)
    //     };
    //     reader.readAsText(e.target.files[0])
    // }
    const readCSV = (data, fileInfo, originalFile) => {
        console.dir(data, fileInfo, originalFile);
        props.importProfile(data, isImportAppend);
    }
    
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
                    <FormControl component="fieldset" className="w-100">
                        <RadioGroup aria-label="gender" defaultValue="female" name="rbg-import-type" onChange={handleChangeImportType} style={{ marginLeft: '80px', marginTop: '30px' }}>
                            <FormControlLabel value="append" control={<Radio />} label="Append to existing data" checked={isImportAppend}/>
                            <FormControlLabel value="replace" control={<Radio />} label="Replace with new data" checked={!isImportAppend}/>
                        </RadioGroup>
                        <CSVReader
                            cssClass="csv-reader-input"
                            label="Select CSV with secret Death Star statistics"
                            onFileLoaded={readCSV}
                            // onError={this.handleDarkSideForce}
                            parserOptions={papaparseOptions}
                            inputId="ObiWan"
                            inputName="ObiWan"
                            inputStyle={{color: 'red', marginTop: '20px', marginBottom: '20px' }}
                        />
                        {/* <div className="d-flex justify-content-center mb-4" spacing={4}>
                            <Button variant="contained" color="primary">
                                <span style={{ color: 'white' }}>Import</span>
                            </Button>
                            <Button variant="contained" color="success" onClick={handleClose}>
                                <span style={{ color: 'white' }}>Close</span>
                            </Button>
                        </div> */}
                        <Stack direction="row" alignItems="center" spacing={4} className="d-flex justify-content-center mb-4" >
                            {/* <label htmlFor="importProfiles">
                                <Input accept=".csv" id="importProfiles" type="file" onChange={readCSV} />
                                <Button variant="contained" color="primary">
                                    <span style={{ color: 'white' }}>Import</span>
                                </Button>
                            </label> */}
                            <Button variant="contained" color="primary">
                                <span style={{ color: 'white' }}>Save</span>
                            </Button>
                            <Button variant="contained" color="success" onClick={handleClose}>
                                <span style={{ color: 'white' }}>Close</span>
                            </Button>
                        </Stack>
                    </FormControl>
                </>
            }
            { !isImport && 
                <FormControl component="fieldset" style={{ marginLeft: '80px', marginTop: '30px' }}>
                    <Stack direction="row" alignItems="center" spacing={4} className="align-items-baseline m-4">
                        <Button variant="contained" color="primary">
                            <span style={{ color: 'white' }}>Export</span>
                        </Button>
                        <Button variant="contained" color="success" onClick={handleClose}>
                            <span style={{ color: 'white' }}>Close</span>
                        </Button>
                    </Stack>
                </FormControl>
            }
        </Box>
        </Modal>
    )
    
    
}

