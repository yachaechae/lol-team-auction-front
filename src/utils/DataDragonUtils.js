import axios from 'axios'

let version;
axios({
    method: 'get',
    url: 'https://ddragon.leagueoflegends.com/api/versions.json'
}).then((response) => {
    version = response.data[0];
})
export const requestChampData = async () => {
    return axios({
        method: 'get',
        url: `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
    })
}
