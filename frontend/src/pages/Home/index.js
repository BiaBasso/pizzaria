import React, { useState, useEffect } from 'react';

import Step1 from '../../components/Steps';
import Step2 from '../../components/Steps';
import Step3 from '../../components/Steps';

import api from '../../services/api';

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
        setCurrentStep(currentStep <= 2 ? 3 : currentStep + 1);
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
                    Previous
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
                    Next
                </button>
            )
        }
        return null;
    }

    function handleFlavorChange(event) {
        console.log({ event });
        setPizzaFlavor(event.target.value);
    }

    function handleSizeChange(event) {
        console.log({ event: event.target.value });
        setPizzaSize(event.target.value);
    }

    function handleCrustTypeChange(event) {
        console.log({ event });
        setPizzaCrustType(event.target.value);
    }

    async function handleSubmit(e) {

        e.preventDefault();

        // Para armazenar os valores dos campos
        const data = {
            size: pizzaSize,
            crustType: pizzaCrustType,
            flavor: pizzaFlavor
        };

        try {
            const response = await api.post('/pizzas', data);

            alert(`Feito: ${response.data.message}`);
            console.log({ data });

        } catch (err) {

            alert('Erro no cadastro');
        }
    }

    // Renderizando o HTML
    return (

        <div>
            <h1>A Wizard Form!</h1>
            <p>Step {currentStep} </p>
            <form>

                <Step1
                    currentStep={currentStep}
                    handleChange={handleSizeChange}
                    options={sizeOptions}
                />
                <Step2
                    currentStep={currentStep}
                    handleChange={handleCrustTypeChange}
                    crustType={crustTypeOptions}
                />
                <Step3
                    currentStep={currentStep}
                    handleChange={handleFlavorChange}
                    flavor={flavorOptions}
                />
                {previousButton()}
                {nextButton()}
                <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-success btn-block"> PEDE A PIZZA CARALHOOO </button>
            </form>

        </div>
    );
}