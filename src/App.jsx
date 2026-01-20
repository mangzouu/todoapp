import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { categorizeTodos } from './utils/dateUtils';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import FolderSidebar from './components/FolderSidebar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// 기본 폴더
const DEFAULT_FOLDERS = [
  { id: 'work', name: '업무', color: '#FFB4B4' },
  { id: 'personal', name: '개인', color: '#B4D4FF' },
  { id: 'study', name: '공부', color: '#C4E1A4' }
];

function App() {
  // 로컬 스토리지 상태
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [folders] = useLocalStorage('folders', DEFAULT_FOLDERS);

  // UI 상태
  const [activeCategory, setActiveCategory] = useState('today');
  const [activeFolderId, setActiveFolderId] = useState('all');
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 할일 추가
  const handleAddTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: Date.now()
    };
    setTodos([...todos, newTodo]);
    setShowTodoForm(false);
  };

  // 할일 수정
  const handleUpdateTodo = (todoData) => {
    setTodos(todos.map(todo => 
      todo.id === editingTodo.id 
        ? { ...todo, ...todoData }
        : todo
    ));
    setShowTodoForm(false);
    setEditingTodo(null);
  };

  // 할일 삭제
  const handleDeleteTodo = (todoId) => {
    if (window.confirm('이 할일을 삭제하시겠습니까?')) {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };

  // 완료 상태 토글
  const handleToggleComplete = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // 할일 편집 시작
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowTodoForm(true);
  };

  // 폼 취소
  const handleCancelForm = () => {
    setShowTodoForm(false);
    setEditingTodo(null);
  };

  // 폼 저장
  const handleSaveForm = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleAddTodo(todoData);
    }
  };

  // 필터링된 할일 가져오기
  const getFilteredTodos = () => {
    // 먼저 폴더로 필터링
    let filtered = activeFolderId === 'all' 
      ? todos 
      : todos.filter(todo => todo.folderId === activeFolderId);

    // 카테고리로 필터링
    if (activeCategory === 'all') {
      return filtered;
    }

    const categorized = categorizeTodos(filtered);
    return categorized[activeCategory] || [];
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 할일 관리</h1>
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </header>

      <div className="app-main">
        <FolderSidebar
          folders={folders}
          activeFolderId={activeFolderId}
          onFolderChange={setActiveFolderId}
          todos={todos}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="content">
          <Dashboard todos={todos} />
          
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="todo-section">
            <div className="todo-section-header">
              <h3>
                {activeCategory === 'today' && '오늘'}
                {activeCategory === 'thisWeek' && '이번주'}
                {activeCategory === 'later' && '나중에'}
                {activeCategory === 'all' && '전체'}
                {' '}할일
                {activeFolderId !== 'all' && 
                  ` - ${folders.find(f => f.id === activeFolderId)?.name}`
                }
              </h3>
              <button 
                className="add-todo-btn"
                onClick={() => setShowTodoForm(true)}
              >
                <span>+</span>
                <span>새 할일 추가</span>
              </button>
            </div>

            <TodoList
              todos={filteredTodos}
              folders={folders}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        </div>
      </div>

      {showTodoForm && (
        <TodoForm
          todo={editingTodo}
          folders={folders}
          onSave={handleSaveForm}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;
