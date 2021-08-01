import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
)

const uri = 'http://localhost:4000'

function TodosList() {
    const [todos, setTodos] = useState([])

    //componentDidMount and componentDidUpdate
    useEffect(() => {
        const server = [uri, 'todos']
        axios.get(server.join("/"))
        .then(res => {
            setTodos(res.data)
        })
        .catch(err => console.log(err));
    })

    const todoList = () => todos.map(
        (todo, index) => <Todo todo={todo} key={index} />
    )

    return (
        <div>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList()}
                </tbody>
            </table>
        </div>
    )
}

export default TodosList