const avatar = (prevState = {}, action)=> {
    const {type, option = {}} = action;
    switch (type) {
        case 'changeAvatar':
            let newState = {
                ...prevState,
                ...option,
            }
            return newState;
        default:
            return prevState;
    }
}

export default avatar;
