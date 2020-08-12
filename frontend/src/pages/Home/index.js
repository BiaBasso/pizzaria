import React, { useState, useEffect } from 'react';

import Step1 from '../../components/Steps';
import Step2 from '../../components/Steps';
import Step3 from '../../components/Steps';
import Suggestion from '../../components/Suggestion';

import api from '../../services/api';

import pizzaMontagem from '../../assets/montagem-pizza.jpg';

import style from '../../style.css';

export default function Home() {

    const [currentStep, setCurrentStep] = useState(1);
    const [pizzaSize, setPizzaSize] = useState('');
    const [pizzaCrustType, setPizzaCrustType] = useState('');
    const [pizzaFlavor, setPizzaFlavor] = useState('');
    const [pizzaSuggestion, setPizzaSuggestion] = useState({});

    const [sizeOptions, setSizeOptions] = useState([]);
    const [crustTypeOptions, setCrustTypeOptions] = useState([]);
    const [flavorOptions, setFlavorOptions] = useState([]);
    const [suggestionOptions, setSuggestionOptions] = useState([]);

    const [pizzasData, setPizzasData] = useState({});
    const [suggestionData, setSuggestionData] = useState([]);
    const [isCreatePizzaClicked, setIsCreatePizzaClicked] = useState(false);

    // Funções para capturar os resultados do backend
    useEffect(() => {
        async function fetchData() {
            try {
                const pizzas = await api.get('/pizzas'); // Para trazer as infos das pizzas
                const suggestion = await api.get('/pizzas/suggestion'); // Para trazer as sugestões

                setPizzasData(pizzas);
                setSuggestionData(suggestion);

            } catch (error) {

                alert('Erro na conexão!');
            }
        }

        fetchData();

    }, []);

    useEffect(() => {
        console.log({ pizzasData: pizzasData.data });

        if (pizzasData && pizzasData.data && pizzasData.data.size && pizzasData.data.crustType && pizzasData.data.flavor) {

            setSizeOptions(pizzasData.data.size);
            setCrustTypeOptions(pizzasData.data.crustType);
            setFlavorOptions(pizzasData.data.flavor);
        }
    }, [pizzasData])

    useEffect(() => {
        if (suggestionData && suggestionData.data && suggestionData.data.randomSuggestion) {

            setSuggestionOptions(suggestionData.data.randomSuggestion);
        }
    }, [suggestionData])

    // Funções para mudar de página
    function _next() {

        setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1);
    }

    function _prev() {

        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
    }

    // Funções para apresentar os botões de voltar e avançar
    function previousButton() {

        if (currentStep !== 1) {

            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={() => _prev()}>
                    Anterior
                </button>
            )
        }
        return null;
    }

    function nextButton() {

        if (currentStep < 3) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={() => _next()}>
                    Próximo
                </button>
            )
        }
        return null;
    }

    function submitBtn() {

        if (currentStep === 3) {
            return (
                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-success">
                    Fazer pedido!
                </button>
            )
        }
        return null;
    }

    // Funções para capturar os valores selecionados nos componentes
    function handleFlavorChange(event) {
        console.log({ event: event.target.value });
        setPizzaFlavor(event.target.value);
    }

    function handleSizeChange(event) {
        console.log({ event: event.target.value });
        setPizzaSize(event.target.value);
    }

    function handleCrustTypeChange(event) {
        console.log({ event: event.target.value });
        setPizzaCrustType(event.target.value);
    }


    // Função para salvar a montagem da pizza na base de dados
    async function handleSubmit(e) {

        e.preventDefault();

        // Para armazenar os valores dos campos
        const data = {
            size: pizzaSize,
            crustType: pizzaCrustType,
            flavor: pizzaFlavor,
            points: 0
        };

        try {
            const response = await api.post('/pizzas', data);

            alert(`Feito: ${response.data.message}`);
            console.log({ data });

            setIsCreatePizzaClicked(false);

        } catch (err) {

            alert('Erro no cadastro');
        }
    }

    // Função para salvar a montagem da pizza na base de dados
    async function handleSubmitSuggestion(e) {

        setPizzaSuggestion(e.target.value);

        e.preventDefault();

        // Para armazenar os valores dos campos
        try {
            if (suggestionData && suggestionData.data && suggestionData.data.randomSuggestion) {
                const data = {
                    size: suggestionData.data.randomSuggestion.size,
                    crustType: suggestionData.data.randomSuggestion.crustType,
                    flavor: suggestionData.data.randomSuggestion.flavor,
                    points: 50
                };

                const response = await api.post('/pizzas', data);

                console.log({ response });

                alert(`Feito: ${response.data.message}`);
                console.log({ data });
            }

        } catch (err) {

            alert('Erro no cadastro');
        }
    }

    // Renderizando o HTML
    return (

        <div className="container">
            <h1>Seja bem vindo!</h1>
            <h4>A seguir, você pode escolher entre a pizza do dia ou montar a sua pizza.</h4>

            <form>

                <div className="row">
                    <div className="col-md-5">
                        <span>Montagem da pizza.</span>
                        <img className="photo" src={pizzaMontagem} alt="pizzaMontagem" />
                        
                        <div className="row btns">
                            <div className="col-md">
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => setIsCreatePizzaClicked(true)}> Monte sua pizza! </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        {!isCreatePizzaClicked && (

                            <div className="form-group">
                                <Suggestion
                                    options={suggestionOptions}
                                    handleSubmitSug={handleSubmitSuggestion}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {isCreatePizzaClicked && (
                    <div className="row">
                        <div className="col-md">
                            <div className="form-group">

                                <p>Passo {currentStep} </p>
                            </div>

                            {currentStep === 1 && (
                                <div className="form-group">
                                    <Step1
                                        handleChange={handleSizeChange}
                                        options={sizeOptions}
                                    />
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="form-group">

                                    <Step2
                                        handleChange={handleCrustTypeChange}
                                        options={crustTypeOptions}
                                    />
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="form-group">

                                    <Step3
                                        handleChange={handleFlavorChange}
                                        options={flavorOptions}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md">
                                        {previousButton()}
                                        {nextButton()}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md">
                                        {submitBtn()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </form>

        </div>
    );
}