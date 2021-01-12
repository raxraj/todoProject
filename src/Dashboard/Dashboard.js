import './Dashboard.css'
import React, { Component } from 'react';
import axios from 'axios';


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = { newTodo: '', username: '', todos: [] }
    }

    componentDidMount() {
        if (localStorage.getItem('username')) {
            this.setState({ username: localStorage.getItem('username') })
            axios.post('http://127.0.0.1:5500/getTodos',{
                userName: localStorage.getItem('username')
            })
                .then(response => {
                    if (response.data.done) {
                        this.setState({ todos: response.data.todos })
                    }
                })
        }
    }

    addTodo = () => {
        axios.post('http://127.0.0.1:5500/addTodo',
            {
                userName: localStorage.getItem('username'),
                todotext: this.state.newTodo
            })
            .then(response => {
                if (response.data.done) {
                    alert('Todo Added')
                }
                else {
                    alert('It is not added')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <div className="heading">
                    Hello, {this.state.username}
                </div>
                <div className="todos">
                    <div className="create-todo">
                        <textarea type="text" value={this.state.newTodo} onChange={(event) => this.setState({ newTodo: event.target.value })} />
                        <button className="todoButton" onClick={this.addTodo}>Add Todo</button>
                    </div>
                    
                        {this.state.todos.map((todo) =>
                        (
                            <div className='todo' key={todo._id}>
                                <div className="todo-text">
                                    {todo.todotext}
                        </div>
                                <div className="todo-functions">
                                    <button className="todoButton">Mark as Done</button>
                                    <button className="todoButton deleteButton">Delete</button>
                                </div>
                            </div>
                        )
                        )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
