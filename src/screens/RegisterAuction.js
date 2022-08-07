import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { loginInfoAtom } from './State';
import { useRecoilValue } from 'recoil';
import { ranktier } from '../utils/RankImg';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestChampData } from '../utils/DataDragonUtils';
import Swal from 'sweetalert2';

const POSITION_IMG_PATH = "/img/position";
export default function RegisterAuction() {
	const navigator = useNavigate();
	const location = useLocation()
	const roomInfo = location.state ?? {}
	
	const loginName = useRecoilValue(loginInfoAtom);
	const [champions, setChampions] = useState([])
	const [userInfo,setUserInfo] = useState({
		userName : '',
		userTier : 'Iron',
		userTierNum : '',
		userPosition : '',
		userSubPosition : '',
		userMost : ''
	});

	const updateUserInfo = (e) => {
		console.log(e)
		setUserInfo({
			...userInfo,
			[e.target.name] : e.target.value
		})
	}

	// 랭크 셀렉트 박스 css 설정
	const tierStyles = {
		container:(provided)=> ({
			...provided,
			maxWidth: '195px',
			margin: '0 5% 0 0'
		}),
		control: (provided) => ({
			...provided,
			padding: '0.5em 0em'
		}),
		placeholder: (provided) => ({
			...provided,
			fontSize: '15px',
			fontFamily: 'SCoreDream',
			textAlign: 'left',
		})
	}
	//티어 정보 업데이트
	const updateTier = (data) => {
		setUserInfo({
			...userInfo,
			userTier : data.label})
	}

	//챔피언 정보 가져오기
	useEffect(() => {
		getChampionInfo();
	},[])

	const getChampionInfo = () => {
		requestChampData().then((res)=>{
			const champion = Object.keys(res.data.data).map((championinfo) => {				
				return {
					value : res.data.data[championinfo].id,
					label : res.data.data[championinfo].name,
					image : `http://ddragon.leagueoflegends.com/cdn/${res.data.data[championinfo].version}/img/champion/${res.data.data[championinfo].id}.png`
				}
			})
			champion.sort((current, next) =>{
				return current.label < next.label ? -1 : current.label > next.label ? 1 : 0
			})
			setChampions(champion)
		})

	}
	// 챔피언 셀렉트 박스 css 설정
	const championStyles = {
		control: (provided) => ({
			...provided,
			width: '106%',
		}),		
		control: (provided) => ({
			...provided,
			padding: '0.5em 0em'
		}),
		placeholder: (provided) => ({
			...provided,
			fontSize: '15px',
			fontFamily: 'SCoreDream',
			textAlign: 'left',
		}),
		menuList: (provided) => ({
			...provided,
			textAlign: 'left',
			height: '200px',
			"::-webkit-scrollbar" : {
				width: '8px',  
			},			
			"::-webkit-scrollbar-thumb" : {
				height: '30%',
				background: '#595959',			
				borderRadius: '10px',
			},
			"::-webkit-scrollbar-thumb:hover": {
				background: "#717171"
			  },
			"::-webkit-scrollbar-track" : {
				background: '#D9D9D9', 
			}
			

		}),
		option: (provided) => ({
			...provided,
			display: 'inline-block',
			width: '75px',
		}),
		multiValue: (provided) => ({
			...provided,
			maxWidth: '65px',
			margin: '0 2px'
		})
	}	

	const updateMost = (data) => {
		if (data.length > 3) {
            Swal.fire('경고!',"3개만 선택해주세요!",'error')
			return
		}
		setUserInfo({
			...userInfo,
			userMost : data})
	}

	const postUserInfo = () => {
		if (!userInfo.userName) {
            Swal.fire('경고!',"롤 닉네임을 입력해주세요!",'error')
		}else if (!userInfo.userTier || !userInfo.userTierNum) {
            Swal.fire('경고!',"티어 정보를 입력해주세요!",'error')
		}else if(!userInfo.userPosition){
            Swal.fire('경고!',"주라인을 선택해주세요!",'error')
		}else if(!userInfo.userSubPosition){
            Swal.fire('경고!',"부라인을 선택해주세요!",'error')
		}else if(!userInfo.userMost){
            Swal.fire('경고!',"챔피언을 선택해주세요!",'error')
		}else if(userInfo.userMost.length <= 2){
            Swal.fire('경고!',"챔피언 3개를 선택해주세요!",'error')
		}

		const championNames = userInfo.userMost.map((championName) => (
			championName.value
		))
		console.log(championNames)
		
		if ((userInfo.userName) && (userInfo.userTier || userInfo.userTierNum) && (userInfo.userPosition) && (userInfo.userSubPosition) && (userInfo.userMost.length == 3)) {
			
		axios.post('http://119.192.243.12:13031/api/auction/register',{
			// 보내려는 데이터 정보
			lolName : userInfo.userName,
			highestTier : userInfo.userTier + userInfo.userTierNum ,
			primaryLane : userInfo.userPosition,
			secondaryLane : userInfo.userSubPosition,
			playerMost : championNames,
			twitchToken : loginName.token,
			auctionId : roomInfo.auctionId,
			profileImg : parseInt(Math.random() * 9)
		}).then((response) => {
			console.log("It's work!")
			console.log(response)
            // TODO: 신청이 완료되었습니다! 띄워주기 => 다시 메인으로 보내기
			Swal.fire('성공!',"등록이 완료되었습니다!",'success')
			
			navigator('/')
		}).catch((error) =>{
			if (error.response.data.errorCode === "1002") {
				Swal.fire('경고!',"이미 등록된 계정입니다.",'error')
				navigator('/')
			}
		})
		
	}
	}


	console.log(userInfo)

	return (
		<div className="register">
			<h1 className="title">{roomInfo.auctionOwnerName} 의 경매장</h1>
			<div className="create">
				<div className="container">
					<h1 className="title">{loginName.twitchName} 님!<br />
						정보를 입력해주세요!
					</h1>
					<div className="form">
					<div className="form-group guide"> 본인의 부주의로 인한 불이익은 책임지지않습니다!</div>
						<div className="form-group">
							<div className="input-title">롤 닉네임</div>
							<div className="input-box">
								<input type="text" placeholder="롤 닉네임을 입력해주세요" name="userName" onChange={updateUserInfo}></input>
							</div>

						</div>
						<div className="form-group">
							<div className="input-title">최고티어</div>
							<div className='input-box tier-option'>
								<Select
									name='userTier'
									styles={tierStyles}
									options={ranktier} 
									onChange={updateTier}
									placeholder='티어를 선택해주세요'
									formatOptionLabel={tier => (
										<div>
											<img src={tier.image} alt={tier.image} className="tier-img"/>
										</div>
									)}
								/>
								<div className="tier-radio">
									<label>
										<input type="radio" value="1" name="userTierNum" onChange={updateUserInfo}/>1
									</label>
									<label>
										<input type="radio" value="2" name="userTierNum" onChange={updateUserInfo}/>2
									</label>
									<label>
										<input type="radio" value="3" name="userTierNum" onChange={updateUserInfo}/>3
									</label>
									<label>
										<input type="radio" value="4" name="userTierNum" onChange={updateUserInfo}/>4
									</label>
								</div>
							</div>
							
						</div>
						<div className="form-group">
							<div className="input-title">주 라인</div>
							<div className="input-box position">
								<label className="position-radio">
									<input type="radio" value="Top" name="userPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Top.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Jungle" name="userPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Jungle.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Mid" name="userPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Mid.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Bot" name="userPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Bot.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Support" name="userPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Support.png`}/>
								</label>
							</div>
						</div>
						<div className="form-group">
							<div className="input-title">부 라인</div>
							<div className="input-box position">
								<label className="position-radio">
									<input type="radio" value="Top" name="userSubPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Top.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Jungle" name="userSubPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Jungle.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Mid" name="userSubPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Mid.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Bot" name="userSubPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Bot.png`}/>
								</label>							
								<label className="position-radio">
									<input type="radio" value="Support" name="userSubPosition" onChange={updateUserInfo}/>
									<img src={`${POSITION_IMG_PATH}/Position_${userInfo.userTier}-Support.png`}/>
								</label>
							</div>
						</div>
						<div className="form-group">
							<div className="input-title">MOST 3</div>
							<div className="input-box champion-opction">
								<Select
									value={userInfo.userMost}
									name="userMost"
									closeMenuOnSelect={false}
									isMulti={true}
									styles={championStyles}
									options={champions} 
									onChange={updateMost}
									placeholder="챔피언을 선택해주세요"
									formatOptionLabel={champions => (
										<img src={champions.image} alt={champions.image} className="champions-img"/>
									)}
								/>
							</div>
						</div>			
						<div className="btn-box">
							<button className="btn-border main" onClick={()=>{navigator('/')}}>메인으로</button>
							<button className="btn-border" onClick={()=>{postUserInfo()}}>등록 완료</button>
						</div>			
					</div>
				</div>
			</div>
		</div>
	) 
}
