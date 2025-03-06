import http from 'k6'
import { sleep,check } from 'k6'

export const options = {
    vus  : 1,
    duration : '5s',
    thresholds : {
        'checks' : ['rate > 0.90']
    }
}

console.log('--init stage--')

export function setup(){
    console.log('--setup stage--')
    const name = {fname : 'Shubham'}
    sleep(5)
    return name;
}

export default function(data){
    console.log('--default stage--')
    console.log(`My name is : ${data.fname}`)
    sleep(.5)
}

export function teardown(){
    console.log("--teardown stage")
}