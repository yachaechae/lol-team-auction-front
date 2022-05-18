import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    const [twitchName, settwitchName] = useState()
    const urlCode = new URLSearchParams(document.location.hash.slice(1)).get("access_token")
    axios.get('https://id.twitch.tv/oauth2/userinfo',
    {
      headers : {
        Authorization : `Bearer ${urlCode}`
      }
    }).then((result)=>{
        settwitchName(result.data.preferred_username)
    })
    
    console.log(twitchName)


    return (
        <div className="home">
                <h1 className="title">롤 팀 경매장</h1>
                <div className="button-box">
                    <Link to="create-auction" className="btn btn-border">
                        경매장 생성
                    </Link>

                    <Link to="join-auction" className="btn btn-border">
                       경매 참가
                    </Link>

                    <Link to="register-auction" className="btn btn-border">
                       선수 등록
                    </Link>
                </div>
                <a href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=nwt477t3f1o4vh15qf3pdqyle90c4d&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671">테스트</a>        
        </div>
    )
}
