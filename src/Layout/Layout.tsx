import { ReactNode } from "react";
import { Box } from '@mui/material';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 'calc(100vw - 2rem)',
      height: 'calc(100vh - 2rem)',
      overflow: 'auto',
      padding: '1rem',
      bgcolor: 'background.default',
    }}>
      {children}
    </Box>
  );
};

export default Layout;
