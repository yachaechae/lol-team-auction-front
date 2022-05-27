import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

  const {persistAtom } = recoilPersist();

  export const loginInfoAtom = atom({
    key : 'loginInfoAtom',
    default : {
      twitchName : null,
      token : null,
    },
    effects_UNSTABLE : [persistAtom ],
  })