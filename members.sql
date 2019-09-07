CREATE TABLE IF NOT EXISTS members (
	memberId SERIAL PRIMARY KEY,
	member_name TEXT,
	project_id INTEGER,
	FOREIGN KEY (project_id) REFERENCES projects (projectId)
);

Insert INTO members (member_name, project_id) values ('asshikin', 1);
Insert INTO members (member_name, project_id) values ('thea', 1);
Insert INTO members (member_name, project_id) values ('khairi', 2);
Insert INTO members (member_name, project_id) values ('herda', 2);