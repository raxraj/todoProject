import "./Dashboard.css";
import React, { Component } from "react";
import axios from "axios";

import Todo from "./Todo/Todo";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: "", username: "", todos: [] };
  }

  componentDidMount() {
    if (localStorage.getItem("username")) {
      this.setState({ username: localStorage.getItem("username") });
      this.loadTodos();
    }
  }

  loadTodos() {
    axios
      .post("http://127.0.0.1:5500/getTodos", {
        userName: localStorage.getItem("username"),
      })
      .then((response) => {
        if (response.data.done) {
          this.setState({ todos: response.data.todos });
        }
      });
  }

  // LifeCycle Methods -> Did Mount -> componentDidMount()
  // Will Unmount -> componentWillUnmount()
  // Did Update -> componentDidUpdate()

  addTodo = () => {
    axios
      .post("http://127.0.0.1:5500/addTodo", {
        userName: this.state.username,
        todotext: this.state.newTodo,
      })
      .then((response) => {
        if (response.data.done) {
          this.loadTodos();
          alert("Todo Added");
        } else {
          alert("It is not added");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="heading">Hello, {this.state.username}</div>
        <div className="todos">
          <div className="create-todo">
            <textarea
              type="text"
              value={this.state.newTodo}
              onChange={(event) =>
                this.setState({ newTodo: event.target.value })
              }
            />
            <button className="todoButton" onClick={this.addTodo}>
              Add Todo
            </button>
          </div>

          {this.state.todos.map((todo) => (
            <Todo todo={todo} key={todo._id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
