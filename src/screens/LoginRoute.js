import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginInfoAtom } from './State'

export default function LoginRoute() {
    
    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
    const navigator = useNavigate()

    useEffect(() => {
        if (!loginInfo.token) {
            navigator('/login')
        }
    }, [])

  return (
      <Outlet/>
  )
}
