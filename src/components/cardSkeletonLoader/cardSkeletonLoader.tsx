import {
  Card,
  CardBody,
  Heading,
  Skeleton,
  Stack,
  Box,
} from "@chakra-ui/react";
import "./style.scss";
import { colors } from "../../theme/colours";

interface ICardSkeletonLoader {
  loopCount?: number;
}

const CardSkeletonLoader = (props: ICardSkeletonLoader) => {
  const { loopCount = 4 } = props;
  const startColor = colors.skeleton.startColor;
  const endColor = colors.skeleton.endColor;
  const skeletonTextHeight = "16px";

  return (
    <>
      {Array(loopCount)
        .fill(0)
        .map((_, index) => (
          <Card
            className="card-skeleton"
            maxW="sm"
            paddingBottom={10}
            w={80}
            backgroundColor={colors.neutral.surface}
            key={index}
          >
            <CardBody>
              <Box w={"200px"} height={"200px"}></Box>
              <Stack mt="6" spacing="3">
                <Heading size="md" marginBottom={5}>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="80%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Heading>
                <Skeleton
                  height={skeletonTextHeight}
                  startColor={startColor}
                  endColor={endColor}
                />
                <Skeleton
                  height={skeletonTextHeight}
                  startColor={startColor}
                  endColor={endColor}
                />
                <Skeleton
                  height={skeletonTextHeight}
                  w="60%"
                  startColor={startColor}
                  endColor={endColor}
                />
              </Stack>
            </CardBody>
          </Card>
        ))}
    </>
  );
};

export default CardSkeletonLoader;
