import http from 'k6/http';
import { check } from 'k6';

export let options = {
    scenarios: {
        rampUp: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '2s', target: 50 },
                { duration: '10s', target: 50 },
                { duration: '2s', target: 0 }
            ]
        },
        apiTraffic: {
            executor: 'constant-arrival-rate',
            rate: 200,         // requests per second
            timeUnit: '1s',
            duration: '3s',
            preAllocatedVUs: 20,
            maxVUs: 200,
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01']
    }
};


export default function () {


    const randomId = Math.floor(Math.random() * 1000)
    const url = 'https://gorest.co.in/public/v2/users';

    const payload = JSON.stringify({
        "name": `AB Testing ${randomId}`,
        "gender": "female",
        "email": `ab_${randomId}@yopmail.com`,
        "status": "active"
    })
    const headers = {
        'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }


    const res = http.post(url, payload, { headers })
    console.log("*** response *** ", res.body)
    check(res, {
        'Status Code Validation': (res) => res.status === 201
    })

}