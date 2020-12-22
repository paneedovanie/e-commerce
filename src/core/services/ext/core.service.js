module.exports = class CoreService {
  constructor(model, showFields = []) {
    this.model = model
    this.showFields = showFields
  }

  async isExists (id, field, value) {
    let query = [ { [field]: value } ]
    if(id) query.push( { _id: { $ne: id } } )
    const result = await this.model.findOne({ $and: query })
    return result ? true : false
  }

  async isIdExists (id) {
    const result = await this.model.find(id)
    return result ? true : false
  }
}