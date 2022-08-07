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
        window.open('https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=nwt477t3f1o4vh15qf3pdqyle90c4d&redirect_uri=http://localhost:3000/login&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671','_self')

    }

  return (
    <div>
        <a className="login-btn" onClick={() =>{login()}}>
            <span className="login-btn__outline login-btn__outline--tall">
                <span className="login-btn__line login-btn__line--tall"></span>
                <span className="login-btn__line login-btn__line--flat"></span>
            </span>
            <span className="login-btn__outline login-btn__outline--flat">
                <span className="login-btn__line login-btn__line--tall"></span>
                <span className="login-btn__line login-btn__line--flat"></span>
            </span>
            <span className="login-btn__solid"></span>
            <span className="login-btn__text">Login</span>
        </a>

    </div>
    
  )
}
