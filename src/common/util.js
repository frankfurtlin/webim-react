import { Avatar_Generator } from './global'

export const randomGenerator = ()=> {
    let randomAvatarObj = {};
    for(let i in Avatar_Generator) {
        let arr = Avatar_Generator[i]
        const randomIndex = Math.floor(Math.random() * arr.length)
        randomAvatarObj[i] =arr[randomIndex]
    } 
    return randomAvatarObj;
}