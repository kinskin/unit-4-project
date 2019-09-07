import React from 'react';
import { hot } from 'react-hot-loader';

import styles from './style.scss';
import Projects from './components/projects/projects'
import Bins from './components/bins/bins'
import Project from './components/project/project'
import Done from './components/done/done'


class App extends React.Component {

    constructor(){
        super()

        this.state={
            value:'',
            projects: [],
            showProject: [],
            showMembers:[],
            showTasks:[],
            displayProject: true
        }
    }

    deleteProject(id){
        let projects = this.state.projects
        let projectIndex = projects.findIndex(project => project.projectId == id)
        projects.splice(projects[projectIndex], 1)
        this.setState({projects: projects})

    }

    changeHandler(event){
        this.setState({value: event.target.value})
        let projectNames = this.state.projectNames
        if(event.keyCode === 13){
            let newProjectName = event.target.value
            projectNames.push(newProjectName)
            this.setState({projectNames: projectNames, value: ''})
        }
    }


    allowDrop(event){
        event.preventDefault()
        console.log("HELLOOO")
    }


    newTask(task){
        let projectId = task.result[0].project_id
        let data = {
            taskid: task.result[0].taskid,
            task: task.result[0].task,
            member_id: task.result[0].member_id,
            project_id: task.result[0].project_id
        }
        let projects = this.state.projects
        projects.tasks.push(data)
        this.setState({projects: projects})
        this.showProject(projectId)
    }

    newMember(member){
        let projectId = member.result[0].project_id
        let data = {
            memberid: member.result[0].memberid,
            member_name: member.result[0].member_name,
            project_id: member.result[0].project_id
        }
        let projects = this.state.projects
        projects.members.push(data)
        this.setState({projects: projects})
        this.showProject(projectId)
    }

    removeMember(memberId,projectId){
        let projects = this.state.projects
        let memberIndex = projects.members.findIndex(member=>member.memberid == memberId)
        projects.members.splice(memberIndex,1)
        for(let i = projects.tasks.length-1 ; i >= 0; i--){
            if(projects.tasks[i].member_id == memberId){
                projects.tasks.splice(i,1)
            }
        }
        console.log(projects.tasks)
        this.setState({projects: projects})
        console.log('this is the project id in remove member: ', projectId)
        this.showProject(projectId)
    }


    doneTask(id,projectId){
        let projects = this.state.projects
        let taskIndex = projects.tasks.findIndex(task=>task.taskid == id)
        projects.tasks.splice(taskIndex,1)
        console.log(projects.tasks)
        this.setState({projects: projects})
        this.showProject(projectId)
    }

    projectDisplay(display){
        console.log(display)
        this.setState({showProject: [], showMembers:[], showTasks:[], displayProject: display })
    }


    showProject(id){
        console.log('this is the in show project in app jsx id: ', id)
        console.log('rendering after deleting members')
        let projects = this.state.projects
        let filterProjects = projects.projects.filter(project=> project.projectid == id)
        let filterMembers = projects.members.filter(member=> member.project_id == id)
        let filterTasks = projects.tasks.filter(task=> task.project_id == id)
        this.setState({showProject: filterProjects, showMembers: filterMembers, showTasks: filterTasks, displayProject: false})
    }

    componentDidMount(){
        let url = `http://localhost:3000/projects`
        fetch(url)
            .then(response =>  response.json())
            .then(data => {
                this.setState({projects: data})
            })
    }

    render() {
        let displayProject = this.state.displayProject
        let showProject;
        if(displayProject === true){
            showProject = <Projects projects={this.state.projects}  showProject={(id)=>{this.showProject(id)}}/>
        }
        else{
            showProject = <Project project={this.state.showProject} members={this.state.showMembers} tasks={this.state.showTasks} projectDisplay={(display)=>{this.projectDisplay(display)}} doneTask={(id,projectId)=>{this.doneTask(id,projectId)}} addMember={(member)=>{this.newMember(member)}} addTask={(task)=>{this.newTask(task)}} removeMember={(memberId,projectId)=>{this.removeMember(memberId,projectId)}}/>
        }


    return (
        <div className='container-fluid'>
            <div className='header text-center'>
                <div className='row'>
                    <div className='col-4'>
                    </div>
                    <div className='col-4'>
                        <h1>Trello Clone</h1>
                    </div>
                    <div className='col-4'>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <input onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.value}/>
            </div>
            <div className='text-center'>
                <div className={styles.projects}>
                    {showProject}
                </div>
            </div>
        </div>
    );
  }
}

export default hot(module)(App);