import { floppy, sword } from "../icons";
import { Group } from "./container";

export const TitleBar = () => {
    return <>
        <Group style={{ paddingTop: "5px" }}>
            <img style={{ width: "25px", marginRight: "10px" }} src={sword} />
            <h1 style={{ margin: "2px", fontSize: "35px" }}>Excalistore</h1>
            <img style={{ width: "35px", marginLeft: "10px" }} src={floppy} />
        </Group>
        <Group style={{ marginTop: 0, paddingBottom: "15px", paddingTop: "0px" }}>
            <p style={{ margin: 0, fontSize: "18px" }} >The Excalidraw drawings manager</p>
        </Group>
    </>
}