#!/bin/bash
curl -X POST http://localhost:3000/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "BK202405",
    "email": "chrarki2004@gmail.com",
    "products": [
      { "title": "Node.js Guide", "qty": 1, "price": 19.99 },
      { "title": "React Mastery", "qty": 2, "price": 24.50 }
    ],
    "total": 68.99
  }'