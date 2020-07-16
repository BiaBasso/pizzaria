import React, { useState } from 'react';

export default function Step1({ currentStep, options, handleChange }) {

  if (currentStep !== 1) {
    return null;
  }

  return (
    <div className="form-group">
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

export function Step2({ currentStep, options, handleChange }) {

  if (currentStep !== 2) {
    return null;
  }

  return (
    <div className="form-group">
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

export function Step3({ currentStep, options, handleChange }) {

  if (currentStep !== 3) {
    return null;
  }

  return (
    <div className="form-group">
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