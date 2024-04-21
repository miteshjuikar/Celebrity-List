import React from 'react'

export default function Dialog({handleConfirmDelete, handleCancelDelete}) {
  return (
    <div className="dialog">
        <p>Are you sure you want to delete?</p>
        <div className='btnDialog'>
            <button onClick={handleCancelDelete}>Cancel</button>
            <button onClick={handleConfirmDelete}>Delete</button>
        </div>
    </div>
  )
}
