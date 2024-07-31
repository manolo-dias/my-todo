/* eslint-disable */
import React from 'react';

const TaskList = ({
    tasks,
    checkboxes,
    selectedOption,
    handleCheckboxChange,
    handleDeleteTask,
    handleEditTask
}) => {
    return (
        <ul id="todo-list" class="buttons max-h-[80vh]  overflow-y-scroll ">
            {tasks.map((task, index) => (
                <div
                    role="tasks elements"
                    key={index}
                    className="mb-5 ease-in-out hover:scale-[102%] w-[60%] mx-auto px-4 py-2 my-2 font-medium text-center text-black capitalize transition-transform duration-300 transform focus:outline-none focus:ring bg-white rounded-md hover:bg-[#00af5d] focus:ring-opacity-80"
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
                            />
                            {/* se a checkbox for marcada, grifa o texto */}
                            <span className={checkboxes[index] ? 'line-through' : ''}>{task}</span>
                        </label>
                        <div>
                            <button
                                data-testid="delete-button"
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
                                data-testid="edit-button"
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