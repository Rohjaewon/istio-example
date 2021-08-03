import React, { useState, useEffect } from 'react';
import axios from 'axios';

const uri = 'http://localhost:4000'

function EditTodo(props) {
    const [todo, setTodo] = useState({
        'description': '',
        'responsible': '',
        'priority': '',
        'completed': false
    })
    //componentDidMount
    useEffect(() => {
        let server = [uri, 'todos', props.match.params.id]
        axios.get(server.join('/'))
            .then(res => {
                setTodo({
                    description: res.data.description,
                    responsible: res.data.responsible,
                    priority: res.data.priority,
                    completed: res.data.completed
                })
            })
            .catch(err => console.log(err));
    },[])

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            description: e.target.value
        });
    }

    const onChangeTodoResponsible = (e) => {
        setTodo({
            ...todo,
            responsible: e.target.value
        });
    }

    const onChangeTodoPriority = (e) => {
        setTodo({
            ...todo,
            priority: e.target.value
        });
    }

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            completed: !todo.completed
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let server = [uri, 'todos/edit', props.match.params.id]
        const obj = {
            description: todo.description,
            responsible: todo.responsible,
            priority: todo.priority,
            completed: todo.completed
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
                        value={todo.description}
                        onChange={onChangeTodoDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input type="text"
                        className="form-control"
                        value={todo.responsible}
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
                            checked={todo.priority === "Low"}
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
                            checked={todo.priority === "Medium"}
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
                            checked={todo.priority === "High"}
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
                        checked={todo.completed}
                        value={todo.completed}
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