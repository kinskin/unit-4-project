module.exports = (app, db) => {
  const projects = require('./controllers/projects')(db);
  const lings = require('./controllers/lings')(db);



  app.get('/lingdata', lings.data)
  app.post('/logout', projects.userSignOut)
  app.post('/user/signin', projects.userSignIn)
  app.post('/new/user', projects.newUser)
  app.post('/new/projects', projects.newProject)
  app.put('/update/description', projects.updateDesc)
  app.put('/update/task', projects.updateTask)
  app.delete('/delete/member', projects.deleteMember)
  app.post('/new/task', projects.newTask)
  app.post('/new/member', projects.newMember)
  app.get('/projects', projects.getProjects);
  app.delete('/delete/task', projects.deleteTask);
};