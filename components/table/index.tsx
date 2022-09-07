import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableContainerProps,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

interface VSTableProps {
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
export default function VSTable(props: VSTableProps): JSX.Element {
  const { tasks } = props;
  const [data, setData] = useState(tasks);

  const VSTableContainer = styled(TableContainer)<TableContainerProps>({
    backgroundColor: 'white',
    width: '100%',
  });

  /**
   * Check for any data updates from parent component
   */
  useEffect(() => {
    if (tasks) {
      setData(tasks);
    }
  }, [tasks]);

  /**
   * Convert timestamp string to formatted string
   * @param ts timestamp in string format
   * @returns date and time in proper string format
   */
  const convertTimestamp = (ts: string) => {
    const date = new Date(ts);
    const result = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })}`;
    return result;
  };

  return (
    <>
      <VSTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Time Due</TableCell>
              <TableCell>Task Kind</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.patient.id}</TableCell>
                  <TableCell>{`${row.patient.name.first} ${row.patient.name.last}`}</TableCell>
                  <TableCell>{convertTimestamp(row.taskTs)}</TableCell>
                  <TableCell>{row.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </VSTableContainer>
    </>
  );
}
