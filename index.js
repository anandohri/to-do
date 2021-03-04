import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Ongoing(props){
  return(
    <button value="Ongoing" class="tabs" onClick={props.handleClick} >
      Ongoing
    </button>
  )
}

function Upcoming(props){
  return(
    <button value="Upcoming" class="tabs" onClick={props.handleClick} >
      Upcoming
    </button>
  )
}

function Finished(props){
  return(
    <button value='Finished' class="tabs" onClick={props.handleClick} >
      Finished
    </button>
  )
}

class AddTask extends React.Component{
  constructor(props){
    super(props);
    this.state={type: 'Ongoing',
                task: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd(e){
    const task ={type: this.state.type,
                  task: this.state.task}
    {this.props.handleAdd(task)}
    this.setState({task: ''})
  }

  render(){
    return(
      <div>
        <select name='type' value={this.state.type} onChange={this.handleChange} >
          <option value='Ongoing' selected>Ongoing</option>
          <option value='Upcoming'>Upcoming</option>
          <option value='Finished'>Finished</option>
        </select>
        <br />
        <textarea name='task' value={this.state.task} onChange={this.handleChange} />
        <br />
        <button value='Submit' onClick={this.handleAdd} >
          Add Task
        </button>
      </div>
    )
}
}

class Mainframe extends React.Component{
  constructor(props){
    super(props);
    this.state = {Ongoing : '',
                  Upcoming: '',
                  Finished: '',
                  Current: ''}

    this.handleTabs = this.handleTabs.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderAddTask = this.renderAddTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleTabs(props){
    const up = this.state.Upcoming;
    const on = this.state.Ongoing;
    const fin = this.state.Finished;
    props.target.value === 'Ongoing' ? this.setState({Current: on})
                                          : (props.target.value === 'Upcoming' ? this.setState({Current: up})
                                                                                  : this.setState({Current: fin}))
  }

  renderTabs(props){
    return(
      props === 'ongoing' ? <Ongoing handleClick={this.handleTabs} />
                            : (props === 'upcoming' ? <Upcoming handleClick={this.handleTabs} />
                                                      :<Finished handleClick={this.handleTabs} />)
    )
  }

  renderAddTask(){
    return(
      <AddTask handleAdd={this.handleAddTask} />
    )
  }

  handleAddTask(props){
    const type = props.type
    const prev = type === 'Ongoing' ? this.state.Ongoing
                                      : (type ==='Upcoming' ? this.state.Upcoming
                                                              : this.state.Finished)
    prev === '' ? this.setState({[type]: props.task})
                  : this.setState({[type]: prev + '\n' + props.task})
  }

  render(){
    return(
      <div>
        <div>
          {this.renderTabs('ongoing')}
          {this.renderTabs('upcoming')}
          {this.renderTabs('finished')}
        </div>
        <br />
        <br />
        <br />
        <div name = 'Current'>
          {this.state.Current}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {this.renderAddTask()}
      </div>
    )
  }
}

ReactDOM.render(
  <Mainframe />,
  document.getElementById('root')
);
