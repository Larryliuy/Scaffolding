import { combineReducers , createStore } from 'redux';

/**action
* 定义类型常量和action创建函数
* */
const CONSTANT = {
    ISLOGINED:'ISLOGINED',
};

/**reducer
处理这个视图和数据状态
*/
const loginInitState = {
    login:false
};
const homeInitState = {
    isLogined:false,
};
const loginState = (state = loginInitState,action) => {
    let tmpState = state;
    switch (action.type){
        case CONSTANT.ISLOGINED:
            return Object.assign({},tmpState,{isLogined:action.val});
        default:
            return loginInitState;
    }
};
const homeState = (state = homeInitState,action)=>{
    let tmpState = state;
    switch (action.type){
        case CONSTANT.ISLOGINED:
            return Object.assign({},tmpState,{isLogined:action.val});
        default:
            return homeInitState;
    }
};

/*多个reducer合成一个reducer*/
const reducer = combineReducers({loginState,homeState});
export { homeState, loginState, CONSTANT };
export default createStore(reducer);
