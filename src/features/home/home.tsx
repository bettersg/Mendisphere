import { Box, Center, Flex, Button, VStack } from "@chakra-ui/react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "../common/footer";
import {
  createOrganisationWithAdminData,
  getOrganisations,
  IOrganisation,
} from "../../data/model/organisation";
import { IOrganisationAdminData } from "../../data/model/organisationAdmin";
import { OrgSize } from "../../data/enums/org-size.enum";
import { CapitalGoal } from "../../data/enums/captial-goal.enum";
import { Timestamp } from "firebase/firestore";
import { createUser } from "../../data/model/user";
import { Animate } from "./components/ScrollAnimation";
import { ReactComponent as HomeIcon3 } from '../../assets/icons/homeIcon3.svg'
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

// TODO remove this. Only use temporarily for test button below
interface IUserData {
  role: string;
}
interface ISubmitData {
  org: IOrganisation,
  orgAdminData: IOrganisationAdminData,
  userData: IUserData,
}


const Home: React.FC = () => {
  //private app: FirebaseApp;
  //private appList: FirebaseApp[];
  //private db: Firestore;
  const navigate = useNavigate()

  const runGetOrgs = async () => {
    // create preliminary org data (TODO registration from submission data should be in this format)
    const submitData: ISubmitData = {
      org: {
        name: "Test at " + new Date(),
        ipcApproved: true,
        verified: false,
      },
      orgAdminData: {
        address: "test address",
        size: OrgSize.max10,
        capital: "$1000",
        capitalGoal: CapitalGoal.max50K,
        ipcExpiry: Timestamp.now(),
        uen: "UEN test",
        orgId: null,
      },
      userData: {
        role: 'founder'
      }
    }
    const userID = 'IB1tVl5F1CSbMyWLGowNtkcMGOf1'; // from firebase auth
    const { org, orgAdminData, userData } = submitData;
    // test creating an organisation and storing it in the db
    const organisations = await getOrganisations();
    let newOrganisation = true;
    organisations.forEach(async (dbOrg) => {
      if (dbOrg.name === org.name) {
        console.log('organisation exist in DB!', dbOrg.name)
        newOrganisation = false;
        await createUser(userID, dbOrg.id, userData)
      }
    })
    if (newOrganisation) {
      console.log('organisation is new!', org.name)
      const orgId = await createOrganisationWithAdminData(org, orgAdminData);
      await createUser(userID, orgId, userData);
    }
  };

  return (
    <VStack spacing={0} align="stretch">
      <Box>
        <NavigationBar />
      </Box>
      <Box>
        <Button style={{width: '100%'}} onClick={() => runGetOrgs()}>Test</Button>
        <FrontPage />
      </Box>
      <Animate.FadeUp>  
        <Box style={styles.box1}>
          <Flex direction={'row'}>
            <HomeIcon3/>
            <Flex direction={'column'} style={{ paddingLeft: 52 }}>
              <text style={{fontSize:80, color: "#F5F5F5", fontWeight: 700}}>Together we can go further.</text>
              <text style={{fontSize: 32, color: "#F5F5F5", fontWeight: 400, paddingTop: 16}}>
                Mendisphere connects non-profits focusing on mental health with the support they need to maximise their impact and reach more people.
              </text>
              <Center style={styles.whiteButton1}>
                Our Story
              </Center>
            </Flex>
          </Flex>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerLarge}>
            Driving Outcomes that Matter to You
          </Center>
          <Center style={{alignItems: 'start', marginBottom: 72}}>
            <img src={require('../../assets/icons/NPMHOTestimonial1.png')}/>
            <img src={require('../../assets/icons/NPMHOTestimonial2.png')}/>
            <img src={require('../../assets/icons/NPMHOTestimonial3.png')}/>
          </Center>
          <div style={{alignSelf: 'center'}}>
            <Center>
              <Box style={styles.blueButton}>
                Read Testimonials
              </Box>
            </Center>
          </div>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerSmall}>
            Organisation Partners
            </Center>
            <Center>
              <Flex direction={'row'} style={styles.imageContainer}>
                <img src={require('../../assets/icons/Partner1.png')}/>
                <img src={require('../../assets/icons/Partner2.png')}/>
                <img src={require('../../assets/icons/Partner3.png')}/>
                <img src={require('../../assets/icons/Partner4.png')}/>
                <img src={require('../../assets/icons/Partner5.png')}/>
              </Flex>
          </Center>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerLarge}>
            The Latest on Mental Health
          </Center>
          <Center>
              <Flex direction={'row'} style={styles.imageContainer}>
                <img src={require('../../assets/icons/NPMHOStory1.png')} style={{borderRadius: 12}}/>
                <img src={require('../../assets/icons/NPMHOStory2.png')} style={{borderRadius: 12}}/>
                <img src={require('../../assets/icons/NPMHOStory3.png')} style={{borderRadius: 12}}/>
              </Flex>
          </Center>
          <div style={{alignSelf: 'center'}}>
            <Center>
              <Box style={styles.blueButton}>
                Explore our Blog
              </Box>
            </Center>
          </div>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box style={{paddingTop: 96, paddingLeft: 120}} bgGradient='linear(to-r, #FFFFFF 0%, #3959FF 61.8%, #3959FF 100%, #3959FF 100%)'>
          <div style={{fontSize: 80, fontWeight: 700, paddingBottom: 24, alignSelf: 'center'}}>
            Lead the Charge for Mental Wellness
          </div>
          <div style={{fontSize: 32, fontWeight: 400, paddingTop: 16, paddingBottom: 48}}>
            Advance mental health support in Singapore by collaborating with non-profits making a difference.
          </div>
          <Flex direction={'row'}>
            <div style={{alignSelf: 'center', paddingRight: 24}}>
              <Center>
                <Box style={styles.blueButton}
                // TODO registerPage path onClick={this.navigate()}
                >
                  Join Mendisphere
                </Box>
              </Center>
            </div>
            <div style={{alignSelf: 'center', paddingRight: 240}}>
              <Center>
                <Box style={styles.whiteButton2} onClick={() => navigate('/organisations')}>
                  For Corporates
                </Box>
              </Center>
            </div>
            <img src={require('../../assets/icons/homeIcon4.png')}/>
          </Flex>
        </Box>
      </Animate.FadeUp>
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
}

export default Home;
