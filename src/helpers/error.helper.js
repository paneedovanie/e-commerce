function filterJoiErrors(object) {
    return object.map(e => e.message)
}  

module.exports = {
    filterJoiErrors
}