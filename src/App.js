/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './components/taskList';

function App() {
    // representa as tarefas na tela. setTasks eh usado pra manipular seu valor no DOM além de popular a tela com os dados do cache
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [checkboxes, setCheckboxes] = useState(JSON.parse(localStorage.getItem('status')) || {});
    const [ids, setIds] = useState(JSON.parse(localStorage.getItem('id')) || {});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState('all');


    const path = "http://localhost:5000/api/v1/activities/";


    // Busca dados da api
    useEffect(() => {
        axios.get(path)
            .then(response => {
                const activity = [];
                const ckbox = [];
                const ids = [];

                response.data.forEach((item, index) => {
                    activity[index] = item.activity;
                    ckbox[index] = item.status;
                    ids[index] = item.id;
                });

                const savedTasks = activity || [];
                const savedCheckboxes = ckbox || {};
                const savedIds = ids || {};

                setTasks(savedTasks);
                setCheckboxes(savedCheckboxes);
                setIds(savedIds);

            })
            .catch(error => console.error(error));
    }, []);


    // Atualizar localStorage sempre que as tarefas ou checkboxes mudarem
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('status', JSON.stringify(checkboxes));
        localStorage.setItem('id', JSON.stringify(ids));
    }, [tasks, checkboxes, ids]);

    // Função para adicionar nova tarefa
    const handleAddTask = () => {
        const newText = document.getElementById('new-task-term-id').value

        if (newText && newText.trim() !== "") {
            const updatedTasks = [...tasks, newText.trim()];
            setTasks(updatedTasks);

            const postData = {
                activity: newText.trim(),
            };

            axios.post(path, postData)
                .then(response => {
                    const newId = response.data.id;
                    const updatedIds = [...ids, newId];
                    setIds(updatedIds);
                    localStorage.setItem('id', JSON.stringify(updatedIds));
                    document.getElementById('new-task-term-id').value = ''
                })
                .catch(error => console.error(error));
        }
    };

    // Função para deletar uma tarefa
    const handleDeleteTask = (index) => {
        axios.delete(path + ids[index])
            .then(() => {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                const updatedCheckboxes = { ...checkboxes };
                const updatedIds = ids.filter((_, i) => i !== index);
                delete updatedCheckboxes[index];
                setTasks(updatedTasks);
                setCheckboxes(updatedCheckboxes);
                setIds(updatedIds);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Função para editar uma tarefa
    const handleEditTask = (index) => {
        const newText = prompt("Digite o novo nome", tasks[index]);
        if (newText !== null) {
            const updatedTasks = tasks.map((task, i) => (i === index ? newText.trim() : task));

            axios.patch(path + ids[index], {
                activity: updatedTasks[index],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                },
            }).then(() => {
                setTasks(updatedTasks);
            })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    // Função para lidar com mudanças no estado do checkbox
    const handleCheckboxChange = (index) => {

        axios.patch(path + ids[index], {
            status: !checkboxes[index],
        }).then(() => {
            setCheckboxes((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));

        })
            .catch(error => {
                console.error(error);
            });

    };

    // Função para atualizar o termo de pesquisa
    const searchValue = (value) => {
        setSearchTerm(value);
    };


    const handleFilters = (option) => {
        switch (option) {
            case 'done':
                localStorage.setItem('tasks', JSON.stringify((tasks.filter((i, index) => checkboxes[index] === true))));
                break;
            case 'todo':
                localStorage.setItem('tasks', JSON.stringify(tasks.filter((i, index) => checkboxes[index] === false)));
                break;
            case 'all':
            default:
                localStorage.setItem('tasks', JSON.stringify(tasks));
                break;
        }
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        handleFilters(event.target.value);
    };

    // Função para filtrar as tarefas com base no termo de pesquisa
    const filteredTasks = () => {
        if (localStorage.getItem('tasks') !== null)
            return JSON.parse(localStorage.getItem('tasks')).filter((task) => task.toLowerCase().includes(searchTerm.toLowerCase()));

        return [];
    }

    return (
        <div className="mx-auto">

            <div className=" z-10 flex px-2 py-2 w-full bg-[#202020]">
                {/* Menu de filtros */}

                <details className='absolute'>
                    <summary className="list-none cursor-pointer pt-4 flex pl-10 items-center">
                        <img
                            src=".\menu-svgrepo-com.svg"
                            alt="Menu"
                            title="Clique para acessar os filtros"
                            className="h-6 w-6"
                        />
                    </summary>
                    <ul className="menu dropdown-content bg-white bg-base-100 rounded-box z-[1] w-fit rounded-md p-2 shadow">
                        <div className="flex">
                            <input
                                type="radio"
                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                id="option-todas"
                                name="taskFilter"
                                value="all"
                                checked={selectedOption === 'all'}
                                onChange={handleChange}
                            />
                            <label htmlFor="option-todas" className="text-sm text-gray-500 ml-3">Todas</label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                id="option-concluidas"
                                name="taskFilter"
                                value="done"
                                checked={selectedOption === 'done'}
                                onChange={handleChange}
                            />
                            <label htmlFor="option-concluidas" className="text-sm text-gray-500 ml-3">Concluidas</label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                id="option-nao-concluidas"
                                name="taskFilter"
                                value="todo"
                                checked={selectedOption === 'todo'}
                                onChange={handleChange}
                            />
                            <label htmlFor="option-nao-concluidas" className="text-sm text-gray-500 ml-3">Não concluídas</label>
                        </div>
                    </ul>
                </details>

                {/* Título  */}
                <h1 className="flex flex-grow mt-1 text-white justify-center text-3xl font-semibold mb-4 ">
                    My Todo
                </h1>
                
            </div>
            <hr className='border-[#00af5d]'/>
            
            <div className="mx-auto mt-4">

                <TaskList
                    tasks={tasks}
                    checkboxes={checkboxes}
                    selectedOption={selectedOption}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                />
                <div className="flex items-center bg-[#1b1b1b] pt-10 pb-4 fixed bottom-0 left-0 right-0">

                    <div className="flex mb-[18px] w-full">
                        {/* AREA DE ADIÇÃO DE TAREFAS */}
                        <div className="flex gap-2 w-full ml-[20%]">
                            <input
                                id="new-task-term-id"
                                type="text"
                                className="w-full px-4 py-2  rounded-xl border-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Adicionar tarefa"
                            />
                        </div>

                        {/* BOTÃO DE ADICIONAR TAREFAS */}

                        <div class="flex ml-4 mr-[20%]">
                            <button data-testid="create-button"
                                className=" whitespace-nowrap  bg-[#00af5d] hover:bg-[#008d4b] text-white font-bold py-2 px-6 rounded-3xl"
                                onClick={handleAddTask}
                            >
                                + Nova
                            </button>

                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
}

export default App;