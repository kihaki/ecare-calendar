import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const monthLenghts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const startDayOfThreeWeekSprints = 19
const devIndexOnStartOfThreeWeeksSprint = 0

function daysSinceStartOfYear(date) {
  return monthLenghts.slice(0, date.getMonth()).reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
  ) + date.getDate()
}

function weekOfYear(date) {
  // the first day of the year is sunday
  return Math.ceil((daysSinceStartOfYear(date) - 1) / 7)
}

function workDaysSinceStartOfYear(date) {
    // the first two days of the year are saturday and sunday
    return daysSinceStartOfYear(date) - (weekOfYear(date) * 2)
}

function reviewCaptainIndex(date, devs, offset) {
  const daysSinceSoY = daysSinceStartOfYear(date)
  const daysSinceFirstThreeWeeksSprintChange = daysSinceSoY - startDayOfThreeWeekSprints
  const sprintsSinceThreeWeekSprints = Math.floor(daysSinceFirstThreeWeeksSprintChange / 21) + 1
  return (sprintsSinceThreeWeekSprints + devIndexOnStartOfThreeWeeksSprint + offset) % devs.length
}

function reviewCaptain(date, devs, offset) {
    return devs[reviewCaptainIndex(date, devs, offset)]
}

function prPoliceIndex(date, devs, offset) {
  return ((weekOfYear(date) + offset) - 2) % devs.length
}

function prPolice(date, devs, offset) {
  return devs[prPoliceIndex(date, devs, offset)]
}

function standupMasterIndex(date, devs, offset) {
  return ((workDaysSinceStartOfYear(date) + offset) - 1) % devs.length
}

function standupMaster(date, devs, offset) {
  return devs[standupMasterIndex(date, devs, offset)]
}

const ReviewCaptainEmoji = () => <>{String.fromCodePoint(0x1F440)}</>
const PRPoliceEmoji = () => <>{String.fromCodePoint(0x1F46E)}</>
const StandupMasterEmoji = () => <>{String.fromCodePoint(0x1F50A)}</>

export default function Developers({devs, date}) {
    const captain = reviewCaptain(date, devs, 5)
    const police = prPolice(date, devs, 5)
    const standup = standupMaster(date, devs, 5)
  return (
    <TableContainer component={Paper}>
      <Table /*</TableContainer>sx={{ minWidth: 650 }}*/ aria-label="simple table">
        <TableHead>
          {/* <TableRow>
            <TableCell>weekOfYear {weekOfYear(date)}, workDaysSinceStartOfYear {workDaysSinceStartOfYear(date)}, daysSinceStartOfYear {daysSinceStartOfYear(date)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>captain {reviewCaptainIndex(date, devs, 6)}, police {prPoliceIndex(date, devs, 4)}, standup {standupMasterIndex(date, devs, 6)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>captain {captain}, police {police}, standup {standup}</TableCell>
          </TableRow> */}
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
              <TableCell align="center">{dev == captain && <ReviewCaptainEmoji/>}</TableCell>
              <TableCell align="center">{dev == police && <PRPoliceEmoji/>}</TableCell>
              <TableCell align="center">{dev == standup && <StandupMasterEmoji/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}