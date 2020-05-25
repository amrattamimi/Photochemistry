export const createDataTree = dataset => {
    let hashTable = Object.create(null); //creating an object with the name hash table 
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []}); //attach to each element in the array an empty array calle childnode
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]); //check if there is a parent element, if true populate with a childnode else push an item 
        else dataTree.push(hashTable[a.id])
    });
    return dataTree 
};