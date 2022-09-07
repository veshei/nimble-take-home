import { styled } from '@mui/system';
import { Box, BoxProps, Button, Typography } from '@mui/material';
import VSDrawer from '../../components/drawer';
import { useEffect, useState } from 'react';
import VSTable from '../../components/table';

interface HomeSectionProps {
  pharmacists: {
    id: number;
    name: {
      first: string;
      last: string;
    };
  }[];
  tasks: {
    id: number;
    pharmacist: {
      id: number;
      name: {
        first: string;
        last: string;
      };
    };
    patient: {
      id: number;
      name: {
        first: string;
        last: string;
      };
    };
    taskTs: string;
    type: string;
  }[];
}
export default function HomeSection(props: HomeSectionProps): JSX.Element {
  const { pharmacists, tasks } = props;
  const [currentPharmacistId, setCurrentPharmacistId] = useState(
    pharmacists[0].id
  );
  const [currentPharmacistName, setCurrentPharmacistName] = useState(
    `${pharmacists[0].name.first} ${pharmacists[0].name.last}`
  );

  /**
   * Function to return only the tasks for that pharmacist
   * @param id pharmacist id
   * @returns list of tasks for that pharmacist
   */
  const filterTasks = (id: number) => {
    const curr = tasks.filter((task) => task.pharmacist.id === id);
    return curr;
  };

  const [currentTasks, setCurrentTasks] = useState(filterTasks(0));

  /**
   * Callback function to trigger state change
   * in table and selected pharmacist
   * @param id current pharmacist ID
   */
  const pharmacistClickCallback = (pharmacist: {
    id: number;
    name: {
      first: string;
      last: string;
    };
  }) => {
    setCurrentPharmacistId(pharmacist.id);
    setCurrentTasks(filterTasks(pharmacist.id));
    setCurrentPharmacistName(
      `${pharmacist.name.first} ${pharmacist.name.last}`
    );
  };

  const Container = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '15rem',
    marginTop: '4rem',
    padding: '2.5rem 5rem',
  });

  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ fontSize: '32px', paddingBottom: '0.5rem', fontWeight: 500 }}
      >{`Pharmacist: ${currentPharmacistName}`}</Typography>
      <Typography variant="h2" sx={{ fontSize: '24px' }}>
        Tasks for Today:
      </Typography>
      <VSDrawer
        pharmacists={pharmacists}
        pharmacistClickCallback={pharmacistClickCallback}
        currentPharmacist={currentPharmacistId}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <VSTable tasks={currentTasks} />
      </Box>
    </Container>
  );
}
