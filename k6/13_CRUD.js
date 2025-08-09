import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const BASE_URL = 'https://gorest.co.in/public/v2/users';
    const headers = {
        'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'k6-load-test-agent',
    };

    // 1. POST - Create a user
    const payload = JSON.stringify({
        name: 'Anshita QA',
        gender: 'female',
        email: `anshita.qa${Math.floor(Math.random() * 100000)}@mail.com`,
        status: 'active',
    });

    const postRes = http.post(BASE_URL, payload, { headers });
    console.log('POST Response: ' + postRes.body);

    check(postRes, {
        'POST status is 201': (r) => r.status === 201,
    });

    const userId = postRes.json().id;

    // Optional wait
    sleep(1);

    // 2. GET - Retrieve the created user
    const getRes = http.get(`${BASE_URL}/${userId}`, { headers });
    console.log('GET Response: ' + getRes.body);

    check(getRes, {
        'GET status is 200': (r) => r.status === 200,
        'User ID matches': (r) => r.json().id === userId,
    });

    sleep(1);

    // 3. PUT - Full update
    const putPayload = JSON.stringify({
        name: 'Anshita QA Updated',
        gender: 'female',
        email: `updated.qa${Math.floor(Math.random() * 100000)}@mail.com`,
        status: 'inactive',
    });

    const putRes = http.put(`${BASE_URL}/${userId}`, putPayload, { headers });
    console.log('PUT Response: ' + putRes.body);

    check(putRes, {
        'PUT status is 200': (r) => r.status === 200,
        'Name is updated': (r) => r.json().name.includes('Updated'),
    });

    sleep(1);

    // 4. PATCH - Partial update
    const patchPayload = JSON.stringify({
        name: 'Anshita QA Patched',
    });

    const patchRes = http.patch(`${BASE_URL}/${userId}`, patchPayload, { headers });
    console.log('PATCH Response: ' + patchRes.body);

    check(patchRes, {
        'PATCH status is 200': (r) => r.status === 200,
        'Name is patched': (r) => r.json().name.includes('Patched'),
    });

    sleep(1);

    // 5. DELETE - Delete the user
    const delRes = http.del(`${BASE_URL}/${userId}`, null, { headers });
    console.log('DELETE Response: ' + delRes.status);

    check(delRes, {
        'DELETE status is 204': (r) => r.status === 204,
    });
}
