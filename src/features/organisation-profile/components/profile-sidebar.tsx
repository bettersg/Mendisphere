import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text } from "@chakra-ui/react";

export interface Header {
  id: string;
  text: string;
  subHeaders: Header[];
}

export const ProfileSidebar: React.FC<{ headers: Header[] }> = ({
  headers,
}) => {
  // Note: Use this mock data to test nested headers
  // const testHeaders = [
  //   {
  //     id: 'header-0', text: 'Circles of Resilience', subHeaders: [
  //       {
  //         id: 'subheader-0', text: 'What is Circles of Resilience?', subHeaders: [
  //           { id: 'subheader-1', text: 'What to expect from being part of Circles of Resilience?', subHeaders: [] },
  //           { id: 'subheader-2', text: 'Who should join Circles of Resilience?', subHeaders: [] },
  //         ]
  //       },
  //     ]
  //   },
  //   { id: 'header-1', text: 'Resilience Education', subHeaders: [] },
  //   { id: 'header-2', text: 'Human Library Education', subHeaders: [] },
  // ];


  return (
    <Accordion allowMultiple position='sticky' top={120} zIndex={100}>
      {headers.map((header) =>
        header.subHeaders.length > 0 ?
          // Allow nesting of up to 3 layers of headers
          <AccordionItem key={header.id}>
            <AccordionButton py={4} px={0}>
              <Box as='span' flex='1' textAlign='left' fontSize={18} fontWeight={700}>
                {header.text}
              </Box>
              <AccordionIcon boxSize={8} />
            </AccordionButton>
            <AccordionPanel pt={0} pb={4}>
              <Flex>
                <Box>
                  {header.subHeaders.map((l1subHeader) =>
                    <>
                      <Box pb={2}>
                        <Text key={l1subHeader.id} fontSize='sm' as='b'>
                          <a href={`#${l1subHeader.id}`}>{l1subHeader.text}</a>
                        </Text>
                      </Box>
                      {l1subHeader.subHeaders.map((l2subHeader) =>
                        <Box pb={2}>
                          <Text key={l2subHeader.id} fontSize='sm'>
                            <a href={`#${l2subHeader.id}`}>{l2subHeader.text}</a>
                          </Text>
                        </Box>)
                      }
                    </>
                  )}
                </Box>
                <Box w={8} />
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          :
          <AccordionItem
            key={header.id}
            fontSize={18}
            fontWeight={700}
            py={4}
          >
            <a href={`#${header.id}`}>
              {header.text}
            </a>
          </AccordionItem>
      )}
    </Accordion>
  );
};
