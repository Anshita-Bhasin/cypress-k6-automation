

import http from 'k6/http';
import { group, check } from 'k6';

export const options = {
    iterations: 10,
};
export default function () {

    group('Post1', () => {
        const response = http.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log(" *** POST1 ****")
        check(response, {
            'status code is 200': (res) => res.status === 200,
        });
    });


    group('Post2', () => {
        console.log(" *** POST2 ****")
        const response = http.get('https://jsonplaceholder.typicode.com/comments?postId=1');
        check(response, {
            'status code is 200': (res) => res.status === 200,
        });
    });



}


