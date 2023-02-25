import { Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Organisation } from "../../../data/model/organisation";

const CardView: React.FC<{ organisationList: Organisation[] }> = ({
  organisationList,
}) => {
  let renderedRow: JSX.Element[] = [<></>];

  for (let i = 0; i < organisationList.length; i += 4) {
    let cardsToRender = organisationList.slice(i, i + 4);
    renderedRow.push(
      <Grid templateColumns="repeat(4, 1fr)" gap={5} marginTop={5} key={i}>
        {cardsToRender.map((card) => (
          <GridItem borderRadius={5} bg={"tomato"} key={card.id}>
            <Link to={`/organisations/${card.id}`}>{card.toString()}</Link>
          </GridItem>
        ))}
      </Grid>
    );
  }
  return <>{renderedRow}</>;
};

export default CardView;
