import { Text } from "@chakra-ui/layout";
import Delta, { AttributeMap, Op } from "quill-delta";
import deltafile from "../../firestore-mock/test-data/featured-projects-delta.json";
import {
  Box,
  Divider,
  HStack,
  Link,
  ListItem,
  Spacer,
  UnorderedList,
} from "@chakra-ui/react";
import { HeaderItem, ProfileContentTOC } from "./profile-content-toc";
import { useEffect, useRef, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import "../scss/profile.scss";

function hasKeySetToTrue(attributeMap: AttributeMap, key: string): boolean {
  return key in attributeMap && attributeMap[key] === true;
}

function hasKeySetToValue(attributeMap: AttributeMap, key: string): boolean {
  return key in attributeMap && typeof attributeMap[key] === "string";
}

function getRawTextLine(line: Delta): string {
  return line
    .filter((op) => typeof op.insert === "string")
    .map((op) => op.insert)
    .join("");
}

export const ProfileContent: React.FC = () => {
  // temporary usage, should be retrieved from firebase
  const sample2: Op[] = deltafile;
  const sampleDelta: Delta = new Delta(sample2);

  // handle updates to section in view when scrolling
  const [targetId, setTargetId] = useState(0);
  const tryUpdateHeaderInView = (inView: boolean, id: number) => {
    if (inView) {
      console.log("Detected new section in view, id:", id);
      setTargetId(id);
    }
  };

  // container for holding bullet list items
  const bulletListItems: JSX.Element[] = [];

  // container for building the side bar contents view
  const tOCItems: HeaderItem[] = [];

  // generate the content dynamically, line by line using delta format.
  const renderText = (line: Delta, attributes: AttributeMap, index: number) => {
    let jsxRender: JSX.Element | undefined;
    let isBulletList: boolean = false;

    const renderedLine = parseFormattedLine(line);

    if (attributes && attributes.list === "bullet") {
      // Handle bullet list items
      bulletListItems.push(renderedLine);
      isBulletList = true;
    } else if (attributes.header === 1) {
      tOCItems.push({
        header: getRawTextLine(line),
        id: index.toString(),
        subHeaders: [],
      });

      jsxRender = (
        <>
          {bulletListItems.length !== 0 && renderBulletItems(bulletListItems)}
          {index !== 0 && (
            <Divider
              mb={16}
              mt={16}
              borderWidth={1}
              borderColor="netural.secondary"
            />
          )}
          {/* <div className="horizontal-line"></div> */}
          <InView
            rootMargin="-40% 0% -60% 0%"
            onChange={(inView) => tryUpdateHeaderInView(inView, index)}
          >
            <Text id={index.toString()} textStyle="title.lg-bold" mb={4}>
              {renderedLine}
            </Text>
          </InView>
        </>
      );
    } else if (attributes.header === 2) {
      const mainHeader = tOCItems.at(-1);
      if (mainHeader !== undefined) {
        mainHeader.subHeaders?.push({
          header: getRawTextLine(line),
          id: index.toString(),
        });
      }

      jsxRender = (
        <>
          {bulletListItems.length != 0 && renderBulletItems(bulletListItems)}
          <Text id={index.toString()} textStyle="title.md">
            {renderedLine}
          </Text>
        </>
      );
    } else {
      jsxRender = (
        <>
          {bulletListItems.length != 0 && renderBulletItems(bulletListItems)}
          <Text mt={4} mb={4} textStyle="label.lg">
            {renderedLine}
          </Text>
        </>
      );
    }

    if (!isBulletList) {
      bulletListItems.length = 0;
    }

    return jsxRender;
  };

  const renderBulletItems = (bulletListItems: JSX.Element[]) => {
    return (
      <UnorderedList ml={8} spacing={2}>
        {bulletListItems.map((item, idx) => (
          <ListItem key={idx}>{item}</ListItem>
        ))}
      </UnorderedList>
    );
  };

  const parseFormattedLine = (line: Delta): JSX.Element => {
    let elements: JSX.Element[] = line.ops.map(
      (textDelta: Op, _idx: number) => {
        let text: string | undefined = undefined;

        if (typeof textDelta.insert === "string") {
          text = textDelta.insert.replace("\\n", "\\n\\n").trim();
        }

        if (textDelta.attributes === undefined) {
          return <Text>{text}</Text>;
        }

        const isBold = hasKeySetToTrue(textDelta.attributes, "bold");
        const isItalic = hasKeySetToTrue(textDelta.attributes, "italic");
        const isLink = hasKeySetToValue(textDelta.attributes, "link");

        if (isLink) {
          const linkUrl: string =
            textDelta.attributes["link"]?.toString() ?? "";
          return (
            <Link href={linkUrl} isExternal>
              {text}
            </Link>
          );
        }

        return (
          <Text
            fontWeight={isBold ? "bold" : "normal"}
            fontStyle={isItalic ? "italic" : "normal"}
          >
            {text}
          </Text>
        );
      }
    );

    return (
      <HStack>
        {elements.map((item) => {
          return item;
        })}
      </HStack>
    );
  };

  const renderDelta = (delta: Delta) => {
    const renderedContent: React.ReactNode[] = [];

    // parse into sections based on header 1
    // then parse into sub sections based on header 2
    // then parse into lines?

    delta.eachLine((line: Delta, attributes: AttributeMap, i: number) => {
      renderedContent.push(renderText(line, attributes, i));
    });

    return renderedContent;
  };

  return (
    <HStack mt={8} spacing="4%" align="start">
      <Box
        width="25%"
        textAlign="left"
        style={{
          position: "sticky",
          top: 200,
          zIndex: 1,
        }}
      >
        <ProfileContentTOC
          tOCItems={tOCItems}
          headerInView={targetId}
          updateHeaderInView={(id: number) => setTargetId(id)}
        />
      </Box>
      <Spacer />
      <Box width="70%" textAlign="left">
        {renderDelta(sampleDelta)}
      </Box>
    </HStack>
  );
};
