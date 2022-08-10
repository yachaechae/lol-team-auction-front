import React, { useState } from 'react'


export default function Modal({isOpen, closeModal, children}) {

    return isOpen ? (
        <div className="modal-container" >
            <div className="modal-overlay" onClick={e => closeModal(e)}/>
            <div className="modal-content">
                <div className="modal-title">
                    <div className="close" onClick={e => closeModal(e)}>X</div>   
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <></>
    )
}