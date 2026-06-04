/* override-final-v35: JS aislado para aviso de fichas sugeridas */
(function(){
  function enhanceNote(){
    var note=document.getElementById('quickSelectionNote');
    if(!note) return;
    var raw=(note.textContent||'').trim();
    if(!raw){
      note.classList.remove('final-note-v35');
      note.innerHTML='';
      delete note.dataset.finalV35;
      return;
    }
    if(note.querySelector('.final-clear-v35')) return;
    var clean=raw.replace(/Anular$/i,'').trim();
    note.dataset.finalV35=clean;
    note.classList.add('final-note-v35');
    note.innerHTML='<span class="final-note-v35-text"></span><button type="button" class="final-clear-v35">Anular</button>';
    note.querySelector('.final-note-v35-text').textContent=clean;
    note.querySelector('.final-clear-v35').addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      try{
        if(typeof quickSelection!=='undefined') quickSelection=null;
        if(typeof activeFilter!=='undefined') activeFilter='all';
        document.querySelectorAll('#quickGrid .quick-card').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false')});
        document.querySelectorAll('.filter').forEach(function(x){x.classList.toggle('active',x.dataset.filter==='all')});
        if(typeof renderCards==='function') renderCards();
      }catch(e){}
      note.textContent='';
      note.classList.remove('final-note-v35');
      delete note.dataset.finalV35;
    });
  }
  function init(){
    enhanceNote();
    setInterval(enhanceNote,500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
