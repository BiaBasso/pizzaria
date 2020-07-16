import React, { useState } from 'react';

export default function Suggestion({ options, handleChange }) {

    return (
        <div className="form-group">
            <label>Opção do dia</label>
            <div key={options}>
                <button
                    className="btn btn-warning"
                    id={options}
                    name="radio"
                    type="button"
                    value={options}
                    onChange={e => handleChange(e)}
                >
                    Pizza do dia
                </button>                
            </div>

        </div>
    );
}