import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Header(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        role="banner"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NimbleRx Take Home Project
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
