import './Dashboard.css'
import React, { Component } from 'react';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="heading">
                    Hello, #Fucker
                </div>
                <div className="todos">
                <div className="create-todo">
                    <textarea type="text"/>
                    <button className="todoButton">Add Todo</button>
                </div>
                    <div className="todo">
                        <div className="todo-text">
                            Sample Todo Text
                        </div>
                        <div className="todo-functions">
                            <button className="todoButton">Mark as Done</button>
                            <button className="todoButton deleteButton">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
