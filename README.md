# Welcome to the MIParty Project

## Dependencies

**[node](https://nodejs.org/en) installation is required.**

**This project uses [Expo](https://expo.dev/)**

## Dependency Installation

```
npm i
```

or

```
yarn
```

## Connecting to the Backend

### [MIParty Backend](https://github.com/josuelJFS/MIParty-backend) must be installed.

### Setting the backend IP

`src/services/apiAxios.tsx`

`baseURL: "http://yourLocalIp:3333/"`

"Use the machine's IP where [MIParty Backend](https://github.com/josuelJFS/MIParty-backend) is running, or the app won't log in. I left the Google example API for testing to work correctly."

# Starting MIParty App

### Using Expo Go app on your mobile device

#### 1 - Install the [Expo Go app](https://expo.dev/expo-go) from the store

#### 2 - Open the terminal in the project's root and run

```
npx expo start
```

#### After that, open the [Expo Go app](https://expo.dev/expo-go) and scan the QR code displayed in the project terminal.

### There you go! Now you can start using MIParty.

![login](https://ibb.co/d7V31hk)

![home](https://ibb.co/sHW5NbX)
