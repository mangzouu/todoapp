import { formatDateReadable, formatTimeReadable } from '../utils/dateUtils';

function TodoItem({ todo, folder, onToggleComplete, onEdit, onDelete }) {
  const folderColor = folder?.color || '#E8E8E8';

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{ borderLeftColor: folderColor }}
    >
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      
      <div className="todo-content" onClick={() => onEdit(todo)}>
        <div className="todo-title">{todo.title}</div>
        <div className="todo-meta">
          {folder && (
            <span style={{ color: folderColor }}>
              📁 {folder.name}
            </span>
          )}
          {todo.date && (
            <span>
              📅 {formatDateReadable(todo.date)}
            </span>
          )}
          {todo.time && (
            <span>
              🕐 {formatTimeReadable(todo.time)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="icon-btn"
          onClick={() => onEdit(todo)}
          title="수정"
        >
          ✏️
        </button>
        <button
          className="icon-btn delete"
          onClick={() => onDelete(todo.id)}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
