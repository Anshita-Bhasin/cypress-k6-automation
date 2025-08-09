import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'https://gorest.co.in/public/v2/users';

    const payload = JSON.stringify({
        name: 'k6 training post',
        email: 'Loadtesting@yopmail.com',
        gender: 'female',
        status: 'active'
    });

    const headers = {
        'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
        'User-Agent': 'k6-load-test-agent',
        'Accept': 'application/json',
        'Content-Type': 'application/json',  
    };

    const res = http.post(url, payload, { headers });

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response includes post ID': (r) => JSON.parse(r.body).id !== undefined,
    });
}
