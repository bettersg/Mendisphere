import { Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Organisation } from "../../../data/model/organisation";
import Card from "./Card";

const CardView: React.FC<{ organisationList: Organisation[] }> = ({
  organisationList,
}) => {
  let renderedRow: JSX.Element[] = [<></>];

  for (let i = 0; i < organisationList.length; i += 4) {
    let cardsToRender = organisationList.slice(i, i + 4);
    renderedRow.push(
      <Grid templateColumns="repeat(4, 1fr)" gap={5} marginTop={5} key={i}>
        {cardsToRender.map((org) => (
          <GridItem borderRadius={5} bg={"#F5F5F5"} key={org.id}>
            {/* <Link to={`/organisations/${card.id}`}>{card.toString()}</Link> */}
            <Card org={org} />
          </GridItem>
        ))}
      </Grid>
    );
  }
  return <>{renderedRow}</>;
};

export default CardView;
