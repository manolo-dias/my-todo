/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './components/taskList';
import HeadLine from './components/headline';
import Footer from './components/footer';
import StatusFilter from './components/statusFilter';

function App() {
    // representa as tarefas na tela. setTasks eh usado pra manipular seu valor no DOM além de popular a tela com os dados do cache
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [checkboxes, setCheckboxes] = useState(JSON.parse(localStorage.getItem('status')) || {});
    const [ids, setIds] = useState(JSON.parse(localStorage.getItem('id')) || {});
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selected-option') || 'all');
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const TITLE = "My Todo";
    const PATH = "http://localhost:5000/api/v1/activities/";


    // Busca dados da api
    useEffect(() => {
        axios.get(PATH)
            .then(response => {
                const activity = [];
                const ckbox = [];
                const ids = [];

                response.data.forEach((item, index) => {
                    activity[index] = item.activity;
                    ckbox[index] = item.status;
                    ids[index] = item.id;
                })

                setTasks(activity);
                setCheckboxes(ckbox);
                setIds(ids);

            })
            .catch(error => console.error(error));
    }, []);


    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    useEffect(() => {
        filterTasks(selectedOption);
    }, [selectedOption, tasks, checkboxes]);

    const filterTasks = (option) => {
        let newFilteredTasks;
        switch (option) {
            case 'done':
                newFilteredTasks = tasks.filter((_, index) => checkboxes[index] === true);
                break;
            case 'todo':
                newFilteredTasks = tasks.filter((_, index) => checkboxes[index] === false);
                break;
            case 'all':
            default:
                newFilteredTasks = tasks;
                break;
        }
        setFilteredTasks(newFilteredTasks);
    };

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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

            axios.post(PATH, postData)
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
        axios.delete(PATH + ids[index])
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

            axios.patch(PATH + ids[index], {
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

        axios.patch(PATH + ids[index], {
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

    const handleFilterChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="mx-auto">

            <div className=" z-10 flex px-2 py-2 w-full bg-[#202020]">
                {/* Menu de filtros */}



                {/* Título  */}
                <HeadLine title={TITLE} />

                <StatusFilter status={checkboxes} tasks={tasks} onFilterChange={handleFilterChange} />

            </div>

            <hr className='border-[#00af5d]' />


            <div className="mx-auto mt-4">

            <TaskList
                    tasks={filteredTasks}
                    checkboxes={filteredTasks.map((status, _) => checkboxes[tasks.indexOf(status)] || false)}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                />
                

                <Footer handleAddTask={handleAddTask} />

            </div>

        </div>

    );
}

export default App;