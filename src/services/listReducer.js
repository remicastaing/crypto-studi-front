export function listReducer(state, action) {
    let newState = [];
    switch (action.type) {
        case 'add':
            newState = [...state, action.item];
            break;
        case 'load':
            newState = action.items;
            break;
        case 'delete':
            state.forEach((item) => {
                if (item.id !== action.item.id) {
                    newState.push(item)
                }
            })
            break;
        case 'update':
            state.forEach((item) => {
                newState.push(item.id == action.item.id ? action.item : item)
            })
            break;
        default:
            throw new Error();
    }
    return newState;
}
