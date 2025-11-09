const gallery = document.getElementById('gallery');
const items = Array.from(gallery.querySelectorAll('.item'));
const filters = document.querySelectorAll('.filters button');

const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;
let visibleItems = items.slice();

// Filter functionality
filters.forEach(btn=>{
  btn.addEventListener('click', ()=> {
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(it=>{
      const cat = it.dataset.category;
      it.style.display = (filter==='all' || cat===filter) ? '' : 'none';
    });
    visibleItems = items.filter(it => it.style.display !== 'none');
  });
});

// Open lightbox
items.forEach((item, idx) => {
  item.addEventListener('click', () => {
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    openLightbox(currentIndex);
  });
});

function updateVisibleItems(){
  visibleItems = items.filter(it => it.style.display !== 'none');
}

function openLightbox(index){
  const img = visibleItems[index].querySelector('img');
  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden','false');
}

// Navigation
lbClose.onclick = closeLightbox;
lbPrev.onclick = ()=> navigate(-1);
lbNext.onclick = ()=> navigate(1);

function closeLightbox(){
  lightbox.classList.add('hidden');
  lightbox.setAttribute('aria-hidden','true');
}

// -1 or +1
function navigate(dir){
  if(!visibleItems.length) return;
  currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}

// keyboard support
document.addEventListener('keydown', e=>{
  if(lightbox.classList.contains('hidden')) return;
  if(e.key === 'ArrowLeft') navigate(-1);
  if(e.key === 'ArrowRight') navigate(1);
  if(e.key === 'Escape') closeLightbox();
});
