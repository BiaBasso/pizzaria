import React, { useState } from 'react';

export default function Step1({ options, handleChange }) {

    return (
      <div className="form-group">
        <label>Selecione o tamanho da pizza</label>
        {options ?
          options.map(element => {
            return (
              <div key={element.id}>
                <input
                  // className="form-control"
                  id={element.id}
                  name="radio"
                  type="radio"
                  value={element.value}
                  onChange={e => handleChange(e)}
                />
                <span> {element.label} </span>
              </div>
            );
          }) : null}
      </div>
    );
}


export function Step2({ options, handleChange }) {

    return (
      <div className="form-group">
        <label>Selecione o tipo da massa</label>
        {options ?
          options.map(element => {
            return (
              <div key={element.id}>
                <input
                  // className="form-control"
                  id={element.id}
                  name="radio"
                  type="radio"
                  value={element.value}
                  onChange={e => handleChange(e)}
                />
                <span> {element.label} </span>
              </div>
            );
          }) : null}
      </div>
    );
}

export function Step3({ options, handleChange }) {

    return (
      <div className="form-group">
        <label>Selecione o sabor da pizza</label>
        {options ?
          options.map(element => {
            return (
              <div key={element.id}>
                <input
                  // className="form-control"
                  id={element.id}
                  name="radio"
                  type="radio"
                  value={element.value}
                  onChange={e => handleChange(e)}
                />
                <span> {element.label} </span>
              </div>
            );
          }) : null}
      </div>
    );
}
