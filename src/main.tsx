// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Title } from './components'
import { GlobalStyles } from './fonts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <Title>Hello!</Title>
    <Button>This is a test</Button>
  </React.StrictMode>,
)