import { Button } from "@chakra-ui/button";
import { Spacer, VStack, Text, Box, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState("");
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }], // Add the "list" option to the toolbar
        ["image"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "image",
  ];

  return (
    <HStack>
      <Box w="30vw" height="50vh">
        <ReactQuill
          style={{ width: "100%", height: "100%" }}
          value={editorValue}
          onChange={handleEditorChange}
          //   modules={modules}
          //   formats={formats}
        />
      </Box>
      <Spacer />
      <Box w="30vw" border="1px" height="50vh" overflowY="auto">
        <Text>{editorValue}</Text>
      </Box>
    </HStack>
  );
};
