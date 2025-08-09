

import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '3s'
};
export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/posts');
    check(response, {
        'status code is 200': (res) => res.status === 200,
    });
}


