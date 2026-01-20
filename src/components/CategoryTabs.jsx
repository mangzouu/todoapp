function CategoryTabs({ activeCategory, onCategoryChange }) {
  const categories = [
    { id: 'today', label: '오늘' },
    { id: 'thisWeek', label: '이번주' },
    { id: 'later', label: '나중에' },
    { id: 'all', label: '전체' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
