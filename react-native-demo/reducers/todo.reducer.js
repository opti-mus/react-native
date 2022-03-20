import { combineReducers } from 'redux'
import { randomID } from '../components/todo.list/utils/utils'

const INITIAL_STATE = {
    current: false,
    callback: () => {},
}
const TODO_LIST = {
    list: [
        {
            id: randomID(),
            value: 'Test value',
            complete: true,
            edit: false,
            subtasks: [
                {
                    id: randomID(),
                    value: 'subtask1',
                    complete: false,
                    edit: false,
                },
                {
                    id: randomID(),
                    value: 'subtask2',
                    complete: false,
                    edit: false,
                },
            ],
        },
        {
            id: randomID(),
            value: 'Test value3',
            complete: false,
            edit: false,
            subtasks: [],
        },
    ]
}

const modalDeleteReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case 'MODAL_DELETE':
            return action.payload

        default:
            return state
    }
}
const todoListReducer = ( state = TODO_LIST, action ) => {
    switch ( action.type ) {
        case 'TODO_ADD':
            const newItem = [...state.list, action.payload]
            return { list: newItem }
        case 'TODO_REMOVE':
            const updatedData = state.list.filter( ( el ) => el.id !== action.payload.id )
            return { list: updatedData }
        case 'TODO_EDIT':
            const rer = [
              ...state.list,
              ...state.list.filter((el) => {
                if (el.id === action.payload.id) {
                  el.edit = true
                } else {
                  el.edit = false
                }
              }),
            ]
            return { list: rer }
        case 'TODO_EDIT_CONFIRM':
            const confirmEdit = [
                ...state.list,
                ...state.list.filter((el) => {
                    if (el.id === action.payload.id) {
                        el.value = action.newValue
                        el.edit = false
                    }
                }),
            ]
            return { list: confirmEdit }
        case 'TODO_EDIT_CANCEL':
            const cancelEdit = [
                ...state.list,
                ...state.list.filter((el) => {
                    if (el.id === action.payload.id) {
                        el.edit = false
                        // setEditValue(el.value)
                    }
                }),
            ]
            return { list: cancelEdit }
        default:
            return state
    }
}
let reducers = combineReducers( {
    modalDelete: modalDeleteReducer,
    todoListReducer: todoListReducer,
} )
const rootReducer = (state, action) => {
    return reducers(state, action)
}
export default rootReducer
