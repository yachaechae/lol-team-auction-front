import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import Modal from './Modal'
import axiosInstance from '../../utils/AxiosHandler'

export default function TeamLeaderModal({data, isOpen, closeModal}) {    
    const location = useLocation()
    const {auctionId} = location.state ?? {}
    const [teamLeader,setTeamLeader] = useState([])
    const playerList = Object.keys(data) && Object.keys(data).map((player) => {
        return {
            value: data[player].twitchName,
            label: data[player].twitchName,
            
        }
    })
    const teamLeaderStyle = {
		container:(provided)=> ({
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
    const updateTeamLeader = (data) => {
        const leaderName = data.map((leader) => {
            return (leader.value)
        })
        setTeamLeader(leaderName)
    }
    const postTeamLeader = (e) => {
        axiosInstance.post(`/auction/update-leader`,{
            auctionId : auctionId,
            leaderTwitchName : teamLeader
        }).then(response => {
            closeModal(e)
        })
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <h2>각 팀의 팀장을 선택해주세요!</h2>
            <Select
                styles={teamLeaderStyle}
                options={playerList}
                isMulti={true}
                onChange={updateTeamLeader}
                placeholder='각 팀의 팀장을 팀수에 맞게 선택해주세요!'
            />
            <button type="button" className="codeBtn" onClick={(e)=>{postTeamLeader(e)}}>완료</button>
        </Modal>
    )
}