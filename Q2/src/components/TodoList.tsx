import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  editingId: string | null;
  onStartEdit: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

function TodoList({
  todos,
  editingId,
  onStartEdit,
  onSave,
  onCancelEdit,
  onDelete,
}: TodoListProps) {
  return (
    <>
      <div className="list-heading">
        <h2>Your tasks</h2>
        <span>{todos.length ? 'Keep going!' : 'All clear'}</span>
      </div>

      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onStartEdit={onStartEdit}
              onSave={onSave}
              onCancel={onCancelEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h2>Nothing on your list</h2>
          <p>Add a task above when you’re ready.</p>
        </div>
      )}
    </>
  );
}

export default TodoList;

