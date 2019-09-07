CREATE TABLE IF NOT EXISTS projects (
	projectId SERIAL PRIMARY KEY,
	project_name TEXT,
	description TEXT
);


Insert INTO projects (project_name, description) values ('project 1', 'Daily basic needs');
Insert INTO projects (project_name, description) values ('project 2', 'TA basic needs');