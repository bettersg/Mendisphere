import { Grid, GridItem } from "@chakra-ui/react";
import { IOrganization } from "..";
import { Link } from "react-router-dom";

const CardView: React.FC<{organizationList: IOrganization[]}> = ({organizationList}) => {
    let renderedRow: JSX.Element[] = [<></>];
  
    for (let i = 0; i < organizationList.length; i += 4) {
      let cardsToRender = organizationList.slice(i, i+4);
      renderedRow.push(
        <Grid templateColumns='repeat(4, 1fr)' gap={5} marginTop={5} key={i}>
          {cardsToRender.map((card) =>
            <GridItem borderRadius={5} bg={'tomato'} key={card.renderText}>
              <Link to={`/organisations/${card.index}`}>
                {card.renderText}
              </Link>
            </GridItem>)}
        </Grid>
      )
    }
    return (
        <>
            {renderedRow}
        </>
    )
}

export default CardView;