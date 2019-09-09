CREATE TABLE IF NOT EXISTS projects (
	projectId SERIAL PRIMARY KEY,
	project_name TEXT,
	description TEXT,
	user_id INTEGER REFERENCES users (userid) ON DELETE CASCADE
);


Insert INTO projects (project_name, description, user_id) values ('project 1', 'Daily basic needs', 1);
Insert INTO projects (project_name, description, user_id) values ('project 2', 'TA basic needs', 2);