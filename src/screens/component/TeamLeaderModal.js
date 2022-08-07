import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import Modal from './Modal'

export default function TeamLeaderModal({data, isOpen, closeModal}) {    
    const location = useLocation()
    const {auctionId} = location.state ?? {}
    const [teamLeader,setTeamLeader] = useState([])
    console.log(data)
    console.log(Object.keys(data))
    const playerList = Object.keys(data) && Object.keys(data).map((player) => {
        return {
            value: data[player].twitchName,
            label: data[player].twitchName,
            
        }
    })
    const updateTeamLeader = (data) => {
        const leaderName = data.map((leader) => {
            return (leader.value)
        })
        setTeamLeader(leaderName)
    }
    const postTeamLeader = (e) => {
        axios.post('http://119.192.243.12:13031/api/auction/update-leader ',{
            auctionId : auctionId,
            leaderTwitchName : teamLeader
        }).then(response => {
            console.log("It's work!")
            closeModal(e)
        })
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <h2>각 팀의 팀장을 선택해주세요!</h2>
            <div>
                <Select
                    options={playerList}
                    isMulti={true}
                    onChange={updateTeamLeader}
                />
            </div>
            <button type="button" className="codeBtn" onClick={(e)=>{postTeamLeader(e)}}>완료</button>
        </Modal>
    )
}