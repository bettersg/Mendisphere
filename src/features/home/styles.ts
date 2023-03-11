const box1 = {
  backgroundColor: "#192873",
  paddingTop: 96,
  paddingBottom: 96,
  paddingLeft: 73,
  paddingRight: 120,
};

const whiteButton1 = {
  backgroundColor: "#FFFFFF",
  borderRadius: 4,
  height: 12,
  width: 171,
  marginTop: 8,
  fontSize: 12,
  color: "#3959FF",
  fontWeight: 700,
  "&:hover": {
    bg: "rgba(224, 229, 255, 0)",
    color: "#FFFFFF",
    border: "1px solid #FFFFFF",
  },
};
const whiteButton2 = {
  backgroundColor: "#FFFFFF",
  borderRadius: 4,
  height: 12,
  width: 335,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 96,
  "&:hover": {
    bg: "rgba(224, 229, 255, 0)",
    color: "black",
    border: "1px solid #192873",
  },
};

const headerLarge = {
  fontSize: 80,
  fontWeight: 700,
  paddingTop: 96,
  paddingBottom: 72,
  alignSelf: "center",
  textAlign: "center" as const,
};

const blueButton = {
  backgroundColor: "#192873",
  borderRadius: 4,
  height: 12,
  width: 335,
  fontSize: 14,
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
  "&:hover": {
    bg: "rgba(224, 229, 255, 0)",
    color: "black",
    border: "1px solid #192873",
  },
};

const headerSmall = {
  fontSize: 40,
  fontWeight: 400,
};

const imageContainer = {
  width: "70%",
  justifyContent: "space-between",
};

export const styles = {
  box1: box1,
  whiteButton1: whiteButton1,
  whiteButton2: whiteButton2,
  headerLarge: headerLarge,
  blueButton: blueButton,
  headerSmall: headerSmall,
  imageContainer: imageContainer,
};
