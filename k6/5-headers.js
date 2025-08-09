import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const headers = {
        'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
        'User-Agent': 'k6-load-test-agent',
        'Accept': 'application/json',
    };

    const res = http.get('c', { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'content is JSON': (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8',
    });
}
