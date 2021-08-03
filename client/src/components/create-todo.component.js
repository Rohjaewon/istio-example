import React, { useEffect, useState } from 'react';
import axios from 'axios';

const uri = 'http://localhost:4000'

function CreateTodo(props) {
    const [todo, setTodo] = useState({
        'description': '',
        'responsible': '',
        'priority': '',
        'completed': false,
    })

    const onChangeTodoDescription = e => {
        setTodo({ ...todo, description: e.target.value });
    }

    const onChangeTodoResponsible = e => {
        setTodo({ ...todo, responsible: e.target.value });
    }

    const onChangeTodoPriority = e => {
        setTodo({ ...todo, priority: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        // SUBMIT LOGIC NEED TO BE IMPLEMENTED HERE
        console.log('Form submitteed:');
        console.log(`Todo Description: ${todo.description}`);
        console.log(`Todo Responsible: ${todo.responsible}`);
        console.log(`Todo Priority: ${todo.priority}`);
        console.log(`Todo Completed: ${todo.completed}`);

        const newTodo = {
            description: todo.description,
            responsible: todo.responsible,
            priority: todo.priority,
            completed: todo.completed
        }
        const server = [uri, 'todos/add']
        axios.post(server.join('/'), newTodo)
            .then(res => {
                props.history.push('/')
            })
            .then(() => {
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        setTodo({
            'description': '',
            'responsible': '',
            'priority': '',
            'completed': false,
        })
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Create New Todo</h3>
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
                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateTodo;