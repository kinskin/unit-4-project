import React from 'react';



class Project extends React.Component{

    constructor(){
        super()

        this.state = {
            message: 'SELECT PROJECT',
            addMember: 'Add team members',
            display: 'none',
            projectId: '',
            memberName: ''
        }
    }

    doneTask(id,projectId){

        this.props.doneTask(id,projectId)
        let url = '/delete/task'

        fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.json())
        .then(res => {console.log(res)})
    }

    projectDisplay(){
        let display = true
        this.props.projectDisplay(display)
    }

    showNameInput(projectId){
        console.log('this is the projectid: ', projectId)
        let display = this.state.display
        let addMember = this.state.addMember
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
            this.setState({memberName: event.target.value})
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
        .then(res => {this.props.addMember(res)})
    }

    render(){

        let project = this.props.project
        let members = this.props.members
        let tasks = this.props.tasks

        let mapProject = project.map((project,index)=>{
            return(
                <div className='card' key={index}>
                    <div className='card-header'>
                        <h6>{project.project_name}</h6>
                    </div>
                    <div className='card-body'>
                        <p>{project.description}</p>
                    </div>
                    <div className='card-footer'>
                        <button onClick={(projectid)=>{this.showNameInput(project.projectid)}}className='btn btn-sm'>{this.state.addMember}</button>
                    </div>
                </div>
            )
        })

        let mapMembers = members.map((member,index)=>{
            let filterTasks = tasks.filter((task=>task.member_id == member.memberid))
                let mapTasks = filterTasks.map((task,index)=>{
                    return(
                        <div className='card-body d-inline'>
                            <div className='row'>
                                <div className='col-8'>
                                {task.task}
                                </div>
                                <div className='col-4'>
                                    <button className='btn btn-sm btn-outline-success' onClick={(taskid,projectid)=>{this.doneTask(task.taskid, task.project_id)}}>Complete task</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            return(
                <div className='col d-flex flex-column'>
                    <div className='card'>
                        <div className='card-header row'>
                            <div className='col-4'>
                                <button className='btn btn-sm'>Add task</button>
                            </div>
                            <div className='col-4'>
                                {member.member_name}
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
                            <div className='card my-3' style={{display: this.state.display}}>
                                <div className='card-header'>
                                    <p>Add member</p>
                                </div>
                                <input onChange={(event)=>{this.nameInput(event)}} onKeyDown={(event)=>{this.nameInput(event)}}placeholder='Team member name'/>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
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