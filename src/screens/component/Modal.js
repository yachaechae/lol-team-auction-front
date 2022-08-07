import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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