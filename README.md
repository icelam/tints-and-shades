<h1 align="center">Tints and Shades</h1>

![Tints and Shades](./docs/key-visual-light.png)

<p align="center">
    A tints and shades generator built using Electron and LitElement.
</p>

<p align="center">
    <a href="https://www.electronjs.org/"><img height="20" src="https://img.shields.io/badge/made_with-Electron_10.1.0-2f3241.svg?logo=electron&logoColor=white" alt="Made with Electron"></a>
    <a href="https://www.typescriptlang.org/"><img height="20" src="https://img.shields.io/badge/built_with-TypeScript-007acc.svg?logo=typescript" alt="Built with TypeScript"></a>
    <a href="./LICENSE"><img height="20" src="https://img.shields.io/github/license/icelam/deno-wikipedia-cli?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABHddaYAAAC5UlEQVRIDd2WPWtVQRCGby5pVASLiGghQSxyG8Ui2KWwCfkH9olY2JneQkiR0oCIxH/gB+qVFDYBIWBAbAIRSbCRpLXwIxLiPT7vnNm9e87ZxJtUwYH3zO47Mzv7Mbv3tlo5KYriGtgAJ81OY1ENdG/YI4boFEOI911BXgY/pdtwGuAtXpvmB1tAXHDnUolE5urkPOQo6MqA3pXWmJJL4Bb4rQ7yEYfxsjnIF29NJIoNC6e5fxOL/qN+9KCz7AaLpN8zI415N2i2EptpGrkRIjGeAuvR6IY1hSFLFUOug9Ms2M7ZxIUNytm1mnME186sdI2BOCwAyQMg54ugzSmKmwbPwSbolKH+hbAtQdsOoF+BsF3anUVwBdiOWRidFZDKTTrKEAJTm3GVrGkHzw/uPZbyx7DNNLfB7KGmRsCcr+/gjaiPSpAOTyX9qG4L/XBDdWXDDf1M+wtQ5fwCOtcb4Dto6VpLmzByB6gqdHbTItGSJdAGqibJQhmRfCF7IN4beSF2G9CqnGXQrxofXU+EykllNeoczRgYytDKMubDIRK0g5MF8rE69cGu0u9nlUcqaUZ41W0qK2nGcSzr4D2wV9U9wxp1rnpxn8agXAOHMQ9cy9kbHM7ngY4gFb03TxrO/yfBUifTtXt78jCrjY/jgEFnMn45LuNWUtknuu7NSm7D3QEn3HbatV1Q2jvgIRf1sfODKQaeymxZoMLlTqsq1LF+HvaTqQOzEzUCfni0/eNIA+DfuE3KEtbsegckGmMktTXacnBHPVe687ugkpT+axCkkhBSyRSjWI2xf1KMMVmYiQdWksK9BEFiQoiYLIlvJA3/zeTzCejP0RbB6YPbhZuB+0pR3KcdX0LaJtju0ZgBL8Bd+sbz2QIaU2OfBX3BaQLsgZysQtrk0M8Sh1A0w3DyyYnGnAiZ4gqZ/TvI2A8OGd1YIbF7+F3P+B6dYpYdsJNZgrjO0UdOIhmom0nwL0pnfnzkL1803jAoKhvyAAAAAElFTkSuQmCC" alt="License"></a>
</p>

## Setup ##
Below shows some basic setup steps.

### Node version ###
This project is developed using Node.js 12. The version is already specified in the `.nvmrc` file. Suggest to run `nvm use` when you enter the project folder.

### Install packages need for the project ###
Install yarn packages in project root folder first using `yarn install`.

### To start the project ##
Run `yarn start` in project root folder.

### To build the app for distribution ###
Run `yarn package`  in the project root folder to create package for macOS, Linux and Windows. All the output files can be found in `./build-packages` folder.

To create package for each individual platforms:
* macOS: `yarn package:mac`
* Linux: `yarn package:linux`
* Windows: `yarn package:windows`

### To run unit tests ###
Run `yarn test` in the project root folder.

### To run linters ###
Run `yarn lint` in the project root folder to start a ESLint checking.  
Run `yarn lint:lit-analyzer` in the project root folder to run Lit Analyzer.

### To run web component analyzer ###
Run `analyze:web` in the project root folder.

### To update change log ###
Run `yarn release` in the project root folder.  
To skip bumping version number on first release, run `yarn first-release` in the project root folder

## To update alias ##
To add or modify any existing alias, please modify all the files listed below:
1. `.eslintrc`
2. `tsconfig.json`
3. `webpack/webpack.base.conf.js`
