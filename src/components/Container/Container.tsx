import { Container as MuiContainer } from '@mui/material';

const Container = (props: any) => {
  const { children } = props;
  return (
    <MuiContainer maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </MuiContainer>
  );
};

export default Container;
