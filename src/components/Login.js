import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import '../static/login.scss';
import  apiInfo  from '../static/apiInfo';
import { cookieUtil } from '../static/comFunctions';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {wechatVisible:'hidden',userName:'',password:'',loginComponent:true};
    }
    componentDidMount(){
    }
    componentWillMount(){

    }
    handleSubmit(e){
        e.preventDefault();
        // console.log('register:'+userName)
    }
    onChangeUserName(e){
        // console.log('userName:' + e.target.value)
        this.setState({userName:e.target.value});
    }
    onChangePassword(e){
        // console.log('password:' + e.target.value)
        this.setState({password:e.target.value});
    }
    onClickHandle(){
        let userName = this.state.userName,
            password = this.state.password,
            _this = this;
        let arg = '?LoginName='+userName+'&Password='+password;
            fetch(apiInfo.login+arg)
                .then((response) => {/*console.log(response);*/return response.json();})
              .then(data=>{
                  if(data.status === 'ok'){
                      message.success('登录成功');
                      _this.props.login(true,{
                          name:userName,
                          level:data.data.Type,
                          id:data.data.Id,
                          sex:data.data.Sex,
                          limit:data.data.Limit,
                          fileId:data.data.AvatarFileId,
                          Children:[],
                          isOnline:false
                      });
                  }else {
                      message.error('用户名与密码不匹配');
                  }
              }).catch(err=>{
                  console.log(err);
              });
    }
    onChangeCheckBox(e){}
    render(){
        if(!this.state.loginComponent)return (<div style={{textAlign:'center'}}><p>正在验证中...,请稍候</p></div>);
        return (<Form onSubmit={this.handleSubmit} className='login-form'>
                    <FormItem>
                        <Input id='user' onChange = {(e) => this.onChangeUserName(e)}
                               prefix={<Icon type='user' className={'login-form-input-logo'} />}
                               defaultValue={cookieUtil.get('loginChecked')=='true'?cookieUtil.get('userName'):''}  placeholder='Username' />
                    </FormItem>
                    <FormItem>
                        <Input id='pwd' onChange = {(e) => this.onChangePassword(e)}
                               prefix={<Icon type='lock' className={'login-form-input-logo'} />}
                               type='password' defaultValue={cookieUtil.get('loginChecked')=='true'?cookieUtil.get('password'):''} placeholder='Password' />
                    </FormItem>
                    <FormItem>
                        <Checkbox defaultChecked={cookieUtil.get('loginChecked')=='true'}
                                  onChange={(e)=>this.onChangeCheckBox(e)}
                                  style = {{float:'left'}}>记住密码</Checkbox>
                        {/*<a className='login-form-forgot' href=''>忘记密码</a>*/}
                        <br/>
                        <Button type='primary' htmlType='submit' className='login-form-button' onClick={()=>this.onClickHandle()}>
                            登 录
                        </Button>
                        {/*Or <Link to='/register' >现在注册<Icon type='right'/></Link>
                        <Link to='/register' >忘记密码<Icon type='question'/></Link>*/}
                    </FormItem>
                    <FormItem>
                        <div className={'register-forget-box'}>
                        <Link to='/register' >现在注册<Icon type='right'/></Link>
                        <Link to='/register' >忘记密码<Icon type='question'/></Link>
                        </div>
                    </FormItem>
            </Form>
        );
    }
}
export default Login;
