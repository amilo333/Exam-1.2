import type { FormEvent } from 'react';

interface TodoFormProps {
  value: string;
  error: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TodoForm({ value, error, onChange, onSubmit }: TodoFormProps) {
  return (
    <form className="add-form" onSubmit={onSubmit} noValidate>
      <div className="new-todo-field">
        <label htmlFor="new-todo" className="sr-only">
          New todo item
        </label>
        <input
          id="new-todo"
          value={value}
          maxLength={81}
          placeholder="What needs to be done?"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'new-todo-error' : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        <button type="submit" className="add-button">
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>

      <div className="form-feedback">
        {error ? (
          <p id="new-todo-error" role="alert">
            {error}
          </p>
        ) : (
          <span>{value.length}/80</span>
        )}
      </div>
    </form>
  );
}

export default TodoForm;

