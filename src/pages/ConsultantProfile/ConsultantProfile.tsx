import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Avatar, Container, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConsultantProfileImage from "../../assets/images/consultantProfile.png";
import { Consultant, getConsultant, getConsultants } from "../../data/Model/Consultant";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Paths } from "../../routing";
import { colors } from "../../theme/colours";

const ConsultantProfile = () => {
  const { consultantId } = useParams<{ consultantId: string }>();
  const [consultant, setConsultant] = useState<Consultant>();

  // TODO: Remove fetching consultant data from Firestore
  useEffect(() => {
    // Fetch consultant profile data on page load
    const fetchConsultant = async (id: string) => {
      const consultants = await getConsultants();
      getConsultant(consultants[0].id as string).then((data) => setConsultant(data));
    }

    fetchConsultant(consultantId as string);
  }, [consultantId]);

  // TODO: Update this to show 404
  if(consultant == undefined){
    return <>1</>;
  }

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Breadcrumbs
          breadcrumbs={[
            { name: "Consultants", link: Paths.consultants },
            { name: consultant.name || "Consultant Profile" },
          ]}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="left" paddingTop={4}>
        <Container className="page-width page-padding">
          {/* Profile Section */}
          <Grid container sx={{ maxWidth: "50%" }}>
            {/* Profile Picture */}
            <Grid item xs={12} md={4} container justifyContent="center">
              <Avatar
                src={consultant.profileImageUrl || ConsultantProfileImage}
                alt="Consultant Profile"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%"
                }}
              />
            </Grid>

            {/* Profile Details */}
            <Grid xs={12} md={8} marginBottom={3}>
              <Typography variant="h1" fontSize={32} fontWeight="bold" gutterBottom marginBottom={3}>
                {consultant.name}
              </Typography>

              {/* Buttons */}
              <Box display="flex" gap={2} marginBottom={2}>
                <Button
                  onClick={() => window.location.href = `tel:${consultant.phone}`}
                  variant="contained"
                  color="primary"
                  startIcon={<PhoneIcon />}
                  sx={{ backgroundColor: colors.brand.tertiary, borderRadius: "25px", textTransform: "inherit", padding: "4px 24px" }}
                >
                  Schedule a call
                </Button>
                <Button
                  onClick={() => window.location.href = `mailto:${consultant.email}`}
                  variant="contained"
                  color="primary"
                  startIcon={<EmailIcon />}
                  sx={{ backgroundColor: colors.brand.tertiary, borderRadius: "25px", textTransform: "inherit", padding: "4px 24px" }}
                >
                  Send an email
                </Button>
              </Box>

              {/* Description Texts */}
              <Typography variant="body1" gutterBottom marginBottom={2}>
                Jackson Lim is a highly experienced consultant specializing in
                business strategy and operations.
              </Typography>
              <Typography variant="body1" gutterBottom marginBottom={2}>
                <strong>Areas of interest:</strong> ADHD, Anxiety, Depression, loneliness, Youth
              </Typography>
              <Typography variant="body1" gutterBottom marginBottom={2}>
                <strong>Availability:</strong> Now
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: colors.neutral.grey,
                  boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "80px",
                  borderRadius: "8px",
                  width: 168,
                  padding: 2
                }}
              >
                <Typography variant="body2">
                  20+ MHNPOs Helped
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: colors.neutral.grey,
                  boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "80px",
                  borderRadius: "8px",
                  width: 168,
                  padding: 2
                }}
              >
                <Typography variant="body2">
                  20+ years Grant Writitng Experience
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: colors.neutral.grey,
                  boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "80px",
                  borderRadius: "8px",
                  width: 168,
                  padding: 2
                }}
              >
                <Typography variant="body2">
                  $3M+ Total Funding Secured
                </Typography>
              </Box>
            </Grid>
            <Typography variant="h2" fontSize={32} fontWeight={400} gutterBottom marginTop={6}>
              Services
            </Typography>
            {/* Accordion Section */}
            <Box marginBottom={12}>
              {consultant.services?.map((service, index) => (
              <Accordion
                key={index}
                sx={{
                  marginBottom: 3,
                  boxShadow: "none",
                  borderRadius: "0px",
                  backgroundColor: colors.neutral.grey,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: colors.neutral.grey,
                  }}
                >
                  <Typography variant="h6" fontWeight="400">
                    {service}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Assistance with writing and submitting grant proposals to secure funding for your organization.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ConsultantProfile;