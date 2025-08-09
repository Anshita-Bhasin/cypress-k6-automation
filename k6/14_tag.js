import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const headers = {
        'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
        'User-Agent': 'k6-load-test-agent',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const url = 'https://gorest.co.in/public/v2/users/7440156';

    const payload = JSON.stringify({
        name: "Anshita"
    });

    const res = http.patch(url, payload, { headers }, {
        tags: { my_tag: 'get-user-details' },
    });
    console.log(res.body);

    check(res, {
        'PATCH status is 200': (r) => r.status === 200,
        'Name is updated': (r) => r.json().name === "Anshita"
    });
}
