const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const at = await connection('at')
      .where('id', id)
      .select('name')
      .first();

    if (!at) {
      return response.status(400).json({ error: 'No at found with this ID' });
    }

    return response.json(at);
  }
}