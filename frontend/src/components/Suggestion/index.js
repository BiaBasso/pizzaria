import React, { useState } from 'react';

import pizza_img from '../../assets/pizza_img.jpg';
import style from '../../style.css';

export default function Suggestion({ options, handleSubmitSug }) {

    console.log(options);

    return (
        <div className="form-group">
            <div key={options.id}>
                <div className="row">
                    <div className="col-md">
                        <span>Sugestão do dia: Tamanho {options.size}, massa {options.crustType} e sabor {options.flavor}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <img className="photo" src={pizza_img} alt="pizza" id={options.id} />
                    </div>
                </div>
                <div className="row btns">
                    <div className="col-md">
                        <button type="submit" className="btn btn-info btn-sm" onClick={e => handleSubmitSug(e)}> Faça seu pedido especial! </button>
                    </div>
                </div>
            </div>

        </div>
    );
}