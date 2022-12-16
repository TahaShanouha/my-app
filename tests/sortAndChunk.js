const sortAndChunk = (arr, size) => {
    const sortedDesc = arr.sort(
        (objA, objB) => new Date(objB.createdAt).getTime() - new Date(objA.createdAt).getTime(),
    );
    return Array.from({ length: Math.ceil(sortedDesc.length / size) }, (v, i) =>
        sortedDesc.slice(i * size, i * size + size)
    );
}

module.exports = sortAndChunk;