export const objectToArray = (object) => { // a function to convert the objects to array so we can loop through the files
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}