import mysql from 'mysql2';

const pool = mysql.createPool({
	//서버 주소(ip) - cmd > ipconfig 아이피주소 넣어주기
	host : '127.0.0.1',
	port : '3306',
	user : 'root',
	password : 'mysql1234',
	database : 'hrdb2019'
});

export const db = pool.promise();