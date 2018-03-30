export const SET_REA ='SET_REA'
export const ADD_REA = 'ADD_REA'
export const REMOVE_REA = 'REMOVE_REA' 

export function setData(data){
    return {
        type: SET_REA,
        cardProperty: data     
    }
}

export function addData(data){
    return {
        type: ADD_REA ,
        addProperty: data     
    }
}

export function removeData(id){
    return {
        type: REMOVE_REA,
        removeProperty: id     
    }
}