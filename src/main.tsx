// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, TitleBar } from './components'
import { GlobalStyles } from './style'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <TitleBar />
    <Button>This is a test</Button>
  </React.StrictMode>,
)