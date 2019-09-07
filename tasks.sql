CREATE TABLE IF NOT EXISTS tasks (
	taskId SERIAL PRIMARY KEY,
	task TEXT,
	member_id INTEGER REFERENCES members (memberId) ON DELETE CASCADE,
	project_id INTEGER REFERENCES projects (projectId) ON DELETE CASCADE
);

Insert INTO tasks (task, member_id, project_id) values ('go wash toilet',1,1);
Insert INTO tasks (task, member_id, project_id) values ('go smoke',1,1);
Insert INTO tasks (task, member_id, project_id) values ('go wash dishes',2,1);
Insert INTO tasks (task, member_id, project_id) values ('go swimming',2,1);
Insert INTO tasks (task, member_id, project_id) values ('go play with cats',3,2);
Insert INTO tasks (task, member_id, project_id) values ('go for 9 rounds',3,2);
Insert INTO tasks (task, member_id, project_id) values ('go put make up on',4,2);
Insert INTO tasks (task, member_id, project_id) values ('daydreaming',4,2);