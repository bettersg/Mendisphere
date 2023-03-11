import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavigationButton(props: any) {
  return (
    <Link to={props.navigationLink}>
      <Box
        as="button"
        height={props.height}
        width={props.width}
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        border="1px"
        borderRadius="8px"
        fontSize="12px"
        fontWeight="700"
        bg={props.backgroundColor}
        borderColor="#ccd0d5"
        color="#ffffff"
        _hover={{
          bg: "#ebedf0",
          color: "black",
        }}
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
      >
        {props.buttonText}
      </Box>
    </Link>
  );
}
