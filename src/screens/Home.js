import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Swal from 'sweetalert2'
import Modal from './component/Modal'
import { loginInfoAtom } from './State'
import axiosInstance from '../utils/AxiosHandler'

export default function Home() {

    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)    
    const [modalState, setModalState] = useState(false)
    const [targetPage, setTargetPage] = useState('')
    const [roomCode,setRoomCode] = useState('')
    const navigator = useNavigate();
    
    useEffect(() => {
        axios.get('https://id.twitch.tv/oauth2/userinfo',
        {
        headers : {
            Authorization : `Bearer ${loginInfo.token}`
        }
        }).then((result)=>{
            setLoginInfo({
                ...loginInfo,
                twitchName : result.data.preferred_username,
            })
        }).catch((error)=>{
        }) 
        
    }, [])

    const btnClicked = (data) => {
        if (!loginInfo.token) {
            Swal.fire('경고!',"로그인 후 이용해주세요!",'error')

            navigator('/login')
        }else {
            navigator(data)
        }
    }

    const openModal = (data) =>{
        setTargetPage(data)
        setModalState(true)
    }

    const closeModal = (e) =>{
        e.preventDefault()
        setModalState(false)
    }
    
    const getRoomCode = (e) =>{
        setRoomCode(e.target.value)
    }

    const postRoomCode = () => {
        const checkCode = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
        if (!checkCode.test(roomCode)) {
            Swal.fire('경고!',"코드를 다시 한 번 확인해주세요!",'error')
            return 
        }
        axiosInstance.get('/auction/validate', {
            params: {
                auctionId : roomCode,
            }
        }).then(response => {
            navigator(targetPage,{
                state:{
                    auctionId: roomCode,
                    auctionOwnerName: response.data.data.auctionOwnerName
                }
            })
        })
        // .catch(error => {
        //     Swal.fire('경고!',"코드를 다시 한 번 확인해주세요!",'error')
            
        // })
    }


    return (
        <div className="home">
            <h1 className="title">롤 팀 경매장</h1>
            <div className="button-box">
                <button className="btn btn-border" onClick={() => {btnClicked('/create-auction')}}>
                    경매장 생성
                </button>
               
                <button className="btn btn-border" onClick={() => {openModal('/register-auction')}}>
                    선수 등록
                </button>

                <button className="btn btn-border" onClick={() => {openModal('/join-auction')}}>
                    경매 참가
                </button>
                <Modal isOpen={modalState} closeModal={closeModal}>
                    <h2>방 코드를 입력해주세요!</h2>
                    <input placeholder="스트리머분께 제공 받은 코드를 입력해주세요!" name="roomcode" onChange={getRoomCode}/>
                    <button type="button" className="codeBtn" onClick={()=>{postRoomCode()}}>완료</button>
                </Modal>

            </div>
        </div>
    )
}
