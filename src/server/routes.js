module.exports = (app, db) => {
  const projects = require('./controllers/projects')(db);

  app.post('/new/member', projects.newMember)
  app.get('/projects', projects.getProjects);
  app.delete('/delete/task', projects.deleteTask);
};