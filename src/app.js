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
        this.state = {
            tabImgs: [
                {
                    img1: require('./assets/img/nav/zy_01.png'),
                    img2: require('./assets/img/nav/zy_02.png')
                },
                {
                    img1: require('./assets/img/nav/fx_01.png'),
                    img2: require('./assets/img/nav/fx_02.png')
                },
                {
                    img1: require('./assets/img/nav/sc_01.png'),
                    img2: require('./assets/img/nav/sc_02.png')
                },
                {
                    img1: require('./assets/img/nav/wo_01.png'),
                    img2: require('./assets/img/nav/wo_02.png')
                }
            ],
            tabActive: 1
        }
    }
    static navigationOptions = ({ navigation }) => {
        let headerVisible = false;
        let title = '';
        switch (navigation.state.params.tab) {
            case 1:
                headerVisible = false;
                break;
            case 2:
                title = '发现';
                headerVisible = true;
                break;
            case 3:
                title = '商城';
                headerVisible = true;
                break;
            case 4:
                title = '我的';
                headerVisible = true;
                break;
        }
        return {
            title: title,
            headerStyle: {
                backgroundColor: '#FC761C',
            },
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerTintColor: '#fff',
            headerVisible,
        }
        //{require('./assets/img/nav/zy_02.png')}
    }
    render() {
        let navigation = this.props.navigation;
        let sl = {
            s1: { flex: 1, alignItems: 'center' },
            s2: { color: '#666' },
            s2a: { color: '#ff6600' }
        }
        let content = <ScrollView style={{ flex: 1 }}>
            <View style={{
                height: 200,
                overflow: 'hidden',
            }}>
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
                <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                    <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                    <View><Text>借款</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                    <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                    <View><Text>投资</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                    <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                    <View><Text>达分期</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                    <View><Image style={styles.gridImg} source={require(`./assets/img/banner6.png`)} /></View>
                    <View style={{}}><Text>手机充值</Text></View>
                </TouchableOpacity>
            </View>
            <View>
                <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner6.png`)} />
            </View>
        </ScrollView>;
        switch (this.state.tabActive) {
            case 2:
                content = <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                            <View><Image style={styles.gridImg} source={require(`./assets/img/find_award.png`)} /></View>
                            <View><Text>幸运转盘</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                            <View><Image style={styles.gridImg} source={require(`./assets/img/calculator-ico.png`)} /></View>
                            <View><Text>计算器</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridC} onPress={() => { navigation.navigate('ShiMing') }}>
                            <View><Image style={styles.gridImg} source={require(`./assets/img/dafy_Chargeico.png`)} /></View>
                            <View><Text>手机充值</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
                break;
            case 3:
                content = <ScrollView>

                    <View>
                        <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner6.png`)} />
                    </View>
                    <View>
                        <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner2.png`)} />
                    </View>
                    <View>
                        <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner14.jpg`)} />
                    </View>
                    <View>
                        <Image style={{ height: 150, maxWidth: width }} source={require(`./assets/img/banner2.png`)} />
                    </View>
                </ScrollView>
                break;
            case 4:
                content = <ScrollView>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('ShiMing') }} style={{ height: 44, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', paddingRight: 15, paddingLeft: 15, width: '100%', marginBottom: 15 }}>
                            <Image style={{width:20,height:20,marginRight:11}} source={require(`./assets/img/myInvest.png`)}/>
                            <Text>我的投资</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 13.5, height: 13.5 }} source={require(`./assets/img/api_Arrow.png`)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ShiMing') }} style={{ height: 44, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', paddingRight: 15, paddingLeft: 15, width: '100%', marginBottom: 15 }}>
                            <Image style={{width:20,height:20,marginRight:11}} source={require(`./assets/img/myBorrow.png`)}/>
                            <Text>我的借款</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 13.5, height: 13.5 }} source={require(`./assets/img/api_Arrow.png`)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ShiMing') }} style={{ height: 44, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', paddingRight: 15, paddingLeft: 15, width: '100%', marginBottom: 15 }}>
                            <Image style={{width:20,height:20,marginRight:11}} source={require(`./assets/img/myMessage.png`)}/>
                            <Text>交易记录</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 13.5, height: 13.5 }} source={require(`./assets/img/api_Arrow.png`)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ShiMing') }} style={{ height: 44, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', paddingRight: 15, paddingLeft: 15, width: '100%', marginBottom: 15 }}>
                            <Image style={{width:20,height:20,marginRight:11}} source={require(`./assets/img/myMallOrder.png`)}/>
                            <Text>商城订单</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 13.5, height: 13.5 }} source={require(`./assets/img/api_Arrow.png`)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('ShiMing') }} style={{ height: 44, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', paddingRight: 15, paddingLeft: 15, width: '100%', marginBottom: 15 }}>
                            <Image style={{width:20,height:20,marginRight:11}} source={require(`./assets/img/myCard.png`)}/>
                            <Text>我的卡卷</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 13.5, height: 13.5 }} source={require(`./assets/img/api_Arrow.png`)} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                break;
        }
        return (
            <View style={{ height: '100%' }}>
                {content}
                <View style={{ height: 52, backgroundColor: '#f7f7f7', flexDirection: 'row' }}>
                    <TouchableOpacity style={sl.s1} onPress={() => { navigation.setParams({ tab: 1 }); this.setState({ tabActive: 1 }) }}>
                        <Image style={{ height: 26, width: 26 }} source={this.state.tabActive == 1 ? this.state.tabImgs[0].img2 : this.state.tabImgs[0].img1} />
                        <Text style={this.state.tabActive == 1 ? sl.s2a : sl.s2}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sl.s1} onPress={() => { navigation.setParams({ tab: 2 }); this.setState({ tabActive: 2 }) }}>
                        <Image style={{ height: 26, width: 26 }} source={this.state.tabActive == 2 ? this.state.tabImgs[1].img2 : this.state.tabImgs[0].img1} />
                        <Text style={this.state.tabActive == 2 ? sl.s2a : sl.s2}>发现</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sl.s1} onPress={() => { navigation.setParams({ tab: 3 }); this.setState({ tabActive: 3 }) }}>
                        <Image style={{ height: 26, width: 26 }} source={this.state.tabActive == 3 ? this.state.tabImgs[2].img2 : this.state.tabImgs[0].img1} />
                        <Text style={this.state.tabActive == 3 ? sl.s2a : sl.s2}>商城</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sl.s1} onPress={() => { navigation.setParams({ tab: 4 }); this.setState({ tabActive: 4 }) }}>
                        <Image style={{ height: 26, width: 26 }} source={this.state.tabActive == 4 ? this.state.tabImgs[3].img2 : this.state.tabImgs[0].img1} />
                        <Text style={this.state.tabActive == 4 ? sl.s2a : sl.s2}>我的</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class ShiMingScreen extends React.Component {
    static navigationOptions = {
        title: '实名认证',
        headerStyle: {
            backgroundColor: '#FC761C',
        },
        // headerTitleStyle: {
        //     alignSelf: 'center',
        // },
        headerTintColor: '#fff',
    }
    render() {
        return <ScrollView>
            <Image style={{ height: 50, width: 50, alignSelf: "center", marginTop: 100 }} source={require(`./assets/img/api_mark.png`)} />
            <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 15 }}>很抱歉通知您，您还未进行实名认证！</Text>
            <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 15 }}>请致电：400-625-9898</Text>
            <TouchableOpacity style={{ alignSelf: "center", marginTop: 60, width: 270, height: 54, backgroundColor: '#FC651C', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}><Text style={{ color: '#fff', fontSize: 17 }}>去认证</Text></TouchableOpacity>
        </ScrollView>
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
        height: 200,
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
        headerTitleStyle: {
            alignSelf: 'center'
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
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
    Home: { screen: HomeScreen },
    ShiMing: { screen: ShiMingScreen }
},
    {
        initialRouteName: 'Home',
        initialRouteParams: {
            tab: 1
        }
    });
export default () => <SimpleApp />;