import styled from "@emotion/styled";
import { Button, Text, Group } from "./base";

type DrawingItemProps = {
  name: string;
  date: string;
  onOpen?: () => void;
  onDelete?: () => void;
};

export const DrawingItem = (props: DrawingItemProps) => {
  const { name, date, onOpen, onDelete } = props;
  const ItemContainer = styled.div`
    border: 1px solid black;
    padding: 0px 10px;
    background-color: #e8e8e8;
  `;
  return (
    <ItemContainer>
      <Text margin="5px" size="s">
        {name}
      </Text>
      <Group
        margin="0px 0px 5px 0px"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Group maxHeight={30}>
          <Button onClick={onOpen} color="green">
            Open
          </Button>
          {/* TODO: replace the below with a rename */}
          {/* <Button onClick={onUpdate} color='orange'>Rename</Button> */}
          <Button onClick={onDelete} color="red">
            Bin it
          </Button>
        </Group>
        <Text size="s" margin="0px">
          {date}
        </Text>
      </Group>
    </ItemContainer>
  );
};
