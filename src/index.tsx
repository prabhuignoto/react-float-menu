import React from "react";
import { render } from "react-dom";
import Main from "./components/Main";

const Application = () => (
  <div>
    <Main
      items={[
        { id: 12, name: "prabhu" },
        { id: 22, name: "ramya" },
        { id: 13, name: "murthy" },
        { id: 11, name: "prdasdd" },
      ]}
    >
      Menu
    </Main>
  </div>
);

render(<Application />, document.getElementById("root"));
