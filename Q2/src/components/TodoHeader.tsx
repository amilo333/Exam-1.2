interface TodoHeaderProps {
  totalTodos: number;
}

function TodoHeader({ totalTodos }: TodoHeaderProps) {
  return (
    <header>
      <div>
        <p className="date-label">TODAY’S PLAN</p>
        <h1 id="page-title">Daily Focus</h1>
        <p className="subtitle">Small steps, meaningful progress.</p>
      </div>

      <div className="count-badge" aria-label={`${totalTodos} tasks`}>
        <strong>{totalTodos}</strong>
        <span>{totalTodos === 1 ? 'task' : 'tasks'}</span>
      </div>
    </header>
  );
}

export default TodoHeader;

