import React, { useState, useEffect } from 'react';

const StatusFilter = ({ onFilterChange }) => {
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selected-option') || 'all');

    useEffect(() => {
        localStorage.setItem('selected-option', selectedOption);
        onFilterChange(selectedOption);  // Notifica o componente pai sobre a mudança no filtro
    }, [selectedOption, onFilterChange]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="absolute right-10 top-4 z-50">
            {/* Menu normal para telas maiores */}
            <div className="hidden md:flex space-x-4">
                <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                    <input
                        type="checkbox"
                        className="shrink-0 mt-0.5"
                        id="option-todas"
                        name="taskFilter"
                        value="all"
                        checked={selectedOption === 'all'}
                        onChange={handleChange}
                    />
                    <label htmlFor="option-todas" className="text-sm ml-3">Todas</label>
                </div>
                <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                    <input
                        type="checkbox"
                        className="shrink-0 mt-0.5"
                        id="option-concluidas"
                        name="taskFilter"
                        value="done"
                        checked={selectedOption === 'done'}
                        onChange={handleChange}
                    />
                    <label htmlFor="option-concluidas" className="text-sm ml-3">Concluídas</label>
                </div>
                <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                    <input
                        type="checkbox"
                        className="shrink-0 mt-0.5"
                        id="option-nao-concluidas"
                        name="taskFilter"
                        value="todo"
                        checked={selectedOption === 'todo'}
                        onChange={handleChange}
                    />
                    <label htmlFor="option-nao-concluidas" className="text-sm ml-3">Não concluídas</label>
                </div>
            </div>

            {/* Dropdown para telas menores */}
            <details className="md:hidden">
                <summary className="list-none cursor-pointer pt-2 flex items-center justify-end">
                    <img
                        src=".\menu-icon.svg"
                        alt="Menu"
                        title="Clique para acessar os filtros"
                        className="h-6 w-6"
                    />
                </summary>
                <ul className="menu dropdown-content bg-[#202020] text-white rounded-box z-[1] w-fit rounded-md p-2 shadow">
                    <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                        <input
                            type="checkbox"
                            className="shrink-0 mt-0.5"
                            id="option-todas"
                            name="taskFilter"
                            value="all"
                            checked={selectedOption === 'all'}
                            onChange={handleChange}
                        />
                        <label htmlFor="option-todas" className="text-sm ml-3">Todas</label>
                    </div>
                    <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                        <input
                            type="checkbox"
                            className="shrink-0 mt-0.5"
                            id="option-concluidas"
                            name="taskFilter"
                            value="done"
                            checked={selectedOption === 'done'}
                            onChange={handleChange}
                        />
                        <label htmlFor="option-concluidas" className="text-sm ml-3">Concluídas</label>
                    </div>
                    <div className="flex items-center mt-3 border-gray-200 rounded text-[#00AF5D] focus:ring-[#00AF5D]">
                        <input
                            type="checkbox"
                            className="shrink-0 mt-0.5"
                            id="option-nao-concluidas"
                            name="taskFilter"
                            value="todo"
                            checked={selectedOption === 'todo'}
                            onChange={handleChange}
                        />
                        <label htmlFor="option-nao-concluidas" className="text-sm ml-3">Não concluídas</label>
                    </div>
                </ul>
            </details>
        </div>
    );
};

export default StatusFilter;
