// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, Input, TitleBar } from './components'
import { GlobalStyles } from './style'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <TitleBar />
    <Group style={{ marginTop: "10px" }}>
      <Input style={{ minWidth: "320px" }} placeholder='drawing title'></Input>
      <Button>Save drawing</Button>
    </Group>
    <Group>
      <h2 style={{ fontSize: "23px", marginBottom: "5px" }}>My drawings</h2>
    </Group>
    <div style={{ maxHeight: "245px", minHeight: "245px", overflow: "scroll", border: "2px solid black", borderRadius: "4px" }}>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
      <Group>
        <h3 style={{ fontSize: "23px" }}>Drawing 1</h3>
      </Group>
    </div>

  </React.StrictMode>,
)