import React, { useState, useEffect } from 'react';

const Search = () => {
  const [term, setTerm] = useState('');

  // provide second argument as a array to know when it need to execute
  // 3 options ( no second argument, empty array, array with value)
  // empty array : when the compnent is rendered for the first time only
  // nothing : when the compnent is rendered for the first time and whenever it renders
  // array with data : when the compnent is rendered for the first time and whenever data is changed
  useEffect(() => {

  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          className="input"
          />
        </div>
      </div>
    </div>
  )
};

export default Search;