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
        disableHeader
        dimension={40}
        iconSize={"1.25rem"}
        icons={[
          <FileIcon key="file" />,
          <EditIcon key="edit" />,
          <CopyIcon key="copy" />,
          <SaveIcon key="save" />,
          <LogoutIcon key="logout" />,
        ]}
        items={[
          { name: "File" },
          {
            children: [
              { children: [{ name: "Cut 1" }, { name: "Cut 2" }], name: "Cut" },
              { name: "Select All" },
            ],
            name: "Edit",
          },
          {
            children: [
              { name: "Copy from clipboard" },
              { name: "Copy selection" },
            ],
            name: "Copy",
          },
          { name: "Save" },
          { name: "Logout" },
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
