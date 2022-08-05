import React from "react";
import {
  CopyIcon,
  EditIcon,
  FileIcon,
  LogoutIcon,
  PlusIcon,
  SaveIcon,
} from "./icons";
import { Menu } from "./react-float-menu";

function App() {
  return (
    <div className="App">
      <Menu
        dimension={35}
        iconSize="1.25rem"
        items={[
          { icon: <FileIcon />, name: "File" },
          {
            icon: <EditIcon />,
            items: [
              { items: [{ name: "Cut 1" }, { name: "Cut 2" }], name: "Cut" },
              { name: "Select All" },
            ],
            name: "Edit",
          },
          { icon: <PlusIcon />, name: "Add" },
          {
            icon: <CopyIcon />,
            items: [
              { icon: <CopyIcon />, name: "Copy from clipboard" },
              { icon: <CopyIcon />, name: "Copy selection" },
            ],
            name: "Copy",
          },
          { icon: <SaveIcon />, name: "Save" },
          { icon: <LogoutIcon />, name: "Logout" },
        ]}
        shape="square"
        startPosition="top left"
        width={250}
        onSelect={(val) => console.log(val)}
      >
        <PlusIcon />
      </Menu>
    </div>
  );
}

export default App;
