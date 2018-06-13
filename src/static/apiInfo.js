const loginApi = '../../server/app/api/user/login.php';
const registerApi = '../../server/app/api/user/register.php';
const homePage = location.href.substring(0,location.href.indexOf('index.php')+9)+'#/';
const domian = 'xhello.cn';

 const apiInfo = {
    login:loginApi,
    register:registerApi
};

export default apiInfo;

