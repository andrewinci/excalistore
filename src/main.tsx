// entry point of the react app that powers the extension pop-up
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, Input, TitleBar, Text } from './components'
import { GlobalStyles } from './style'

const DrawingItem = ({ name, date }: { name: string, date: string }) => {
  const ItemContainer = styled.div`
    border: 1px solid black;
    padding: 0px 10px;
  `;
  return <ItemContainer>
    <Text margin={10} size='s'>{name}</Text>
    <Group justifyContent="space-between">
      <Group maxHeight={30}>
        <Button>Open</Button>
        <Button>Update</Button>
        <Button>Bin it</Button>
      </Group>
      <Text size='s' margin={5}>{date}</Text>
    </Group>
  </ItemContainer>
}

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
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
      <DrawingItem name="My awesome drawing" date='01/01/2023' />
    </div>

  </React.StrictMode>,
)