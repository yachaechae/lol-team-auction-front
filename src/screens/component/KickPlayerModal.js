import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Select from 'react-select'
import { loginInfoAtom } from '../State'
import Modal from './Modal'
import axiosInstance from '../../utils/AxiosHandler'

export default function KickPlayerModal({isOpen, closeModal }) {
    const location = useLocation()
    const { auctionId } = location.state ?? {}
    const ownerToken = useRecoilValue(loginInfoAtom)
    const [kickPlayer, setKickPlayer] = useState([])
    const [allPlayers, setAllPlayers] = useState([])

    useEffect(() =>{
        axiosInstance.get(`/auction/player/${auctionId}`).then((response)=>{
            setAllPlayers(response.data.data)
        })
    },[])
    
    const playerList = allPlayers && allPlayers.map((player,index) => {
        return {
            value: player.twitchName,
            label: player.twitchName,
            id: player.id
        }
    })

    const kickModalStyle = {
        container: (provided) => ({
            ...provided,
            maxWidth: '350px',
            width: '100%',
        }),
        control: (provided) => ({
            ...provided,
            padding: '0.5em 0em'
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '15px',
            fontFamily: 'LeferiPoint-WhiteA',
            textAlign: 'left',
        })
    }
    const updateKickPlayer = (data) => {
        setKickPlayer(data.id)
    }
    const postKickPlayer = (e) => {
        axiosInstance.delete(`/auction/player`, {
            data: {
                twitchToken : ownerToken.token,
                auctionId: auctionId,
                playerId : kickPlayer
            }
        }).then(() => {
            closeModal(e)
        })
    }
    
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <h2>내보낼 사람을 선택해주세요</h2>
            <Select
                styles={kickModalStyle}
                options={playerList}
                onChange={updateKickPlayer}
                placeholder='내보낼 사람을 선택해주세요!'
            />
            <button type="button" className="codeBtn" onClick={(e) => { postKickPlayer(e) }}>완료</button>
        </Modal>
    )
}