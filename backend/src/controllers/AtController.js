const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const at = await connection('at').select('*');
  
    return response.json(at);
  },

  async create(request, response) {
    const { id, name, email, whatsapp, city, uf } = request.body;
    
    await connection('at').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
};