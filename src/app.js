//App.js
import React from 'react';
import {
    Text,
    View,
    Button,
    Image
} from 'react-native';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation'; //导入StackNavigator

//HomeScreen
class HomeScreen1 extends React.Component {
    static navigationOptions = {
        title: 'Welcome', //Navigation标题
    };
    render() {
        const { navigate } = this.props.navigation; //链接到其他页面（必备）

        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Params')} //点击跳转Params标识绑定的页面
                    title="Params with Lucy"
                />
            </View>);
    }
}

/**
 * 硬编码到 ChatScreen 的名称并不理想。如果我们可以通过名称来呈现，所以让我们这么做，它会更有用。
 * 除了指定目标 routeName 中的导航功能，我们可以通过传递 params 将放入新的 route。
 * 首先，我们来编辑我们的 ParamsScreen 组件 name 参数传入 route。
 */

//ParamsScreen（传递参数新创建的页面）
class ParamsScreen extends React.Component {
    static navigationOptions = {
        title: 'Params with Lucy', //Navigation标题
    };
    render() {
        const { navigate } = this.props.navigation; //链接到其他页面（必备）

        return (
            <View>
                <Text>Hello, Params App!</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })} //点击跳转Chat标识绑定的页面，并且传递 user 的参数
                    title="Chat with Lucy"
                />
            </View>);
    }
}

//ChatScreen
class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Params with Lucy', //Navigation标题
    };

    render() {
        // 屏幕上的当前 route 传递到 'props.navigation.state' 中:
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}


const SimpleAppHomeScreen = StackNavigator({
    Home: { screen: HomeScreen1 }, //绑定HomeScreen为Home（唯一标识）页
    Params: { screen: ParamsScreen }, //绑定ParamsScreen为Params（唯一标识）页
    Chat: { screen: ChatScreen }, //绑定ChatScreen为Chat（唯一标识）页
});


class HomeScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor,focused }) => (
            <Image
                source={focused?require(`./assets/img/nav/zy_02.png`):require(`./assets/img/nav/zy_01.png`)}
            />
        ),
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return <Text>List of recent chats</Text>
    }
}

class AllContactsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '发现',
        tabBarIcon: ({ tintColor,focused }) =>  <Image
                source={focused?require(`./assets/img/nav/fx_02.png`):require(`./assets/img/nav/fx_01.png`)}
            />
        ,
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return <Text>List of all contacts</Text>
    }
}
class ShopScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '商城',
        tabBarIcon: ({ tintColor,focused }) =>  <Image
                source={focused?require(`./assets/img/nav/sc_02.png`):require(`./assets/img/nav/sc_01.png`)}
            />
        ,
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return <Text>List of all contacts</Text>
    }
}
class MyScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor,focused }) =>  <Image
                source={focused?require(`./assets/img/nav/wo_02.png`):require(`./assets/img/nav/wo_01.png`)}
            />
        ,
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return <Text>List of all contacts</Text>
    }
}

const MainScreenNavigator = TabNavigator(
    {
        Home: { screen: HomeScreen },
        All: { screen: AllContactsScreen },
        Shop: { screen: ShopScreen },
        My: { screen: MyScreen },
    },
    {
        tabBarComponent: TabView.TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#ff6600',
            inactiveTintColor: '#666',
        }
    });
export default () => <MainScreenNavigator />;