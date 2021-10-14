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
// import CreateProfile from "../../components/Modal/CreateProfile";

import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import CreateProfile from "../../components/Modal/CreateProfile";
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
  const [state, setState] = React.useState({
    showHide: false,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenCreateProfile(true);
  const handleClose = () => setOpenCreateProfile(false);
  const [openCreateProfile, setOpenCreateProfile] = useState(false);

  const closeCreateProfile = () => {
    setOpenCreateProfile(false);
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
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Office',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Salary',
        field: 'salary',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        salary: '$320'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170'
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86'
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433'
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        date: '2008/11/28',
        salary: '$162'
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: '61',
        date: '2012/12/02',
        salary: '$372'
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: '59',
        date: '2012/08/06',
        salary: '$137'
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: '55',
        date: '2010/10/14',
        salary: '$327'
      },
      {
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        age: '39',
        date: '2009/09/15',
        salary: '$205'
      },
      {
        name: 'Sonya Frost',
        position: 'Software Engineer',
        office: 'Edinburgh',
        age: '23',
        date: '2008/12/13',
        salary: '$103'
      },
      {
        name: 'Jena Gaines',
        position: 'Office Manager',
        office: 'London',
        age: '30',
        date: '2008/12/19',
        salary: '$90'
      },
      {
        name: 'Quinn Flynn',
        position: 'Support Lead',
        office: 'Edinburgh',
        age: '22',
        date: '2013/03/03',
        salary: '$342'
      },
      {
        name: 'Charde Marshall',
        position: 'Regional Director',
        office: 'San Francisco',
        age: '36',
        date: '2008/10/16',
        salary: '$470'
      },
      {
        name: 'Haley Kennedy',
        position: 'Senior Marketing Designer',
        office: 'London',
        age: '43',
        date: '2012/12/18',
        salary: '$313'
      },
      {
        name: 'Tatyana Fitzpatrick',
        position: 'Regional Director',
        office: 'London',
        age: '19',
        date: '2010/03/17',
        salary: '$385'
      },
      {
        name: 'Michael Silva',
        position: 'Marketing Designer',
        office: 'London',
        age: '66',
        date: '2012/11/27',
        salary: '$198'
      },
      {
        name: 'Paul Byrd',
        position: 'Chief Financial Officer (CFO)',
        office: 'New York',
        age: '64',
        date: '2010/06/09',
        salary: '$725'
      },
      {
        name: 'Gloria Little',
        position: 'Systems Administrator',
        office: 'New York',
        age: '59',
        date: '2009/04/10',
        salary: '$237'
      },
      {
        name: 'Bradley Greer',
        position: 'Software Engineer',
        office: 'London',
        age: '41',
        date: '2012/10/13',
        salary: '$132'
      },
      {
        name: 'Dai Rios',
        position: 'Personnel Lead',
        office: 'Edinburgh',
        age: '35',
        date: '2012/09/26',
        salary: '$217'
      },
      {
        name: 'Jenette Caldwell',
        position: 'Development Lead',
        office: 'New York',
        age: '30',
        date: '2011/09/03',
        salary: '$345'
      },
      {
        name: 'Yuri Berry',
        position: 'Chief Marketing Officer (CMO)',
        office: 'New York',
        age: '40',
        date: '2009/06/25',
        salary: '$675'
      },
      {
        name: 'Caesar Vance',
        position: 'Pre-Sales Support',
        office: 'New York',
        age: '21',
        date: '2011/12/12',
        salary: '$106'
      },
      {
        name: 'Doris Wilder',
        position: 'Sales Assistant',
        office: 'Sidney',
        age: '23',
        date: '2010/09/20',
        salary: '$85'
      },
      {
        name: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        age: '47',
        date: '2009/10/09',
        salary: '$1'
      },
      {
        name: 'Gavin Joyce',
        position: 'Developer',
        office: 'Edinburgh',
        age: '42',
        date: '2010/12/22',
        salary: '$92'
      },
      {
        name: 'Jennifer Chang',
        position: 'Regional Director',
        office: 'Singapore',
        age: '28',
        date: '2010/11/14',
        salary: '$357'
      },
      {
        name: 'Brenden Wagner',
        position: 'Software Engineer',
        office: 'San Francisco',
        age: '28',
        date: '2011/06/07',
        salary: '$206'
      },
      {
        name: 'Fiona Green',
        position: 'Chief Operating Officer (COO)',
        office: 'San Francisco',
        age: '48',
        date: '2010/03/11',
        salary: '$850'
      },
      {
        name: 'Shou Itou',
        position: 'Regional Marketing',
        office: 'Tokyo',
        age: '20',
        date: '2011/08/14',
        salary: '$163'
      },
      {
        name: 'Michelle House',
        position: 'Integration Specialist',
        office: 'Sidney',
        age: '37',
        date: '2011/06/02',
        salary: '$95'
      },
      {
        name: 'Suki Burks',
        position: 'Developer',
        office: 'London',
        age: '53',
        date: '2009/10/22',
        salary: '$114'
      },
      {
        name: 'Prescott Bartlett',
        position: 'Technical Author',
        office: 'London',
        age: '27',
        date: '2011/05/07',
        salary: '$145'
      },
      {
        name: 'Gavin Cortez',
        position: 'Team Leader',
        office: 'San Francisco',
        age: '22',
        date: '2008/10/26',
        salary: '$235'
      },
      {
        name: 'Martena Mccray',
        position: 'Post-Sales support',
        office: 'Edinburgh',
        age: '46',
        date: '2011/03/09',
        salary: '$324'
      },
      {
        name: 'Unity Butler',
        position: 'Marketing Designer',
        office: 'San Francisco',
        age: '47',
        date: '2009/12/09',
        salary: '$85'
      },
      {
        name: 'Howard Hatfield',
        position: 'Office Manager',
        office: 'San Francisco',
        age: '51',
        date: '2008/12/16',
        salary: '$164'
      },
      {
        name: 'Hope Fuentes',
        position: 'Secretary',
        office: 'San Francisco',
        age: '41',
        date: '2010/02/12',
        salary: '$109'
      },
      {
        name: 'Vivian Harrell',
        position: 'Financial Controller',
        office: 'San Francisco',
        age: '62',
        date: '2009/02/14',
        salary: '$452'
      },
      {
        name: 'Timothy Mooney',
        position: 'Office Manager',
        office: 'London',
        age: '37',
        date: '2008/12/11',
        salary: '$136'
      },
      {
        name: 'Jackson Bradshaw',
        position: 'Director',
        office: 'New York',
        age: '65',
        date: '2008/09/26',
        salary: '$645'
      },
      {
        name: 'Olivia Liang',
        position: 'Support Engineer',
        office: 'Singapore',
        age: '64',
        date: '2011/02/03',
        salary: '$234'
      },
      {
        name: 'Bruno Nash',
        position: 'Software Engineer',
        office: 'London',
        age: '38',
        date: '2011/05/03',
        salary: '$163'
      },
      {
        name: 'Sakura Yamamoto',
        position: 'Support Engineer',
        office: 'Tokyo',
        age: '37',
        date: '2009/08/19',
        salary: '$139'
      },
      {
        name: 'Thor Walton',
        position: 'Developer',
        office: 'New York',
        age: '61',
        date: '2013/08/11',
        salary: '$98'
      },
      {
        name: 'Finn Camacho',
        position: 'Support Engineer',
        office: 'San Francisco',
        age: '47',
        date: '2009/07/07',
        salary: '$87'
      },
      {
        name: 'Serge Baldwin',
        position: 'Data Coordinator',
        office: 'Singapore',
        age: '64',
        date: '2012/04/09',
        salary: '$138'
      },
      {
        name: 'Zenaida Frank',
        position: 'Software Engineer',
        office: 'New York',
        age: '63',
        date: '2010/01/04',
        salary: '$125'
      },
      {
        name: 'Zorita Serrano',
        position: 'Software Engineer',
        office: 'San Francisco',
        age: '56',
        date: '2012/06/01',
        salary: '$115'
      },
      {
        name: 'Jennifer Acosta',
        position: 'Junior Javascript Developer',
        office: 'Edinburgh',
        age: '43',
        date: '2013/02/01',
        salary: '$75'
      },
      {
        name: 'Cara Stevens',
        position: 'Sales Assistant',
        office: 'New York',
        age: '46',
        date: '2011/12/06',
        salary: '$145'
      },
      {
        name: 'Hermione Butler',
        position: 'Regional Director',
        office: 'London',
        age: '47',
        date: '2011/03/21',
        salary: '$356'
      },
      {
        name: 'Lael Greer',
        position: 'Systems Administrator',
        office: 'London',
        age: '21',
        date: '2009/02/27',
        salary: '$103'
      },
      {
        name: 'Jonas Alexander',
        position: 'Developer',
        office: 'San Francisco',
        age: '30',
        date: '2010/07/14',
        salary: '$86'
      },
      {
        name: 'Shad Decker',
        position: 'Regional Director',
        office: 'Edinburgh',
        age: '51',
        date: '2008/11/13',
        salary: '$183'
      },
      {
        name: 'Michael Bruce',
        position: 'Javascript Developer',
        office: 'Singapore',
        age: '29',
        date: '2011/06/27',
        salary: '$183'
      },
      {
        name: 'Donna Snider',
        position: 'Customer Support',
        office: 'New York',
        age: '27',
        date: '2011/01/25',
        salary: '$112'
      }
    ]
  };

  // handleClose = () => this.setState({showCreateProfileModal: false});

    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Button
            round
            simple
            onClick={handleOpen}
            className="like"
            style={headerButtonStyles}
          >
            <AddCircle />Create Profile
          </Button>{" "}
          <Button
            round
            simple
            onClick={handleOpen}
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
        <GridItem>
          
          {/* <CreateProfile /> */}
        </GridItem>
        <CreateProfile open={openCreateProfile} closeCreateProfile={closeCreateProfile}/>
        
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
