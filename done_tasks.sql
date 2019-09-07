CREATE TABLE IF NOT EXISTS donetasks (
	doneTaskId SERIAL PRIMARY KEY,
	doneTask TEXT,
	member_id INTEGER,
	FOREIGN KEY (member_id) REFERENCES members (memberId)
);