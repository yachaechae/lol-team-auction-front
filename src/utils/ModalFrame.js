import axios from 'axios'
import React, { useState } from 'react'

export default function ModalFrame({state, closeModal}) {
    const [roomCode,setRoomCode] = useState({
        roomcode : ''
    })
    const getRoomCode = (e) =>{
        setRoomCode({
            [e.target.name] : e.target.value
        })
    }
    console.log(roomCode)
    const postRoomCode = () => {
        axios.post('http://119.192.243.239:13030/api/auction',{
            roomCode: roomCode,
        }).then(response => {
            console.log("It's work!")
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return state ? (
        <div className="modal-container" >
            <div className="modal-overlay" onClick={e => closeModal(e)}/>
            <div className="modal-content">
                <div className="modal-title">
                    <div className="close" onClick={e => closeModal(e)}>X</div>   
                </div>
                <div className="modal-body">
                    <h2>방 코드를 입력해주세요!</h2>
                    <input placeholder="스트리머분께 제공 받은 코드를 입력해주세요!" name="roomcode" onChange={getRoomCode}/>
                    <button type="button" className="codeBtn" onClick={()=>{postRoomCode()}}>완료</button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    )
}