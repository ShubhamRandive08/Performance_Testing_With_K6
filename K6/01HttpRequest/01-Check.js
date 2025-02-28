import http from 'k6/http';
import {check} from 'k6'

export default function () {
    const res = http.get('https://test.k6.io')
    check(true , {
        'true is true': (value) => value === true
    })

    check(res, {
        'Status is 200' : (res) => res.status === 200,
            'Page contains expected text' : (res) => res.body.includes("Collection of simple web-pages suitable for load testing.") === true
    
    })
}