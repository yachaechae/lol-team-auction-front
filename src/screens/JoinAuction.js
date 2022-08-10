import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import Timer from './component/Timer';
import TeamLeaderModal from './component/TeamLeaderModal';
import KickPlayerModal from './component/KickPlayerModal';
import { loginInfoAtom } from './State';
import { useLocation, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { requestChampData } from '../utils/DataDragonUtils';
import ErrorAlert from '../error/ErrorCodeHandler';

const POSITION_IMG_PATH = "/img/position";
const TIER_IMG_PATH = "/img/tier";

const emojiList = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
const leaderEmojiList = ["😎", "🤠", "😄", "🤗", "🤓", "🥸", "🤔", "😋", "🥳"]


let sockJS;
let stompClient;

let version;
export default function JoinAuction() {
    const navigator = useNavigate();
    const location = useLocation()
    const { auctionId, auctionOwnerName } = location.state ?? {}
    const loginName = useRecoilValue(loginInfoAtom)
    const [modalState, setModalState] = useState(false)
    const [kickModal, setKickModal] = useState(false)

    const [point, setPoint] = useState()
    const [playerInfo, setPlayerInfo] = useState({})
    const [playerList, setPlayerList] = useState([])
    const [message, setMessage] = useState([])
    const [leaderInfo, setLeaderInfo] = useState()
    const [time, setTime] = useState(0)
    const [bidPoint, setBidPoint] = useState()
    const scroll = useRef()

    const openModal = () => {
        setModalState(true)
    }

    const closeModal = (e) => {
        e.preventDefault()
        setModalState(false)
    }
    const openKickModal = () => {
        setKickModal(true)
    }

    const closeKickModal = (e) => {
        e.preventDefault()
        setKickModal(false)
    }

    const waitingPlayer = playerList && playerList.map((player, index) => {
        return (
            <div key={index} className="player">
                <div className="emoji">
                    {emojiList[player.profileImg]}
                </div>
                {player.twitchName}
                <div className="tier-img">
                    <img className="position-img" src={`${POSITION_IMG_PATH}/Position_${player.highestTier.replace(/[0-9]/g, "")}-${player?.primaryLane}.png`} />
                    <img className="position-img" src={`${POSITION_IMG_PATH}/Position_${player.highestTier.replace(/[0-9]/g, "")}-${player?.secondaryLane}.png`} />
                </div>
            </div>
        )
    })

    const team = leaderInfo && leaderInfo.map((leader, index) => {
        return (
            <div keys={index} className="team-list">
                <div className="player leader">
                    <div className="emoji">
                        {leaderEmojiList[leader.leader.profileImg]}
                    </div>
                    {leader.leader.twitchName}
                    <div className="point">{leader.teamPoint}</div>
                </div>
                {
                    leader.playerList && leader.playerList.map((player) => {
                        if (player.playerType === "GENERAL") {
                            return (
                                <div className="player">
                                    <div className="emoji">
                                        {emojiList[player.profileImg]}
                                    </div>
                                    {player.twitchName}<br />
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    })

    useEffect(() => {
        sockJS = new SockJS(`${process.env.REACT_APP_SOCKET_URL}/ws`);
        stompClient = Stomp.over(sockJS);

        stompClient.connect({ user: loginName.twitchName, auctionId: auctionId }, async () => {
            version = (await requestChampData()).data.version
            stompClient.subscribe('/user/sub/info', (data) => {
                setLeaderInfo(JSON.parse(data.body).team)
                setPlayerList(JSON.parse(data.body).waitingPlayer)
                setPlayerInfo(JSON.parse(data.body).processingInfo?.auctionPlayer)
                setBidPoint(JSON.parse(data.body).processingInfo?.biddingPoint)
            })

            stompClient.subscribe(`/sub/auction/${auctionId}/info`, (data) => {
                setLeaderInfo(JSON.parse(data.body).message.team)
                setPlayerList(JSON.parse(data.body).message.waitingPlayer)
                setPlayerInfo(JSON.parse(data.body).message.processingInfo?.auctionPlayer)
                setBidPoint(JSON.parse(data.body).message.processingInfo?.biddingPoint)
            })

            //경매로그 나오는 부분
            stompClient.subscribe(`/sub/auction/${auctionId}`, (data) => {

                if (JSON.parse(data.body).type === "AUCTION_PREPARE") {
                    setTime(5)
                    setPoint(0)
                } else if (JSON.parse(data.body).type === "AUCTION_START" || JSON.parse(data.body).type === "BID_ACCEPTED") {
                    setTime(15)
                }

                setMessage((message) => {
                    return [...message, JSON.parse(data.body).message]
                })
            })

            stompClient.subscribe('/user/sub/errors', (data) => {
                ErrorAlert(JSON.parse(data.body))
            })
            stompClient.send('/pub/auction/join', {}, JSON.stringify({ auctionId: auctionId, userName: loginName.twitchName }))
        }, (err) => {
            navigator('/login')
        })


        return () => {
            stompClient.disconnect();
            sockJS.close();
        }
    }, [])

    const messageView = message.map((data) => {
        return (
            <div className="message">{data}</div>
        )
    });

    useEffect(() => {
        chatScroll()
    }, [message])

    const chatScroll = () => {
        const { scrollHeight, clientHeight } = scroll.current;
        scroll.current.scrollTop = scrollHeight - clientHeight
    }

    const auctionStart = () => {
        stompClient.send('/pub/auction/start', {}, JSON.stringify({ auctionId: auctionId }))
    }

    const auctionPause = () => {
        stompClient.send('/pub/auction/pause', {}, JSON.stringify({ auctionId: auctionId }))

    }

    const championImgs = () => {
        const champImg = playerInfo?.playerMost && playerInfo.playerMost.map((champImg) => {
            return <img className="champion-img" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champImg.name}.png`} />
        })
        return champImg
    }

    const enterPoint = (e) => {
        setPoint(e.target.value)
    }

    const plusBtn = (e) => {
        if (point < bidPoint) {
            setPoint(Number(bidPoint) + Number(e.target.value))
        } else {
            setPoint(Number(point) + Number(e.target.value))
        }
    }


    const bid = () => {
        stompClient.send('/pub/auction/bid', {}, JSON.stringify({ auctionId: auctionId, bidPoint: point }))
    }


    return (
        <div className="join">
            <h1 className="title">{auctionOwnerName} 의 경매장</h1>
            <div className="container">
                <div className="auction">
                    <div className="palyer">
                        <div className="player-info">
                            <span>트위치 닉</span> {playerInfo?.twitchName}
                        </div>
                        <div className="player-info">
                            <span>롤 닉</span> {playerInfo?.lolName}
                        </div>
                        <div className="player-info">
                            <span>티어 정보</span>
                            {playerInfo?.highestTier &&
                                <>
                                    <img className="tier-img" src={`${TIER_IMG_PATH}/${playerInfo?.highestTier.replace(/[0-9]/g, "")}.png`} alt={playerInfo?.highestTier.replace(/[0-9]/g, "")} />
                                    {playerInfo?.highestTier.replace(/[^0-9]/g, "")}
                                </>
                            }
                        </div>
                        <div className="player-info">
                            <span>모스트 3</span>
                            <div className="img-box">
                                {championImgs()}
                            </div>
                        </div>

                        <div className="player-info">
                            <span>주 라인</span>
                            {!!playerInfo?.highestTier &&
                                <img className="position-img" src={`${POSITION_IMG_PATH}/Position_${playerInfo?.highestTier.replace(/[0-9]/g, "")}-${playerInfo?.primaryLane}.png`} />
                            }
                        </div>
                        <div className="player-info">
                            <span>부 라인</span>
                            {!!playerInfo?.highestTier &&
                                <img className="position-img" src={`${POSITION_IMG_PATH}/Position_${playerInfo?.highestTier.replace(/[0-9]/g, "")}-${playerInfo?.secondaryLane}.png`} />
                            }
                        </div>

                    </div>
                    <div className="chat-container" >
                        <div className="chat-box" ref={scroll}>
                            {messageView}
                        </div>
                        <div className="auction-info">
                            <Timer seconds={time} setSeconds={setTime} />
                            현재 낙찰가
                            <div>
                                {bidPoint}
                            </div>
                        </div>

                    </div>
                    <div className="auction-form">
                        {/* TODO : 채팅 연결 */}
                        {auctionOwnerName === loginName.twitchName ?
                            <div className="admin-form">
                                <div className="btn-box admin-btn">
                                    <button onClick={openKickModal}>강퇴</button>
                                    <KickPlayerModal isOpen={kickModal} closeModal={closeKickModal}/>              
                                    <button onClick={openModal}>팀장 선정</button>
                                    <TeamLeaderModal data={playerList} isOpen={modalState} closeModal={closeModal} />
                                    <button className="pause" onClick={auctionPause}>일시 정지</button>
                                    <button className="start" onClick={auctionStart}>경매 시작</button>
                                </div>
                                <input type="number" placeholder="숫자만 입력해주세요!" name="point" value={point} onChange={enterPoint} />
                                <div className="btn-box">
                                    <button onClick={plusBtn} value="5">+5</button>
                                    <button onClick={plusBtn} value="10">+10</button>
                                    <button onClick={plusBtn} value="50">+50</button>
                                    <button onClick={plusBtn} value="100">+100</button>
                                    <button className="buy" onClick={bid}>입찰</button>
                                </div>
                            </div>
                            :
                            <>
                                <input type="number" placeholder="숫자만 입력해주세요!" name="point" value={point} onChange={enterPoint} />
                                <div className="btn-box">
                                    <button onClick={plusBtn} value="5">+5</button>
                                    <button onClick={plusBtn} value="10">+10</button>
                                    <button onClick={plusBtn} value="50">+50</button>
                                    <button onClick={plusBtn} value="100">+100</button>
                                    <button className="buy" onClick={bid}>입찰</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="team">
                    <div className="player-board">
                        {waitingPlayer}

                    </div>
                    <div className="player-board team-board">
                        {team}
                    </div>
                </div>
            </div>
        </div>
    )
}

