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

export function Step2({ currentStep, crustType, handleChange }) {

  if (currentStep !== 2) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        id="username"
        name="username"
        type="radio"
        placeholder="Enter username"
        value={crustType}
        onChange={() => handleChange()}
      />
    </div>
  );
}

export function Step3({ currentStep, flavor, handleChange }) {

  if (currentStep !== 3) {
    return null;
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="radio"
          placeholder="Enter password"
          value={flavor}
          onChange={() => handleChange()}
        />
      </div>
      
    </div>
  );
}