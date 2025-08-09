import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const response = http.get('https://test.k6.io/contacts.php');

    console.log(`Response status: ${response.status}`);
    console.log(`Error: ${response.error || 'No error reported'}`);

    check(response, {
        'status code is 200': (res) => res.status === 200,
    });
}