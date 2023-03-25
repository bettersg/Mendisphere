import { Grid, GridItem, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Organisation } from "../../../data/model/organisation";
import { buildOrgProfilePath } from "../../../paths";
import OrgCard from "./OrgCard";

const CardView: React.FC<{ organisationList: Organisation[] }> = ({
  organisationList,
}) => {
  let renderedRow: JSX.Element[] = [<></>];

  for (let i = 0; i < organisationList.length; i += 4) {
    let cardsToRender = organisationList.slice(i, i + 4);
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
