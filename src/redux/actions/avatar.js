import { message } from "antd"
import { updateAvatar } from "../../common/server"

export const updateAvatarAction = (option)=> ({type: 'changeAvatar', option})
export const updateSyncAvatar = (option, showMsg = true)=> {
    return async dispatch=> {
        const result = await updateAvatar(option)
        const { success } = result;
        if(success) {
            dispatch(updateAvatarAction(option))
            if(!showMsg) return;
            message.success('修改头像成功')
        }
    }
}