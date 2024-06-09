const Container = (props: any) => {
  const { Children } = props;
  return (
    <Container maxW="1440px" centerContent margin="auto">
      {Children}
    </Container>
  );
};

export default Container;
