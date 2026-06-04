/* v31: aviso de fichas sugeridas con anular, seguro y externo */
(function(){
  function enhanceQuickNote(){
    const note=document.getElementById('quickSelectionNote');
    if(!note) return;
    const raw=(note.textContent||'').trim();
    if(!raw){
      note.classList.remove('quick-note-v31');
      note.innerHTML='';
      return;
    }
    if(note.dataset.v31Text===raw && note.querySelector('.quick-clear-v31')) return;
    const clean=raw.replace(/Anular$/i,'').trim();
    note.dataset.v31Text=clean;
    note.classList.add('quick-note-v31');
    note.innerHTML='<span class="quick-note-text-v31"></span><button type="button" class="quick-clear-v31" aria-label="Anular selección de fichas sugeridas">Anular</button>';
    note.querySelector('.quick-note-text-v31').textContent=clean;
    note.querySelector('.quick-clear-v31').addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      document.querySelectorAll('#quickGrid .quick-card').forEach(function(x){
        x.classList.remove('active');
        x.setAttribute('aria-pressed','false');
      });
      document.querySelectorAll('.filter').forEach(function(x){
        x.classList.toggle('active',x.dataset.filter==='all');
      });
      try{ activeFilter='all'; quickSelection=null; renderCards(); }catch(e){}
      note.textContent='';
      note.classList.remove('quick-note-v31');
      delete note.dataset.v31Text;
    });
  }
  function init(){
    enhanceQuickNote();
    setInterval(enhanceQuickNote,500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
