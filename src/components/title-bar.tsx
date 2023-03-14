import styled from "@emotion/styled";
import { floppy, sword } from "../icons";

export const Title = styled.h1`
font-family: virgil;
font-weight: bolder;
font-size: 2.em;
margin: 2px;
text-align: center;
`

export const TitleBar = () => {
    return <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px", paddingTop: "5px" }}>
        <img style={{ width: "25px", marginRight: "10px" }} src={sword} />
        <Title>Excalistore</Title>
        <img style={{ width: "35px", marginLeft: "10px" }} src={floppy} />
    </div>
}