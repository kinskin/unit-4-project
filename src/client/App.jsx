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

    componentDidMount(){
        let url = `http://localhost:3000/projects`
        fetch(url)
            .then(response =>  response.json())
            .then(data => {
                this.setState({projects: data})
            })
    }

    showThisProject(projectId){
        this.showProject(projectId)
    }

    showProject(id){
        let projects = this.state.projects
        let filterProjects = projects.projects
        let filterMembers = projects.members.filter(member=> member.project_id == id)
        let filterTasks = projects.tasks.filter(task=> task.project_id == id)
        this.setState({showProject: filterProjects, showMembers: filterMembers, showTasks: filterTasks, displayProject: false})
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

    editTask(editTaskId, editTask, editTaskProjectId){
        let projects = this.state.projects
        let editTaskIndex = projects.tasks.findIndex(task => task.taskid == editTaskId)
        projects.tasks[editTaskIndex].task = editTask
        this.setState({projects: projects})
        this.showProject(editTaskProjectId)
    }

    doneTask(id,projectId){
        let projects = this.state.projects
        let taskIndex = projects.tasks.findIndex(task=>task.taskid == id)
        projects.tasks.splice(taskIndex,1)
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
        this.setState({projects: projects})
        this.showProject(projectId)
    }


    projectDisplay(display){
        this.setState({showProject: [], showMembers:[], showTasks:[], displayProject: display })
    }

    editDesc(projectId,editDesc){
        let projects = this.state.projects
        let projectIndex = projects.projects.findIndex(project => project.projectid == projectId)
        projects.projects[projectIndex].description = editDesc
        this.setState({projects: projects})
        this.showProject(projectId)
    }

    addNewProject(project){
        let projectId = project.result[0].projectid
        let projects = this.state.projects
        let data = {
            projectid: project.result[0].projectid,
            project_name: project.result[0].project_name,
            decription: project.result[0].description
        }
        projects.projects.push(data)
        this.setState({projects: projects},()=>{
            this.showThisProject(projectId)
        })
    }


    render() {
        let displayProject = this.state.displayProject
        let showProject;
        if(displayProject === true){
            showProject = <Projects projects={this.state.projects}  showProject={(id)=>{this.showProject(id)}}/>
        }
        else{
            showProject = <Project project={this.state.showProject} members={this.state.showMembers} tasks={this.state.showTasks} projectDisplay={(display)=>{this.projectDisplay(display)}} doneTask={(id,projectId)=>{this.doneTask(id,projectId)}} addMember={(member)=>{this.newMember(member)}} addTask={(task)=>{this.newTask(task)}} removeMember={(memberId,projectId)=>{this.removeMember(memberId,projectId)}} editTask={(editTaskId, editTask, editTaskProjectId)=>{this.editTask(editTaskId, editTask, editTaskProjectId)}} editDesc={(projectId,editDesc)=>{this.editDesc(projectId,editDesc)}} showThisProject={(projectId)=>{this.showThisProject(projectId)}} addNewProject={(project)=>{this.addNewProject(project)}}/>
        }


    return (
        <div className='container-fluid'>
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