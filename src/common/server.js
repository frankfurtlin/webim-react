import { message } from "antd";
import { addGroupAction } from "../redux/actions/group";
import { updateSyncAvatar } from "../redux/actions/avatar";
import { syncAppendConverAction } from "../redux/actions/currentChatData";
import {store} from "../redux/store";
import { randomGenerator } from "./util";
import vq from "./vq";

// 用户登录
export async function userlogin(username, password) {
    const result = await vq('/api/users/login', {
        data: {
          username,
          password,
        }
    })
    const { uid, token } =  result;
    // 客户端存储token
    localStorage.setItem('token', token)
    localStorage.setItem('uid', uid)
    store.dispatch({type: 'login'})
    return result;
}

// 用户注册
export async function userRegister(username, password, email) {
    const avatar = randomGenerator();
    const result = await vq('/api/users/register', {
        data: {username,
               password,
               email,
               avatar,
            }
    })
    const { user, token, success } = result;
    if(success) {
        // 客户端存储token
        localStorage.setItem('token', token)
        localStorage.setItem('uid', user._id)
        // 生成一个随机的形象。
        store.dispatch(updateSyncAvatar(avatar, false))
    }
    return result;
} 

// 设置用户是否在线
export async function setUserIsOnLine(isOnLine) {
    return await vq('/api/users/setUserOnline', {
        data: {
            isOnLine,
        }
    })
}

// 修改头像
export async function updateAvatar(avatar) {
    return await vq('/api/users/avatar', {
        data: {
            avatar,
        }
    })
}

// 修改用户信息
export async function updateUserInfo(info) {
    return await vq('/api/users/userinfo', {
        data: {
            ...info,
        }
    })
}

// 查询用户信息
export async function queryUserInfo() {
     const result = await vq('/api/users/queryUser', {
    })
    localStorage.setItem('uid', result.uid);
    return result;
}

// 获取会话列表
export async function fetchContactList() {
    return await vq('/api/chat/contact', {

    })
}

// 获取聊天数据
export async function fetchChatHistoryData() {
    return await vq('/api/chat/chatData', {

    })
}

// 搜索对应联系人
export async function queryLinkMan(username) {
    return await vq('/api/chat/queryLinkman', {
        data: {
            username,
        }
    })
}

// 添加联系人
export async function addLinkMan(username) {
    return await vq('/api/chat/addLinkman', {
        data: {
            username,
        }
    })
}

// 拉群聊
export async function createGroup(usersList) {
    const {success, message: msg, resultObj} =  await vq('/api/chat/createGroup', {
        data: {
            usersList,
            nickname: store.getState().userInfo.nickname,
        }
    })
    if(success) {
        const {groupName, _id, members = []} = resultObj;
        store.dispatch(addGroupAction({
            groupName,
            converId: _id,
            size: members.length,
        }))
        store.dispatch(syncAppendConverAction(resultObj))
        message.success(msg)
    }else {
        message.error(msg)
    }
    return success;
}


/**
 * 
 * @param {Boolean} isAgree 
 * @param {String} username 
 * @returns 
 */
// 添加联系人
export async function respondAdd(username, isAgree) {
    const { code, message: msg, converId, history} =  await vq('/api/users/respondAdd', {
        data: {
            isAgree,
            username,
        }
    })
    if(code === 'success') {
        message.success(msg)
    }else {
        message.error(msg)
    }
    return {
        converId,
        history,
    };
}
