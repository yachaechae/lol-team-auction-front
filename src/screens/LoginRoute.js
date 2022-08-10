import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Swal from 'sweetalert2'
import { loginInfoAtom } from './State'

export default function LoginRoute() {
    
    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
	const location = useLocation()
	const roomInfo = location.state ?? {}
    const navigator = useNavigate()
    
    useEffect(() => {
        if(location.pathname === '/login'){
        }
        else if (!loginInfo.token) {            
            Swal.fire('경고!',"로그인 후 이용해주세요!",'error')
            navigator('/login')
        }
        else if ((location.pathname === '/join-auction' || location.pathname === '/register-auction') && !roomInfo.auctionId) {
            Swal.fire('경고!',"방코드를 입력해주세요!",'error')
            navigator('/')
        }
    }, [location])

  return (
      <Outlet/>
  )
}
