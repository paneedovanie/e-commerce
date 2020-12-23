module.exports = class ApiCrudController {
  constructor (service) {
		this.service = service
	}

	async readAll (req, res) {
    try {
			const result = await this.service.read({ ...req.query, deletedAt: '' })
			res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
	}

	async readAllTrash (req, res) {
		try {
			const result = await this.service.read({ ...req.query, deletedAt: {$ne: '' }})
			res.status(200).json(result)
		} catch (e) { res.status(500).send(e.message) }
	}

	async readOneByQuery (req, res) {
    try {
			const result = await this.service.readOneByQuery(req.query)
			res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
	}

	async readOneById (req, res) {
    try {
			const result = await this.service.readOneById(req.params.id)
			res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
	}

	async createOne (req, res) {
		try {
			const role = await this.service.create(req.body)
			res.status(201).json(role)
		} catch (e) { res.status(500).send(e.message) }
	}

	async updateOne (req, res) {
		try {
			const result = await this.service.update(req.params.id, req.body)
			res.status(202).json(result)
		} catch (e) { res.status(500).send(e.message) }
	}

	async trashOne (req, res) {
		try {
			const result = await this.service.trash(req.params.id)
			res.status(202).json(result)
		} catch (e) { res.status(500).send(e.message) }
	}

	async restoreOne (req, res) {
		try {
			const result = await this.service.restore(req.params.id)
			res.status(202).json(result)
		} catch (e) { res.status(500).send(e.message) }
	}

	async deleteOnePermanently (req, res) {
		try {
			const result = await this.service.deletePermanently(req.params.id)
			res.status(204).json(result)
		} catch (e) { res.status(500).send(e.message) }
	}
}