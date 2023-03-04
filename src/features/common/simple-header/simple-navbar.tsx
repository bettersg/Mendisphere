import { Box, Text } from "@chakra-ui/react";

export default function SimpleNavigationBar() {
  return (
    <Box h="8vh" borderBottom="1px" borderColor="#d3d3d3">
      <Text fontWeight="700" paddingLeft={8} paddingTop={5} fontSize={24}>
        Mindbetter
      </Text>
    </Box>
  );
}
