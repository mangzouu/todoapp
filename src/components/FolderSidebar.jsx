function FolderSidebar({ 
  folders, 
  activeFolderId, 
  onFolderChange, 
  todos,
  isOpen,
  onClose 
}) {
  const getFolderCount = (folderId) => {
    return todos.filter(todo => todo.folderId === folderId).length;
  };

  const allCount = todos.length;

  return (
    <>
      {isOpen && <div className="sidebar-overlay open" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>폴더</h2>
        <ul className="folder-list">
          <li
            className={`folder-item ${activeFolderId === 'all' ? 'active' : ''}`}
            onClick={() => {
              onFolderChange('all');
              onClose();
            }}
            style={{ color: '#666' }}
          >
            <div className="folder-color" style={{ backgroundColor: '#E8E8E8' }}></div>
            <span className="folder-name">전체</span>
            <span className="folder-count">{allCount}</span>
          </li>
          {folders.map(folder => (
            <li
              key={folder.id}
              className={`folder-item ${activeFolderId === folder.id ? 'active' : ''}`}
              onClick={() => {
                onFolderChange(folder.id);
                onClose();
              }}
              style={{ color: folder.color }}
            >
              <div className="folder-color" style={{ backgroundColor: folder.color }}></div>
              <span className="folder-name">{folder.name}</span>
              <span className="folder-count">{getFolderCount(folder.id)}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default FolderSidebar;
