import React,{Component} from 'react';
import Login from '../components/Login';
import '../static/login.scss';
import store,{ CONSTANT } from '../reducer/reducer';
import {CONFIG_CONSTANTS} from '../static/comFunctions';

let state = store.getState();
store.subscribe(function () {
    state = store.getState();
});
const divStyle = {
    textAlign:'center !important',
    height:'100%',
    paddingTop: 'calc(100px + 15%)'
};


class LoginBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login:false, data:''
        };
    }
    handleLogin(bool,data){
        // console.log(data);
        if(!this.refs.loginRef) return;
        this.setState({login:bool,data:data});
        let userInfo;
        userInfo = {
            id:data.id,
            name:data.name,
            sex:parseInt(data.sex),
            level:parseInt(data.level),
            limit:data.limit,
            fileId:data.fileId,
            avatar:'./images/avatar.png',
            maxChildren:CONFIG_CONSTANTS.MAXCHILDREN,
            Children:[]
        };
        if(data.avatar){
            userInfo.avatar = data.avatar;
        }
        store.dispatch({type:CONSTANT.USERINFO,val:userInfo});
        // }
        location.replace('#/home');
    }
    componentDidMount(){
        window.localStorage.setItem('audio','');
        window.localStorage.setItem('video','');
    }
    render(){
        // console.log(this.props.match);
        // console.log(this.props.location);
        return(
        <div ref={'loginRef'} style={divStyle}>
            <Login login ={this.handleLogin.bind(this)}/>
        </div>
    );
    }
}
export default LoginBox;