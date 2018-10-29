const data1 = [
    {name: "task1", completed: false, visible: true},
    {name: "task2", completed: true, visible: true},
    {name: "task3", completed: true, visible: true},
    {name: "task4", completed: false, visible: true}
]

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {checked: props.data.completed};
        this.toggleChecked = this.toggleChecked.bind(this);
    }

    toggleChecked() {
        this.setState({checked: !this.state.checked});
        data1[this.props.index].completed = !this.state.checked;
    }

    render() {
        let row;
        if (this.props.data.visible) {
            row = <li key={this.props.data.name} class="list-group-item">
                <div class="task-name">{this.props.data.name}</div>
                <input class="task-completed" type="checkbox" checked={this.state.checked} onChange={this.toggleChecked}/>
            </li>
        }
        return (
            <div>
                {row}
            </div>
        );
    }
}

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            completed: false
        };
        this.submit = this.submit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
    }
    
    submit() {
        this.props.action();
        data1.push({
            name: this.state.name,
            completed: this.state.completed,
            visible: true
        });
        this.setState({
            name: "",
            completed: false
        });
    }

    changeName(event) {
        this.setState({name: event.target.value});
    }

    toggleChecked() {
        this.setState({completed: !this.state.completed});
    }

    render() {
        let addTask;
        if (this.props.isVisible) {
            addTask = <div>
                <h3>Add task</h3>
                <input onChange={this.changeName} value={this.state.name}/>
                <input class="task-completed" type="checkbox" value={this.state.completed} onChange={this.toggleChecked}/>
                <button class="btn btn-success task-completed" onClick={this.submit}>Ok</button>
            </div>
        }
      return (
          <div>
              {addTask}
          </div>
      );
  }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddTaskVisible: false,
        };
        //render
        this.handler  = this.handler.bind(this);
        this.addTask = this.addTask.bind(this);
        this.displayCompleted = this.displayCompleted.bind(this);
        this.displayIncompleted = this.displayIncompleted.bind(this);
        this.displayAll = this.displayAll.bind(this);
    }

    //render
    handler() {
        this.setState({
            a: "a"
        });
    }

    displayCompleted() {
        this.props.data.forEach((data) => data.visible=data.completed);
        this.setState({
            a: ""
        });
    }

    displayIncompleted() {
        this.props.data.forEach((data) => data.visible=!data.completed);
        this.setState({
            a: ""
        });
    }
    
    displayAll() {
        this.props.data.forEach((data) => data.visible=true);
        this.setState({
            a: ""
        });
    }

    addTask() {
        this.setState({isAddTaskVisible: true});
    }

    render() {
    const listItems = this.props.data.map((data, index) =>
        <Item data={data} index={index}/>
    );
      return (
        <div class="container">
            <h1>To-do list</h1>
            <button class="btn btn-default" onClick={this.displayCompleted}>Completed</button>
            <button class="btn btn-default" onClick={this.displayIncompleted}>Incompleted</button>
            <button class="btn btn-default" onClick={this.displayAll}>All</button>
            <ul class="list-group">{listItems}</ul>
            <button class="btn btn-success" onClick={this.addTask}>Add task</button>
            <AddTask action={this.handler} data={this.props.data} isVisible={this.state.isAddTaskVisible}/>
        </div>
      );
    }
}

ReactDOM.render(
    <List data={data1}/>,
    document.getElementById('root')
);