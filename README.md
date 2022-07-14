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
| items               | Collection of menu items. Please refer [Menu item model](#menu-item-model)                                                                                                 | []         |

## Theme

Use the theme object to customize the colors of the different elements of the menu.

| name                   | description                                        | default |
| :--------------------- | :------------------------------------------------- | :------ |
| menuBackgroundColor    | background color of the menu                       | #FFFFFF |
| menuItemHoverColor     | background color of the menu item when its hovered | #318CE7 |
| menuItemHoverTextColor | Text color of the menu item when its hovered       | #fff    |
| primary                | Primary color or the predominant color of the menu | #318CE7 |
| secondary              | Secondary color of the menu                        | #FFFFFF |

```jsx

import {Menu} from 'react-float-menu';

<Menu
  startPosition="top right"
  theme={{
    menuBackgroundColor: "#FFFFFF",
    menuItemHoverColor: "#318CE7",
    menuItemHoverTextColor: "#fff",
    primary: "#318CE7",
    secondary: "#FFFFFF",
  }}
/>

```

## Menu item model

Menu item model represents the individual menu item and its properties

| name     | description                                                                                        |
| :------- | :------------------------------------------------------------------------------------------------- |
| name     | Label of the menu item                                                                             |
| id       | Unique id of the menu item. This is optional as the ids are automatically generated by the library |
| icon     | Use this prop to display a icon for the menu item                                                  |
| selected | This is an internal prop that is set to true when the menu item is selected                        |


## 🧪 Tests

We use [cypress](https://docs.cypresshq.com/guides/guides/introduction/getting-started/) to test the library.

To run the tests, run the following command in the root directory of the project.

```bash
  pnpm install
  pnpm run cypress:open
```

## 🤝 Contributing

1. [Fork it](https://github.com/prabhuignoto/react-float-menu/fork)
2. Create your feature branch (git checkout -b new-feature)
3. Commit your changes (git commit -am 'Add feature')
4. Push to the branch (git push origin new-feature)
5. Create a new Pull Request

Check out the [contributing guide](/CONTRIBUTING.md) for more details.

## Meta

Distributed under the MIT license. See `LICENSE` for more information.

Prabhu Murthy – [@prabhumurthy2](https://twitter.com/prabhumurthy2) – prabhu.m.murthy@gmail.com
[https://github.com/prabhuignoto](https://github.com/prabhuignoto)

