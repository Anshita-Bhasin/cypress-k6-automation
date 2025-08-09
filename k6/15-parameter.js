import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check } from 'k6';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./user.json'));
});
// Pick one random user
const user = users[Math.floor(Math.random() * users.length)];

// Generate a unique email each time
const randomId = Math.floor(Math.random() * 100000);

const payload = JSON.stringify({
    name: user.title, // Using a property from JSON file
    email: `users_${randomId}@yopmail.com`,
    gender: 'female',
    status: 'active'
});


const headers = {
    'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
    'User-Agent': 'k6-load-test-agent',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};


export default function () {


    const res = http.post('https://gorest.co.in/public/v2/users', payload, { headers });

    const resBody = JSON.parse(res.body);

    console.log(" Print user ", resBody)

    check(res, {
        'status is 201': (r) => r.status === 201,
        'name is correct': () => resBody.name === user.title,
    });
}
