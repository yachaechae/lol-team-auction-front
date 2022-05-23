import React from 'react'
import { useRecoilValue } from 'recoil';
import { twitchName } from './State';

export default function CreateAuction() {
    const loginName = useRecoilValue(twitchName);
    return (
        <div className="create">
            <div className="container">
                <h1 className="title">{loginName} 님!<br/>
                    경매장 설정 정보를 입력해주세요!
                </h1>
                <div className="form">
                    <div className="form-group">
                        <div className="input-title">팀        수</div>
                        <div className="input-box">
                            <input type="text" placeholder="숫자만 입력해주세요!"></input>
						</div>
                    </div>
                    <div className="form-group">
                        <div className="input-title">기본경매포인트</div>
                        <div className="input-box">
                            <input type="text" placeholder="숫자만 입력해주세요!"></input>
						</div>
                    </div>
                    <div>
                        <button className="btn-border">설정 완료</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
