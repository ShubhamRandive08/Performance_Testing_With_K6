import http from 'k6/http';
import {check} from 'k6'

export default function () {
    const res = http.get('http://127.0.0.1:5502/collage_addmission_process_project/index.html')
    check(true , {
        'true is true': (value) => value === true
    })

    check(res, {
        'Status is 200' : (res) => res.status === 200,
            'Page contains expected text' : (res) => res.body.includes("Hello TEACHERS ! let's get started") === true
    
    })
}