import { Box, Flex, Skeleton } from "@chakra-ui/react";
import CardSkeletonLoader from "../../components/cardSkeletonLoader";
import { colors } from "../../theme/colours";

const CardViewLoadingScreen = () => {
  const startColor = colors.skeleton.startColor;
  const endColor = colors.skeleton.endColor;
  const skeletonTextHeight = "20px";

  return (
    <>
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
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Skeleton
            height={skeletonTextHeight}
            width={60}
            startColor={startColor}
            endColor={endColor}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <Skeleton
                height={skeletonTextHeight}
                width={20}
                startColor={startColor}
                endColor={endColor}
              />
            </div>
            <div style={{ color: colors.neutral.inactive }}>|</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <Skeleton
                height={skeletonTextHeight}
                width={20}
                startColor={startColor}
                endColor={endColor}
              />
            </div>
          </div>
        </div>
      </Box>
      <Box
        className="page-width page-padding"
        display="flex"
        justifyContent="flex-end"
        marginBottom={5}
      >
        <Flex
          w="full"
          direction={"column"}
          alignItems="center"
          marginBottom={12}
        >
          <Flex
            w="full"
            direction={"row"}
            alignItems="center"
            paddingBottom="60px"
            paddingTop="60px"
            gap={5}
          >
            <CardSkeletonLoader loopCount={4} />
          </Flex>
          <Skeleton
            height={skeletonTextHeight}
            w={40}
            startColor={startColor}
            endColor={endColor}
          />
        </Flex>
      </Box>
    </>
  );
};

export default CardViewLoadingScreen;
