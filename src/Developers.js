import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ReviewCaptainEmoji = () => <>{String.fromCodePoint(0x1F440)}</>
const PRPoliceEmoji = () => <>{String.fromCodePoint(0x1F46E)}</>
const StandupMasterEmoji = () => <>{String.fromCodePoint(0x1F50A)}</>

export default function Developers({devs, date}) {
    const reviewCaptain = date.reviewCaptain(devs, 6)
    const prPolice= date.prPolice(devs, 4)
    const standupMaster = date.standupMaster(devs, 4)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Developers</TableCell>
            <TableCell align="center">Review Captain</TableCell>
            <TableCell align="center">PR Police</TableCell>
            <TableCell align="center">Standup Master</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devs.map((dev) => (
            <TableRow
              key={dev}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {dev}
              </TableCell>
              <TableCell align="center">{dev == reviewCaptain && <ReviewCaptainEmoji/>}</TableCell>
              <TableCell align="center">{dev == prPolice && <PRPoliceEmoji/>}</TableCell>
              <TableCell align="center">{dev == standupMaster && <StandupMasterEmoji/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}