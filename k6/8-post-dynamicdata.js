import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const randomId = Math.floor(Math.random() * 1000);
    const payload = JSON.stringify({
        title: `Title ${randomId}`,
        body: `Body content ${randomId}`,
        userId: randomId,
    });

    const headers = { 'Content-Type': 'application/json' };

    const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, { headers });

    check(res, {
        'post created': (r) => r.status === 201,
        'correct userId': (r) => JSON.parse(r.body).userId === randomId,
    });
}
