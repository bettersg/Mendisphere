import { Grid, GridItem, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Organisation } from "../../data/Model/Organisation";
import OrgCard from "./OrganisationCard";
import { buildOrgProfilePath } from "../../routing";

const CardView: React.FC<{ OrganisationList: Organisation[] }> = ({
  OrganisationList,
}) => {
  let renderedRow: JSX.Element[] = [<></>];

  for (let i = 0; i < OrganisationList.length; i += 4) {
    let cardsToRender = OrganisationList.slice(i, i + 4);
    renderedRow.push(
      <Grid templateColumns="repeat(4, 1fr)" gap={5} marginTop={5} key={i}>
        {cardsToRender.map((org) => (
          <GridItem borderRadius={5} key={org.id}>
            <LinkBox>
              <LinkOverlay isExternal={true} href={buildOrgProfilePath(org.id)}>
                <OrgCard org={org} />
              </LinkOverlay>
            </LinkBox>
          </GridItem>
        ))}
      </Grid>
    );
  }
  return <>{renderedRow}</>;
};

export default CardView;
