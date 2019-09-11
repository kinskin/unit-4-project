import React from 'react';
import styles from './style.scss'

class Project extends React.Component{

    constructor(){
        super()

        this.state = {
            message: 'SELECT PROJECT',
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
            showProjectId: '',
            addProjectBtn: ' New project',
            projectName: '',
            projectDescription: '',
            addProjectIcon: 'plus',
            addMemberIcon: ' Member',
            addMemberImg: 'plus'
        }
    }

    projectDisplay(){
        let display = true

        let url = '/logout'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            this.props.projectDisplay(display)
        })
    }

    showNameInput(projectId){
        let showNameInputDiv = document.getElementById('addMember'+projectId)

        if(showNameInputDiv.style.display === 'none'){
            showNameInputDiv.style.display = ''
            this.setState({projectId: projectId, addMemberImg:'minus',addMemberIcon:' Close'})
        }
        else{
            showNameInputDiv.style.display = 'none'
            this.setState({projectId: '', memberName: '', addMemberImg:'plus', addMemberIcon:' Member'})
        }
    }

    nameInput(event){
        let projectId = this.state.projectId
        let showNameInputDiv = document.getElementById('addMember'+projectId)
        let showNameButton = document.getElementById('addMemberBtn'+projectId)
        if(event.keyCode === 13){
            showNameInputDiv.style.display = 'none'
            this.setState({memberName: event.target.value, addMemberImg:'plus', addMemberIcon:' Member'})
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
        fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({memberId: memberId})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })

    }

    taskShowInput(memberId,projectId){
        let divId = document.getElementById("addTaskDiv"+memberId)
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
        let memberId = this.state.memberId
        let divId = document.getElementById("addTaskDiv"+memberId)
        let btnId = document.getElementById('btn'+memberId)
        if(event.keyCode === 13){
            divId.style.display = 'none'
            btnId.innerText = 'Add Task'
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

        fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.json())
        .then(res => {console.log(res)})
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

        let url = '/update/task'
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({editTaskId: editTaskId, editTask: editTask})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)})
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
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({editDescProjectId: projectId, editDesc: editDesc})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)})

    }

    showProject(projectId){
        this.setState({showProjectId: projectId}, ()=>{
            let projectDiv = document.getElementById(projectId)
            if(projectDiv.style.display === 'none'){
                projectDiv.style.display = ''
            }
            this.props.showThisProject(projectId)
        })
    }

    showAddProject(){
        let addProjectDiv = document.getElementById('addProject')
        if(addProjectDiv.style.display === 'none'){
            addProjectDiv.style.display = ''
            this.setState({addProjectBtn: ' Close', addProjectIcon: 'minus'})
        }
        else{
             addProjectDiv.style.display = 'none'
             this.setState({addProjectBtn: ' New project', projectName: '', projectDescription: '', addProjectIcon: 'plus'})
        }
    }

    projectName(event){
            this.setState({projectName: event.target.value})
    }

    projectDescription(event){
            this.setState({projectDescription: event.target.value})
    }

    addNewProject(){
        let projectName = this.state.projectName
        let projectDescription = this.state.projectDescription

        let addProjectDiv = document.getElementById('addProject')
        addProjectDiv.style.display = 'none'

        let loggedInCookie = document.cookie
        let cookie = loggedInCookie.split('')
        let indexNum = loggedInCookie.length-1
        let user_id = cookie[indexNum]

        let url = '/new/projects'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({projectName: projectName, projectDescription: projectDescription, projectUserId: user_id})
        })
        .then(res => res.json())
        .then(res => {
            this.setState({projectName: '', projectDescription: '', addProjectBtn: 'New project'})
            this.props.addNewProject(res)
        })
    }

    hideCheckBox(taskId){
        let checkTick = document.getElementById('taskhide'+taskId)
        let checkUntick = document.getElementById('taskunhide'+taskId)
        checkTick.style.display = 'none'
        checkUntick.style.display = ''


    }

    unHideCheckBox(taskId){
        let checkTick = document.getElementById('taskhide'+taskId)
        let checkUntick = document.getElementById('taskunhide'+taskId)
        checkTick.style.display = ''
        checkUntick.style.display = 'none'
    }



    render(){

        let project = this.props.project
        let members = this.props.members
        let tasks = this.props.tasks
        let singleProject = this.props.singleProject

        let projectName = singleProject.map((project,index)=>{
            return(
                <div>
                    <h3>{project.project_name}</h3>
                    <i class={'bx bx-'+this.state.addMemberImg+' mt-2'} style={{fontSize: '20px'}}onClick={(projectid)=>{this.showNameInput(project.projectid)}} id={styles.addMember}>{this.state.addMemberIcon}</i>
                    <div className='my-2' style={{display: 'none'}} id={'addMember'+project.projectid}>
                        <div className='col-4'>
                            <p>Add member</p>
                            <input className='form-control' onChange={(event)=>{this.nameInput(event)}} onKeyDown={(event)=>{this.nameInput(event)}} placeholder='Team member name' value={this.state.memberName}/>
                            <small>Press "Enter" to submit</small>
                        </div>
                    </div>
                </div>
            )
        })

        let mapProject = project.map((project,index)=>{
            return(
                <div className='card mb-4' key={index}>
                    <div className='card-header' onClick={(projectId)=>{this.showProject(project.projectid)}}>
                        <h6 id={styles.pDesc}>{project.project_name}</h6>
                    </div>
                    <div className='card-body'>
                        <div className='row' style={{display: ''}} id={'descDiv'+project.projectid}>
                            <div className='col-9'>
                                <p>{project.description}</p>
                            </div>
                            <div className='col-3 text-right'>
                               <i className='bx bxs-pencil' style={{fontSize: '20px'}} onClick={(projectId, projectDesc)=>{this.showDescInput(project.projectid, project.description)}} id={styles.pencil}></i>
                            </div>
                        </div>
                        <div className='row' style={{display: 'none'}} onDoubleClick={(projectId)=>{this.showDescInput(project.projectid)}} id={'editDescDiv'+project.projectid}>
                            <div className='col-9'>
                                <input className='form-control' placeholder={this.state.descPlaceholder} onChange={(event)=>{this.editDescInput(event)}} onKeyDown={(event)=>{this.editDescInput(event)}} value={this.state.editDesc}/>
                                <small>Press "Enter" to submit</small>
                            </div>
                            <div className='col-3 text-right'>
                                <i className='bx bx-x' style={{fontSize: '30px'}} onClick={(projectId)=>{this.showDescInput(project.projectid)}} id={styles.close} ></i>
                            </div>
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
                                <div className='col-8 d-flex flex-row'>
                                    <i className='bx bx-checkbox' onClick={(taskId)=>{this.hideCheckBox(task.taskid)}} style={{fontSize: '30px', display:''}} id={'taskhide'+task.taskid}></i>
                                    <i className='bx bx-checkbox-checked' onClick = {(taskId)=>{this.unHideCheckBox(task.taskid)}}style={{fontSize: '30px', display:'none'}} id={'taskunhide'+task.taskid}></i>
                                    <p>{task.task}</p>
                                </div>
                                <div className='col-4 d-flex justify-content-between'>
                                    <i class='bx bxs-pencil' style={{fontSize: '20px', display: ''}} onClick={(taskId, memberId, projectId, taskName)=>{this.showEditTask(task.taskid, task.member_id,task.project_id, task.task)}} id={'taskpencil'+task.taskid}></i>
                                    <i class='bx bxs-trash' style={{fontSize: '20px'}} onClick={(taskid,projectid)=>{this.doneTask(task.taskid, task.project_id)}}></i>
                                </div>
                            </div>
                            <div className='row' style={{display: 'none'}} id={'editTask'+task.taskid}>
                                <div className='col-9'>
                                    <input className='form-control' value={this.state.editTask} onChange={(event)=>{this.editInput(event)}} onKeyDown={(event)=>{this.editInput(event)}}/>
                                    <small>Press "Enter" to submit</small>
                                </div>
                                <div className='col-3 text-right'>
                                    <i className='bx bx-x' style={{fontSize:'30px'}} onClick={(taskId)=>{this.showEditTask(task.taskid)}}></i>
                                </div>
                            </div>
                        </div>
                    )
                })
            return(
                <div className='card m-3' style={{width: '400px'}}>
                    <div className='card-header'>
                        <div>
                            <h6>
                                {member.member_name}
                            </h6>
                            <div className='row justify-content-around'>
                                <button className='btn btn-sm' onClick={(memberId,projectId)=>{this.taskShowInput(member.memberid, member.project_id)}} id={'btn'+member.memberid}>Add Task</button>
                                <button className='btn btn-sm' onClick={(memberId,projectId)=>{this.removeMember(member.memberid,member.project_id)}}> Remove member </button>
                            </div>
                            <div className='my-3' style={{display: this.state.taskDisplay}} id={'addTaskDiv'+member.memberid}>
                                <p>Add task</p>
                                <input className='form-control' onChange={(event)=>{this.taskInput(event)}} onKeyDown={(event)=>{this.taskInput(event)}} placeholder='Add your task' value={this.state.task}/>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '20rem', overflowY:'scroll', width: '24rem'}}>
                        {mapTasks}
                    </div>
                </div>
            )
        })

        return(

            <div className={styles.containerbody}>
                <div className='col-3'>
                    <div className='card'>
                        <div className='card-header mb-3 bg-light'>
                            <div className='row align-top'>
                                <div className='col-7 text-primary'>
                                    <h3>Projects</h3>
                                </div>
                                <div className='col-5 text-right'>
                                    <i className='bx bx-log-out' style={{fontSize:'20px'}}onClick={()=>{this.projectDisplay()}} id={styles.signout}>Sign out</i>
                                </div>
                            </div>
                        </div>
                        <i className={'bx bx-'+this.state.addProjectIcon+' mb-3'} onClick={()=>{this.showAddProject()}} style={{fontSize:'20px'}} id={styles.newp}>{this.state.addProjectBtn}</i>
                        <div className='card-body mb-3 text-dark' style={{display:'none'}}id='addProject'>
                            <div className='form-group'>
                                <p>Project Name:</p>
                                <input className='form-control' onChange={(event)=>{this.projectName(event)}} onKeyDown={(event)=>{this.projectName(event)}} value={this.state.projectName} placeholder='Project Name'/>
                                <p>Project Description: </p>
                                <input className='form-control' onChange={(event)=>{this.projectDescription(event)}} onKeyDown={(event)=>{this.projectDescription(event)}} value={this.state.projectDescription} placeholder='Project Description'/>
                                <br/>
                                <div className='text-right'>
                                    <button className='btn btn-sm btn-outline-success mt-2' onClick={()=>{this.addNewProject()}}>Create</button>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer' style={{height: '30rem', overflowY:'scroll'}}>
                            {mapProject}
                        </div>
                    </div>
                </div>
                <div className='col-9'>
                    <div className='sticky-top' style={{display: 'none'}} id={this.state.showProjectId}>
                        <div className='row'>
                            <div className='card-header bg-light mb-3 text-primary w-100'>
                                {projectName}
                            </div>
                        </div>
                        <div className='row overflow-auto'>
                            <div className='d-flex flex-row'>
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