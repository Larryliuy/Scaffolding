import React,{Component} from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import store,{CONSTANT} from '../reducer/reducer';
import '../static/login.scss';

let state = store.getState();
store.subscribe(function () {
    state = store.getState();
});

const layoutStyle = {
    width:'100%',
    height:'100%',
    color:'#222'
};
const sliderStyle = {
    width:'240px !important',
    maxWidth:'240px !important',
    backgroundColor:'#fff'
};
class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={sendData:'',sliderWidth:240};
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    render() {
        return (
            <Layout style={layoutStyle}>
                <Header style={{ backgroundColor:state.homeState.skinColor,padding: 0,textAlign:'center',borderBottom:'1px solid #ececec' }} >
                    {/*头部功能区*/}
                </Header>
                <Layout style={{backgroundColor:'#fff'}}>

                    <Sider width={this.state.sliderWidth} collapsible = {false} style={Object.assign({},sliderStyle,{borderRight: '1px solid #eee'})}>
                        <div id={'resizable'} className={'ui-resizable'}></div>
                        <div className={'channelContents'}>
                        </div>
                    </Sider>
                    <Content style={{ margin: '24px 16px 0',maxHeight: winHeight-150,overflowY:'hidden' }}>
                        <div id={'audioBox'}>
                        </div>
                        <div className= 'content_show'>
                        </div>
                        <div className= 'text_area'>
                        </div>
                    </Content>
                    <Sider width={240} collapsible = {false} style={Object.assign({},sliderStyle,{borderLeft: '1px solid #eee'})}>
                        {/*麦序区域*/}
                        <div className='content-right-up'>

                        </div>
                        {/*广告区域*/}
                        <div className='ad-area' >
                        </div>
                    </Sider>
                </Layout>
                <Footer>
                    {/*底部功能区*/}
                </Footer>
            </Layout>
        );
    }
}

export default HomePage;

// 系统屏幕尺寸（宽高）
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

window.onload = function(){

};