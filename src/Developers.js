import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { weekOfYear, businessDaysSince2020, sprintsSince, dayOfYear } from './datemath.js';

const devMode = false
const lastSprintChange = new Date("2024-05-22") // Careful! Safari will not accept 2024-5-22, it HAS to be in Format 2024-05-22 (remember the zero). Chrome doesnt give a fuck lel.

function reviewCaptain(date, devs, offset) {
  const reviewCaptainDevIndex = (((sprintsSince(date, lastSprintChange) + offset) % devs.length) + devs.length) % devs.length;
  return devs[reviewCaptainDevIndex];
}

function prPolice(date, devs, offset) {
  const prPoliceDevIndex = (((weekOfYear(date) + offset) % devs.length) + devs.length) % devs.length;
  return devs[prPoliceDevIndex];
}

function standupMaster(date, devs, offset) {
  var standupMasterDevIndex = (((businessDaysSince2020(date) + offset) % devs.length) + devs.length) % devs.length;
  const currentDay = date.getDay()
  const currentDayIsWeekend = currentDay == 0 || currentDay == 6
  if(currentDayIsWeekend) {
    standupMasterDevIndex += 1; // On Weekends, show already the standup master for monday instead of friday
  }
  return devs[standupMasterDevIndex];
}

const ReviewCaptainEmoji = () => <>{String.fromCodePoint(0x1F37F)}</>
const PRPoliceEmoji = () => <>{String.fromCodePoint(0x1F46E)}</>
const StandupMasterEmoji = () => <>{String.fromCodePoint(0x1F50A)}</>

function DevValues({ devs, date }) {
  if (devMode) {
    return (<TableRow>
      <TableCell>Dev: weekOfYear {weekOfYear(date)}, businessDays {businessDaysSince2020(date)}, dayOfYear {dayOfYear(date)}, sprints since start date {sprintsSince(date, lastSprintChange)}</TableCell>
    </TableRow>)
  } else {
    return;
  }
}

export default function Developers({ devs, date }) {
  const captain = reviewCaptain(date, devs, -2);
  const police = prPolice(date, devs, 2);
  const standup = standupMaster(date, devs, 3);
  return (
    <TableContainer component={Paper}>
      <Table /*</TableContainer>sx={{ minWidth: 650 }}*/ aria-label="simple table">
        <TableHead>
          {
            DevValues({ devs, date })
          }

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
              <TableCell align="center">{dev == captain && <ReviewCaptainEmoji />}</TableCell>
              <TableCell align="center">{dev == police && <PRPoliceEmoji />}</TableCell>
              <TableCell align="center">{dev == standup && <StandupMasterEmoji />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}