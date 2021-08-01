import React, { useState, useEffect } from 'react';
import axios from 'axios';

const uri = 'http://localhost:4000'

function EditTodo(props) {
    const [todo, setTodo] = useState({
        'todo_description': '',
        'todo_responsible': '',
        'todo_priority': '',
        'todo_completed': false
    })
    //componentDidMount
    useEffect(() => {
        let server = [uri, 'todos', props.match.params.id]
        axios.get(server.join('/'))
            .then(res => {
                setTodo({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed
                })
            })
            .catch(err => console.log(err));
    },[])

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            todo_description: e.target.value
        });
    }

    const onChangeTodoResponsible = (e) => {
        setTodo({
            ...todo,
            todo_responsible: e.target.value
        });
    }

    const onChangeTodoPriority = (e) => {
        setTodo({
            ...todo,
            todo_priority: e.target.value
        });
    }

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            todo_completed: !todo.todo_completed
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let server = [uri, 'todos/update', props.match.params.id]
        const obj = {
            todo_description: todo.todo_description,
            todo_responsible: todo.todo_responsible,
            todo_priority: todo.todo_priority,
            todo_completed: todo.todo_completed
        };
        axios.post(server.join('/'), obj)
            .then(res => console.log(res.data));

        props.history.push('/');
    }

    return (
        <div>
            <h3>Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        className="form-control"
                        value={todo.todo_description}
                        onChange={onChangeTodoDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input type="text"
                        className="form-control"
                        value={todo.todo_responsible}
                        onChange={onChangeTodoResponsible}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={todo.todo_priority === "Low"}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={todo.todo_priority === "Medium"}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={todo.todo_priority === "High"}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="completedCheckbox"
                        name="completedCheckbox"
                        onChange={onChangeTodoCompleted}
                        checked={todo.todo_completed}
                        value={todo.todo_completed}
                    />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditTodo;