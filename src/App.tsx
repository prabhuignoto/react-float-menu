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
          { name: "Edit" },
          { name: "Copy" },
          { name: "Save" },
          { name: "Logout" },
        ]}
        shape="square"
        startPosition="top right"
      >
        <PlusIcon />
      </Menu>
    </div>
  );
}

export default App;
