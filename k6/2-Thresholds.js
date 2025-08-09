

import http from 'k6/http';
import { check } from 'k6';

export let options = {
    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>0.9'],
    },
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/posts');
    check(response, {
        'status code is 200': (res) => res.status === 200,
    });
}


