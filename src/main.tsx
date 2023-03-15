// entry point of the react app that powers the extension pop-up
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, Input, Text } from './components'
import { floppy, sword } from './icons'
import { GlobalStyles } from './style'

const TitleBar = () => {
  return <>
    <Group padding='0'>
      <img style={{ width: "25px", marginRight: "10px" }} src={sword} />
      <Text size="xl" margin="0">Excalistore</Text>
      <img style={{ width: "35px", marginLeft: "10px" }} src={floppy} />
    </Group>
    <Group margin='0' padding='0' >
      <Text size="s" margin="0">The Excalidraw drawings manager</Text>
    </Group>
  </>
}

const DrawingItem = ({ name, date }: { name: string, date: string }) => {
  const ItemContainer = styled.div`
    border: 1px solid black;
    padding: 0px 10px;
  `;
  return <ItemContainer>
    <Text margin="4px 5px" size='s'>{name}</Text>
    <Group justifyContent="space-between">
      <Group maxHeight={30}>
        <Button>Open</Button>
        <Button>Update</Button>
        <Button>Bin it</Button>
      </Group>
      <Text size='s' margin="5px 0px">{date}</Text>
    </Group>
  </ItemContainer>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <TitleBar />
    <Group margin="25px 0 25px 0">
      <Input style={{ minWidth: "320px" }} placeholder='drawing title'></Input>
      <Button>Save drawing</Button>
    </Group>
    <Group margin='0px 0px 5px 0'>
      <Text size='l'>My drawings</Text>
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