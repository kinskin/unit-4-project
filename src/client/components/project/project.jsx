import React from 'react';



class Project extends React.Component{

    constructor(){
        super()

        this.state = {
            message: 'SELECT PROJECT',
            addMember: 'Add team members',
            display: 'none',
            addTask: 'Add task',
            taskDisplay: 'none',
            projectId: '',
            memberName: '',
            memberId: '',
            taskProjectId: '',
            task: '',
            editTaskId: '',
            editTaskMemberId:'',
            editTaskProjectId:'',
            editTask: '',
            descPlaceholder: 'Description',
            editDescProjectId: '',
            editDesc: '',
            showProjectId: ''
        }
    }

    projectDisplay(){
        let display = true
        this.props.projectDisplay(display)
    }

    showNameInput(projectId){
        let display = this.state.display
        if(display === 'none'){
            this.setState({display: '', addMember: 'Close', projectId: projectId})
        }
        else{
            this.setState({display: 'none', addMember: 'Add team members', projectId: ''})
        }
    }

    nameInput(event){
        if(event.keyCode === 13){
            console.log(event.target.value)
            this.setState({memberName: event.target.value, display: 'none', addMember: 'Add team members'})
            this.addMember()
        }
        else{
            this.setState({memberName: event.target.value})
        }
    }

    addMember(){
        let memberName = this.state.memberName
        let projectId = this.state.projectId
        let url = '/new/member'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({memberName: memberName, projectId: projectId})
        })
        .then(res => res.json())
        .then(res => {
            this.setState({memberName: ''})
            this.props.addMember(res)

        })
    }

    removeMember(memberId,projectId){
        console.log('this is the member id in project jsx: ', memberId)
        this.props.removeMember(memberId,projectId)
        let url = '/delete/member'
        // fetch(url, {
        //     method: 'DELETE',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({memberId: memberId})
        // })
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res)
        // })

    }

    taskShowInput(memberId,projectId){
        let divId = document.getElementById(memberId)
        let btnId = document.getElementById('btn'+memberId)
        if(divId.style.display === 'none'){
            divId.style.display = ''
            btnId.innerText = 'Close'
            this.setState({memberId: memberId, taskProjectId: projectId})
        }
        else{
            divId.style.display = 'none'
            btnId.innerText = 'Add Task'
            this.setState({memberId: ''})
        }
    }

    addTask(){
        let task = this.state.task
        let memberId = this.state.memberId
        let taskProjectId = this.state.taskProjectId
        let url = '/new/task'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({task: task, memberId: memberId, taskProjectId: taskProjectId})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({task: ''})
            this.props.addTask(res)
        })
    }

    taskInput(event){
        if(event.keyCode === 13){
            this.setState({task: event.target.value, display: 'none', addtask: 'Add task'})
            this.addTask()
        }
        else{
            this.setState({task: event.target.value})
        }
    }

    doneTask(taskid,projectId){

        this.props.doneTask(taskid,projectId)
        let url = '/delete/task'

        // fetch(url, {
        //     method: 'DELETE',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({id: id})
        // })
        // .then(res => res.json())
        // .then(res => {console.log(res)})
    }

    showEditTask(taskId,memberId,projectId,taskName){
        let taskDiv = document.getElementById('task'+taskId)
        let editTaskDiv = document.getElementById('editTask'+taskId)

        if(taskDiv.style.display == ''){
            taskDiv.style.display = 'none'
            editTaskDiv.style.display = ''
            this.setState({editTaskId: taskId, editTaskMemberId: memberId, editTaskProjectId: projectId, editTask: taskName})
        }
        else{
            taskDiv.style.display = ''
            editTaskDiv.style.display = 'none'
            this.setState({editTaskId: '', editTaskMemberId: '', editTaskProjectId: '', editTask: ''})
        }

    }

    editInput(event){
        if(event.keyCode === 13){
            this.setState({editTask: event.target.value})
            this.editTask()
        }
        else{
            this.setState({editTask: event.target.value})
        }
    }

    editTask(){
        let editTask = this.state.editTask
        let editTaskId = this.state.editTaskId
        let editTaskProjectId = this.state.editTaskProjectId
        let taskDiv = document.getElementById('task'+editTaskId)
        let editTaskDiv = document.getElementById('editTask'+editTaskId)
        editTaskDiv.style.display = 'none'
        taskDiv.style.display = ''

        this.props.editTask(editTaskId, editTask, editTaskProjectId)

        // let url = '/update/task'
        // fetch(url, {
        //     method: 'PUT',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({editTaskId: editTaskId, editTask: editTask})
        // })
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res)})
    }

    showDescInput(projectId,projectDesc){
        let editDescDiv = document.getElementById('editDescDiv'+projectId)
        let descDiv = document.getElementById('descDiv'+projectId)

        if(editDescDiv.style.display === 'none'){
            editDescDiv.style.display = ''
            descDiv.style.display = 'none'
            this.setState({editDescProjectId: projectId, editDesc: projectDesc})
        }
        else{
            editDescDiv.style.display = 'none'
            descDiv.style.display = ''
            this.setState({editDescProjectId: '', editDesc: ''})
        }
    }

    editDescInput(event){
        if(event.keyCode === 13){
            this.setState({editDesc: event.target.value})
            this.editDesc()
        }
        else{
            this.setState({editDesc: event.target.value})
        }
    }

    editDesc(){
        let projectId = this.state.editDescProjectId
        let editDesc = this.state.editDesc
        let editDescDiv = document.getElementById('editDescDiv'+projectId)
        let descDiv = document.getElementById('descDiv'+projectId)
        editDescDiv.style.display = 'none'
        descDiv.style.display = ''
        this.props.editDesc(projectId,editDesc)

        let url = '/update/description'
        // fetch(url, {
        //     method: 'PUT',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({editDescProjectId: projectId, editDesc: editDesc})
        // })
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res)})

    }

    showProject(projectId){
        console.log('this is the projectId: ', projectId)
        this.setState({showProjectId: projectId}, ()=>{
            this.props.showThisProject(projectId)
        })
    }


    render(){

        let project = this.props.project
        let members = this.props.members
        let tasks = this.props.tasks

        let mapProject = project.map((project,index)=>{
            return(
                <div className='card my-4' key={index}>
                    <div className='card-header' onClick={(projectId)=>{this.showProject(project.projectid)}}>
                        <h6>{project.project_name}</h6>
                    </div>
                    <div className='card-body'>
                        <div className='row' style={{display: ''}} onDoubleClick={(projectId, projectDesc)=>{this.showDescInput(project.projectid, project.description)}} id={'descDiv'+project.projectid}>
                            <p>{project.description}</p>
                        </div>
                        <div className='row' style={{display: 'none'}} onDoubleClick={(projectId)=>{this.showDescInput(project.projectid)}} id={'editDescDiv'+project.projectid}>
                            <input className='form-control' placeholder={this.state.descPlaceholder} onChange={(event)=>{this.editDescInput(event)}} onKeyDown={(event)=>{this.editDescInput(event)}} value={this.state.editDesc}/>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <button onClick={(projectid)=>{this.showNameInput(project.projectid)}} className='btn btn-sm'>{this.state.addMember}</button>
                        <div className='my-3' style={{display: this.state.display}}>
                            <p>Add member</p>
                            <input className='form-control' onChange={(event)=>{this.nameInput(event)}} onKeyDown={(event)=>{this.nameInput(event)}} placeholder='Team member name' value={this.state.memberName}/>
                        </div>
                    </div>
                </div>
            )
        })

        let mapMembers = members.map((member,index)=>{
            let filterTasks = tasks.filter((task=>task.member_id == member.memberid))
                let mapTasks = filterTasks.map((task,index)=>{
                    return(
                        <div className='card-body d-inline'>
                            <div className='row' style={{display: ''}} id={'task'+task.taskid}>
                                <div className='col-8' onDoubleClick={(taskId, memberId, projectId, taskName)=>{this.showEditTask(task.taskid, task.member_id,task.project_id, task.task)}}>
                                <p>{task.task}</p>
                                </div>
                                <div className='col-4'>
                                    <button className='btn btn-sm btn-outline-success' onClick={(taskid,projectid)=>{this.doneTask(task.taskid, task.project_id)}}>Complete task</button>
                                </div>
                            </div>
                            <div className='row' style={{display: 'none'}} id={'editTask'+task.taskid}>
                                <div className='col-8' onDoubleClick={(taskId)=>{this.showEditTask(task.taskid)}}>
                                    <input className='form-control' value={this.state.editTask} onChange={(event)=>{this.editInput(event)}} onKeyDown={(event)=>{this.editInput(event)}}/>
                                </div>
                                <div className='col-4'>
                                    <button className='btn btn-sm btn-outline-success'>Edit task</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            return(
                <div className='col d-flex flex-column'>
                    <div className='card'>
                        <div className='card-header d-inline'>
                            <div>
                                <h6>
                                    {member.member_name}
                                </h6>
                                <div className='row justify-content-around'>
                                    <button className='btn btn-sm' onClick={(memberId,projectId)=>{this.taskShowInput(member.memberid, member.project_id)}} id={'btn'+member.memberid}>Add Task</button>
                                    <button className='btn btn-sm' onClick={(memberId,projectId)=>{this.removeMember(member.memberid,member.project_id)}}> Remove member </button>
                                </div>
                                <div className='my-3' style={{display: this.state.taskDisplay}} id={member.memberid}>
                                    <p>Add task</p>
                                    <input className='form-control' onChange={(event)=>{this.taskInput(event)}} onKeyDown={(event)=>{this.taskInput(event)}} placeholder='Add your task' value={this.state.task}/>
                                </div>
                            </div>
                        </div>
                        {mapTasks}
                    </div>
                </div>
            )
        })

        return(
            <div>
                <div className='card-header'>
                    <div className='row'>
                        <div className='col-4'>
                            <button className='btn btn-sm'onClick={()=>{this.projectDisplay()}}>Back to project board</button>
                        </div>
                        <div className='col-4'>
                            <h4>{this.props.project[0].project_name}</h4>
                        </div>
                        <div className='col-4'>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-3'>
                            {mapProject}
                        </div>
                        <div className='col-9'>
                            <div className='row' style={{display: ''}} id={this.state.showProjectId}>
                                {mapMembers}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Project;