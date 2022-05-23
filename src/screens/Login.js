import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginInfo } from './State'

export default function Login() {
    
    const [token, setToken] = useRecoilState(loginInfo)

    useEffect(() => {
        const urlCode = new URLSearchParams(document.location.hash.slice(1)).get("access_token")
        
        if(urlCode !== null) {
            setToken(urlCode)
        }


    }, [])
    const login = () =>{
        window.open('https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=nwt477t3f1o4vh15qf3pdqyle90c4d&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671','_self')

    }

  return (
    <div>
        <button className="btn btn-border" onClick={() =>{login()}}>
            로그인
        </button>
    </div>
    
  )
}
