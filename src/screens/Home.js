import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import ModalFrame from '../utils/ModalFrame'
import { loginInfoAtom } from './State'

export default function Home() {

    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)    
    const [modalState, setModalState] = useState(false)
    const navigator = useNavigate();
    
    useEffect(() => {
        axios.get('https://id.twitch.tv/oauth2/userinfo',
        {
        headers : {
            Authorization : `Bearer ${loginInfo.token}`
        }
        }).then((result)=>{
            console.log(result)
            setLoginInfo({
                ...loginInfo,
                twitchName : result.data.preferred_username,
            })
        }).catch((error)=>{
            console.log(error.response.status)
        }) 
        
    }, [])

    const btnClicked = (data) => {
        if (!loginInfo.token) {
            console.log(loginInfo)
            alert('로그인 후 이용해주세요!')
            navigator('/login')
        }else {
            navigator(data)
        }
    }

    const openModal = () =>{
        setModalState(true)
    }

    const closeModal = (e) =>{
        e.preventDefault()
        setModalState(false)
    }


    return (
        <div className="home">
            <h1 className="title">롤 팀 경매장</h1>
            <div className="button-box">
                <button className="btn btn-border" onClick={() => {btnClicked('/create-auction')}}>
                    경매장 생성
                </button>
               
                <button className="btn btn-border" onClick={() => {btnClicked('/register-auction')}}>
                    선수 등록
                </button>

                <button className="btn btn-border" onClick={() => { openModal()}}>
                    경매 참가
                </button>
                <ModalFrame state={modalState} closeModal={closeModal} />

            </div>
        </div>
    )
}
