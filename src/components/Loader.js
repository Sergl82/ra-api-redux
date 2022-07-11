import React from 'react';
import loader from '../icons/mcru-ajax-loader.gif';

export default function Loader() {
  return (
    <div className="loader">
    <img src={loader} alt="LOADING..." />  
    </div>
  );
}
