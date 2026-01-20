import TodoItem from './TodoItem';

function TodoList({ todos, folders, onToggleComplete, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p>할일이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          folder={folders.find(f => f.id === todo.folderId)}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
