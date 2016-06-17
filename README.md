# VneedU-iOS - A Simple React Native app

| Author | Jakes Lee |
|---|---|
| Email | jakeslee66#gmail |

# Introduction

The project is designed for graduation design.The main purpose of this is learning how to build a RESTful API server with Spring MVC and MyBatis frameworks and create a corresponding App with React Native.

As described above, the project is not ready for production, not recommend to use for business if you clone this repository.

This iOS project is almost written in pure JavaScript but depends a lot of third part components. Thanks to all who wrote the nice components.

# Features

Here is a list of features:

- Build by React Native in JavaScript  
- Use Redux as state container  
- Source code is written in ES2015 and precompile by babel  
- Requesting data via fetch API provided by React Native  
- Local cache data by AsyncStorage  

# Screenshots

![](screenshots/home-page.png)

# TODOs

- [ ] Push notification  
- [ ] Messages notification  
- [ ] Order/Requirement management  
- [ ] Optimise experience  
- [ ] Improve the operation flow  
- [ ] Improve the prompt  
- [ ] Android support  

# Prerequisites

[Git](http://help.github.com/set-up-git-redirect), [Node.JS](https://nodejs.org/), [NPM](https://www.npmjs.com/), macOS and XCode build bundle

Please be sure that NPM and Node.JS installed correctly.

# Launch App

#### Prepare toolchains

Before building the project, you must be sure react-native-cli was installed in system. Otherwise, run the following command:

```
npm install -g react-native-cli
```

This command will install _react-native_ command line tools in global environment.

#### Run in Simulator

1. Clone source code from repository  
2. Run `npm install` in root of source code directory  
3. Run `react-native run-ios` to run in simulator  

# License

The project is released under version 2.0 of the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) .