'use strict'; //启动严格模式
       /*设立"严格模式"的目的，主要有以下几个：
    　　- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    　　- 消除代码运行的一些不安全之处，保证代码运行的安全；
    　　- 提高编译器效率，增加运行速度；
    　　- 为未来新版本的Javascript做好铺垫。*/

import { AppRegistry } from 'react-native';
import SimpleApp from './app';  //导入SimpleApp

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
} //此方法可以避免在正式环境下控制台打印影响性能，在测试环境正常打印。

AppRegistry.registerComponent('dafei', () => SimpleApp);