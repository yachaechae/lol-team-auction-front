import axios from 'axios';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { loginInfoAtom } from './State';

export default function CreateAuction() {
    const loginName = useRecoilValue(loginInfoAtom);
    const [auctionInfo,setAuctionInfo] = useState({
        maxTeam : 0,
        initialPoint : 0
    })
    const updateAuctionInfo = (e) => {
        setAuctionInfo({
            ...auctionInfo,
            [e.target.name] : e.target.value
        })
    }
    const postAuctionInfo = () => {
        axios.post('http://119.192.243.239:13030/api/auction',{
            ...auctionInfo,
            ownerToken : loginName.token
        }).then(response => {
            console.log("It's work!")
            console.log(response)
            alert(`참가코드는 \n`+response.data.data.auctionId+`\n입니다!`)
        })
    }

    return (
        <div className="create">
            <div className="container">
                <h1 className="title">{loginName.twitchName} 님!<br/>
                    경매장 설정 정보를 입력해주세요!
                </h1>
                <div className="form">
                    <div className="form-group">
                        <div className="input-title">팀 수</div>
                        <div className="input-box">
                            <input type="text" placeholder="숫자만 입력해주세요!" name="maxTeam" onChange={updateAuctionInfo}></input>
						</div>
                    </div>
                    <div className="form-group">
                        <div className="input-title">기본경매포인트</div>
                        <div className="input-box">
                            <input type="text" placeholder="숫자만 입력해주세요!" name="initialPoint" onChange={updateAuctionInfo}></input>
						</div>
                    </div>
                    <div>
                        <button className="btn-border" onClick={()=>{postAuctionInfo()}}>설정 완료</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
