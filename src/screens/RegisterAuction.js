import React from 'react'
import Select from 'react-select'

export default function RegisterAuction() {

	const ranktier = [
		{ value: 'iron', label: 'Iron', image: '/img/iron.png'},
		{ value: 'bronze', label: 'Bronze', image:'/img/bronze.png'},
		{ value: 'silver', label: 'Silver', image:'/img/silver.png'},
		{ value: 'gold', label: 'Gold', image:'/img/gold.png'},
		{ value: 'platinum', label: 'Platinum', image:'/img/platinum.png'},
		{ value: 'diamond', label: 'Diamond', image:'/img/diamond.png'},
		{ value: 'mater', label: 'mater', image:'/img/mater.png' },
		{ value: 'grandmater', label: 'Grandmater', image:'/img/grandmater.png'},
		{ value: 'challenger', label: 'Challenger', image:'/img/challenger.png'},
	  ]
	  

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
						<Select 
							options={ranktier} 
							formatOptionLabel={tier => (
								<div className="tier-option">
									<img src={tier.image} alt={tier.image}/>
									<span>{tier.label}</span>
								</div>
							)}
						/>
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

					<button className="btn-border">설정 완료</button>
				</div>
			</div>
		</div>
	)
}
