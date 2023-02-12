GET
  - การ request ขอข้อมูลจาก Client (Query)
  - Client --- GET --> API
  - Client <-- RESPONES[DATA] -- API

POST
  - การเพิ่มข้อมูลลง database
  - Client --- POST --> API
  - Client <-- RESPONES[Result] -- API

DELETE
  - การลบข้อมูล
  - Client --- DELETE --> API
  - Client <-- RESPONES[Delete Row] -- API

PATCH , PUT
  - การอัพเดทข้อมูล
  - PUT
    - จะเป็นอัพเดททับข้อมูลเดิมทั้งหมด
      - Client -- PUT { name: 'a', age: 20 } --> API 
      - Client <-- NEW DATA --- API
  - PATCH
    - จะเป็นอัพเดทบางฟิล
      - Client -- PATCH { name: 'b' } --> API
      - Client <-- NEW DATA --- API


REST architectural paradigm
