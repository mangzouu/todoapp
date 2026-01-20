import { getFormattedDateTime } from '../utils/dateUtils';

function Dashboard({ todos }) {
  const todayTodos = todos.filter(todo => {
    const today = new Date().toISOString().split('T')[0];
    return todo.date === today;
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const todayTotal = todayTodos.length;
  const todayCompleted = todayTodos.filter(todo => todo.completed).length;

  return (
    <div className="dashboard">
      <h2>오늘의 일정</h2>
      <div className="dashboard-date">{getFormattedDateTime()}</div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{todayTotal}</div>
          <div className="stat-label">오늘 할일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{todayCompleted}</div>
          <div className="stat-label">완료한 일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalTodos}</div>
          <div className="stat-label">전체 할일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedTodos}</div>
          <div className="stat-label">전체 완료</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
