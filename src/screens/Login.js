import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginInfoAtom } from './State'

export default function Login() {
    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
    const navigator = useNavigate()

    useEffect(() => {
        const token = new URLSearchParams(document.location.hash.slice(1)).get("access_token")
        
        if(!!token) {
            setLoginInfo({
                token: token
            })
        }
    }, [])

    useEffect(() => {
        if(!!loginInfo.token) {
            navigator('/')
        }
    }, [loginInfo])
    
    const login = () =>{
        window.open(`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=nwt477t3f1o4vh15qf3pdqyle90c4d&redirect_uri=${process.env.REACT_APP_LOGIN_URL}/login&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671`,'_self')

    }
    
  return (
    <div className="login">
        <a className="login-btn" onClick={() =>{login()}}>
            <span className="login-btn-outline login-btn-outline--tall">
                <span className="login-btn-line login-btn-line--tall"></span>
                <span className="login-btn-line login-btn-line--flat"></span>
            </span>
            <span className="login-btn-outline login-btn-outline--flat">
                <span className="login-btn-line login-btn-line--tall"></span>
                <span className="login-btn-line login-btn-line--flat"></span>
            </span>
            <span className="login-btn-solid"></span>
            <span className="login-btn-text">Login</span>
        </a>

    </div>
    
  )
}
