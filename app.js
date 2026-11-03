'use strict';
const portfolio = window.PORTFOLIO;
const grid = document.getElementById('project-grid');
const dialog = document.getElementById('project-dialog');
let returnFocus;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const downloadURL = project => new URL(project.file, new URL(portfolio.downloadBase, document.baseURI)).href;
grid.innerHTML = portfolio.projects.map(project => `
  <article class="project-card ${project.id === 'dungeon' ? 'featured' : ''}" data-category="${project.category}">
    <button class="project-image-button" type="button" data-project="${project.id}" aria-label="查看${escapeHTML(project.title)}项目详情"><img src="${project.cover}" alt="${escapeHTML(project.coverAlt)}" loading="lazy" width="960" height="540"><span class="image-note">${project.coverNote}</span><span class="image-open" aria-hidden="true">↗</span></button>
    <div class="project-copy"><p class="project-meta">${project.number} / ${project.type}</p><h3 class="project-title">${project.title}<small>${project.id === 'delay' ? '时空解谜' : project.en}</small></h3><p class="project-summary">${project.intro}</p><div class="project-tags">${project.tags.map(tag=>`<span>${tag}</span>`).join('')}</div><div class="project-bottom"><button type="button" class="detail-link" data-project="${project.id}">查看项目详情 <span aria-hidden="true">↗</span></button><span class="platform-note">WINDOWS BUILD</span></div></div>
  </article>`).join('');
document.querySelectorAll('[data-download]').forEach(link => {
  const project = portfolio.projects.find(item => item.id === link.dataset.download);
  if (project) link.href = downloadURL(project);
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('.filter-result').textContent = `${visible} 个项目`;
}));
function openProject(id, trigger) {
  const project = portfolio.projects.find(item => item.id === id);
  if (!project) return;
  returnFocus = trigger;
  document.getElementById('dialog-content').innerHTML = `
    <h2 class="dialog-title" id="dialog-title">${project.title}</h2><p class="dialog-en">${project.en}</p><h3 class="dialog-lead">${project.headline}</h3><p class="dialog-intro">${project.intro}</p>
    <dl class="facts">${project.facts.map(([title,value])=>`<div><dt>${title}</dt><dd>${value}</dd></div>`).join('')}</dl>
    <div class="dialog-tabs" role="tablist" aria-label="项目内容"><button id="tab-overview" class="dialog-tab" role="tab" type="button" data-panel="overview" aria-selected="true" aria-controls="panel-overview">玩法与制作</button><button id="tab-gallery" class="dialog-tab" role="tab" type="button" data-panel="gallery" aria-selected="false" aria-controls="panel-gallery" tabindex="-1">作品画面</button><button id="tab-play" class="dialog-tab" role="tab" type="button" data-panel="play" aria-selected="false" aria-controls="panel-play" tabindex="-1">试玩说明</button></div>
    <section class="panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview"><ol class="loop">${project.loop.map((step,index)=>`<li><span>0${index+1}</span>${step}</li>`).join('')}</ol><div class="note-grid">${project.notes.map(note=>`<article><h4>${note.title}</h4><p>${note.text}</p></article>`).join('')}</div></section>
    <section class="panel" id="panel-gallery" role="tabpanel" aria-labelledby="tab-gallery" hidden><img class="gallery-main" src="${project.gallery[0].src}" alt="${project.gallery[0].caption}"><p class="gallery-caption">${project.gallery[0].caption}</p><div class="gallery-thumbs" role="group" aria-label="选择项目画面">${project.gallery.map((photo,index)=>`<button class="gallery-thumb" data-photo="${index}" aria-label="${photo.caption}" aria-pressed="${index===0}" type="button"><img src="${photo.src}" alt="" loading="lazy"></button>`).join('')}</div></section>
    <section class="panel" id="panel-play" role="tabpanel" aria-labelledby="tab-play" hidden><p class="dialog-intro">${project.playNote}</p>${project.controls.length ? `<div class="controls">${project.controls.map(([key,label])=>`<div class="control"><kbd>${key}</kbd>${label}</div>`).join('')}</div>` : ''}<p class="gallery-caption">平台：Windows · 压缩格式：ZIP · 文件大小：${project.size}</p></section>
    <div class="dialog-download"><p>${project.id==='algee'?'团队 GameJam 作品。':'Windows 试玩版。'}<br>画面来自游戏素材或开发截图。</p><a class="button primary" href="${downloadURL(project)}" download>下载 Windows 试玩版 <span aria-hidden="true">↓</span></a></div>`;
  const tabs = [...dialog.querySelectorAll('.dialog-tab')];
  function selectTab(tab) {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    dialog.querySelectorAll('.panel').forEach(panel => { panel.hidden = panel.id !== `panel-${tab.dataset.panel}`; });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index+1)%tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index+tabs.length-1)%tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs.at(-1);
      if (target) { event.preventDefault(); selectTab(target); target.focus(); }
    });
  });
  dialog.querySelectorAll('.gallery-thumb').forEach(button=>button.addEventListener('click',()=>{
    const photo = project.gallery[Number(button.dataset.photo)];
    dialog.querySelector('.gallery-main').src = photo.src;
    dialog.querySelector('.gallery-main').alt = photo.caption;
    dialog.querySelector('.gallery-caption').textContent = photo.caption;
    dialog.querySelectorAll('.gallery-thumb').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
  document.body.classList.add('modal-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.close-dialog').focus();
}
grid.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (trigger) openProject(trigger.dataset.project, trigger);
});
dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus();});
