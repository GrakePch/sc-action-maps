# Star Citizen Keybinding Visualizer

A WIP react app that visualizes the complicated action maps of Star Citizen with icons.

![preview](./images/preview_230418.png)

A preview for the current build. This is not the final design. Only showing the default keybindings. Squares with texts are placeholders for the actions that do not have an icon, and will be assigned with an icon in the future updates.

Deployed at [grakep.ch/SC-Keybinding-Visualizer](https://grakep.ch/SC-Keybinding-Visualizer/)

## Video Demo

https://github.com/GrakePch/sc-action-maps/assets/21063261/fceb44ad-7a32-4ba0-a2bb-5eb2bb2b0af4

## Functionalities to be done

- [x] Showing available actions for each key on a standard keyboard.
- [x] Showing available actions for each key on a mouse.
- [ ] Showing available actions for each key on a controller.
- [ ] Showing available actions for each key on a joystick.
- [x] Uploading actionmaps.xml and show user's customized keybindings.
- [x] Allow user to edit priorities/visibility of action categories. 
- [x] Allow user to edit priorities/visibility of modifiers. 
- [ ] Editing priorities/visibility: Drag & drop for an easier experience.
- [ ] Saving user's setting and customized keybindings in local storage.
- [x] Hovering (or clicking) on keys to show detailed action info.
- [ ] Export to SVG or PNG for printing

## Icon sources

Icons under the directory **src/assets/icons/_mdi/** are from [Material Design Icons](https://pictogrammers.com/library/mdi/). Those icons are covered by Apache License 2.0. Some of the file names are changed.

Icons under the directory **src/assets/icons/_primitives/** are created and owned by Cloud Imperium Games (CIG). [[Link]](https://robertsspaceindustries.com/pledge/ships/gladius/Gladius#holo-viewer) Icons under other directories may use elements from icons created and owned by CIG. Those icons should not be used for profit.

Other icons under the directory **src/assets/icons/** are original works, which are covered by CC BY-NC-SA.
