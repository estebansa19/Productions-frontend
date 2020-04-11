import React from 'react'
import notFoundImage from '../images/not_found.png'
import '../styles/notFound.css'

export default function NotFound() {
  return(
    <div className="notFoundContainer">
      <img alt="Page not found" src={notFoundImage}></img>
      <h1>No se encontró la página que buscabas :c</h1>
    </div>
  )
}