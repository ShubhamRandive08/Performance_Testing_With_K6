import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 },  // Ramp up to 50 users in 10 seconds
    { duration: '30s', target: 50 },  // Stay at 50 users for 30 seconds
    { duration: '10s', target: 0 },   // Ramp down to 0 users in 10 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],  // Error rate should be less than 1%
  },
};

export default function () {
  let url = 'http://localhost:3000/staffData';  // Replace with actual login API URL
  let payload = JSON.stringify({
    email : 'srandive245gmail.com',
    pass : 'Kingsr@0'
  });

  let params = {
    headers: { 'Content-Type': 'application/json' }
  };

  let response = http.post(url, payload);

  // Validate response
  check(response, {
    'is status 200': (r) => r.status === 200
    // 'is login successful': (r) => r.json('token') !== undefined,  // Check if token exists
  });

  sleep(1); // Pause for 1 second before the next request
}
