import { useState } from 'react';
import type { Todo } from '../types/todo';
import { validateTodo } from '../utils/validateTodo';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

function TodoItem({
  todo,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
  onDelete,
}: TodoItemProps) {
  const [draft, setDraft] = useState(todo.text);
  const [editError, setEditError] = useState('');

  const saveEdit = () => {
    const validationError = validateTodo(draft);
    setEditError(validationError);
    if (!validationError) onSave(todo.id, draft.trim());
  };

  const startEdit = () => {
    setDraft(todo.text);
    setEditError('');
    onStartEdit(todo.id);
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <div className="edit-area">
          <input
            autoFocus
            value={draft}
            maxLength={81}
            aria-label={`Edit ${todo.text}`}
            aria-invalid={Boolean(editError)}
            onChange={(event) => {
              setDraft(event.target.value);
              if (editError) setEditError(validateTodo(event.target.value));
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveEdit();
              if (event.key === 'Escape') onCancel();
            }}
          />
          {editError && (
            <p className="item-error" role="alert">
              {editError}
            </p>
          )}
        </div>

        <div className="item-actions">
          <button
            className="icon-button save"
            onClick={saveEdit}
            aria-label="Save changes"
            title="Save"
          >
            ✓
          </button>
          <button
            className="icon-button cancel"
            onClick={onCancel}
            aria-label="Cancel editing"
            title="Cancel"
          >
            ×
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <span className="todo-dot" aria-hidden="true" />
      <span className="todo-text">{todo.text}</span>

      <div className="item-actions">
        <button
          className="icon-button edit"
          onClick={startEdit}
          aria-label={`Edit ${todo.text}`}
          title="Edit"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5Zm16.7-9.7a1 1 0 0 0 0-1.4l-2.1-2.1a1 1 0 0 0-1.4 0l-1.6 1.6 3.5 3.5 1.6-1.6Z" />
          </svg>
        </button>
        <button
          className="icon-button delete"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete ${todo.text}`}
          title="Delete"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8H7v12Zm2.5-7.5 1.4-1.4 1.1 1.1 1.1-1.1 1.4 1.4-1.1 1.1 1.1 1.1-1.4 1.4-1.1-1.1-1.1 1.1-1.4-1.4 1.1-1.1-1.1-1.1ZM15.5 5l-1-1h-5l-1 1H5v2h14V5h-3.5Z" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

