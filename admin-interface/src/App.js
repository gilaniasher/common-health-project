import React, { useRef } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import './App.css'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 4%;
`

const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 5%;
  width: 100%;
  align-items: center;
`

const FormTitle = styled.span`
  align-self: flex-start;
  font-size: 20px;
  padding-bottom: 2%;
`

const FormRow = styled.div`
  display: flex;
  padding-top: 2%;
  padding-bottom: 2%;
`

const createRow = (id, name, kitsDesired) => {
  return { id, name, kitsDesired }
}

const assignKitRows = [
  createRow(1, 'Asher Gilani', 200),
  createRow(2, 'Mr Cool Guy', 10),
]

const counties = [
  'Morris', 'Bergen', 'Middlesex', 'Essex/Passaic Union'
]

const App = () => {
  const state = {
    scheduleRounds: { roundNum: useRef(), startDate: useRef(), endDate: useRef() },
    scheduleKitDates: { roundNum: useRef(), county: useRef(), kitDropoff: useRef(), kitPickup: useRef() },
    assignKits: []
  }

  const scheduleRounds = () => {
    console.log('scheduling rounds', JSON.stringify({
      'roundNum': state.scheduleRounds.roundNum.current.value,
      'startDate': state.scheduleRounds.startDate.current.value,
      'endDate': state.scheduleRounds.endDate.current.value
    }, null, 2))

  }

  const scheduleKitDates = () => {
    console.log('scheduling kit dates', JSON.stringify({
      'roundNum': state.scheduleKitDates.roundNum.current.value,
      'county': state.scheduleKitDates.county.current.value,
      'kitDropoffDate': state.scheduleKitDates.kitDropoff.current.value,
      'kitPickupDate': state.scheduleKitDates.kitPickup.current.value
    }, null, 2))
  }

  const assignKits = () => {
    console.log('assigning kits', JSON.stringify(state.assignKits))
  }

  return (
    <Container>
      <span>CHP Admin Interface</span>

      <FormContainer>
        <FormTitle>Schedule Rounds</FormTitle>

        <FormRow>
          <TextField label='Round #' variant='filled' inputRef={state.scheduleRounds.roundNum} />
          <TextField label='Start Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleRounds.startDate} />
          <TextField label='End Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleRounds.endDate} />
        </FormRow>

        <Button size='large' color='primary' onClick={scheduleRounds}>
          Submit
        </Button>
      </FormContainer>

      <FormContainer>
        <FormTitle>Schedule Kit Dropoff/Pickup Dates</FormTitle>

        <FormRow>
          <TextField label='Round #' variant='filled' inputRef={state.scheduleKitDates.roundNum} />

          <TextField label='County' select variant='filled' defaultValue='Morris' inputRef={state.scheduleKitDates.county} >
            {counties.map(option =>
              <MenuItem key={option} value={option}>{option}</MenuItem>)
            }
          </TextField>

          <TextField label='Kit Dropoff Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleKitDates.kitDropoff} />
          <TextField label='Kit Pickup Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleKitDates.kitPickup} />
        </FormRow>

        <Button size='large' color='primary' onClick={scheduleKitDates} >
          Submit
        </Button>
      </FormContainer>

      <FormContainer>
        <FormTitle>Assign Kits for Next Round</FormTitle>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Kits Desired</TableCell>
              <TableCell>Num Kits to Assign</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assignKitRows.map((row) => (
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.kitsDesired}</TableCell>
                <TableCell><TextField label='Num Kits to Assign' /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button size='large' color='primary' onClick={assignKits}>
          Submit
        </Button>
      </FormContainer>
    </Container>
  )
}

export default App
