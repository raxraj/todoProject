import axios from 'axios';
import React from 'react';


const Todo = (props) => {

    const [isDone, setIsDone] = React.useState(props.todo.isDone);

    function markTodoAsDone(){
        axios.post('http://127.0.0.1:5500/doneTodo',
        {
            userName: localStorage.getItem('username'),
            todoID: props.todo._id
        }
        )
        .then(response=>{
            if(response.data.done){
                setIsDone(true)
                alert('Marked as Done')
            }
            else{
                alert(response.data.message)
            }
        })
    }

    if(isDone){
        return (
            <div className="todo">
            <div className="todo-text">
                <strike>
                    {props.todo.todotext}
                </strike>
            </div>
            <div className="todo-functions">
                <button className="todoButton" onClick={markTodoAsDone}>Mark as Done</button>
                <button className="todoButton deleteButton">Delete</button>
            </div>
        </div>
        )
    }
    else{
        return (
            <div className="todo">
            <div className="todo-text">
                {props.todo.todotext}
            </div>
            <div className="todo-functions">
                <button className="todoButton" onClick={markTodoAsDone}>Mark as Done</button>
                <button className="todoButton deleteButton">Delete</button>
            </div>
        </div>
        )
    }
        
}

export default Todo;
