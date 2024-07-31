import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import TaskList from './components/taskList';


test('Cria uma tarefa de teste', () => {
  render(<App/>);
  const taskName = "tarefa de teste";
  const createButton = screen.getByTestId('create-button'); 
  const input = screen.getByPlaceholderText('Adicionar tarefa')
  input.innerHTML = taskName
  userEvent.click(createButton);
  const result = screen.getByText(taskName).innerHTML
  expect(taskName).toBe(result)
});

test('Deleta uma tarefa de teste', () => {
  const taskList = ["Ser Aprovado"]
  const checkbox = [{'0':true}]
  render(<App />);

  render(<TaskList tasks= {taskList} checkboxes={checkbox} handleDeleteTask={() => {}}/>);

  const taskName = "Ser Aprovado";
  const deleteButton = screen.getByTestId('delete-button');
  expect(taskName).toBeInTheDocument  //confirma que a tarefa existe
  userEvent.click(deleteButton);  //exclui e depois confirma que não existe mais
  expect(taskName).not.toBeInTheDocument 
});
