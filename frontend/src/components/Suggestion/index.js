import React, { useState } from 'react';

import pizza_img from '../../assets/pizza_img.jpg';
import style from './style.css';

export default function Suggestion({ options, handleChange }) {

    console.log(options);

    return (
        <div className="form-group">
            <label>Opção do dia</label>
            <div key={options.id}>
                <div className="row">
                    <div className="col-md">
                        <span>Tamanho: {options.size}, Tipo: {options.crustType} e Sabor: {options.flavor}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <img className="photo" src={pizza_img} alt="pizza" id={options.id} onClick={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>

        </div>
    );
}