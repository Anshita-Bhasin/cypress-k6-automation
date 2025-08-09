import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // Step 1: Create User
    const userRes = http.post('https://gorest.co.in/public/v2/users', JSON.stringify({
        name: 'k6 training post',
        email: 'Loaggdqq1@yopmail.com',
        gender: 'female',
        status: 'active'
    }), {
        headers: {
            'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
            'Content-Type': 'application/json'
        },
    });

    const userBody = JSON.parse(userRes.body);
    const id = userBody.id;
    console.log('*** Created User ID ***', id);

    check(userRes, {
        'user creation successful': (r) => r.status === 201,
        'user ID is returned': () => id !== undefined,
    });

    // Step 2: Get Profile
    const profileRes = http.get(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
            'Authorization': 'Bearer db7172e8356dd0dbb99e6619b2834d7e31ce03da9ef69a174767150b198472a7',
            'Content-Type': 'application/json'
        },
    });

    check(profileRes, {
        'profile loaded': (r) => r.status === 200,
    });
}
