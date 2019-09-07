/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

    let getProjects = (callback) => {

        dbPoolInstance.query('SELECT * from projects', (error, queryResult) => {
            if (error) {
            // invoke callback function with results after query has executed
            callback(error, null);
            }
            else{
            // invoke callback function with results after query has executed
            callback(null, queryResult.rows );
            }
        });
    };

    let getMembers = (callback) => {
        dbPoolInstance.query('SELECT * FROM members', (error,queryResult)=>{
            if(error){
                callback(error,null)
            }
            else{
                callback(null,queryResult.rows)
            }
        })
    }

    let getTasks = (callback) => {
        dbPoolInstance.query('Select * from tasks', (error,queryResult)=>{
            if(error){
                callback(error,null)
            }
            else{
                callback(null, queryResult.rows)
            }
        })
    }

    let getDoneTasks = (callback)=>{
        dbPoolInstance.query('Select * from donetasks', (error, queryResult)=>{
            if(error){
                callback(error, null)
            }
            else{
                callback(null,queryResult.rows)
            }
        })
    }

    let getAll = (callback)=>{
        let query = 'SELECT projects.projectid, projects.project_name, projects.description, members.memberid, members.member_name, tasks.taskid, tasks.task FROM projects INNER JOIN members ON projects.projectid = members.project_id INNER JOIN tasks ON members.memberid = tasks.member_id'

        dbPoolInstance.query(query,(error,result)=>{
            if(error){
                callback(error,null)
            }
            else{
                callback(null, result.rows)
            }
        })
    }

    let deleteTask = (data,callback)=>{
        console.log('this is the data', data)
        let query = 'DELETE from tasks where taskid = $1'
        let values = [data]
        dbPoolInstance.query(query,values,(error,result)=>{
            if(error){
                callback(error,null)
            }
            else{
                callback(null,null)
            }
        })
    }

    let newMember = (name, projectId, callback) => {

        let query = "INSERT INTO members (member_name, project_id) VALUES ($1, $2) RETURNING *";
        const values = [name, projectId];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                // invoke callback function with results after query has executed
                callback(null, queryResult.rows );
            }
        });
    };

    let newTask = (task, memberId, projectId, callback)=>{

        let query = "INSERT INTO tasks (task, member_id, project_id) VALUES ($1, $2, $3) RETURNING *";
        let values = [task, memberId, projectId]

        dbPoolInstance.query(query,values,(error,queryResult)=>{
            if(error){
                callback(error,null)
            }
            else{
                callback(null,queryResult.rows)
            }
        })
    }

  return {
    newMember: newMember,
    newTask: newTask,
    deleteTask: deleteTask,
    getProjects: getProjects,
    getMembers: getMembers,
    getTasks: getTasks,
    getDoneTasks: getDoneTasks,
    getAll: getAll
  };
};