/**
 * =======整体说明=======
 * 可变变量使用let定义，需要se6及以上才可以直接使用
 * 这里最好做成按需加载，有用到的打包进去，没有用到的不用打包进去生产环境。
 */

/**
 * 用于生产随机字符串的数组
 * @param randomFlag 是否随机
 * @param min 生成随机字符串的最小位数
 * @param max 生成随机字符串的最大位数
 * @returns {string} 返回生成的随机数
 */
function randomWord(randomFlag, min, max){
    let str = '',
        range = min,
        pos,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

/**
 * 用于截取uri参数
 * @param str URL 问号‘?’后面的字符串
 * @param name key=value的key值
 * @returns {*}
 * @constructor
 */
function GetQueryString(str,name) {
    // console.log(str,name);
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = str.match(reg);
    // console.log(r);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 排序权重函数
 * */
let by = function(name,minor){
    return function(o,p){
        let a,b;
        if(o && p && typeof o === 'object' && typeof p === 'object'){
            a = o[name];
            b = p[name];
            if(a === b){
                return typeof minor === 'function' ? minor(o,p):0;
            }
            if(typeof a === typeof b){
                return a < b ? -1:1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            throw ('error');
        }
    };
};

/**
 * 清除字符串中的标签，检测字符串清除标签之后是否包含文字
 * */
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    if(str.length>0){
        str=true;
    }else {
        str=false;
    }
    return str;
}

/**
 * cookie读写封装
 * */
const cookieUtil = {
    get:(name)=>{
        let cookieName = encodeURIComponent(name)+'=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            let cookieEnd = document.cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    set:(name,value,expires,path,domain,secure)=> {
        let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ';expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += ';path=' + path;
        }

        if (secure) {
            cookieText += ';secure=' + secure;
        }
        document.cookie = cookieText;
    },
    unset:(name,path,domain,secure)=>{
        cookieUtil.set(name,'',new Date(0),path,domain,secure);
    }

};

/**
 * 格式化当前时间
 * */
function getDateString(){
    let year,month,day,hour,minute,second;
    let weekString ='';
    let date =new Date();
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    let week = date.getDay();
    switch(week){
        case 0:
            weekString = '星期天';
            break;
        case 1:
            weekString = '星期一';
            break;
        case 2:
            weekString = '星期二';
            break;
        case 3:
            weekString = '星期三';
            break;
        case 4:
            weekString = '星期四';
            break;
        case 5:
            weekString = '星期五';
            break;
        case 6:
            weekString = '星期六';
            break;
    }
    return year+'-'+month+'-'+day+' '+ hour +':'+ minute + ':' + second;
}

/**
 * 判断浏览器版本
 * @return {type:"浏览器名称",ver:"浏览器版本"}
 * */
function getBrowserInfo(){
    let Sys={};
    let ua=navigator.userAgent.toLowerCase();
    //log.info('navigator.userAgent='+ua);
    let s;
    (s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
        (s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
            (s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
                (s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
                    (s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
    if(Sys.ie){//Js判断为IE浏览器
        return {
            'type':'ie',
            'ver':Sys.ie
        };
    }
    if(Sys.firefox){//Js判断为火狐(firefox)浏览器
        return {
            'type':'firefox',
            'ver':Sys.firefox
        };
    }
    if(Sys.chrome){//Js判断为谷歌chrome浏览器
        return {
            'type':'chrome',
            'ver':Sys.chrome
        };
    }
    if(Sys.opera){//Js判断为opera浏览器
        return {
            'type':'opera',
            'ver':Sys.opera
        };
    }
    if(Sys.safari){//Js判断为苹果safari浏览器
        return {
            'type':'safari',
            'ver':Sys.safari
        };
    }
    return {
        'type':'unknow',
        'ver':-1
    };
}

/**
 * 删除数组的某一项或多项
 * */
Array.prototype.remove = function(from, to) {
    let rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

export {
    randomWord, GetQueryString,
    by,removeHTMLTag,cookieUtil
};