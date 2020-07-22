import React from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
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

const App = () => {
  return (
    <Container>
      <span>CHP Admin Interface</span>

      <FormContainer>
        <FormTitle>Schedule Rounds</FormTitle>

        <FormRow>
          <TextField label='Round #' variant='filled' />
          <TextField label='Start Date' variant='filled' />
          <TextField label='End Date' variant='filled' />
        </FormRow>

        <Button size='large' color='primary'>
          Submit
        </Button>
      </FormContainer>

      <FormContainer>
        <FormTitle>Schedule Kit Dropoff/Pickup Dates</FormTitle>

        <FormRow>
          <TextField label='Round #' variant='filled' />
          <TextField label='County' variant='filled' />
          <TextField label='Kit Dropoff Date' variant='filled' />
          <TextField label='Kit Pickup Date' variant='filled' />
        </FormRow>

        <Button size='large' color='primary'>
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

        <Button size='large' color='primary'>
          Submit
        </Button>
      </FormContainer>
    </Container>
  )
}

export default App
