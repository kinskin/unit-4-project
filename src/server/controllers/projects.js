module.exports = (db) => {

    let getProjects = (request, response) => {

        db.projects.getProjects((error, projects) => {
          // queryResult contains projects data returned from the project model
              if (error) {
                console.error('error getting projects', error);
                response.status(500);
                response.send('server error');
              } else {
                db.projects.getMembers((error,members)=>{
                    if(error){
                        console.error('error getting projects members', error);
                        response.status(500);
                        response.send('server error');
                    }
                    else{
                        db.projects.getTasks((error,tasks)=>{
                            if(error){
                                console.log('error in getting the member tasks', error)
                                response.status(500);
                                response.send('server error');
                            }
                            else{
                                db.projects.getDoneTasks((error,doneTasks)=>{
                                    if(error){
                                        console.log('error in getting the member done tasks', error)
                                    }
                                    else{
                                        let projectDatas = {
                                            projects: projects,
                                            members: members,
                                            tasks: tasks,
                                            doneTasks: doneTasks
                                        }
                                        response.send(projectDatas)
                                    }
                                })
                            }
                        })
                    }
                })
              }
        });
    };


    let getAll = (request,response)=>{
        db.projects.getAll((error,all)=>{
            if(error){
                console.log('error getting all data')
            }
            else{
                response.send({all: all})
            }
        })
    }

    let deleteTask = (request,response)=>{
        db.projects.deleteTask(request.body.id,(error,result)=>{
            if(error){
                console.log('error in deleting task')
            }
            else{
                response.send({result: result})
            }
        })
    }


    let newMember = (request, response) => {
        console.log(request.body.memberName)
        console.log(request.body.projectId)
        db.projects.newMember(request.body.memberName, request.body.projectId, (error,result)=>{
            if(error){
                console.log('error in adding the new member')
            }
            else{
                response.send({result: result})
            }
        })
    }

    let newTask = (request,response)=>{
        console.log(request.body.task)
        console.log(request.body.memberId)
        console.log(request.body.taskProjectId)
        db.projects.newTask(request.body.task, request.body.memberId, request.body.taskProjectId,(error,result)=>{
            if(error){
                console.log('error in adding the new task')
            }
            else{
                response.send({result: result})
            }
        })
    }

    let deleteMember = (request,response)=>{
        db.projects.deleteMemberTask(request.memberId,(error,result)=>{
            if(error){
                console.log(error)
                console.log('error in deleting member task')
            }
            else{
                db.projects.deleteMember(request.body.memberId,(error2,result2)=>{
                    if(error2){
                        console.log(error2)
                        console.log('error in deleting member')
                    }
                    else{
                        response.send({result: result,result2: result2})
                    }
                })
            }
        })
    }

  return {
    getProjects: getProjects,
    getAll: getAll,
    deleteTask: deleteTask,
    deleteMember: deleteMember,
    newMember:newMember,
    newTask: newTask
  };
};