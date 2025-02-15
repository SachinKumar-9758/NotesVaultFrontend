import React from 'react'

const Alert = ({heading,message}) => {
  return (
    <>
        <div className={`alert alert-${heading} alert-dismissible fade show`} role="alert">
            <strong>{heading} : </strong> {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </>
  )
}

export default Alert