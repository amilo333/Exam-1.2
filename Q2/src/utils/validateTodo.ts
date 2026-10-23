export function validateTodo(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) return 'Please enter a todo item.';
  if (trimmedValue.length < 3) return 'A todo must contain at least 3 characters.';
  if (trimmedValue.length > 80) return 'Keep the todo under 80 characters.';

  return '';
}

