import React, {useState} from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

import { dataTable } from "../../variables/general.jsx";

import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";
import { AddCircle, ImportExport } from "@material-ui/icons";

import CreateProfile from "../../components/Modal/CreateProfile";
import ImpExpProfile from "../../components/Modal/ImpExpProfile";
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

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
  }
`

  
// class AllProfiles extends React.Component {
export default function AllProfiles() {
  const [openCreateProfile, setOpenCreateProfile] = useState(false);
  const [openImpExpProfile, setOpenImpExpProfile] = useState(false);

  const closeCreateProfile = () => {
    setOpenCreateProfile(false);
  }

  const closeImpExpProfile = () => {
    setOpenImpExpProfile(false);
  }
  // const [data, setData] = useState(
  //   dataTable.dataRows.map((prop, key) => {
  //     return {
  //       id: key,
  //       name: prop[0],
  //       position: prop[1],
  //       office: prop[2],
  //       age: prop[3],
  //       actions: (
  //         // we've added some custom button actions
  //         <div className="actions-right">
  //           {/* use this button to add a like kind of action */}
  //           <Button
  //             justIcon
  //             round
  //             simple
  //             onClick={() => {
  //               let obj = this.state.data.find(o => o.id === key);
  //               alert(
  //                 "You've clicked LIKE button on \n{ \nName: " +
  //                   obj.name +
  //                   ", \nposition: " +
  //                   obj.position +
  //                   ", \noffice: " +
  //                   obj.office +
  //                   ", \nage: " +
  //                   obj.age +
  //                   "\n}."
  //               );
  //             }}
  //             color="info"
  //             className="like"
  //           >
  //             <Favorite />
  //           </Button>{" "}
  //           {/* use this button to add a edit kind of action */}
  //           <Button
  //             justIcon
  //             round
  //             simple
  //             onClick={() => {
  //               let obj = this.state.data.find(o => o.id === key);
  //               alert(
  //                 "You've clicked EDIT button on \n{ \nName: " +
  //                   obj.name +
  //                   ", \nposition: " +
  //                   obj.position +
  //                   ", \noffice: " +
  //                   obj.office +
  //                   ", \nage: " +
  //                   obj.age +
  //                   "\n}."
  //               );
  //             }}
  //             color="warning"
  //             className="edit"
  //           >
  //             <Dvr />
  //           </Button>{" "}
  //           {/* use this button to remove the data row */}
  //           <Button
  //             justIcon
  //             round
  //             simple
  //             onClick={() => {
  //               var data = this.state.data;
  //               data.find((o, i) => {
  //                 if (o.id === key) {
  //                   // here you should add some custom code so you can delete the data
  //                   // from this component and from your server as well
  //                   data.splice(i, 1);
  //                   return true;
  //                 }
  //                 return false;
  //               });
  //               this.setState({ data: data });
  //             }}
  //             color="danger"
  //             className="remove"
  //           >
  //             <Close />
  //           </Button>{" "}
  //         </div>
  //       )
  //     };
  //   })
  // );

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Card Number',
        field: 'cardNumber',
        sort: 'asc',
        width: 120
      },
      {
        label: 'Card Exp Date',
        field: 'cardExpDate',
        sort: 'asc',
        width: 120
      },
      {
        label: 'Billing Address',
        field: 'billAddress',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Shipping Address',
        field: 'shippingAddress',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 80
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        cardNumber: '1234567890',
        cardExpDate: '2022/9',
        billAddress: 'asda sdfsd sdfs 42',
        shippingAddress: 'asda sdfsd sdfs 42',
        action: '',
      },
      {
        name: 'Garrett Winters',
        cardNumber: '54346234236',
        cardExpDate: '2022/9',
        billAddress: 'asda sdfsd sdfs 42',
        shippingAddress: 'asda sdfsd sdfs 42',
        action: '',
      },
      {
        name: 'Ashton Cox',
        cardNumber: '353463723424',
        cardExpDate: '2021/9',
        billAddress: 'asda sdfsd sdfs 42',
        shippingAddress: 'asda sdfsd sdfs 42',
        action: '',
      },
    ]
  };


    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Button
            round
            simple
            onClick={() => setOpenCreateProfile(true)}
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
                data={data}
                style={{ color: 'white', backgroundColor: '#615A3E'}}
              />
            </Styles>
            </CardBody>
          </Card>
        </GridItem>

        <CreateProfile open={openCreateProfile} closeCreateProfile={closeCreateProfile}/>
        <ImpExpProfile open={openImpExpProfile} closeImpExpProfile={closeImpExpProfile}/>
        
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
