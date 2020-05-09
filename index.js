//Library Code
function createStore(reducer) {

    let state
    let listeners = []
    const getStore = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {

        state = reducer(state, action)
        listeners.forEach((listener) => listener())

    }

    return {
        getStore,
        subscribe,
        dispatch,
    }

}


function todos(state = [], action) {

    switch (action.type) {

        case "ADD_TODO":
            return state.concat([action.todo])
        case "REMOVE_TODO":
            return state.filter((todo) => todo.id !== action.id)
        case "TOGGLE_TODO":
            return state.map((todo) => (
                todo.id !== action.id ? todo :
                    (Object.assign({}, todo, { completed: !todo.completed })))
            )
        default:
            return state
    }
}

function goals(state = [], action) {

    switch (action.type) {

        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state

    }
}


const store = createStore(todos)

store.subscribe(() => {
    console.log("State : ", store.getStore())
})

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 0,
        name: "Learn Redux",
        completed: false
    }
})

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 1,
        name: "Learn Redux",
        completed: false
    }
})

store.dispatch({
    type: "REMOVE_TODO",
    id: 0
})

store.dispatch({
    type: "TOGGLE_TODO",
    id: 0
})