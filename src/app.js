//App.js
import React from 'react';
import {
    Text,
    View,
    Button,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { StackNavigator, TabNavigator, TabView } from 'react-navigation'; //导入StackNavigator
import Swiper from 'react-native-swiper';
import ViewPager from 'react-native-viewpager';

const imgs = [
    require('./assets/img/banner2.png'),
    require('./assets/img/banner6.png'),
    require('./assets/img/banner14.jpg'),
];
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
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
    constructor(props) {
        super(props);
        // 用于构建DataSource对象  
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        // 实际的DataSources存放在state中  
        this.state = {
            dataSource: dataSource.cloneWithPages(imgs)
        }
    }
    renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={{ width: width }} />
        );
    }
    static navigationOptions = {
        tabBarLabel: '首页',
        headerVisible: false,
        tabBarIcon: ({ tintColor, focused }) => (
            <Image
                source={focused ? require(`./assets/img/nav/zy_02.png`) : require(`./assets/img/nav/zy_01.png`)}
            />
        ),
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return (
            <ScrollView>
                <View style={{
                    height: 250,
                    overflow: 'hidden',
                }}>
                    {/*<ViewPager style={{height:130}} dataSource={this.state.dataSource} renderPage={this.renderPage} isLoop={true} autoPlay={true}/>*/}
                    <Swiper style={styles.container}
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                        paginationStyle={styles.pagination}
                        loop={true}
                        autoplay={true}>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={require(`./assets/img/banner2.png`)} />
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={require(`./assets/img/banner6.png`)} />
                        </View>
                    </Swiper>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                        <View><Text>借款</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                        <View><Text>投资</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                        <View><Text>达分期</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                        <View style={{}}><Text>手机充值</Text></View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner6.png`)} />
                </View>
            </ScrollView>)
    }
}
var styles = StyleSheet.create({
    gridC: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridImg: {
        height: 50,
        width: 50,
        borderRadius: 25
    },

    container: {
    },

    slide: {
        flex: 1
    },

    image: {
        height: 250,
        width: width
    },

    dot: {
        width: 14,
        height: 14,
        backgroundColor: 'transparent',
        borderColor: '#ff6600',
        borderRadius: 7,
        borderWidth: 1,
        marginLeft: 12,
        marginRight: 12
    },

    activeDot: {
        width: 14,
        height: 14,
        borderWidth: 1,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 7,
        borderColor: '#ee735c',
        backgroundColor: '#ee735c',
    },

    pagination: {
        bottom: 530
    },

    btn: {
        position: 'absolute',
        width: width - 20,
        left: 10,
        bottom: 60,
        height: 50,
        padding: 10,
        backgroundColor: '#ee735c',
        borderColor: '#ee735c',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 3,
        color: '#fff'
    }
})
class AllContactsScreen extends React.Component {
    static navigationOptions = {
        title: '发现',
        headerStyle: {
            backgroundColor: '#FC761C',
        },
        headerTitleStyle:{
            alignSelf:'center'
        },
        headerTintColor: '#fff',
        // headerTitle:'sssss',
        // tabBarLabel: '发现',
        tabBarIcon: ({ tintColor, focused }) => <Image
            source={focused ? require(`./assets/img/nav/fx_02.png`) : require(`./assets/img/nav/fx_01.png`)}
        />
        ,
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flexDirection: 'row',marginTop:20 }}>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/find_award.png`)} /></View>
                        <View><Text>幸运转盘</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/calculator-ico.png`)} /></View>
                        <View><Text>计算器</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/dafy_Chargeico.png`)} /></View>
                        <View><Text>手机充值</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row',marginTop:10 }}>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/autoInsurance_ico.png`)} /></View>
                        <View><Text>车险查询</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/housesFund_ico.png`)} /></View>
                        <View><Text>公积金查询</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridC}>
                        <View><Image style={styles.gridImg} source={require(`./assets/img/dafy_credit.png`)} /></View>
                        <View><Text>卡包</Text></View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
class ShopScreen extends React.Component {
    static navigationOptions = {
        title: '商城',
        // tabBarLabel: '商城',
        tabBarIcon: ({ tintColor, focused }) => <Image
            source={focused ? require(`./assets/img/nav/sc_02.png`) : require(`./assets/img/nav/sc_01.png`)}
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
        tabBarIcon: ({ tintColor, focused }) => <Image
            source={focused ? require(`./assets/img/nav/wo_02.png`) : require(`./assets/img/nav/wo_01.png`)}
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
        swipeEnabled: false,
        lazyLoad: true,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#ff6600',
            inactiveTintColor: '#666',
        }
    });

const SimpleApp = StackNavigator({
    Home: { screen: MainScreenNavigator },
});
export default () => <SimpleApp />;