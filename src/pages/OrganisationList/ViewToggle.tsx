import { Box, Text } from "@chakra-ui/react";
import { EViewOption } from "./OrganisationList";
import { ReactComponent as ViewCardActive } from "../../assets/icons/viewCardActive.svg";
import { ReactComponent as ViewCardInactive } from "../../assets/icons/viewCardInactive.svg";
import { ReactComponent as ViewListActive } from "../../assets/icons/viewListActive.svg";
import { ReactComponent as ViewListInactive } from "../../assets/icons/viewListInactive.svg";

interface IViewToggle {
  length?: number;
  totalCount?: number;
  onChange: (option: EViewOption) => void;
  viewOption: EViewOption;
}

const ViewToggle: React.FC<IViewToggle> = ({
  length,
  totalCount,
  onChange,
  viewOption,
}) => {
  return (
    <Box
      className="page-width page-padding"
      display="flex"
      justifyContent="flex-end"
      marginBottom={5}
      marginTop={30}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: length && totalCount ? "space-between" : "flex-end",
          width: "100%",
        }}
      >
        {length && totalCount && (
          <Text>
            Displaying <strong>{length}</strong> out of{" "}
            <strong>{totalCount}</strong> results
          </Text>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            onClick={() => onChange(EViewOption.Card)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            {viewOption === EViewOption.Card ? (
              <ViewCardActive />
            ) : (
              <ViewCardInactive />
            )}
            <Text
              marginLeft={2}
              style={
                viewOption === EViewOption.Card
                  ? {
                      color: "#3959FF",
                      fontWeight: "bold",
                    }
                  : {
                      color: "#CBCBCB",
                    }
              }
            >
              Card View
            </Text>
          </button>
          <div style={{ color: "#CBCBCB" }}>|</div>
          <button
            onClick={() => onChange(EViewOption.List)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            {viewOption === EViewOption.List ? (
              <ViewListActive />
            ) : (
              <ViewListInactive />
            )}
            <Text
              marginLeft={2}
              style={
                viewOption === EViewOption.List
                  ? {
                      color: "#3959FF",
                      fontWeight: "bold",
                    }
                  : {
                      color: "#CBCBCB",
                    }
              }
            >
              List View
            </Text>
          </button>
        </div>
      </div>
    </Box>
  );
};

export default ViewToggle;
