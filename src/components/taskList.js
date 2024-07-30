/* eslint-disable */
import React from 'react';

const TaskList = ({
    tasks,
    checkboxes,
    ids,
    selectedOption,
    handleCheckboxChange,
    handleDeleteTask,
    handleEditTask
}) => {
    return (
        <ul id="todo-list">
            {tasks.map((task, index) => (
                <div
                    role="tasks elements"
                    key={index}
                    className="block ease-in-out hover:scale-110 w-full px-4 py-2 my-2 font-medium text-center text-black capitalize transition-colors duration-300 transform focus:outline-none focus:ring bg-teal-400 rounded-md hover:bg-teal-500 focus:ring-teal-300 focus:ring-opacity-80"
                    onClick={() => handleCheckboxChange(index)}
                    style={{
                        display:
                            selectedOption === 'all' ||
                                (selectedOption === 'done' && checkboxes[index]) ||
                                (selectedOption === 'todo' && !checkboxes[index])
                                ? 'block'
                                : 'none',
                    }}
                >
                    {/* checkboxes */}
                    <li className="w-full flex items-center justify-between py-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            {/* se a checkbox for marcada, grifa o texto */}
                            <span className={checkboxes[index] ? 'line-through' : ''}>{task}</span>
                        </label>
                        <div>
                            <button
                                className="mr-2 align-middle"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTask(index);
                                }}
                            >
                                <img
                                    src=".\trash-slash-alt-svgrepo-com.svg"
                                    alt="Delete"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                className="align-middle"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditTask(index);
                                }}
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
    );
};

export default TaskList;