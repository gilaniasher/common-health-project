import React, { useRef } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { login } from './actions/AdminActions'

import PacmanLoader from 'react-spinners/PacmanLoader'
import { css } from '@emotion/core'

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
  padding: 3%;
  align-items: center;
`

const loader = css`
  margin-top: 3%;
  margin-right: 100px;
`

const Login = (props) => {
  const state = {
    username: useRef(''),
    password: useRef('')
  }

  const initLogin = () => {
    if (state.username.current.value === '' || state.password.current.value === '') {
      console.log('Username or password is empty')
    } else {
      props.setLoading(true)
      login(state.username.current.value, state.password.current.value, props.setLoggedIn, props.setLoading)
    }
  }

  return (
    <Container>
      <span>Login to CHP Admin Interface</span>

      <FormContainer>
        <TextField label='Username' variant='filled' inputRef={state.username} />
        <TextField label='Password' variant='filled' type='password' inputRef={state.password} />
      </FormContainer>

      <Button size='large' color='primary' onClick={initLogin}>
        Login
      </Button>

      <PacmanLoader
        css={loader}
        size={30}
        color='#123abc'
        loading={props.loading}
      />
    </Container>
  )
}

export default Login
