import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { AddCircle, ImportExport, Edit, Close } from "@material-ui/icons";
import { MDBDataTable } from 'mdbreact';
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CreateProfile from "../../components/Modal/CreateProfile";
import ImpExpProfile from "../../components/Modal/ImpExpProfile";
import allActions from "../../redux/actions";
import { csvHeaders } from "../../variables/general";

const fs = window.require('fs')
const csv = require('csv-parser');

const headerButtonStyles = {
  color: "#F8E2B2",
  fontSize: "15px"
}

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

const filePath = "data/profiles.csv";
  
export default function Proxies() {
  const [openCreateProfile, setOpenCreateProfile] = useState(false);
  const [openImpExpProfile, setOpenImpExpProfile] = useState(false);
  const [profiles, setProfiles] = useState(null);
  const [openMode, setOpenMode] = useState('create');
  const [selectedKey, setSelectedKey] = useState(-1);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   let readData = [];
  //   fs.createReadStream(filePath)
  //     .pipe(csv())
  //     .on('data', (row) => {
  //       readData.push(row);    
  //       readProfiles(readData) 
  //     })
  //     .on('end', () => {
  //       console.log('CSV file successfully processed');
  //       // readProfiles(readData);
  //     });
  //   console.log("== end");
  // }, []);

    
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
  
  const readProfiles = (rawData) => {
    console.log("rawData = ", rawData)
    let data = rawData.map(el => {
      console.log("el = ", el)
      let newEl = {};
      csvHeaders.map(header => {
        newEl[header["key"]] = el[header["label"]];
      })

      newEl["fullName"] = newEl["firstName"] + " " + newEl["lastName"];
      console.log("newEl = ", newEl)
      return newEl;
    });
    console.log("data = ", data)

    setProfiles(addActions(data));
    console.log("profiles = ", profiles);
  }

  const closeCreateProfile = () => {
    setOpenCreateProfile(false);
  }

  const closeImpExpProfile = () => {
    setOpenImpExpProfile(false);
  }

  const editProfile = (index) => {
    console.log("editprofiles = ", profiles)
    console.log("profiles[", index ,"] = ", profiles[index]);
    dispatch(allActions.profileActions.setInfo("set", profiles[index]));
    setOpenMode('edit');
    setOpenCreateProfile(true);
    setSelectedKey(index);
  }

  const saveToLocal = (data) => {
    let serializedData = csvHeaders.map(header => header["label"]).join(",");
    serializedData += "\n" + data.map(row =>{
      let orderedRow = [];
      csvHeaders.map(header => {
        orderedRow.push(row[header["key"]])
      });
      return orderedRow;
    }).join("\n");

    fs.writeFile(filePath, serializedData, function (err) {
      if (err) {
        console.log('File save error', err.message);
      }
    });
  };

  const saveProfile = (data) => {
    let tmpProfiles = profiles
    if (openMode == "create") {
      tmpProfiles.push(data);
    } else if (openMode == "edit") {
      tmpProfiles[selectedKey] = data;
    }     
    saveToLocal(tmpProfiles);
    setProfiles(addActions(tmpProfiles));
  }

  const removeProfile = (index) => {
    let tmpProfiles = profiles
    tmpProfiles.splice(index, 1);
    saveToLocal(tmpProfiles);
    setProfiles(addActions(tmpProfiles));
  }

  const importProfile = (rawData, isImportAppend, save=true) => {
    let mergedProfiles = profiles;

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

      newEl["fullName"] = newEl["firstName"] + " " + newEl["lastName"];
      return newEl;
    });
    if (isImportAppend) {
      data.map(el => {
        mergedProfiles.push(el);
      });
      if (save) saveToLocal(mergedProfiles);
      setProfiles(addActions(mergedProfiles));
    } else {
      if (save) saveToLocal(data);
      setProfiles(addActions(data));
    }
  }

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
                      field: 'fullName',
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
                      width: 66,
                      // render: (data) => {
                      //   return <Button color="success" onClick={() => {
                      //     console.log("123", profiles);
                      //   }}>
                      //     <Edit />
                      //   </Button>
                      // }
                    },
                    {
                      label: '',
                      field: 'remove_action',
                      sort: 'asc',
                      width: 66,
                      // render: (data) => {
                      //   return <Button color="danger" onClick={() => removeProfile(data)}>
                      //     <Close />
                      //   </Button>
                      // }
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

      <CreateProfile open={openCreateProfile} closeCreateProfile={closeCreateProfile} openMode={openMode} saveProfile={saveProfile}/>
      <ImpExpProfile open={openImpExpProfile} closeImpExpProfile={closeImpExpProfile} importProfile={importProfile} profiles={profiles}/>
      
     
    </GridContainer>
  );
}
