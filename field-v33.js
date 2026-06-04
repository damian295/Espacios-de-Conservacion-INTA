/* v33 seguro: boton Anular para fichas sugeridas */
(function(){
  function enhance(){
    var note=document.getElementById('quickSelectionNote');
    if(!note) return;
    var raw=(note.textContent||'').trim();
    if(!raw){
      note.classList.remove('v33-note');
      note.innerHTML='';
      delete note.dataset.v33Text;
      return;
    }
    if(note.querySelector('.v33-clear')) return;
    var clean=raw.replace(/Anular$/i,'').trim();
    note.dataset.v33Text=clean;
    note.classList.add('v33-note');
    note.innerHTML='<span class="v33-note-text"></span><button type="button" class="v33-clear">Anular</button>';
    note.querySelector('.v33-note-text').textContent=clean;
    note.querySelector('.v33-clear').addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      try{
        if(typeof quickSelection!=='undefined') quickSelection=null;
        if(typeof activeFilter!=='undefined') activeFilter='all';
        document.querySelectorAll('#quickGrid .quick-card').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false');});
        document.querySelectorAll('.filter').forEach(function(x){x.classList.toggle('active',x.dataset.filter==='all');});
        if(typeof renderCards==='function') renderCards();
      }catch(e){}
      note.textContent='';
      note.classList.remove('v33-note');
      delete note.dataset.v33Text;
    });
  }
  function init(){enhance();setInterval(enhance,600)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
