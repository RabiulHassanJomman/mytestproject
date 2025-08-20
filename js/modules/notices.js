// ===== Notices Module =====

import { db } from '../firebase-config.js';

// Notices data
export let noticesArray = [];
export let currentNoticeFilter = 'all';

// Load notices from Firebase
export async function loadNoticesFromFirebase() {
  try {
    const snapshot = await db.collection('notices').orderBy('createdAt', 'desc').get();
    noticesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error loading notices:', err);
    noticesArray = [];
  }
}

// Render notices list
export function renderNoticesList(filter = 'all') {
  const noticesContainer = document.getElementById('notice-list');
  if (!noticesContainer) return;
  
  let filteredNotices = noticesArray;
  if (filter !== 'all') {
    filteredNotices = noticesArray.filter(notice => notice.category === filter);
  }
  
  if (!filteredNotices.length) {
    noticesContainer.innerHTML = '<div class="no-notices">No notices available.</div>';
    return;
  }
  
  const noticesHTML = filteredNotices.map(notice => {
    const date = notice.createdAt ? new Date(notice.createdAt.seconds ? notice.createdAt.seconds * 1000 : notice.createdAt).toLocaleDateString() : '';
    
    let attachmentsHTML = '';
    if (notice.attachments && notice.attachments.length > 0) {
      attachmentsHTML = `
        <div class="notice-attachments">
          <h4>Attachments:</h4>
          <div class="attachment-list">
            ${notice.attachments.map(attachment => `
              <div class="attachment-item">
                <span class="attachment-icon">${getFileIcon(attachment.name)}</span>
                <span class="attachment-name">${attachment.name}</span>
                <a href="${attachment.url}" target="_blank" class="attachment-download">Download</a>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    return `
      <div class="notice-item">
        <div class="notice-header">
          <h3 class="notice-title">${notice.title}</h3>
          <div class="notice-meta">
            <span class="notice-category">${notice.category}</span>
            <span class="notice-date">📅 ${date}</span>
          </div>
        </div>
        <div class="notice-content-text">${notice.content}</div>
        ${attachmentsHTML}
      </div>
    `;
  }).join('');
  
  noticesContainer.innerHTML = noticesHTML;
}

// Get file icon based on filename
export function getFileIcon(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'pdf': return '📄';
    case 'doc':
    case 'docx': return '📝';
    case 'xls':
    case 'xlsx': return '📊';
    case 'ppt':
    case 'pptx': return '📽️';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif': return '🖼️';
    case 'zip':
    case 'rar': return '📦';
    default: return '📎';
  }
}

// Switch notice filter
export function switchNoticeFilter(filter) {
  // Update active filter
  document.querySelectorAll('.notice-filter').forEach(filterBtn => {
    filterBtn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  currentNoticeFilter = filter;
  renderNoticesList(filter);
}

// Open notice modal
export function openNoticeModal() {
  const modal = document.getElementById('noticeModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'notice' }, "");
    activeModal = 'notice';
  } else {
    activeModal = 'notice';
  }
  preventMainPageScroll();
  
  // Load notices data
  loadNoticesFromFirebase().then(() => {
    renderNoticesList(currentNoticeFilter);
  });
  
  // Set up filter switching
  document.querySelectorAll('.notice-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchNoticeFilter(filter.dataset.filter);
    });
  });
}

// Close notice modal
export function actuallyCloseNoticeModal() {
  const modal = document.getElementById('noticeModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'notice') activeModal = null;
}

export function closeNoticeModal() {
  if (window.history && window.history.state && window.history.state.modal === 'notice') {
    window.history.back();
    return;
  }
  actuallyCloseNoticeModal();
}
