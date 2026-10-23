import { useEffect, useId, useState } from 'react';

type ValidationFunction = (value: string) => string;

interface ValidatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  validationFunction: ValidationFunction;
  placeholder?: string;
}

function ValidatedInput({
  label,
  value,
  onChange,
  validationFunction,
  placeholder,
}: ValidatedInputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [error, setError] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  // The effect runs after every value change, like componentDidUpdate.
  useEffect(() => {
    setError(validationFunction(value));
  }, [value, validationFunction]);

  const showError = hasInteracted && Boolean(error);
  const isValid = hasInteracted && value.length > 0 && !error;

  return (
    <div className="field-group">
      <label htmlFor={inputId}>{label}</label>
      <div className="input-wrap">
        <input
          id={inputId}
          value={value}
          placeholder={placeholder}
          className={showError ? 'input-error' : isValid ? 'input-valid' : ''}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          onBlur={() => setHasInteracted(true)}
          onChange={(event) => {
            setHasInteracted(true);
            onChange(event.target.value);
          }}
        />
        {isValid && <span className="status-icon" aria-label="Valid input">✓</span>}
      </div>
      <div className="message-slot">
        {showError ? (
          <p id={errorId} className="error-message" role="alert">
            <span aria-hidden="true">!</span> {error}
          </p>
        ) : isValid ? (
          <p className="success-message">That username is ready to use.</p>
        ) : (
          <p className="hint">3–20 characters; letters, numbers, and underscores only.</p>
        )}
      </div>
    </div>
  );
}

function validateUsername(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) return 'Username is required.';
  if (trimmedValue.length < 3) return 'Username must be at least 3 characters.';
  if (trimmedValue.length > 20) return 'Username must be 20 characters or fewer.';
  if (!/^[a-zA-Z0-9_]+$/.test(trimmedValue)) {
    return 'Only letters, numbers, and underscores are allowed.';
  }

  return '';
}

function App() {
  const [username, setUsername] = useState('');

  return (
    <main className="page-shell">
      <section className="card" aria-labelledby="page-title">
        <div className="eyebrow"><span /> ACCOUNT SETUP</div>
        <h1 id="page-title">Choose your username</h1>
        <p className="intro">
          Pick a unique name for your profile. We’ll check it as you type.
        </p>

        <ValidatedInput
          label="Username"
          value={username}
          onChange={setUsername}
          validationFunction={validateUsername}
          placeholder="e.g. alex_dev"
        />

        <div className="effect-note">
          <span className="pulse" aria-hidden="true" />
          Validation updates whenever the input value changes.
        </div>
      </section>
    </main>
  );
}

export default App;

