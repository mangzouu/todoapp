import { useState, useEffect } from 'react';
import { getTodayDate } from '../utils/dateUtils';

function TodoForm({ todo, folders, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    date: getTodayDate(),
    time: '',
    folderId: folders[0]?.id || ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        memo: todo.memo || '',
        date: todo.date || getTodayDate(),
        time: todo.time || '',
        folderId: todo.folderId || folders[0]?.id || ''
      });
    }
  }, [todo, folders]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('할일 제목을 입력해주세요.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{todo ? '할일 수정' : '새 할일 추가'}</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="할일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              placeholder="추가 메모를 입력하세요 (선택사항)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">날짜</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">시간</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="folderId">폴더</label>
            <select
              id="folderId"
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
            >
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {todo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
