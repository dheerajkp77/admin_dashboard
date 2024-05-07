
import React from 'react'
import "./loader.scss"
const Loader = () => {
  return (
    <div className="maindiv">
    <div>
      <div className="loadericon">
        <div className="outerCircle"></div>
        <div className="icon">
          <img
            alt=""
            width="10"
            src={"/images/logo.svg"}
            className="logoname"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Loader