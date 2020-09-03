<h1 align="center">Tints and Shades</h1>

![Tints and Shades](./docs/key-visual-light.png)

<p align="center">
    A tints and shades generator built using Electron and LitElement.
</p>

<p align="center">
    <a href="https://www.electronjs.org/"><img height="20" src="https://img.shields.io/badge/made_with-Electron_10.1.0-2f3241.svg?logo=electron&logoColor=white" alt="Made with Electron"></a>
    <a href="https://lit-element.polymer-project.org/"><img height="20" src="https://img.shields.io/badge/made_with-LitElement-2196f3.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAeCAYAAAC2Xen2AAAACXBIWXMAAAJfAAACXwG+hShaAAADKUlEQVRogc2az5WbMBDGv83bu+nATgUhFcQdrDsw7mA7iNOBOwiuIN5bbut0EHdg37I3fMxJedo38yKPBpAAI37vceCPBIw+fSMkHowxW4zLGUAZccccwArAEkAG4BMdvwL4TfUdARwAVF7p7hRO3fGY8TkaYxCwFcaYc8TTVcaY0hizCKy/bTtHPKu3fRhZrSHkpMTvAOYR5WYA1lT22TsbR0H3/kI9JR6v3e9PkwoKUl4TR9rarjsYYzLlHqFqZZqet3Z7FC3xBuDnHVS49o74FKRSyYU8+UBqdMnIfwtSl8sT+eMy0nsL0VNYtVFea5OXcfYvkYkllK/Odb+U7mWD80Op6xuA0ORq69w5yY15ofpDOSsWpD1zI1Pw2ExpTJvxP0cEFaQo6897cfwpwnOlWplor51CYHeUeJgrvYTs9qEUSnBtAy0Cyjc1ZNM5j9SBXSj+u+oRVMYG9+TszwICU6dWJkq1qQMrX3bfeUDuI7v/imynjhBFBqs2dWBlUhnyK/BISYeZKfdj2tTKBKs2ZWBz4a0nyshDIpNiXVBiGjTo2tSBdTl4V/RH1qklsFC1MkGqTRlY+ZJ9E5ZGRaMMRjYmOtpPa5kpzRUMOTPl4jbYTJyLVSvTqtopTsKMSZ9k2Vh2SoHV/G8I3DkEd2zbVa1Mo2pTBlaOV2sfsgfSU127aVRcILV1pAysTFb3CKwct3Jj9lUrU6valIGtRNec0wsPiayPh1+1SuuAWldqj92J/W3LZ2cMW6HKC/WSodTKqKpNHdiDGGfOlWB3IRdzwHCUpSqsJ16dqQNbKZMla6ULx5ArifFEn7dDq5XxVDuF4VYpJktASzRlB1vgJRQ5v8sN5SlrQG7qnso4diUSGZwV1xD1LqghXpWvq+c7eavkRrVyzesvgD9ekf64L1S3fpSR2uSaFSjxHGk7O9fzzxxaGcvGmeHS1rKG5v+7eYvGaZe/MzrfF7s0vhLL6mOxnOIPGxW1+EaMFmLYkzW4U4Zj/kb1fq+pTsKUFJyN4r0aVwroR/JS99P13t4qeffah1uLnSzsp9KbrW/axNQ0lzuGt94CvPwDYYpB/+NhnT0AAAAASUVORK5CYII=&logoColor=white" alt="Made with LitElement"></a>
    <a href="https://www.typescriptlang.org/"><img height="20" src="https://img.shields.io/badge/built_with-TypeScript-007acc.svg?logo=typescript" alt="Built with TypeScript"></a>
    <a href="./LICENSE"><img height="20" src="https://img.shields.io/github/license/icelam/tints-and-shades?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABHddaYAAAC5UlEQVRIDd2WPWtVQRCGby5pVASLiGghQSxyG8Ui2KWwCfkH9olY2JneQkiR0oCIxH/gB+qVFDYBIWBAbAIRSbCRpLXwIxLiPT7vnNm9e87ZxJtUwYH3zO47Mzv7Mbv3tlo5KYriGtgAJ81OY1ENdG/YI4boFEOI911BXgY/pdtwGuAtXpvmB1tAXHDnUolE5urkPOQo6MqA3pXWmJJL4Bb4rQ7yEYfxsjnIF29NJIoNC6e5fxOL/qN+9KCz7AaLpN8zI415N2i2EptpGrkRIjGeAuvR6IY1hSFLFUOug9Ms2M7ZxIUNytm1mnME186sdI2BOCwAyQMg54ugzSmKmwbPwSbolKH+hbAtQdsOoF+BsF3anUVwBdiOWRidFZDKTTrKEAJTm3GVrGkHzw/uPZbyx7DNNLfB7KGmRsCcr+/gjaiPSpAOTyX9qG4L/XBDdWXDDf1M+wtQ5fwCOtcb4Dto6VpLmzByB6gqdHbTItGSJdAGqibJQhmRfCF7IN4beSF2G9CqnGXQrxofXU+EykllNeoczRgYytDKMubDIRK0g5MF8rE69cGu0u9nlUcqaUZ41W0qK2nGcSzr4D2wV9U9wxp1rnpxn8agXAOHMQ9cy9kbHM7ngY4gFb03TxrO/yfBUifTtXt78jCrjY/jgEFnMn45LuNWUtknuu7NSm7D3QEn3HbatV1Q2jvgIRf1sfODKQaeymxZoMLlTqsq1LF+HvaTqQOzEzUCfni0/eNIA+DfuE3KEtbsegckGmMktTXacnBHPVe687ugkpT+axCkkhBSyRSjWI2xf1KMMVmYiQdWksK9BEFiQoiYLIlvJA3/zeTzCejP0RbB6YPbhZuB+0pR3KcdX0LaJtju0ZgBL8Bd+sbz2QIaU2OfBX3BaQLsgZysQtrk0M8Sh1A0w3DyyYnGnAiZ4gqZ/TvI2A8OGd1YIbF7+F3P+B6dYpYdsJNZgrjO0UdOIhmom0nwL0pnfnzkL1803jAoKhvyAAAAAElFTkSuQmCC" alt="License"></a>
    <a href="https://lgtm.com/projects/g/icelam/tints-and-shades/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/icelam/tints-and-shades.svg?logo=lgtm"/></a>
    <a href="https://github.com/icelam/tints-and-shades/releases"><img alt="Current version" src="https://img.shields.io/github/v/release/icelam/tints-and-shades.svg?sort=semver&label=latest&logo=github"/></a>
    <a href="https://github.com/icelam/tints-and-shades/releases/latest"><img alt="Downloads" src="https://img.shields.io/github/downloads/icelam/tints-and-shades/total.svg"/></a>
</p>

## Cool Features
The main feature of this app is to generate tints and shades of a specific color. And it comes with other cool features like:

![Pin Window - Keep the app window on top to be more efficient](./docs/explain-pin.png)
![Input format - Input colors via color picker, HEX value and RGB value](./docs/explain-input-format.png)
![Copy format - Copy generated colors as HEX code or RGB value](./docs/explain-copy-format.png)
![Random - Keep the app window on top to be more efficient](./docs/explain-random.png)
![Theme - Light mode, dark mode. Or let the system choose](./docs/explain-theme.png)

## Download
You can check the [latest release](https://github.com/icelam/tints-and-shades/releases/latest) of this app or download from the list below:

### Windows
* [Portable Executable](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades.1.0.3.exe)
* [EXE setup file](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades.Setup.1.0.2.exe) ([Blockmap](https://github.com/icelam/tints-and-shades/releases/download/v1.0.2/Tints.and.Shades.Setup.1.0.3.exe.blockmap))
* [32-bit MSI installation file](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades.1.0.3.ia32.msi)
* [64-bit MSI installation file](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades.1.0.3.msi)

### macOS
* [DMG file](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades-1.0.2.dmg) ([Blockmap](https://github.com/icelam/tints-and-shades/releases/download/v1.0.2/Tints.and.Shades-1.0.3.dmg.blockmap))
* [Zip file](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades-1.0.3-mac.zip)

### Linux
* [App image](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades-1.0.3.AppImage)
* [App image for i386](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/Tints.and.Shades-1.0.3-i386.AppImage)
* [DEB file for amd64](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/tints-and-shades_1.0.3_amd64.deb)
* [DEB file for i386](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/tints-and-shades_1.0.3_i386.deb)
* [RPM file for i686](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/tints-and-shades-1.0.3.i686.rpm)
* [RPM file for x68 (64-bit)](https://github.com/icelam/tints-and-shades/releases/download/v1.0.3/tints-and-shades-1.0.3.x86_64.rpm)

## For Developers - Setup ##
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
