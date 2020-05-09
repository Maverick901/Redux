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

    if (action.type === "ADD_TODO") {
        return state.concat([action.todo])
    }
    return state
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

