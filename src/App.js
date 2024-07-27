import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    // representa as tarefas na tela. setTasks eh usado pra manipular seu valor no DOM
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [newTask, setNewTask] = useState("");
    const [checkboxes, setCheckboxes] = useState(JSON.parse(localStorage.getItem('checkboxes')) || {});
    const [ids, setIds] = useState(JSON.parse(localStorage.getItem('ids')) || {});
    const [searchTerm, setSearchTerm] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const path = "https://66a53a055dc27a3c190afb3f.mockapi.io/api/v1/activities/";

    // Carregar dados do localStorage quando o componente é montado
    useEffect(() => {
        axios.get(path)
            .then(response => {
                const activity = [];
                const ckbox = [];
                response.data.map((item, index) => (
                    activity[index] = item.activity
                ));
                response.data.map((item, index) => (
                    ckbox[index] = item.checkbox
                ));


                const savedTasks = activity || [];
                const savedCheckboxes = ckbox || {};

                setTasks(savedTasks);
                setCheckboxes(savedCheckboxes);
            })
            .catch();



    }, []);

    // Atualizar localStorage sempre que as tarefas ou checkboxes mudarem
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
        localStorage.setItem('id', JSON.stringify(ids));

    }, [tasks, checkboxes]);

    // Função para adicionar nova tarefa
    const handleAddTask = (event) => {
        event.preventDefault();
        if (newTask.trim() !== "") {
            const updatedTasks = [...tasks, newTask.trim()];
            setTasks(updatedTasks);
            setNewTask("");
            const postData = {
                activity: newTask,
            };

            axios.post(path, postData)
                .then(response => {
                    setResponse(response.data);
                    setError(null);
                })
                .catch(error => {
                    setError(error);
                    setResponse(null);
                });
        }
    };

    // Função para deletar uma tarefa
    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedCheckboxes = { ...checkboxes };
        delete updatedCheckboxes[index];
        setTasks(updatedTasks);
        setCheckboxes(updatedCheckboxes);
    };

    // Função para editar uma tarefa
    const handleEditTask = (index) => {
        const newText = prompt("Digite o novo nome", tasks[index]);
        if (newText !== null) {
            const updatedTasks = tasks.map((task, i) => (i === index ? newText.trim() : task));
            setTasks(updatedTasks);
        }
    };

    // Função para lidar com mudanças no estado do checkbox
    const handleCheckboxChange = (index) => {
        setCheckboxes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Função para atualizar o termo de pesquisa
    const searchValue = (value) => {
        setSearchTerm(value);
    };

    // Função para filtrar as tarefas com base no termo de pesquisa
    const filteredTasks = tasks.filter((task) => task.toLowerCase().includes(searchTerm.toLowerCase()));



    return (
        <div className="container mx-auto my-10">
            <h1 className="text-center text-3xl font-semibold mb-4">
                My Todo
            </h1>
            <div className="md:w-1/2 mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex gap-4">
                        <form id="todo-form" onSubmit={handleAddTask} className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                                    id="todo-input"
                                    placeholder="Adicionar nova tarefa"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    required
                                />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Adicionar
                                </button>
                            </div>
                        </form>
                        <div className="flex gap-2 w-full">
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                                id="todo-input"
                                placeholder="Pesquisar tarefa"
                                onChange={(e) => searchValue(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <ul id="todo-list">
                        {filteredTasks.map((task, index) => (
                            <div className="block w-full px-4 py-2 my-2 font-medium text-center text-white capitalize transition-colors duration-300 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">

                                <li key={index} className=" w-full flex items-center justify-between py-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={checkboxes[index] || false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        {/* se a checkbox for marcada, grifa o texto */}
                                        <span className={checkboxes[index] ? 'line-through' : ''}>{task}</span>

                                    </label>
                                    <div>
                                        <button
                                            className="mr-2 align-middle"
                                            onClick={() => handleDeleteTask(index)}

                                        >
                                            <img
                                                src=".\trash-slash-alt-svgrepo-com.svg"
                                                alt="Delete"
                                                className="w-6 h-6"
                                            />
                                        </button>
                                        <button
                                            className="align-middle"
                                            onClick={() => handleEditTask(index)}
                                        >
                                            <img
                                                src=".\pencil-svgrepo-com.svg"
                                                alt="Edit"
                                                className="w-6 h-6"
                                            />
                                        </button>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
