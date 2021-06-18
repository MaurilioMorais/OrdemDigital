const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('ordens').count();

    const ordens = await connection('ordens')
      .join('at', 'at.id', '=', 'ordens.at_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'ordens.*', 
        'at.name', 
        'at.email', 
        'at.whatsapp', 
        'at.city', 
        'at.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(ordens);
  },

  async create(request, response) {
    const { cliente, marca, modelo, descricao, valor } = request.body;
    const at_id = request.headers.authorization;

    const [id] = await connection('ordens').insert({
      cliente, 
      marca, 
      modelo, 
      descricao, 
      valor,
      at_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const at_id = request.headers.authorization;

    const ordem = await connection('ordens')
      .where('id', id)
      .select('at_id')
      .first();

    if (ordem.at_id !== at_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('ordens').where('id', id).delete();

    return response.status(204).send();
  }
};