import { Box, Collapse, List, ListItem } from "@chakra-ui/react";

export interface Header {
  id: string;
  text: string;
  subHeaders: Header[];
}

export const ProfileSidebar: React.FC<{ headers: Header[] }> = ({
  headers,
}) => {
  console.log(headers);
  return (
    <List>
      {headers.map((header) => (
        <ListItem key={header.id}>
          <a href={`#${header.id}`}>{header.text}</a>
          {header.subHeaders.length > 0 && (
            <List ml="4">
              {header.subHeaders.map((subHeader) => (
                <ListItem key={subHeader.id}>
                  <a href={`#${subHeader.id}`}>{subHeader.text}</a>
                </ListItem>
              ))}
            </List>
          )}
        </ListItem>
      ))}
    </List>
  );
};
