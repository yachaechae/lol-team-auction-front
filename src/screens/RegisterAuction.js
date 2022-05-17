import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default function RegisterAuction() {
	
	const [champions, setChampions] = useState([])
	const [most, setMost] = useState([])

	// 랭크티어 이미지 정보
	const ranktier = [
		{ value: 'iron', label: 'Iron', image: '/img/iron.png'},
		{ value: 'bronze', label: 'Bronze', image:'/img/bronze.png'},
		{ value: 'silver', label: 'Silver', image:'/img/silver.png'},
		{ value: 'gold', label: 'Gold', image:'/img/gold.png'},
		{ value: 'platinum', label: 'Platinum', image:'/img/platinum.png'},
		{ value: 'diamond', label: 'Diamond', image:'/img/diamond.png'},
		{ value: 'mater', label: 'mater', image:'/img/master.png' },
		{ value: 'grandmater', label: 'Grandmater', image:'/img/grandmater.png'},
		{ value: 'challenger', label: 'Challenger', image:'/img/challenger.png'},
	  ]

	// 랭크 셀렉트 박스 css 설정
	const tierStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: 'transparent',
		}),
		placeholder: (provided) => ({
			...provided,
			fontSize: '15px',
			fontFamily: 'SCoreDream',
			textAlign: 'left',
		})
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

	const updateMost = (data, action) => {
		if (data.length > 3) {
			alert("3개만 선택해주세요")
			return
		}
		setMost(data)

	}

	return (
		<div className="create register">
			<div className="container">
				<h1 className="title">{"{트위치이름}"} 님!<br />
					정보를 입력해주세요!
				</h1>
				<div className="form">
					<div className="form-group">
						<div className="input-title">롤 닉네임</div>
						<div className="input-box">
							<input type="text" placeholder="롤 닉네임을 입력해주세요"></input>
						</div>

					</div>
					<div className="form-group">
						<div className="input-title">최고티어</div>
						<div className='input-box tier-option'>
							<Select
								styles={tierStyles}
								placeholder='티어를 선택해주세요'
								options={ranktier} 
								formatOptionLabel={tier => (
									<div>
										<img src={tier.image} alt={tier.image} className="tier-img"/>
									</div>
								)}
							/>
							<div className="tier-radio">
								<input type="radio" value="1" name="1"/>1
								<input type="radio" value="2" name="2"/>2
								<input type="radio" value="3" name="3"/>3
								<input type="radio" value="4" name="4"/>4
							</div>
						</div>
						
					</div>
					<div className="form-group">
						<div className="input-title">주 라인</div>
						<div className="input-box">
							<input type="text" placeholder="주 라인을 입력해주세요"></input>
						</div>
					</div>
					<div className="form-group">
						<div className="input-title">부 라인</div>
						<div className="input-box">
							<input type="text" placeholder="부 라인을 입력해주세요"></input>
						</div>
					</div>
					<div className="form-group">
						<div className="input-title">MOST 3</div>
						<div className="input-box champion-opction">
							<Select
								value={most}
								closeMenuOnSelect={false}
								onChange={updateMost}
								styles={championStyles}
								options={champions} 
								isMulti={true}
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
