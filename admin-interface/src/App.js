import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import BeatLoader from 'react-spinners/BeatLoader'
import './App.css'
import Login from './Login'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { scheduleRounds, scheduleKitDates, assignKits, getUnassignedUsers } from './actions/AdminActions'

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

const LoadingForm = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const createRow = (id, name, kitsDesired) => {
  return { id, name, kitsDesired }
}

const counties = [
  'Morris', 'Bergen', 'Middlesex', 'Essex/Passaic', 'Union'
]

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [unassignedLoading, setUnassignedLoading] = useState(false)
  const [assignKitRows, setAssignKitRows] = useState([])

  const state = {
    scheduleRounds: { roundNum: useRef(), startDate: useRef(), endDate: useRef() },
    scheduleKitDates: { roundNum: useRef(), county: useRef(), kitDropoff: useRef(), kitPickup: useRef() },
    assignmentRoundNum: useRef(''),
    assignKits: {}
  }

  const initScheduleRounds = () => {
    const params = {
      'roundNum': state.scheduleRounds.roundNum.current.value,
      'startDate': state.scheduleRounds.startDate.current.value,
      'endDate': state.scheduleRounds.endDate.current.value
    }

    console.log('scheduling rounds', JSON.stringify(params, null, 2))
    scheduleRounds(params)
  }

  const initScheduleKitDates = () => {
    const params = {
      'roundNum': state.scheduleKitDates.roundNum.current.value,
      'county': state.scheduleKitDates.county.current.value,
      'kitDropoffDate': state.scheduleKitDates.kitDropoff.current.value,
      'kitPickupDate': state.scheduleKitDates.kitPickup.current.value
    }

    console.log('scheduling kit dates', JSON.stringify(params, null, 2))
    scheduleKitDates(params)
  }

  const initAssignKits = () => {
    console.log('Assigning kits')
    let roundNum = ''
    let params = {}

    if (state.assignmentRoundNum.current !== '')
      roundNum = state.assignmentRoundNum.current.value

    for (const id in state.assignKits) {
      if (state.assignKits[id].value !== '') {
        params[id] = state.assignKits[id].value + '0'
      }
    }

    console.log(JSON.stringify(params, null, 2))

    if (Object.keys(params).length !== 0) {
      assignKits(params, roundNum).then(() => {
        initGetUnassignedUsers()
      })
    }
  }

  const initGetUnassignedUsers = () => {
    setUnassignedLoading(true)
    let roundNum = ''

    if (state.assignmentRoundNum.current !== '')
      roundNum = state.assignmentRoundNum.current.value

    getUnassignedUsers(roundNum).then((unassigned) => {
      const newAssignKitRows = unassigned.map(user => createRow(user[0], user[1], user[2]))
      state.assignKits = {}
      setAssignKitRows(newAssignKitRows)
      setUnassignedLoading(false)
    })
  }

  useEffect(() => {
    // Load in unassigned constructors into the bottom table
    if (loggedIn) {
      initGetUnassignedUsers()
    }
  }, [loggedIn])

  return (
    loggedIn ?
      <Container>
        <span>CHP Admin Interface</span>

        <FormContainer>
          <FormTitle>Schedule Rounds</FormTitle>

          <FormRow>
            <TextField label='Round #' variant='filled' inputRef={state.scheduleRounds.roundNum} />
            <TextField label='Start Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleRounds.startDate} />
            <TextField label='End Date' variant='filled' type='date' defaultValue='2020-07-25' inputRef={state.scheduleRounds.endDate} />
          </FormRow>

          <Button size='large' color='primary' onClick={initScheduleRounds}>
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

          <Button size='large' color='primary' onClick={initScheduleKitDates} >
            Submit
          </Button>
        </FormContainer>

        <FormContainer>
          <LoadingForm>
            <FormTitle>Assign Kits for Round</FormTitle>
            <TextField label='Round Number' inputRef={state.assignmentRoundNum} style={{ marginLeft: '2%', marginTop: '-1.5%' }} />
            <Button size='large' color='primary' onClick={initGetUnassignedUsers}>Go</Button>
            <BeatLoader
              size={20}
              color='#123abc'
              loading={unassignedLoading}
            />
          </LoadingForm>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Kits Desired</TableCell>
                <TableCell>Num Kits to Assign (Entries can be left blank)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assignKitRows.map((row) => (
                <TableRow>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.kitsDesired}</TableCell>
                  <TableCell><TextField label='Num Kits to Assign' inputRef={(c) => { state.assignKits[row.id] = c }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button size='large' color='primary' onClick={initAssignKits}>
            Submit
          </Button>
        </FormContainer>
      </Container>
    :
      <Login setLoggedIn={setLoggedIn} loading={loading} setLoading={setLoading} />
  )
}

export default App
