import { CopyIcon, EditIcon, FileIcon, LogoutIcon, SaveIcon } from "./icons";
import { Menu } from "./react-float-menu";

function App() {
  return (
    <div className="App">
      <Menu
        shape="circle"
        items={[
          { name: "File" },
          { name: "Edit" },
          { name: "Copy" },
          { name: "Save" },
          { name: "Logout" },
        ]}
        icons={[
          <FileIcon key="file" />,
          <EditIcon key="edit" />,
          <CopyIcon key="copy" />,
          <SaveIcon key="save" />,
          <LogoutIcon key="logout" />,
        ]}
        iconSize={"1.25rem"}
        startPosition="top right"
      />
    </div>
  );
}

export default App;
