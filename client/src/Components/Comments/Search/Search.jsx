import React, { useState } from 'react'
import './Search.css'

const Search = ({setSearchText}) => {

  return (
    <input className='search-component' placeholder='Search' onChange={(e) => setSearchText(e.target.value)} />
  )
}

export default Search