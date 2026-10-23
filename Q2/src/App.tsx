import { useState, type FormEvent } from 'react';
import TodoForm from './components/TodoForm';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import type { Todo } from './types/todo';
import { validateTodo } from './utils/validateTodo';

const starterTodos: Todo[] = [
  { id: 'starter-1', text: 'Review React hooks notes' },
  { id: 'starter-2', text: 'Finish the Todo List exercise' },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(starterTodos);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNewTodoChange = (value: string) => {
    setNewTodo(value);
    if (error) setError(validateTodo(value));
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateTodo(newTodo);
    setError(validationError);
    if (validationError) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text: newTodo.trim() },
    ]);
    setNewTodo('');
  };

  const saveTodo = (id: string, text: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
    setEditingId(null);
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <main className="page-shell">
      <section className="todo-card" aria-labelledby="page-title">
        <TodoHeader totalTodos={todos.length} />

        <TodoForm
          value={newTodo}
          error={error}
          onChange={handleNewTodoChange}
          onSubmit={addTodo}
        />

        <TodoList
          todos={todos}
          editingId={editingId}
          onStartEdit={setEditingId}
          onSave={saveTodo}
          onCancelEdit={() => setEditingId(null)}
          onDelete={deleteTodo}
        />

        <footer>Tip: press Enter to add or save a task.</footer>
      </section>
    </main>
  );
}

export default App;

