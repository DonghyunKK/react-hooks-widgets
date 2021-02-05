import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId)
    };
  }, [term]);

  useEffect(() => {
    const search = async() => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  // provide second argument as a array to know when it need to execute
  // 3 options ( no second argument, empty array, array with value)
  // empty array : when the compnent is rendered for the first time only
  // nothing : when the compnent is rendered for the first time and whenever it renders
  // array with data : when the compnent is rendered for the first time and whenever data is changed

  // When you want to use async await in useEffect, you can't directly attach that to the fucntion.
  // useEffect(() => {
    // 1. assign helper method inside, and use with that function
    //  const search = async() => {
    //     await axios.get('url');
    // }
    // search();
    // 2. remove variable decoration and immediately invoke.
    // (async () => {
    //   await axios.get('url');
    // })();
    // 3. use normal promise.
    // axios.get('url')
    // .then((response) => {
    // code.
    //});
    // const search = async() => {
    //   const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    //     params: {
    //       action: 'query',
    //       list: 'search',
    //       origin: '*',
    //       format: 'json',
    //       srsearch: term,
    //     },
    //   });

    //   setResults(data.query.search);
    // };

  //   if (term && !results.length) {
  //     search();
  //   } else {
  //     const timeoutId = setTimeout(() => {
  //       if (term) {
  //         search()
  //       }
  //     }, 1000)

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    )
  });

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
      <div className="ui celled list">{renderedResults}</div>
    </div>
  )
};

export default Search;