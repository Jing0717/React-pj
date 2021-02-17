import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDeboucnedTerm] = useState(term);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // This is like componentDidUpdate cause we put second value [term]
    const timerId = setTimeout(() => {
      setDeboucnedTerm(term);
    }, 1000);
    // This is like componentWillUnmount
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(()=> {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
        params:{
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        }
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm])

  const renderedReaults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a 
          className="ui button"
          href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >Go</a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    )
  })

    return (
        <div>
          <div className="ui form">
            <div className="field">
              <label>Enter Search Term</label>
              <input value={term} onChange={(e) => setTerm(e.target.value)} className="input" />
            </div>
          </div>
          <div className="ui celled list">
            {renderedReaults}
          </div>
        </div>
    )
};

export default Search;