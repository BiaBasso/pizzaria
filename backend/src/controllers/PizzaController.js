const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const pizzas = {
            size: [
                {id: 1, value: 'p', label: 'Pequeno'},
                {id: 2, value: 'm', label: 'Médio'},
                {id: 3, value: 'g', label: 'Grande'}
            ],
            crustType: [
                {id: 1, value: 'slim', label: 'Fina'},
                {id: 2, value: 'large', label: 'Grossa'}
            ],
            flavor: [
                {id: 1, value: 'pepperoni', label: 'Pepperoni'},
                {id: 2, value: 'mussarela', label: 'Mussarela'},
                {id: 3, value: 'atum', label: 'Atum'},
                {id: 4, value: 'chicken', label: 'Frango com catupiry'},
                {id: 5, value: 'portuguese', label: 'Portuguesa'},
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
                size: 'p',
                crustType: 'slim',
                flavor: 'pepperoni'
            },
            {
                id: 2,
                size: 'm',
                crustType: 'large',
                flavor: 'mussarela'
            },
            {
                id: 3,
                size: 'g',
                crustType: 'slim',
                flavor: 'atum'
            },
            {
                id: 4,
                size: 'p',
                crustType: 'large',
                flavor: 'chicken'
            },
            {
                id: 5,
                size: 'm',
                crustType: 'slim',
                flavor: 'portuguese'
            },
            {
                id: 6,
                size: 'g',
                crustType: 'large',
                flavor: 'pepperoni'
            }
        ];

        // Para ele escolher de forma aleatória qual a opção do dia
        const randomSuggestion = suggestion[Math.floor(Math.random() * suggestion.length)];

        return response.json({ randomSuggestion });
    }
}

// const options = pizzas.size.map(element => (<radioButton />)) // no front
