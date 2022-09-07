import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Typography,
  Divider,
} from '@mui/material';

const drawerWidth = 240;

interface VSDrawerProps {
  pharmacists: {
    id: number;
    name: {
      first: string;
      last: string;
    };
  }[];
  pharmacistClickCallback: any;
  currentPharmacist: number;
}
export default function VSDrawer(props: VSDrawerProps): JSX.Element {
  const { pharmacists, pharmacistClickCallback, currentPharmacist } = props;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ padding: '1rem 0.5rem' }}>
          Pharmacists
        </Typography>
        <Divider />
        <List>
          {pharmacists.map((pharmacist, index) => (
            <ListItem key={pharmacist.id} disablePadding>
              <ListItemButton
                onClick={() => pharmacistClickCallback(pharmacist)}
                selected={pharmacist.id === currentPharmacist}
              >
                <ListItemText
                  primary={`${pharmacist.name.first} ${pharmacist.name.last}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button variant="contained" sx={{ margin: '1rem' }}>
        Log Out
      </Button>
    </Drawer>
  );
}
