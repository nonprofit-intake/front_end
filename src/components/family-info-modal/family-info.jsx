import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { axiosWithAuth } from "../../utils/auth/axiosWithAuth";
import TransitEnterexitIcon from "@material-ui/icons/TransitEnterexit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { Skeleton } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const FamilyInfo = ({ family, setInfoOpen }) => {
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState(0);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <CardShadow
      onClick={(e) => {
        setInfoOpen(false);
      }}
    >
      <div className="container">
        <div className="notes-container" onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="nav">
              <div className="close-notes">
                <ArrowBackIcon
                  fontSize="large"
                  onClick={() => setInfoOpen(false)}
                ></ArrowBackIcon>
              </div>
              <nav id="family-modal-navbar">
                <li value="o" onClick={handleContentChange}>
                  General
                </li>
                <li value="1" onClick={handleContentChange}>
                  Loc/homeless
                </li>
                <li value="2" onClick={handleContentChange}>
                  Insurance
                </li>
                <li value="3" onClick={handleContentChange}>
                  Contact
                </li>
                <li value="4" onClick={handleContentChange}>
                  Vehicle
                </li>
              </nav>
            </div>
            <div className="content-container">
              {content == "0" && (
                <div className="content">
                  <h1>General Information</h1>
                  <div>
                    <h3>Project Name</h3>
                    <h5>{family.project_name}</h5>
                  </div>
                  <div>
                    <h3>Enrollment Created by</h3>
                    <h4>{family.enrollment_created_by}</h4>
                  </div>
                  <div>
                    <h3>Total Children</h3>
                    <h4>{family.case_children}</h4>
                  </div>
                  <div>
                    <h3>Total Adults</h3>e<h4>{family.case_adults}</h4>
                  </div>
                  <div>
                    <h3>Total Bednights</h3>
                    <h4>{family.total_bednights}</h4>
                  </div>

                 {
                   family.domestic_violence ? 
                   <div>
                     <h3>Last DV Incident</h3>
                     <h4>{family.when_dv_occured}</h4>
                   </div>
                   :
                   ''
                 }

                 <div>
                   <h3>Currently Fleeing</h3>
                    <h3>{family.currently_fleeing}</h3>
                 </div>

                  <div>
                    <h3>Enroll Date</h3>
                    <h4>{family.enroll_date}</h4>
                  </div>
                  <div>
                    <h3>Exit Date</h3>
                    <h4>{family.exit_date}</h4>
                  </div>
                  <div>
                    <h3>Exit Destination</h3>
                    <h4>{family.exit_destination}</h4>
                  </div>
                  <div>
                    <h3>Project Name</h3>
                    <h4>{family.project_name}</h4>
                  </div>
                </div>
              )}

              {content == "1" && (
                <div className="content">
                  <h1>Location/homeless info</h1>
                  <div>
                    <h3>State</h3>
                    <h4>{family.state}</h4>
                  </div>
                  <div>
                    <h3>City</h3>
                    <h4>{family.city}</h4>
                  </div>
                  <div>
                    <h3>Zip</h3>
                    <h4>{family.zip}</h4>
                  </div>
                  <div>
                    <h3>Last Permanent Address</h3>
                    <h4>{family.last_perm_address}</h4>
                  </div>
                  <div>
                    <h3>Living Situation</h3>
                    <h4>{family.living_situation}</h4>
                  </div>
                  <div>
                    <h3>Homeless Start Date</h3>
                    <h4>{family.homeless_start_date}</h4>
                  </div>
                  <div>
                    <h3>Length of time homeless</h3>
                    <h4>{family.length_of_time_homeless}</h4>
                  </div>
                  <div>
                    <h3>Times homeless last 3 years</h3>
                    <h4>{family.times_homeless_last_3years}</h4>
                  </div>
                  <div>
                    <h3>Total months homeless</h3>
                    <h4>{family.total_months_homeless}</h4>
                  </div>
                  <div>
                    <h3>Housing Status</h3>
                    <h4>{family.housing_status}</h4>
                  </div>
                </div>
              )}
              {
                content == '2' &&
                <div className="content">
                  <h1>Insurance</h1>
                  <div>
                    <h3>other_public</h3>
                    <h4>{family.other_public}</h4>
                  </div>
                  <div>
                    <h3>State Funded</h3>
                    <h4>{family.state_funded}</h4>
                  </div>
                  <div>
                    <h3>Indian Health Services</h3>
                    <h4>{family.indian_health_services}</h4>
                  </div>
                  <div>
                    <h3>Other</h3>
                    <h4>{family.other}</h4>
                  </div>
                  <div>
                    <h3>Combined Childrens Health Insurance</h3>
                    <h4>{family.combined_childrens_health_insurance}</h4>
                  </div>
                  <div>
                    <h3>Medicaid</h3>
                    <h4>{family.medicaid}</h4>
                  </div>
                  <div>
                    <h3>Medicare</h3>
                    <h4>{family.medicare}</h4>
                  </div>
                  <div>
                    <h3>CHIP</h3>
                    <h4>{family.CHIP}</h4>
                  </div>
                  <div>
                    <h3>VAMS</h3>
                    <h4>{family.VAMS}</h4>
                  </div>
                  <div>
                    <h3>Private Employer</h3>
                    <h4>{family.Private_employer}</h4>
                  </div>
                  <div>
                    <h3>Private</h3>
                    <h4>{family.private}</h4>
                  </div>
                  <div>
                    <h3>Private Individual</h3>
                    <h4>{family.private_individual}</h4>
                  </div>
                </div>
              }
              {
                content == '3' &&
                <div className="content">
                  <h1>Contact Information</h1>
                  <div>
                    <h3>Personal Phone Number</h3>
                    <h4>{family.personal_phone}</h4>
                  </div>
                  <div>
                    <h3>Work Phone</h3>
                    <h4>{family.work_phone}</h4>
                  <div>
                    <h3>Emergency Contact Name</h3>
                    <h4>{family.emergency_contact_name}</h4>
                  </div>
                  </div>
                  <div>
                    <h3>Emergency Contact Number</h3>
                    <h4>{family.emergency_contact_number}</h4>
                  </div>
                </div>
              }
              {
                content == '4' &&
                <div className="content">
                  <h1>Vehicle info</h1>
                  <div>
                    <h3>Make</h3>
                    <h4>{family.vehicle_make}</h4>
                  </div>
                  <div>
                    <h3>Model</h3>
                    <h4>{family.vehicle_model}</h4>
                  </div>
                  <div>
                    <h3>Year</h3>
                    <h4>{family.vehicle_year}</h4>
                  </div>
                  <div>
                    <h3>Color</h3>
                    <h4>{family.vehicle_color}</h4>
                  </div>
                  <div>
                    <h3>Liscense</h3>
                    <h4>{family.vehicle_lic}</h4>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </CardShadow>
  );
};

export default FamilyInfo;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;
