import React from 'react'
import Select from 'react-select'
import axios from 'axios'

export default function RegisterAuction() {

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

	const selectStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: 'transparent',
		})
	}

const champions = 
		axios({
			method: 'get',
			url: 'https://ddragon.leagueoflegends.com/cdn/12.9.1/data/ko_KR/champion.json'
		}).then((res)=>{
			console.log(res.data.data)
			console.log(Object.keys(res.data.data))
			const champion = Object.keys(res.data.data).map((championinfo) => {
				// console.log(res.data.data[championinfo].version);
				// console.log(res.data.data[championinfo].id);
				// console.log(res.data.data[championinfo].name);
				return {
					version: res.data.data[championinfo].version,
					id : res.data.data[championinfo].id,
					name : res.data.data[championinfo].name
				}
			})
			console.log(champion)
		})

	// 1. 챔피언 전체 id 값 가져오기
	// 2. map 함수로 id 값 통해서 챔피언 이미지 가져오기
	// http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/ id값.png

	return (
		<div className="create register">
			<div className="container">
				<h1 className="title">{"{트위치이름}"} 님!<br />
					정보를 입력해주세요!
				</h1>
				<div className="form">
					<div className="form-group">
						<div className="input-title">롤 닉네임</div>
						<input type="text" placeholder="롤 닉네임을 입력해주세요"></input>
					</div>
					<div className="form-group">
						<div className="input-title">최고티어</div>
						<div className='tier-option'>
							<Select
								styles={selectStyles}
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
						<input type="text" placeholder="주 라인을 입력해주세요"></input>
					</div>
					<div className="form-group">
						<div className="input-title">부 라인</div>
						<input type="text" placeholder="부 라인을 입력해주세요"></input>
					</div>
					<div className="form-group">
						<div className="input-title">MOST 3</div>
						<input type="text" placeholder="롤 닉네임을 입력해주세요"></input>
					</div>
					
					<img src=""/>

					<button className="btn-border">설정 완료</button>
				</div>
			</div>
		</div>
	)
}
