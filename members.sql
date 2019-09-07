CREATE TABLE IF NOT EXISTS members (
	memberId SERIAL PRIMARY KEY,
	member_name TEXT,
	project_id INTEGER REFERENCES projects (projectId) ON DELETE CASCADE
);

Insert INTO members (member_name, project_id) values ('asshikin', 1);
Insert INTO members (member_name, project_id) values ('thea', 1);
Insert INTO members (member_name, project_id) values ('khairi', 2);
Insert INTO members (member_name, project_id) values ('herda', 2);