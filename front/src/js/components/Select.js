import React from 'react';
import _ from 'underscore';

export default (props) => {
  const {
    options,
    labelText,
    onSelectChange
  } = props;

  let id = makeRandomId(6);

  return (
    options ?
    <div className='select-container'>
      <label htmlFor={id}>{labelText}</label>
      <select name="genero" id={id} onChange={onSelectChange}>
        {
          options.map(opt => <option key={opt.id} value={opt.value}>{opt.name}</option>)
        }
      </select>
    </div> :
    null
  );
}

function makeRandomId(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}