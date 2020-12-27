module.exports = class CoreService {
  constructor(model, showFields = [], populate) {
    this.model = model
    this.showFields = showFields
    this.populate = 'owner ' + populate
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