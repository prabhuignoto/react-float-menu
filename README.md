# react-float-menu

![minzip](https://img.shields.io/bundlephobia/minzip/react-float-menu)
![npm](https://img.shields.io/npm/v/react-float-menu)
![NPM](https://img.shields.io/npm/l/react-float-menu)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/prabhuignoto/react-float-menu)
[![Depfu](https://badges.depfu.com/badges/f3de8a5fe036234eef1005ea21f8af17/overview.svg)](https://depfu.com/github/prabhuignoto/react-float-menu?project_id=36049)

## Features

- ⚡ Configurable and smart floating menu for react
- ⚙️ Comes with a lot of options to customize the  behavior of the menu
- 🎨 Customize colors with ease
- 📱 Seamless support for mobile and desktop
- 💪 Built with Typescript

## 📦 Installation

Install the package with `npm` or `yarn`.

```bash
npm install react-float-menu

yarn add react-float-menuṀ88amp

## 🚀 Getting started

```jsx
  <Menu
    dimension={40}
    items={[
      { icon: <FileIcon />, name: "File" },
      {
        children: [
          { children: [{ name: "Cut 1" }, { name: "Cut 2" }], name: "Cut" },
          { name: "Select All" },
        ],
        icon: <EditIcon />,
        name: "Edit",
      },
      { icon: <PlusIcon />, name: "Add" },
      {
        children: [
          { icon: <CopyIcon />, name: "Copy from clipboard" },
          { icon: <CopyIcon />, name: "Copy selection" },
        ],
        icon: <CopyIcon />,
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
```

## Properties

| name                | description                                                                                                               | default    |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------ | :--------- |
| autoFlipMenu        | Flips the menu when the button is at the bottom of the screen and there is no space to display the menu                   | true       |
| bringMenuToFocus    | Automatically moves the menu and brings it to focus when the menu is activated from the left or right edge of the screen. | true       |
| closeOnClickOutside | closes the menu if you touch or click outside the menu.                                                                   | true       |
| dimension           | Sets the height and width of the button                                                                                   | 30         |
| iconSize            | Size of the menu item icons                                                                                               | "1rem"     |
| disableHeader       | Disables the header section of the menu.                                                                                  | false      |
| shape               | shape of the button. can be `square` or `circle`                                                                          | `circle`   |
| width               | Width of the menu                                                                                                         | 30         |
| startPosition       | Starting position of the button. can be `top left`,`top right`,`bottom left`,`bottom right`                               | `top left` |
| theme               | The Theme object is used to customize the colors of various elements.                                                     |            |
| items               | Collection of menu items.                                                                                                 | []         |
