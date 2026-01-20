// 날짜 포맷팅 및 분류 유틸리티

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getTodayDate() {
  const today = new Date();
  return formatDate(today);
}

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 현재 날짜와 시간을 한글 형식으로 반환
 */
export function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekday = weekdays[now.getDay()];
  
  return `${year}년 ${month}월 ${day}일 ${weekday}`;
}

/**
 * 이번 주의 시작일(일요일)과 종료일(토요일) 반환
 */
export function getThisWeekRange() {
  const today = new Date();
  const day = today.getDay(); // 0 (일요일) ~ 6 (토요일)
  
  // 이번 주 일요일
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - day);
  sunday.setHours(0, 0, 0, 0);
  
  // 이번 주 토요일
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  saturday.setHours(23, 59, 59, 999);
  
  return { start: sunday, end: saturday };
}

/**
 * 날짜 문자열이 오늘인지 확인
 */
export function isToday(dateString) {
  if (!dateString) return false;
  const today = getTodayDate();
  return dateString === today;
}

/**
 * 날짜 문자열이 이번 주에 속하는지 확인
 */
export function isThisWeek(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString + 'T00:00:00');
  const { start, end } = getThisWeekRange();
  
  return date >= start && date <= end;
}

/**
 * 날짜 문자열이 과거인지 확인
 */
export function isPast(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString + 'T23:59:59');
  const now = new Date();
  
  return date < now;
}

/**
 * 할일을 카테고리별로 분류
 * @param {Array} todos - 할일 목록
 * @returns {Object} - { today: [], thisWeek: [], later: [] }
 */
export function categorizeTodos(todos) {
  const today = [];
  const thisWeek = [];
  const later = [];
  
  todos.forEach(todo => {
    if (!todo.date) {
      later.push(todo);
    } else if (isToday(todo.date)) {
      today.push(todo);
    } else if (isThisWeek(todo.date)) {
      thisWeek.push(todo);
    } else {
      later.push(todo);
    }
  });
  
  // 날짜와 시간 순으로 정렬
  const sortByDateTime = (a, b) => {
    if (a.date !== b.date) {
      return (a.date || '9999-12-31').localeCompare(b.date || '9999-12-31');
    }
    return (a.time || '23:59').localeCompare(b.time || '23:59');
  };
  
  return {
    today: today.sort(sortByDateTime),
    thisWeek: thisWeek.sort(sortByDateTime),
    later: later.sort(sortByDateTime)
  };
}

/**
 * 날짜를 읽기 쉬운 형식으로 변환
 */
export function formatDateReadable(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  
  if (isToday(dateString)) {
    return '오늘';
  }
  
  return `${month}월 ${day}일 (${weekday})`;
}

/**
 * 시간을 읽기 쉬운 형식으로 변환
 */
export function formatTimeReadable(timeString) {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  return `${period} ${displayHour}:${minutes}`;
}
