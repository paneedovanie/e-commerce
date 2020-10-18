module.exports.filterJoiErrors = (object) => {
    return object.map(e => e.message)
}