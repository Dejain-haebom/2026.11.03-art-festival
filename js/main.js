// 공통 인터랙션: 모바일 메뉴, 일정 달력, 프로그램 팝업, 사전등록 완료 창
document.addEventListener('DOMContentLoaded', () => {
  // 모바일 내비게이션 메뉴 열기/닫기
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  // data-modal 속성에 적힌 팝업 ID를 찾아 열어줍니다.
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => document.getElementById(button.dataset.modal)?.showModal());
  });

  // 팝업의 닫기 버튼과 바깥 영역 클릭 동작
  document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.close')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', event => {
      if (event.target === modal) modal.close();
    });
  });

  // 사전등록 버튼을 누르면 완료 문구가 들어 있는 팝업을 보여줍니다.
  const registerModal = document.getElementById('register-modal');
  document.querySelectorAll('[data-open-register]').forEach(button => {
    button.addEventListener('click', () => registerModal?.showModal());
  });
  document.getElementById('finish-register')?.addEventListener('click', () => registerModal?.close());

  // 2018년 5월 달력을 만들고 행사 날짜를 선택할 수 있게 합니다.
  const daysContainer = document.getElementById('calendar-days');
  const selectedDate = document.getElementById('selected-date');
  const selectedEvent = document.getElementById('selected-event');
  const eventByDay = {
    4: '창작무용극 ‘그날의’ · 세종대극장',
    5: '창작무용극 ‘그날의’ · 세종대극장',
    6: '창작무용극 ‘그날의’ · 세종대극장',
    7: '창작무용극 ‘그날의’ · 세종대극장',
    8: '창작무용극 ‘그날의’ · 세종대극장',
    9: '창작무용극 ‘그날의’ · 세종대극장',
    10: '창작무용극 ‘그날의’ · 세종대극장',
    11: '서울시소년소녀합창단 · 세종체임버홀',
    12: '기념공연 및 체험 프로그램 · 세종M씨어터',
    13: '기념공연 및 체험 프로그램 · 세종M씨어터',
    14: '한국현대미술 특별전 · 세종미술관',
    15: '한국현대미술 특별전 · 세종미술관'
  };
  function renderCalendar() {
    if (!daysContainer) return;
    daysContainer.innerHTML = '';
    // 2018년 5월 1일은 화요일이므로 일요일 칸 앞에 빈 칸 1개를 둡니다.
    for (let blank = 0; blank < 2; blank++) {
      const empty = document.createElement('button');
      empty.disabled = true;
      empty.setAttribute('aria-hidden', 'true');
      daysContainer.appendChild(empty);
    }
    for (let day = 1; day <= 31; day++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = day;
      if (eventByDay[day]) button.classList.add('has-event');
      button.addEventListener('click', () => {
        daysContainer.querySelectorAll('button').forEach(item => item.classList.remove('selected'));
        button.classList.add('selected');
        selectedDate.textContent = `5월 ${day}일`;
        selectedEvent.textContent = eventByDay[day] || '등록된 주요 프로그램이 없습니다.';
      });
      daysContainer.appendChild(button);
    }
    const firstEvent = daysContainer.querySelector('.has-event');
    if (firstEvent) firstEvent.click();
  }
  renderCalendar();
});
