export default function (array, key = "ID") {
    if (array.length === 0)
        return 0

    let max = array[0][key]
    array.forEach(e => {
        if (e.ID > max) {
            max = e.ID
        }
    })
    return max
}