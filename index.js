function createStore() {

    let state

    const getStore = () => state

    return {
        getStore
    }

}