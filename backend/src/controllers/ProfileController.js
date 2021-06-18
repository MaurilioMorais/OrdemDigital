const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const at_id = request.headers.authorization;

    const ordens = await connection('ordens')
      .where('at_id', at_id)
      .select('*');

    return response.json(ordens);
  }
}