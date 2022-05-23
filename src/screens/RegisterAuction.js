import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { twitchName } from './State';
import { useRecoilValue } from 'recoil';

const TIER_IMG_PATH = "/img/tier";
const POSITION_IMG_PATH = "/img/position";
export default function RegisterAuction() {
	
	const loginName = useRecoilValue(twitchName)

	const [userName, setUserName] = useState()
	const [tier, setTier] = useState('Iron')
	const [tierNum, setTierNum] = useState()
	const [position, setPosition] = useState()
	const [subposition, setSubposition] = useState()
	const [champions, setChampions] = useState([])
	const [most, setMost] = useState([])

	const updateUserName = (data) => {
		setUserName(data.target.value)
	}

	// 랭크티어 이미지 정보
	const ranktier = [
		{ value: 'iron', label: 'Iron', image: `${TIER_IMG_PATH}/iron.png`},
		{ value: 'bronze', label: 'Bronze', image:`${TIER_IMG_PATH}/bronze.png`},
		{ value: 'silver', label: 'Silver', image:`${TIER_IMG_PATH}/silver.png`},
		{ value: 'gold', label: 'Gold', image:`${TIER_IMG_PATH}/gold.png`},
		{ value: 'platinum', label: 'Platinum', image:`${TIER_IMG_PATH}/platinum.png`},
		{ value: 'diamond', label: 'Diamond', image:`${TIER_IMG_PATH}/diamond.png`},
		{ value: 'master', label: 'Master', image:`${TIER_IMG_PATH}/master.png` },
		{ value: 'grandmaster', label: 'Grandmaster', image:`${TIER_IMG_PATH}/grandmaster.png`},
		{ value: 'challenger', label: 'Challenger', image:`${TIER_IMG_PATH}/challenger.png`},
	  ]

	// 랭크 셀렉트 박스 css 설정
	const tierStyles = {
		container:(provided)=> ({
			...provided,
			maxWidth: '195px',
			width: '100%',
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
		setTier(data.label)
	}
	const updateTierNum = (data) => {
		setTierNum(data.target.value)
	}

	//포지션 정보 업데이트
	const updatePosition = (data) => {
		setPosition(data.target.value)
	}

	const updateSubposition = (data) => {
		setSubposition(data.target.value)
	}

	//챔피언 정보 가져오기
	useEffect(() => {
		getChampionInfo();
	},[])

	const getChampionInfo = () => {
		axios({
			method: 'get',
			url: 'https://ddragon.leagueoflegends.com/cdn/12.9.1/data/ko_KR/champion.json'
		}).then((res)=>{
			const champion = Object.keys(res.data.data).map((championinfo) => {				
				return {
					value : res.data.data[championinfo].name,
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
		placeholder: (provided) => ({
			...provided,
			fontSize: '15px',
			fontFamily: 'SCoreDream',
			textAlign: 'left',
		}),
		menu: (provided) => ({
			...provided,
			width: '106%',
		}),
		menuList: (provided) => ({
			...provided,
			textAlign: 'left',
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
		})
	}	

	const updateMost = (data) => {
		if (data.length > 3) {
			alert("3개만 선택해주세요")
			return
		}
		setMost(data)
	}


	return (
		<div className="create register">
			<div className="container">
				<h1 className="title">{loginName} 님!<br />
					정보를 입력해주세요!
				</h1>
				<div className="form">
					<div className="form-group">
						<div className="input-title">롤 닉네임</div>
						<div className="input-box">
							<input type="text" placeholder="롤 닉네임을 입력해주세요" onChange={updateUserName}></input>
						</div>

					</div>
					<div className="form-group">
						<div className="input-title">최고티어</div>
						<div className='input-box tier-option'>
							<Select
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
									<input type="radio" value="1" name="tier" onChange={updateTierNum}/>1
								</label>
								<label>
									<input type="radio" value="2" name="tier" onChange={updateTierNum}/>2
								</label>
								<label>
									<input type="radio" value="3" name="tier" onChange={updateTierNum}/>3
								</label>
								<label>
									<input type="radio" value="4" name="tier" onChange={updateTierNum}/>4
								</label>
							</div>
						</div>
						
					</div>
					<div className="form-group">
						<div className="input-title">주 라인</div>
						<div className="input-box position">
							<label className="position-radio">
								<input type="radio" value="Top" name="position" onChange={updatePosition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Top.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Jungle" name="position" onChange={updatePosition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Jungle.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Mid" name="position" onChange={updatePosition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Mid.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Bot" name="position" onChange={updatePosition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Bot.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Support" name="position" onChange={updatePosition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Support.png`}/>
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="input-title">부 라인</div>
						<div className="input-box position">
							<label className="position-radio">
								<input type="radio" value="Top" name="subPosition" onChange={updateSubposition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Top.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Jungle" name="subPosition" onChange={updateSubposition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Jungle.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Mid" name="subPosition" onChange={updateSubposition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Mid.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Bot" name="subPosition" onChange={updateSubposition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Bot.png`}/>
							</label>							
							<label className="position-radio">
								<input type="radio" value="Support" name="subPosition" onChange={updateSubposition}/>
								<img src={`${POSITION_IMG_PATH}/Position_${tier}-Support.png`}/>
							</label>
						</div>
					</div>
					<div className="form-group">
						<div className="input-title">MOST 3</div>
						<div className="input-box champion-opction">
							<Select
								value={most}
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
					<button className="btn-border">설정 완료</button>
				</div>
			</div>
		</div>
	) 
}
