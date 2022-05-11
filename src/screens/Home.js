import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
                <h1>롤 팀 경매장</h1>
                <div className="buttonBox">
                    <Link to="create-auction" className="btn boxBorder">
                        경매장 생성
                    </Link>

                    <Link to="join-auction" className="btn boxBorder">
                       경매 참가
                    </Link>

                    <Link to="register-auction" className="btn boxBorder">
                       선수 등록
                    </Link>
                </div>
        </div>
    )
}
