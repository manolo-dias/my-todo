import React from "react";
import { useState, useEffect } from "react";




const StatusFilter = ({tasks, status}) => {
    const [selectedOption, setSelectedOption] = useState('all');
    
    useEffect(() => {
        localStorage.setItem('selected-option', selectedOption);
    }, [selectedOption, tasks]);

    
    const handleFilters = (option) => {
    
        switch (option) {
            case 'done':
                localStorage.setItem(
                    'tasks',
                    JSON.stringify(tasks.filter((_, index) => status[index] === true))
                );
                break;
            case 'todo':
                localStorage.setItem(
                    'tasks',
                    JSON.stringify(tasks.filter((_, index) => status[index] === false))
                );
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

    return(
        <details className='fixed right-10'>
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
    );
}

export default StatusFilter;