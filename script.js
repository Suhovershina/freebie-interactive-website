// печатающийся заголовок на первом экране
const typed = document.getElementById('typed');
const lines = ['Cursus Integer', 'Consequat Tristique.'];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function render(count) {
  const first = lines[0].slice(0, count);
  const second = lines[1].slice(0, Math.max(0, count - lines[0].length));
  typed.innerHTML = first + (count > lines[0].length ? '<br>' + second : '');
}

if (reduce) {
  render(lines[0].length + lines[1].length);
} else {
  let n = 0;
  const total = lines[0].length + lines[1].length;
  const timer = setInterval(() => {
    render(++n);
    if (n >= total) clearInterval(timer);
  }, 70);
}

// вопросы и ответы: открыт один пункт
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.querySelector('.q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    items.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.q').setAttribute('aria-expanded', false);
    });
    if (!wasOpen) {
      item.classList.add('open');
      item.querySelector('.q').setAttribute('aria-expanded', true);
    }
  });
});

// отзывы: стрелки листают по кругу
const quotes = [...document.querySelectorAll('.quote')];
let current = 0;
function showQuote(i) {
  current = (i + quotes.length) % quotes.length;
  quotes.forEach((q, n) => q.classList.toggle('active', n === current));
}
document.getElementById('prev').addEventListener('click', () => showQuote(current - 1));
document.getElementById('next').addEventListener('click', () => showQuote(current + 1));

// блоки появляются при прокрутке
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
