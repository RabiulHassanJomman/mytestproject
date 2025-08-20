// ===== Course Resources Module =====

import { db } from '../firebase-config.js';

// Course resources data
export let coursesArray = [];
export let currentSelectedCourse = null;
export let currentActiveTab = 'books';
export let currentActiveSection = 'all';
export let expandedSections = new Set(['books']); // Track which sections are expanded

// Load courses from Firebase
export async function loadCoursesFromFirebase() {
  try {
    const snapshot = await db.collection('courses').orderBy('createdAt', 'asc').get();
    coursesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error loading courses:', err);
    coursesArray = [];
  }
}

// Load resources for a specific course
export async function loadResourcesForCourse(courseId, resourceType, section) {
  try {
    let query = db.collection('resources')
      .where('courseId', '==', courseId)
      .where('type', '==', resourceType);
    
    if (section !== 'all') {
      query = query.where('section', '==', section);
    }
    
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error loading resources:', err);
    return [];
  }
}

// Render courses list
export function renderCoursesList() {
  const coursesContainer = document.getElementById('courses-list');
  if (!coursesContainer) return;
  
  if (!coursesArray.length) {
    coursesContainer.innerHTML = '<div class="no-courses">No courses available yet.</div>';
    return;
  }
  
  const coursesHTML = coursesArray.map(course => `
    <button class="course-button" data-course-id="${course.id}">
      <h3>${course.title}</h3>
      <p>${course.description || 'No description available'}</p>
    </button>
  `).join('');
  
  coursesContainer.innerHTML = coursesHTML;
  
  // Add event listeners
  coursesContainer.querySelectorAll('.course-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      currentSelectedCourse = courseId;
      
      // Update active course button
      coursesContainer.querySelectorAll('.course-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Load and display resources
      loadAndDisplayResources(courseId, currentActiveTab, currentActiveSection);
    });
  });
}

// Load and display resources
export async function loadAndDisplayResources(courseId, resourceType, section) {
  const resources = await loadResourcesForCourse(courseId, resourceType, section);
  renderResourcePanel(courseId, resourceType, resources, section);
}

// Render resource panel with expandable functionality
export function renderResourcePanel(courseId, resourceType, resources, section) {
  const panelId = `course-${resourceType}`;
  const panel = document.getElementById(panelId);
  if (!panel) return;
  
  if (!resources.length) {
    panel.innerHTML = `
      <div class="resource-section-header" data-resource-type="${resourceType}">
        <div class="resource-section-title">
          <span class="expand-icon">▶</span>
          <span class="resource-type-label">${getResourceTypeLabel(resourceType)}</span>
          <span class="resource-count">(0 resources)</span>
        </div>
      </div>
      <div class="resource-section-content collapsed">
        <div class="no-notes">No resources available for this section.</div>
      </div>
    `;
    return;
  }
  
  const isExpanded = expandedSections.has(resourceType);
  const expandIcon = isExpanded ? '▼' : '▶';
  const contentClass = isExpanded ? '' : 'collapsed';
  
  const resourcesHTML = `
    <div class="resource-section-header" data-resource-type="${resourceType}">
      <div class="resource-section-title">
        <span class="expand-icon">${expandIcon}</span>
        <span class="resource-type-label">${getResourceTypeLabel(resourceType)}</span>
        <span class="resource-count">(${resources.length} resource${resources.length !== 1 ? 's' : ''})</span>
      </div>
    </div>
    <div class="resource-section-content ${contentClass}">
      ${resources.map(resource => `
        <div class="note-item">
          <div class="note-info">
            <h4>${resource.title}</h4>
            <p>${resource.description || 'No description available'}</p>
            ${resource.section ? `<span class="section-badge">Section ${resource.section}</span>` : ''}
          </div>
          <a href="${resource.url}" target="_blank" class="note-link" rel="noopener noreferrer">
            📎 View Resource
          </a>
        </div>
      `).join('')}
    </div>
  `;
  
  panel.innerHTML = resourcesHTML;
  
  // Add expand/collapse functionality
  const header = panel.querySelector('.resource-section-header');
  if (header) {
    header.addEventListener('click', () => toggleResourceSection(resourceType, panel));
  }
}

// Toggle resource section expansion
export function toggleResourceSection(resourceType, panel) {
  const header = panel.querySelector('.resource-section-header');
  const content = panel.querySelector('.resource-section-content');
  const expandIcon = panel.querySelector('.expand-icon');
  
  // Add loading state
  header.classList.add('loading');
  
  // Small delay to show loading state
  setTimeout(() => {
    if (expandedSections.has(resourceType)) {
      // Collapse
      expandedSections.delete(resourceType);
      content.classList.add('collapsed');
      expandIcon.textContent = '▶';
    } else {
      // Expand
      expandedSections.add(resourceType);
      content.classList.remove('collapsed');
      expandIcon.textContent = '▼';
    }
    
    // Remove loading state
    header.classList.remove('loading');
  }, 150);
}

// Get human-readable resource type label
function getResourceTypeLabel(resourceType) {
  const labels = {
    'books': '📚 Books',
    'slides': '📊 Lecture Slides',
    'student-notes': '👨‍🎓 Student Notes',
    'lab-reports': '🧪 Lab Reports'
  };
  return labels[resourceType] || resourceType;
}

// Clear all resource panels
export function clearAllResourcePanels() {
  const panels = ['course-books', 'course-slides', 'course-student-notes', 'course-lab-reports'];
  panels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.innerHTML = `
        <div class="resource-section-header" data-resource-type="${panelId.replace('course-', '')}">
          <div class="resource-section-title">
            <span class="expand-icon">▶</span>
            <span class="resource-type-label">${getResourceTypeLabel(panelId.replace('course-', ''))}</span>
            <span class="resource-count">(0 resources)</span>
          </div>
        </div>
        <div class="resource-section-content collapsed">
          <div class="no-notes">Select a course to view resources.</div>
        </div>
      `;
    }
  });
}

// Switch resource tab
export function switchResourceTab(tabName) {
  // Update active tab
  document.querySelectorAll('.resource-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-resource="${tabName}"]`).classList.add('active');
  
  // Update active panel
  document.querySelectorAll('.resource-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`course-${tabName}`).classList.add('active');
  
  currentActiveTab = tabName;
  
  if (currentSelectedCourse) {
    loadAndDisplayResources(currentSelectedCourse, tabName, currentActiveSection);
  }
  
  // Auto-expand the new tab if it has resources and wasn't previously expanded
  if (currentSelectedCourse && !expandedSections.has(tabName)) {
    // Small delay to ensure the panel is rendered
    setTimeout(() => {
      const panel = document.getElementById(`course-${tabName}`);
      if (panel && panel.querySelector('.resource-section-content')) {
        const content = panel.querySelector('.resource-section-content');
        if (content && !content.classList.contains('collapsed') && content.querySelector('.note-item')) {
          expandedSections.add(tabName);
          const header = panel.querySelector('.resource-section-header');
          const expandIcon = panel.querySelector('.expand-icon');
          if (header && expandIcon) {
            expandIcon.textContent = '▼';
          }
        }
      }
    }, 100);
  }
}

// Switch section filter
export function switchSectionFilter(section) {
  // Update active section filter
  document.querySelectorAll('.section-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector(`[data-section="${section}"]`).classList.add('active');
  
  currentActiveSection = section;
  
  if (currentSelectedCourse) {
    loadAndDisplayResources(currentSelectedCourse, currentActiveTab, section);
  }
}

// Open routines modal (course resources)
export function openRoutinesModal() {
  const modal = document.getElementById('routinesModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'routines' }, "");
    activeModal = 'routines';
  } else {
    activeModal = 'routines';
  }
  preventMainPageScroll();
  
  // Load courses data
  loadCoursesFromFirebase().then(() => {
    renderCoursesList();
    clearAllResourcePanels();
  });
  
  // Set up resource tab switching
  document.querySelectorAll('.resource-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchResourceTab(tab.dataset.resource);
    });
  });
  
  // Set up section filter switching
  document.querySelectorAll('.section-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchSectionFilter(filter.dataset.section);
    });
  });
}

// Close routines modal
export function actuallyCloseRoutinesModal() {
  const modal = document.getElementById('routinesModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'routines') activeModal = null;
  currentSelectedCourse = null;
  currentActiveTab = 'books';
  currentActiveSection = 'all';
  expandedSections.clear();
  expandedSections.add('books'); // Reset to default expanded state
}

export function closeRoutinesModal() {
  if (window.history && window.history.state && window.history.state.modal === 'routines') {
    window.history.back();
    return;
  }
  actuallyCloseRoutinesModal();
}
