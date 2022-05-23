import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginInfo, twitchName } from './State'

export default function Home() {

    const [loginName, setLoginName] = useRecoilState(twitchName)
    const [token, setToken] = useRecoilState(loginInfo)
    const navigator = useNavigate()

    useEffect(() => {
        axios.get('https://id.twitch.tv/oauth2/userinfo',
        {
        headers : {
            Authorization : `Bearer ${token}`
        }
        }).then((result)=>{
            setLoginName(result.data.preferred_username)
        }).catch((error)=>{
            console.log(error.response.status)
        }) 
        
    }, [])

    const btnClicked = (data) => {
        if (!token === true) {
            alert('로그인 후 이용해주세요!')
        }else {
            navigator(data, {
                state: {
                    twitchName: loginName
                }
            })
        }
    }

    return (
        <div className="home">
            <h1 className="title">롤 팀 경매장</h1>
            <div className="button-box">
                <button className="btn btn-border" onClick={() => {btnClicked('/create-auction')}}>
                    경매장 생성
                </button>

                <button className="btn btn-border" onClick={() => {btnClicked('/join-auction/')}}>
                    경매 참가
                </button>

                <button className="btn btn-border" onClick={() => {btnClicked('/register-auction')}}>
                    선수 등록
                </button>
            </div>
        </div>
    )
}
