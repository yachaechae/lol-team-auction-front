import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

export const twitchName = atom({
    key: 'twitchName',
    default: null
  });

  const {persistAtom } = recoilPersist();

  export const loginInfo = atom({
    key : 'loginInfo',
    default : null,
    effects_UNSTABLE : [persistAtom ],
  })