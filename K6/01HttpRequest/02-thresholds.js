import http from 'k6/http';
import {check} from 'k6'
import { sleep } from 'k6';

export const options = {
    vus : 10,
    duration : '10s',
    thresholds : {
        http_req_duration : ['p(95) < 300', 'avg < 300'],
        // http_req_duration : ['avg < 300'],
        http_req_failed : ['rate < 0.01'],
        http_req_waiting : ['p(95) < 200']
    }

}

export default function () {
    const res = http.get('http://127.0.0.1:5502/collage_addmission_process_project/index.html')
    check(true , {
        'true is true': (value) => value === true
    })
}