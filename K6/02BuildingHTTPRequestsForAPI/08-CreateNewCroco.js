import http from 'k6/http'

export default function(){
    let payload = {
        username:"croco"+ Date.now(),
        password: "test"
    }

    let param = {
        headers :{ 'Content-Type':'application/json'}
    }

    let registrationUrl = `https://test-api.k6.io/user/register/`
    let getTokenUrl = `https://test-api.k6.io/auth/token/login/`
    let privateCrocoUrl = `https://test-api.k6.io/my/crocodiles/`

    let res = http.post(
        registrationUrl, 
        JSON.stringify(payload), 
        param
    )

    let resTokens = http.post(
        getTokenUrl, 
        JSON.stringify(payload), 
        param
    )
    
    let tokens = resTokens.json()
    const accessToken = tokens.access
    const refreshToken = tokens.refresh

    let params = {headers:{
        Authorization: `Bearer ${accessToken}`,
        'Content-Type':'application/json'
    }}

    const newCroco = {
        name:"TestCroco",
        sex:"M",
        date_of_birth:"2000-03-13"
    }

    let addNewCroco = http.post(privateCrocoUrl, JSON.stringify(newCroco), params)
    console.log("addNewCroco", addNewCroco.json())

    let getPrivateCroco = http.get(privateCrocoUrl, params)

    // console.log("Both Tokens", tokens)
    // console.log("refresh", refreshToken)
    console.log("access", accessToken)
    console.log("getPrivateCroco", getPrivateCroco.json())
}