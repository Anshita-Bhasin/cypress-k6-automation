import http from 'k6/http';
import { check } from 'k6';
import data from '../k6/data/data.json';

export default function () {
    const index = __ITER % data.length;
    const userData = data[index];

    const payload = JSON.stringify({
        name: userData.title,        // Using title as name
        email: `user${__ITER}@yopmail.com`,
        gender: 'female',
        status: 'active'
    });

    const headers = {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        'Content-Type': 'application/json',
    };

    const res = http.post('https://gorest.co.in/public/v2/users', payload, { headers });

    const resBody = JSON.parse(res.body);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'name is correct': () => resBody.name === userData.title,
    });
}
