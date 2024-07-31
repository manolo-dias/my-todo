import React from "react";

const Footer = ({handleAddTask}) => {
    return (
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
    );
};
export default Footer;