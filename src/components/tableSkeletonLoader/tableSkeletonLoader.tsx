import {
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { colors } from "../../theme/colours";

interface ITableSkeletonLoader {
  loopCount?: number;
}

const TableSkeletonLoader = (props: ITableSkeletonLoader) => {
  const { loopCount = 4 } = props;
  const startColor = colors.skeleton.startColor;
  const endColor = colors.skeleton.endColor;
  const skeletonTextHeight = "16px";

  return (
    <TableContainer maxW="full" whiteSpace="normal">
      <Table variant="orgListings">
        <Thead>
          <Tr>
            <Th w="18%">
              <Skeleton
                height={skeletonTextHeight}
                width="70%"
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
            <Th w="28%">
              <Skeleton
                height={skeletonTextHeight}
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
            <Th w="15%">
              <Skeleton
                height={skeletonTextHeight}
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
            <Th w="16%">
              <Skeleton
                height={skeletonTextHeight}
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
            <Th w="16%">
              <Skeleton
                height={skeletonTextHeight}
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
            <Th w="16%">
              <Skeleton
                height={skeletonTextHeight}
                startColor={startColor}
                endColor={endColor}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array(loopCount)
            .fill(0)
            .map((_, index) => (
              <Tr
                key={index}
                verticalAlign="baseLine"
                _hover={{
                  background: "none !important",
                }}
              >
                <Td>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="100%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Td>
                <Td>
                  <Stack spacing="3">
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
                      width="60%"
                      startColor={startColor}
                      endColor={endColor}
                    />
                  </Stack>
                </Td>
                <Td>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="70%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Td>
                <Td>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="70%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Td>
                <Td>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="80%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Td>
                <Td>
                  <Skeleton
                    height={skeletonTextHeight}
                    width="60%"
                    startColor={startColor}
                    endColor={endColor}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeletonLoader;
