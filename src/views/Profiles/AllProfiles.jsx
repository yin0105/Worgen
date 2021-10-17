import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

// import { dataTable } from "../../variables/general.jsx";

import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";
import { AddCircle, ImportExport, Edit, Close } from "@material-ui/icons";

import CreateProfile from "../../components/Modal/CreateProfile";
import ImpExpProfile from "../../components/Modal/ImpExpProfile";
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import allActions from "../../redux/actions"

// import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// const styles = {
//   cardIconTitle: {
//     ...cardTitle,
//     marginTop: "15px",
//     marginBottom: "0px"
//   }
// };

const headerButtonStyles = {
  color: "#F8E2B2",
  fontSize: "15px"
}

import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div `
  table.dataTable tbody tr {
    background-color: #BFB375 !important;
    color: black;
  }

  .pagination .page-item .page-link, .dataTables_info {
    color: white;
  }
  table {
    width: 100%;
    border-spacing: 0;
    // border: 1px solid white;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      // border-bottom: 1px solid black;
      // border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
    th {
      border-bottom: 1px solid white;
    }
    button {
      padding: 4px !important;
      margin: 8px;
    }
  }
`

  
// class AllProfiles extends React.Component {
export default function AllProfiles() {
  const [openCreateProfile, setOpenCreateProfile] = useState(false);
  const [openImpExpProfile, setOpenImpExpProfile] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [openMode, setOpenMode] = useState('create');

  const dispatch = useDispatch()
  
  const addActions = (prof) => {
    return prof.map((el, key) => {
      return {
        ...el,
        edit_action: 
          <Button color="success" key={1} onClick={() => editProfile(key)}>
            <Edit />
          </Button>,
        remove_action:
          <Button color="danger" key={2} onClick={() => removeProfile(key)}>
            <Close />
          </Button>
      }
    });
  }

  const closeCreateProfile = () => {
    setOpenCreateProfile(false);
  }

  const closeImpExpProfile = () => {
    setOpenImpExpProfile(false);
  }

  const editProfile = (index) => {
    console.log("index = ", index);
    console.log("profile = ", profiles[index]);
    dispatch(allActions.profileActions.setInfo("set", profiles[index]));
    setOpenMode('edit');
    setOpenCreateProfile(true);
  }

  const removeProfile = (index) => {

  }

  const importProfile = (rawData, isImportAppend) => {
    let mergedProfiles = profiles;
    console.log("isAppend = ", isImportAppend);

    let data = rawData.map(el => {
      let newEl = {};
      newEl["email"] = el["email_address"];
      newEl["password"] = el["password"];      
      newEl["ccName"] = el["name_on_card"];
      newEl["ccNumber"] = el["card_number"];
      newEl["ccExpMonth"] = el["expiration_month"];
      newEl["ccExpYear"] = el["expiration_year"];
      newEl["ccCVV"] = el["cvv"];
      newEl["ccBillName"] = el["billing_name"];
      newEl["ccBill1"] = el["billing_address"];
      newEl["ccBill2"] = el["billing_address_2"];
      newEl["ccBill3"] = el["billing_address_3"];
      newEl["ccBillCity"] = el["billing_city"];
      newEl["ccBillState"] = el["billing_state"];
      newEl["ccBillCountry"] = el["billing_country"];
      newEl["ccBillPostal"] = el["billing_post_code"];
      newEl["ccBillPhone"] = el["billing_phone"];
      newEl["sameBillingShipping"] = el["same_billing_shipping"];
      newEl["shippingName"] = el["shipping_name"];
      newEl["shipping1"] = el["shipping_address"];
      newEl["shipping2"] = el["shipping_address_2"];
      newEl["shipping3"] = el["shipping_address_3"];
      newEl["shippingCity"] = el["shipping_city"];
      newEl["shippingState"] = el["shipping_state"];
      newEl["shippingCountry"] = el["shipping_country"];
      newEl["shippingPostal"] = el["shipping_post_code"];
      newEl["shippingPhone"] = el["shipping_phone"];
      newEl["oneCheckout"] = el["only_one_checkout"];
      newEl["cardType"] = el["card_type"];

      if (el["first_name"]) {
        newEl["firstName"] = el["first_name"];
        newEl["lastName"] = el["last_name"];
      } else if (el["billing_name"]) {
        newEl["firstName"] = el["billing_name"].split(" ")[0];
        newEl["lastName"] = el["billing_name"].split(" ").length > 1 ? el["billing_name"].split(" ")[1]: "";
      } else if (el["name_on_card"]) {
        newEl["firstName"] = el["name_on_card"].split(" ")[0];
        newEl["lastName"] = el["name_on_card"].split(" ").length > 1 ? el["name_on_card"].split(" ")[1]: "";
      }
      return newEl;
    });
    if (isImportAppend) {
      data.map(el => {
        mergedProfiles.push(el);
      });
      setProfiles(addActions(mergedProfiles));
    } else {
      console.log("data = ", data);
      setProfiles(addActions(data));
    }
    // addActions();
  }

  // const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Button
          round
          simple
          onClick={() => {
            setOpenMode('create');
            setOpenCreateProfile(true);
          }}
          className="like"
          style={headerButtonStyles}
        >
          <AddCircle />Create Profile
        </Button>{" "}
        <Button
          round
          simple
          onClick={() => setOpenImpExpProfile(true)}
          className="like"
          style={headerButtonStyles}
        >
          <ImportExport />Import/Export Profile
        </Button>{" "}
        <Card style={{ backgroundColor: '#27293D', color: 'white' }}>
          {/* <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>React Table</h4>
          </CardHeader> */}
          <CardBody>
          <Styles>
            <MDBDataTable
              // striped
              bordered
              small
              data={{
                columns: [
                  {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Name',
                    field: 'ccName',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Card Number',
                    field: 'ccNumber',
                    sort: 'asc',
                    width: 120
                  },
                  {
                    label: 'Billing Address',
                    field: 'ccBill1',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Shipping Address',
                    field: 'shipping1',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: '',
                    field: 'edit_action',
                    sort: 'asc',
                    width: 50
                  },
                  {
                    label: '',
                    field: 'remove_action',
                    sort: 'asc',
                    width: 50
                  }
                ],
                rows: profiles
              }}
              style={{ color: 'white', backgroundColor: '#615A3E'}}
            />
          </Styles>
          </CardBody>
        </Card>
      </GridItem>

      <CreateProfile open={openCreateProfile} closeCreateProfile={closeCreateProfile} openMode={openMode}/>
      <ImpExpProfile open={openImpExpProfile} closeImpExpProfile={closeImpExpProfile} importProfile={importProfile}/>
      
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={handleClose} style={buttonStyles}>
            &times;
          </button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </GridContainer>
  );
}

// export default withStyles(styles)(AllProfiles);
