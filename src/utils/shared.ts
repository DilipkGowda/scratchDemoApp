function deepClone(value: Object | []) {
    return JSON.parse(JSON.stringify(value))
}

export {deepClone}