import express from "express";

const PORT = 4000;
const app = express(); // express application을 생성
// 서버는 항상 켜져 있고 온라인으로 내 컴퓨터와 연결되어 있는 컴퓨터이다.
// 항상 request(요청)을 listening 하고 response(반응)한다.
const handleListening = () => console.log("wow");

app.listen(PORT, handleListening); // 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 함.
// .listen()에는 callback이 있다. 어떠한 port로 요청을 받아들이는가
// localhost:4000 으로 접속
