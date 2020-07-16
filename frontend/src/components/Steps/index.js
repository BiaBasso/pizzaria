import React, { useState } from 'react';

export default function Step1({ currentStep, options, handleChange }) {

  console.log(currentStep);

  console.log(options);

  if (currentStep === 1) {

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
  } else {

    return null;
  }
}

export function Step2({ currentStep, options, handleChange }) {

  console.log(currentStep);

  if (currentStep === 2) {

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
  } else {

    return null;
  }
}

export function Step3({ currentStep, options, handleChange }) {

  console.log(currentStep);

  if (currentStep === 3) {

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
  } else {

    return null;
  }
}