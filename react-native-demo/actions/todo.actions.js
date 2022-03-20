export const toggleModalDelete = payload => (
    {
        type: 'MODAL_DELETE',
        payload: payload,
    }
);
export const addTodolistItem = item => (
    {
        type: 'TODO_ADD',
        payload : item,
    }
)
export const removeTodolistItem = item => (
    {
        type: 'TODO_REMOVE',
        payload : item,
    }
)
export const editTodolistItem = item => (
    {
        type: 'TODO_EDIT',
        payload : item,
    }
)
export const confirmEditTodolistItem = (item, newValue) => (
    {
        type: 'TODO_EDIT_CONFIRM',
        payload : item,
        newValue: newValue
    }
)
export const cancelEditTodolistItem = (item) => (
    {
        type: 'TODO_EDIT_CANCEL',
        payload : item,
    }
)
