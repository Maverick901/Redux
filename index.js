function createStore() {

    let state
    let listeners
    const getStore = () => state

    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners.filter((l) => l !== listener)
        }
    }

    return {
        getStore,
        subscribe
    }

}

