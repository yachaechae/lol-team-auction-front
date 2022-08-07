import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import Modal from './component/Modal';
import { loginInfoAtom } from './State';


const pointKeys = [
    "ironInitialPoint",
    "bronzeInitialPoint",
    "silverInitialPoint",
    "goldInitialPoint",
    "platinumInitialPoint",
    "diamondInitialPoint",
    "masterInitialPoint",
    "grandmasterInitialPoint",
    "challengerInitialPoint",
]
const minPointKeys = [
    "ironMinPoint",
    "bronzeMinPoint",
    "silverMinPoint",
    "goldMinPoint",
    "platinumMinPoint",
    "diamondMinPoint",
    "masterMinPoint",
    "grandmasterMinPoint",
    "challengerMinPoint"
]


export default function CreateAuction() {
    const navigate = useNavigate();
    const loginName = useRecoilValue(loginInfoAtom)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMinPoint, setIsOpenMinPoint] = useState(false)
    const [auctionInfo, setAuctionInfo] = useState({
        maxTeam: 0,
        ironInitialPoint: null,
        bronzeInitialPoint: null,
        silverInitialPoint: null,
        goldInitialPoint: null,
        platinumInitialPoint: null,
        diamondInitialPoint: null,
        masterInitialPoint: null,
        grandmasterInitialPoint: null,
        challengerInitialPoint: null,
        ironMinPoint: null,
        bronzeMinPoint: null,
        silverMinPoint: null,
        goldMinPoint: null,
        platinumMinPoint: null,
        diamondMinPoint: null,
        masterMinPoint: null,
        grandmasterMinPoint: null,
        challengerMinPoint: null,
    })

    const validatePointInput = () => {
        for (let index = 0; index < pointKeys.length; index++) {
            if (!auctionInfo[pointKeys[index]]) {
                return false
            }
            return true
        }
    }
    const validateMinPointInput = () => {
        for (let index = 0; index < minPointKeys.length; index++) {
            if (!auctionInfo[minPointKeys[index]]) {
                return false
            }
            return true
        }
    }
    const updateAuctionInfo = (e) => {
        setAuctionInfo({
            ...auctionInfo,
            [e.target.name]: e.target.value
        })
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const openModalMinPoint = () => {
        setIsOpenMinPoint(true)
    }

    const closeModal = (e) => {
        e.preventDefault()
        console.log(validatePointInput())
        if (validatePointInput()) {
            setIsOpen(false)
        } else {
            Swal.fire('경고!', "포인트를 다 입력했는지 확인해주세요", 'warning')
        }
    }
    const closeModalMinPoint = (e) => {
        e.preventDefault()
        console.log(validateMinPointInput())
        if (validateMinPointInput()) {
            setIsOpenMinPoint(false)
        } else {
            Swal.fire('경고!', "포인트를 다 입력했는지 확인해주세요", 'warning')
        }
    }
    const postAuctionInfo = () => {
        if (!auctionInfo.maxTeam) {
            Swal.fire('경고!', "팀 수를 꼭 입력해주세요!", "warning")
            return;
        }
        if (!(validatePointInput() && validateMinPointInput())) {
            Swal.fire('경고!', "포인트를 다시 한 번 확인해주세요!", "warning")
            return;
        }

        axios.post('http://119.192.243.12:13031/api/auction', {
            ...auctionInfo,
            ownerToken: loginName.token
        }).then(response => {
            Swal.fire({
                title: "생성완료!",
                html: `참가코드는 <br/> <b>` + response.data.data.auctionId + `</b><br/>입니다!`,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: "복사하기"
            }).then(res => {
                if (res.isConfirmed) {
                    navigator.clipboard.writeText(response.data.data.auctionId)
                }
            })
            navigate('/')
        })
    }


    return (
        <div className="create">
            <div className="container">
                <h1 className="title">{loginName.twitchName} 님!<br />
                    경매장 설정 정보를 입력해주세요!
                </h1>
                <div className="form">
                    <div className="form-group guide"> 팀 수 * 5 의 인원만 선수 등록이 가능하니 참고하여 주세요!<br/>선착순 마감!</div>
                    <div className="form-group">
                        <div className="input-title">팀 수</div>
                        <div className="input-box">
                            <input type="number" placeholder="숫자만 입력해주세요!" name="maxTeam" onChange={updateAuctionInfo}></input>
                        </div>
                    </div>
                    <div className="point-setting form-group">
                        <div className="point-title">포인트 설정</div>

                        <div className="point-btn input-box">
                            <button onClick={openModalMinPoint}>최소 입찰 포인트</button>

                            <button onClick={openModal}>팀장 포인트</button>
                        </div>
                    </div>
                    <div className="btn-box">
                        <button className="btn-border main" onClick={() => { navigate('/') }}>메인으로</button>
                        <button className="btn-border" onClick={() => { postAuctionInfo() }}>설정 완료</button>
                    </div>
                </div>
            </div>
            <div className="pointModal">
                <Modal isOpen={isOpenMinPoint} closeModal={closeModalMinPoint}>
                    <div className="point-title">최소 입찰 포인트</div>
                    <div className="input-box">
                        <input type="number" placeholder="아이언" name="ironMinPoint" value={auctionInfo.ironMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="브론즈" name="bronzeMinPoint" value={auctionInfo.bronzeMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="실버" name="silverMinPoint" value={auctionInfo.silverMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="골드" name="goldMinPoint" value={auctionInfo.goldMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="플래티넘" name="platinumMinPoint" value={auctionInfo.platinumMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="다이아몬드" name="diamondMinPoint" value={auctionInfo.diamondMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="마스터" name="masterMinPoint" value={auctionInfo.masterMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="그랜드마스터" name="grandmasterMinPoint" value={auctionInfo.grandmasterMinPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="챌린저" name="challengerMinPoint" value={auctionInfo.challengerMinPoint} onChange={updateAuctionInfo}></input>
                    </div>
                    <div className="btn-box">
                        <button className="btn-border" onClick={closeModalMinPoint}>설정 완료</button>
                    </div>
                </Modal>
            </div>

            <div className="pointModal">
                <Modal isOpen={isOpen} closeModal={closeModal}>
                    <div className="point-title">팀장 포인트</div>
                    <div className="input-box">
                        <input type="number" placeholder="아이언" name="ironInitialPoint" value={auctionInfo.ironInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="브론즈" name="bronzeInitialPoint" value={auctionInfo.bronzeInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="실버" name="silverInitialPoint" value={auctionInfo.silverInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="골드" name="goldInitialPoint" value={auctionInfo.goldInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="플래티넘" name="platinumInitialPoint" value={auctionInfo.platinumInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="다이아몬드" name="diamondInitialPoint" value={auctionInfo.diamondInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="마스터" name="masterInitialPoint" value={auctionInfo.masterInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="그랜드마스터" name="grandmasterInitialPoint" value={auctionInfo.grandmasterInitialPoint} onChange={updateAuctionInfo}></input>
                        <input type="number" placeholder="챌린저" name="challengerInitialPoint" value={auctionInfo.challengerInitialPoint} onChange={updateAuctionInfo}></input>
                    </div>
                    <div className="btn-box">
                        <button className="btn-border" onClick={closeModal}>설정 완료</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
