const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const pizzas = {
            size: [
                {id: 1, value: 'pequena', label: 'Pequeno'},
                {id: 2, value: 'media', label: 'Médio'},
                {id: 3, value: 'grande', label: 'Grande'}
            ],
            crustType: [
                {id: 1, value: 'fina', label: 'Fina'},
                {id: 2, value: 'grossa', label: 'Grossa'}
            ],
            flavor: [
                {id: 1, value: 'pepperoni', label: 'Pepperoni'},
                {id: 2, value: 'mussarela', label: 'Mussarela'},
                {id: 3, value: 'atum', label: 'Atum'},
                {id: 4, value: 'frango_catupiry', label: 'Frango com catupiry'},
                {id: 5, value: 'portuguesa', label: 'Portuguesa'},
            ]
        };

        return response.json(pizzas);
    },

    async create(request, response) {

        // para não permitir que o usuário preencha algo que não deveria
        const { size, crustType, flavor, hasUserClickOnSuggestion } = request.body;

        let points = 0;
        let message = "Sua pizza foi recebida pela pizzaria e logo será entregue."

        if (hasUserClickOnSuggestion) {

            message = "Parabéns, você ganhou 50 pontos ao escolher a pizza do dia! Sua pizza foi recebida pela pizzaria e logo será entregue."
            points = 50; 
        }

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('pizza').insert({
            id,
            size,
            crustType,
            flavor,
            
        });

        return response.json({ points, id, message });
    },

    async pizzaSuggestion(request, response) {

        const suggestion = [
            {
                id: 1,
                size: 'pequena',
                crustType: 'fina',
                flavor: 'pepperoni'
            },
            {
                id: 2,
                size: 'media',
                crustType: 'grossa',
                flavor: 'mussarela'
            },
            {
                id: 3,
                size: 'grande',
                crustType: 'fina',
                flavor: 'atum'
            },
            {
                id: 4,
                size: 'pequena',
                crustType: 'grossa',
                flavor: 'frango com catupiry'
            },
            {
                id: 5,
                size: 'media',
                crustType: 'fina',
                flavor: 'portuguesa'
            },
            {
                id: 6,
                size: 'grande',
                crustType: 'grossa',
                flavor: 'pepperoni'
            }
        ];

        // Para ele escolher de forma aleatória qual a opção do dia
        const randomSuggestion = suggestion[Math.floor(Math.random() * suggestion.length)];

        return response.json({ randomSuggestion });
    },

    async resultPizzas(request, response) {

        const result = await connection('pizza').select('*');

        return response.json(result);
    }
}

// const options = pizzas.size.map(element => (<radioButton />)) // no front
