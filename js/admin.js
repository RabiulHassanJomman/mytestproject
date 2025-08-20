(function () {
  // Dependencies from window
  var firebase = window.firebase;
  var db = window.db;

  function ensureDb() {
    if (!db) {
      if (window.firebase && window.__firebaseConfig) {
        try {
          if (!window.firebase.apps || window.firebase.apps.length === 0) {
            window.firebase.initializeApp(window.__firebaseConfig);
          }
          db = window.firebase.firestore();
          try { db.enablePersistence({ synchronizeTabs: true }); } catch (_) {}
        } catch (e) {
          throw new Error('Firestore not initialized. Ensure firebase-config.js ran and window.db is set.');
        }
      } else {
        throw new Error('Firestore not initialized. Ensure firebase-config.js ran and window.db is set.');
      }
    }
    return db;
  }

  // Credentials: allow override via window.__adminCredentials = { username, password }
  var defaultCreds = { username: 'admin', password: 'cuetcse24' };
  var adminCreds = (window.__adminCredentials && typeof window.__adminCredentials.username === 'string')
    ? window.__adminCredentials
    : defaultCreds;

  // UI helpers
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function showLoading(message) {
    var overlay = qs('#admin-loading');
    if (!overlay) return;
    var textEl = overlay.querySelector('.admin-loading-text');
    if (textEl && message) textEl.textContent = String(message);
    overlay.classList.add('show');
  }
  function hideLoading() {
    var overlay = qs('#admin-loading');
    if (!overlay) return;
    overlay.classList.remove('show');
  }

  function formatDateForInput(d) {
    if (!d) return '';
    if (typeof d === 'string') return d.substring(0, 10);
    if (d && d.seconds) {
      var dt = new Date(d.seconds * 1000);
      return dt.toISOString().substring(0, 10);
    }
    try {
      return new Date(d).toISOString().substring(0, 10);
    } catch (_) {
      return '';
    }
  }

  function normalizeDateValue(dateStr) {
    if (!dateStr) return '';
    try {
      var d = new Date(dateStr);
      if (isNaN(d.getTime())) return String(dateStr);
      return d.toISOString().substring(0, 10);
    } catch (_) {
      return String(dateStr);
    }
  }

  // Auth state
  var STORAGE_KEY = 'cuet_cse24_admin_logged_in';
  function isLoggedIn() { return localStorage.getItem(STORAGE_KEY) === '1'; }
  function setLoggedIn(val) { if (val) localStorage.setItem(STORAGE_KEY, '1'); else localStorage.removeItem(STORAGE_KEY); }

  // DOM elements (lazy via getters)
  function getEls() {
    return {
      loginScreen: qs('#loginScreen'),
      adminDashboard: qs('#adminDashboard'),
      loginForm: qs('#loginForm'),
      loginError: qs('#loginError'),
      backToMain: qs('#backToMain'),
      logoutBtn: qs('#logoutBtn'),

      // Lists
      eventsList: qs('#eventsList'),
      coursesList: qs('#coursesList'),
      noticesList: qs('#noticesList'),
      extraClassesList: qs('#extraClassesList'),


      // Buttons
      addEventBtn: qs('#addEventBtn'),
      addCourseBtn: qs('#addCourseBtn'),
      addNoteBtn: qs('#addNoteBtn'),
      addSlideBtn: qs('#addSlideBtn'),
      addStudentNoteBtn: qs('#addStudentNoteBtn'),
      addLabReportBtn: qs('#addLabReportBtn'),
      addNoticeBtn: qs('#addNoticeBtn'),
      addExtraClassBtn: qs('#addExtraClassBtn'),

      // Modals and forms
      eventModal: qs('#eventModal'),
      eventForm: qs('#eventForm'),
      closeEventModalBtn: qs('#closeEventModal'),
      cancelEventBtn: qs('#cancelEvent'),

      courseModal: qs('#courseModal'),
      courseForm: qs('#courseForm'),
      closeCourseModalBtn: qs('#closeCourseModal'),
      cancelCourseBtn: qs('#cancelCourse'),

      noteModal: qs('#noteModal'),
      noteForm: qs('#noteForm'),
      noteCourse: qs('#noteCourse'),
      noteType: qs('#noteType'),
      noteSection: qs('#noteSection'),
      closeNoteModalBtn: qs('#closeNoteModal'),
      cancelNoteBtn: qs('#cancelNote'),

      noticeModal: qs('#noticeModal'),
      noticeForm: qs('#noticeForm'),
      addAttachmentBtn: qs('#addAttachmentBtn'),
      attachmentsList: qs('#attachmentsList'),
      closeNoticeModalBtn: qs('#closeNoticeModal'),
      cancelNoticeBtn: qs('#cancelNotice'),

      extraClassModal: qs('#extraClassModal'),
      extraClassForm: qs('#extraClassForm'),
      closeExtraClassModalBtn: qs('#closeExtraClassModal'),
      cancelExtraClassBtn: qs('#cancelExtraClass'),
    };
  }

  // In-memory caches for editing
  var cache = {
    eventsById: {},
    coursesById: {},
    noticesById: {},
    extraClassesById: {},
    resourcesById: {},
  };
  var editing = {
    eventId: null,
    courseId: null,
    noticeId: null,
    extraClassId: null,
    resourceId: null,
  };

  // Modal helpers
  function openModal(el) { 
    if (!el) return; 
    el.style.display = 'flex'; 
    setTimeout(function(){ el.classList.add('show'); }, 10); 
    setupModalAutoClose(el);
  }
  function closeModal(el) { 
    if (!el) return; 
    el.classList.remove('show'); 
    setTimeout(function(){ el.style.display = 'none'; }, 200); 
  }

  // Auto-close modal functionality
  function setupModalAutoClose(modalEl) {
    if (!modalEl) return;
    
    // Close on overlay click (outside modal content)
    modalEl.addEventListener('click', function(e) {
      if (e.target === modalEl) {
        closeModal(modalEl);
      }
    });
    
    // Prevent clicks inside modal content from bubbling to overlay
    var modalContent = modalEl.querySelector('.modal-card');
    if (modalContent) {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }
  
  // Global escape key handler for all modals
  function setupGlobalEscapeHandler() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // Find any open modal and close it
        var openModals = document.querySelectorAll('.modal-overlay[style*="flex"]');
        if (openModals.length > 0) {
          closeModal(openModals[0]);
        }
      }
    });
  }

  // Escape helpers
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(str) { return escapeHtml(str).replace(/"/g, '&quot;'); }

  // Renderers
  async function refreshAll() {
    await Promise.all([
      loadAndRenderEvents(),
      loadAndRenderCourses(),
      loadAndRenderNotices(),
      loadAndRenderExtraClasses(),
      loadAndRenderResources(),
      populateCourseOptions(),
    ]);
  }

  async function loadAndRenderEvents() {
    var d = ensureDb();
    var listEl = getEls().eventsList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('events').orderBy('date', 'asc').get();
    cache.eventsById = {};
    if (snap.empty) { listEl.innerHTML = '<div class="empty-hint">No events yet.</div>'; return; }
    var html = '';
    snap.forEach(function (doc) {
      var ev = doc.data();
      cache.eventsById[doc.id] = ev;
      var dateStr = ev.date ? (ev.date.seconds ? new Date(ev.date.seconds * 1000).toISOString().substring(0,10) : String(ev.date)) : '';
      var urgent = ev.urgent ? '🚨 Urgent' : '📋 Normal';
      html += (
        '        <div class="notice-admin-item" data-id="' + doc.id + '">\n' +
        '          <div class="notice-admin-header">\n' +
        '            <div class="notice-admin-info">\n' +
        '              <h3>' + escapeHtml(ev.title || 'Untitled') + '</h3>\n' +
        '              <p>📅 ' + (dateStr || '-') + ' | ⏰ ' + (ev.time || '-') + ' | ' + urgent + '</p>\n' +
        '            </div>\n' +
        '            <div class="notice-admin-actions">\n' +
        '              <button data-action="edit">Edit</button>\n' +
        '              <button class="delete-btn" data-action="delete">Delete</button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="notice-admin-content">' + escapeHtml(ev.description || '') + (ev.details ? ('<br><small>' + escapeHtml(ev.details) + '</small>') : '') + '</div>\n' +
        '        </div>'
      );
    });
    listEl.innerHTML = html;
    qsa('#eventsList .notice-admin-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.addEventListener('click', function (e) {
        var action = (e.target && e.target.getAttribute('data-action')) || '';
        if (action === 'edit') { e.preventDefault(); e.stopPropagation(); openEditEvent(id); }
        else if (action === 'delete') { e.preventDefault(); e.stopPropagation(); deleteEvent(id); }
      });
    });
  }

  async function loadAndRenderCourses() {
    var d = ensureDb();
    var listEl = getEls().coursesList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('courses').orderBy('createdAt', 'asc').get();
    cache.coursesById = {};
    if (snap.empty) { listEl.innerHTML = '<div class="empty-hint">No courses yet.</div>'; return; }
    var html = '';
    snap.forEach(function (doc) {
      var c = doc.data();
      cache.coursesById[doc.id] = c;
      html += (
        '        <div class="extra-class-admin-item" data-id="' + doc.id + '">\n' +
        '          <div class="extra-class-admin-header">\n' +
        '            <div class="extra-class-admin-info">\n' +
        '              <h3>' + escapeHtml(c.title || 'Untitled Course') + '</h3>\n' +
        '              <p>' + escapeHtml(c.code || '') + (c.instructor ? (' | 👨‍🏫 ' + escapeHtml(c.instructor)) : '') + '</p>\n' +
        '            </div>\n' +
        '            <div class="notice-admin-actions">\n' +
        '              <button data-action="edit">Edit</button>\n' +
        '              <button class="delete-btn" data-action="delete">Delete</button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>'
      );
    });
    listEl.innerHTML = html;
    qsa('#coursesList .extra-class-admin-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.addEventListener('click', function (e) {
        var action = (e.target && e.target.getAttribute('data-action')) || '';
        if (action === 'edit') { e.preventDefault(); e.stopPropagation(); openEditCourse(id); }
        else if (action === 'delete') { e.preventDefault(); e.stopPropagation(); deleteCourse(id); }
      });
    });
    
    // Re-render expandable resources when courses are updated
    if (cache.resourcesById && Object.keys(cache.resourcesById).length > 0) {
      await renderExpandableResources();
    }
  }

  async function loadAndRenderNotices() {
    var d = ensureDb();
    var listEl = getEls().noticesList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('notices').orderBy('createdAt', 'desc').get();
    cache.noticesById = {};
    if (snap.empty) { listEl.innerHTML = '<div class="empty-hint">No notices yet.</div>'; return; }
    var html = '';
    snap.forEach(function (doc) {
      var n = doc.data();
      cache.noticesById[doc.id] = n;
      var dateStr = n.createdAt ? (n.createdAt.seconds ? new Date(n.createdAt.seconds * 1000).toLocaleString() : String(n.createdAt)) : '';
      html += (
        '        <div class="notice-admin-item" data-id="' + doc.id + '">\n' +
        '          <div class="notice-admin-header">\n' +
        '            <div class="notice-admin-info">\n' +
        '              <h3>' + escapeHtml(n.title || 'Untitled Notice') + '</h3>\n' +
        '              <p>🏷️ ' + escapeHtml(n.category || 'general') + (dateStr ? (' | 📅 ' + escapeHtml(dateStr)) : '') + '</p>\n' +
        '            </div>\n' +
        '            <div class="notice-admin-actions">\n' +
        '              <button data-action="edit">Edit</button>\n' +
        '              <button class="delete-btn" data-action="delete">Delete</button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="notice-admin-content">' + escapeHtml(n.content || '') + renderNoticeAttachmentsInline(n.attachments) + '</div>\n' +
        '        </div>'
      );
    });
    listEl.innerHTML = html;
    qsa('#noticesList .notice-admin-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.addEventListener('click', function (e) {
        var action = (e.target && e.target.getAttribute('data-action')) || '';
        if (action === 'edit') { e.preventDefault(); e.stopPropagation(); openEditNotice(id); }
        else if (action === 'delete') { e.preventDefault(); e.stopPropagation(); deleteNotice(id); }
      });
    });
  }

  function renderNoticeAttachmentsInline(attachments) {
    if (!attachments || !attachments.length) return '';
    var html = '<div class="notice-admin-attachments">';
    html += '<h4>Attachments</h4><ul>' + attachments.map(function (a) {
      var name = a && a.name ? a.name : 'Attachment';
      var url = a && a.url ? a.url : '#';
      return '<li><a href="' + escapeAttr(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(name) + '</a></li>';
    }).join('') + '</ul></div>';
    return html;
  }

  // Resources CRUD and listing
  async function loadAndRenderResources() {
    var d = ensureDb();
    
    // Load resources data into cache
    var snap = await d.collection('resources').orderBy('createdAt', 'desc').get();
    cache.resourcesById = {};
    
    if (!snap.empty) {
      snap.forEach(function (doc) {
        var r = doc.data();
        cache.resourcesById[doc.id] = r;
      });
    }
    
    // Render the expandable resource list
    await renderExpandableResources();
  }

  // Render expandable resource list organized by course first, then by resource type
  async function renderExpandableResources() {
    try {
      var expandableListEl = qs('#expandableResourcesList');
      if (!expandableListEl) {
        console.warn('Expandable resources list element not found');
        return;
      }
      
      // Check if resources and courses are loaded
      if (!cache.resourcesById || Object.keys(cache.resourcesById).length === 0) {
        expandableListEl.innerHTML = '<div class="empty-hint">No resources available yet.</div>';
        return;
      }
      
      if (!cache.coursesById || Object.keys(cache.coursesById).length === 0) {
        expandableListEl.innerHTML = '<div class="empty-hint">No courses available yet.</div>';
        return;
      }
      
      // Group resources by course first, then by type
      var resourcesByCourse = {};
      var resourceTypes = ['books', 'slides', 'student-notes', 'lab-reports'];
      
      // Initialize course structure
      Object.keys(cache.coursesById).forEach(function(courseId) {
        resourcesByCourse[courseId] = {
          course: cache.coursesById[courseId],
          resources: {}
        };
        
        // Initialize resource types for each course
        resourceTypes.forEach(function(type) {
          resourcesByCourse[courseId].resources[type] = [];
        });
      });
      
      // Populate resources by course and type
      Object.values(cache.resourcesById).forEach(function(resource) {
        var courseId = resource.courseId;
        var type = resource.type || 'books';
        
        if (resourcesByCourse[courseId] && resourcesByCourse[courseId].resources[type]) {
          resourcesByCourse[courseId].resources[type].push(resource);
        }
      });
      
      var html = '';
      
      // Render each course with its resources
      Object.keys(resourcesByCourse).forEach(function(courseId) {
        var courseData = resourcesByCourse[courseId];
        var course = courseData.course;
        var courseTitle = course.title || course.code || 'Untitled Course';
        var courseCode = course.code || '';
        var courseInstructor = course.instructor || '';
        
        // Count total resources for this course
        var totalResources = 0;
        resourceTypes.forEach(function(type) {
          totalResources += courseData.resources[type].length;
        });
        
        if (totalResources > 0) {
          html += (
            '<div class="course-section-header" data-course-id="' + courseId + '">\n' +
            '  <div class="course-section-title">\n' +
            '    <span class="expand-icon">▼</span>\n' +
            '    <span class="course-label">📚 ' + escapeHtml(courseTitle) + '</span>\n' +
            '    <span class="course-details">' + escapeHtml(courseCode) + (courseInstructor ? (' | 👨‍🏫 ' + escapeHtml(courseInstructor)) : '') + '</span>\n' +
            '    <span class="resource-count">(' + totalResources + ' resource' + (totalResources !== 1 ? 's' : '') + ')</span>\n' +
            '  </div>\n' +
            '</div>\n' +
            '<div class="course-section-content">\n'
          );
          
          // Render resource types for this course
          resourceTypes.forEach(function(type) {
            var resources = courseData.resources[type];
            var count = resources.length;
            
            if (count > 0) {
              var typeLabel = getResourceTypeLabel(type);
              var typeIcon = getResourceTypeIcon(type);
              
              html += (
                '  <div class="resource-type-header" data-resource-type="' + type + '">\n' +
                '    <div class="resource-type-title">\n' +
                '      <span class="expand-icon">▼</span>\n' +
                '        <span class="resource-type-label">' + typeIcon + ' ' + typeLabel + '</span>\n' +
                '        <span class="resource-count">(' + count + ' resource' + (count !== 1 ? 's' : '') + ')</span>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="resource-type-content">\n'
              );
              
              // Render individual resources
              resources.forEach(function(resource) {
                var sectionBadge = resource.section && resource.section !== 'all' ? 
                  '<span class="section-badge">Section ' + escapeHtml(resource.section) + '</span>' : '';
                
                // Find the resource ID from cache
                var resourceId = Object.keys(cache.resourcesById).find(function(id) {
                  return cache.resourcesById[id] === resource;
                }) || '';
                
                html += (
                  '    <div class="resource-item" data-resource-id="' + escapeAttr(resourceId) + '">\n' +
                  '      <div class="resource-info">\n' +
                  '        <h4>' + escapeHtml(resource.title || 'Untitled') + '</h4>\n' +
                  '        ' + (resource.description ? '<p>' + escapeHtml(resource.description) + '</p>' : '') + '\n' +
                  '        ' + sectionBadge + '\n' +
                  '      </div>\n' +
                  '      <div class="resource-actions">\n' +
                  '        <a href="' + escapeAttr(resource.url || resource.linkUrl || '#') + '" target="_blank" rel="noopener noreferrer" class="resource-link">📎 View Resource</a>\n' +
                  '        <button class="edit-btn" data-action="edit">Edit</button>\n' +
                  '        <button class="delete-btn" data-action="delete">Delete</button>\n' +
                  '      </div>\n' +
                  '    </div>\n'
                );
              });
              
              html += '  </div>\n';
            }
          });
          
          html += '</div>\n';
        }
      });
      
      if (html === '') {
        html = '<div class="empty-hint">No resources available yet.</div>';
      }
      
      expandableListEl.innerHTML = html;
      
      // Add click event listeners for course sections
      qsa('#expandableResourcesList .course-section-header').forEach(function(header) {
        header.addEventListener('click', function() {
          var courseId = this.dataset.courseId;
          var content = this.nextElementSibling;
          var expandIcon = this.querySelector('.expand-icon');
          
          // Add loading state
          this.classList.add('loading');
          
          // Small delay to show loading state
          setTimeout(function() {
            if (content.classList.contains('collapsed')) {
              // Expand
              content.classList.remove('collapsed');
              expandIcon.textContent = '▼';
            } else {
              // Collapse
              content.classList.add('collapsed');
              expandIcon.textContent = '▶';
            }
            
            // Remove loading state
            header.classList.remove('loading');
          }, 150);
        });
      });
      
      // Add click event listeners for resource type sections
      qsa('#expandableResourcesList .resource-type-header').forEach(function(header) {
        header.addEventListener('click', function() {
          var resourceType = this.dataset.resourceType;
          var content = this.nextElementSibling;
          var expandIcon = this.querySelector('.expand-icon');
          
          // Add loading state
          this.classList.add('loading');
          
          // Small delay to show loading state
          setTimeout(function() {
            if (content.classList.contains('collapsed')) {
              // Expand
              content.classList.remove('collapsed');
              expandIcon.textContent = '▼';
            } else {
              // Collapse
              content.classList.add('collapsed');
              expandIcon.textContent = '▶';
            }
            
            // Remove loading state
            header.classList.remove('loading');
          }, 150);
        });
      });
      
      // Add click event listeners for resource admin actions
      qsa('#expandableResourcesList .resource-item').forEach(function(resourceItem) {
        resourceItem.addEventListener('click', function(e) {
          var action = e.target.getAttribute('data-action');
          var resourceId = this.dataset.resourceId;
          
          if (action === 'edit' && resourceId) {
            e.preventDefault();
            e.stopPropagation();
            openEditResource(resourceId);
          } else if (action === 'delete' && resourceId) {
            e.preventDefault();
            e.stopPropagation();
            deleteResource(resourceId);
          }
        });
      });
    } catch (error) {
      console.error('Error rendering expandable resources:', error);
      var expandableListEl = qs('#expandableResourcesList');
      if (expandableListEl) {
        expandableListEl.innerHTML = '<div class="error-message">Error loading resources</div>';
      }
    }
  }

  // Helper function to get resource type labels
  function getResourceTypeLabel(type) {
    var labels = {
      'books': 'Books',
      'slides': 'Lecture Slides',
      'student-notes': 'Student Notes',
      'lab-reports': 'Lab Reports'
    };
    return labels[type] || 'Resources';
  }

  // Helper function to get resource type icons
  function getResourceTypeIcon(type) {
    var icons = {
      'books': '📚',
      'slides': '📊',
      'student-notes': '👨‍🎓',
      'lab-reports': '🧪'
    };
    return icons[type] || '📎';
  }

  async function openEditResource(id) {
    var r = cache.resourcesById[id];
    if (!r) return;
    editing.resourceId = id;
    qs('#noteModalTitle').textContent = 'Edit Resource';
    var f = getEls();
    if (f.noteForm) { f.noteForm.reset(); }
    try { await populateCourseOptions(); } catch (_) {}
    if (getEls().noteCourse) { getEls().noteCourse.value = r.courseId || ''; }
    if (getEls().noteType) { getEls().noteType.value = r.type || 'books'; }
    if (getEls().noteSection) { getEls().noteSection.value = (r.section === 'A' || r.section === 'B') ? r.section : 'all'; }
    qs('#noteTitle').value = r.title || '';
    qs('#noteDescription').value = r.description || '';
    qs('#noteLink').value = r.url || r.linkUrl || '';
    openModal(getEls().noteModal);
  }

  async function deleteResource(id) {
    var d = ensureDb();
    var r = cache.resourcesById[id];
    if (!r) return;
    var ok = await window.showThemedConfirm('Delete resource "' + (r.title || 'Untitled') + '"?', { type: 'warning', okText: 'Delete' });
    if (!ok) return;
    showLoading('Deleting resource...');
    try {
      await d.collection('resources').doc(id).delete();
      try { await d.collection('courses').doc(r.courseId).collection(r.type).doc(id).delete(); } catch (_) {}
      await loadAndRenderResources();
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to delete resource: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }

  // Events CRUD
  function openCreateEvent(preset) {
    editing.eventId = null;
    var f = getEls();
    if (!f.eventForm) return;
    f.eventForm.reset();
    qs('#modalTitle').textContent = 'Add New Event';
    if (preset && typeof preset === 'object') {
      if (preset.title) qs('#eventTitle').value = preset.title;
      if (preset.date) qs('#eventDate').value = formatDateForInput(preset.date);
      if (preset.time) qs('#eventTime').value = preset.time;
      if (preset.description) qs('#eventDescription').value = preset.description;
    }
    openModal(f.eventModal);
  }
  function openEditEvent(id) {
    var ev = cache.eventsById[id];
    if (!ev) return;
    editing.eventId = id;
    var f = getEls();
    f.eventForm.reset();
    qs('#modalTitle').textContent = 'Edit Event';
    qs('#eventTitle').value = ev.title || '';
    qs('#eventDate').value = formatDateForInput(ev.date);
    qs('#eventTime').value = ev.time || '';
    qs('#eventDescription').value = ev.description || '';
    qs('#eventDuration').value = '';
    qs('#eventMarks').value = '';
    qs('#eventRoom').value = ev.room || '';
    qs('#eventUrgent').checked = !!ev.urgent;
    openModal(f.eventModal);
  }
  async function saveEvent(e) {
    e.preventDefault();
    var d = ensureDb();
    var title = qs('#eventTitle').value.trim();
    var date = normalizeDateValue(qs('#eventDate').value);
    var time = qs('#eventTime').value.trim();
    var description = qs('#eventDescription').value.trim();
    var duration = qs('#eventDuration').value.trim();
    var marks = qs('#eventMarks').value.trim();
    var room = qs('#eventRoom').value.trim();
    var urgent = !!qs('#eventUrgent').checked;

    var detailsParts = [];
    if (duration) detailsParts.push('Duration: ' + duration);
    if (marks) detailsParts.push('Total Marks: ' + marks);
    if (room) detailsParts.push('Room: ' + room);
    var details = detailsParts.join(' | ');

    var payload = {
      title: title,
      date: date,
      time: time,
      description: description,
      details: details,
      room: room || '',
      urgent: urgent,
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    if (!editing.eventId) payload.createdAt = payload.updatedAt;
    showLoading(editing.eventId ? 'Saving event...' : 'Creating event...');
    try {
      if (editing.eventId) {
        await d.collection('events').doc(editing.eventId).set(payload, { merge: true });
      } else {
        await d.collection('events').add(payload);
      }
      hideLoading();
      await window.showThemedAlert('Event saved successfully', { type: 'success' });
      await loadAndRenderEvents();
      closeModal(getEls().eventModal);
    } catch (err) {
      console.error(err);
      hideLoading();
      await window.showThemedAlert('Failed to save event: ' + err.message, { type: 'error' });
    }
  }
  async function deleteEvent(id) {
    var d = ensureDb();
    var ev = cache.eventsById[id];
    if (!ev) return;
    var ok = await window.showThemedConfirm('Delete event "' + (ev.title || 'Untitled') + '"?', { type: 'warning', okText: 'Delete' });
    if (!ok) return;
    showLoading('Deleting event...');
    try {
      await d.collection('events').doc(id).delete();
      await loadAndRenderEvents();
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to delete event: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }

  // Courses CRUD
  function openCreateCourse() {
    editing.courseId = null;
    var f = getEls();
    if (!f.courseForm) return;
    f.courseForm.reset();
    qs('#courseModalTitle').textContent = 'Add New Course';
    openModal(f.courseModal);
  }
  function openEditCourse(id) {
    var c = cache.coursesById[id];
    if (!c) return;
    editing.courseId = id;
    qs('#courseModalTitle').textContent = 'Edit Course';
    qs('#courseCode').value = c.code || '';
    qs('#courseTitle').value = c.title || '';
    qs('#courseInstructor').value = c.instructor || '';
    openModal(getEls().courseModal);
  }
  async function saveCourse(e) {
    e.preventDefault();
    var d = ensureDb();
    var code = qs('#courseCode').value.trim();
    var title = qs('#courseTitle').value.trim();
    var instructor = qs('#courseInstructor').value.trim();
    var payload = {
      code: code,
      title: title,
      instructor: instructor || '',
      description: '',
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    if (!editing.courseId) payload.createdAt = payload.updatedAt;
    showLoading(editing.courseId ? 'Saving course...' : 'Creating course...');
    try {
      if (editing.courseId) {
        await d.collection('courses').doc(editing.courseId).set(payload, { merge: true });
      } else {
        await d.collection('courses').add(payload);
      }
      hideLoading();
      await window.showThemedAlert('Course saved successfully', { type: 'success' });
      await Promise.all([loadAndRenderCourses(), populateCourseOptions()]);
      closeModal(getEls().courseModal);
    } catch (err) {
      console.error(err);
      hideLoading();
      await window.showThemedAlert('Failed to save course: ' + err.message, { type: 'error' });
    }
  }
  async function deleteCourse(id) {
    var d = ensureDb();
    var c = cache.coursesById[id];
    if (!c) return;
    var ok = await window.showThemedConfirm('Delete course "' + (c.title || 'Untitled') + '"? Resources linked to this course will remain in top-level resources.', { type: 'warning', okText: 'Delete' });
    if (!ok) return;
    showLoading('Deleting course...');
    try {
      await d.collection('courses').doc(id).delete();
      await Promise.all([loadAndRenderCourses(), populateCourseOptions()]);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to delete course: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }

  // Resources (Books/Slides/Student Notes/Lab Reports) via noteModal
  function openCreateResource(presetType) {
    editing.resourceId = null;
    var f = getEls();
    if (!f.noteForm) return;
    f.noteForm.reset();
    if (presetType) f.noteType.value = presetType;
    if (f.noteSection) f.noteSection.value = 'all';
    qs('#noteModalTitle').textContent = 'Add New Resource';
    openModal(f.noteModal);
  }
  async function saveResource(e) {
    e.preventDefault();
    var d = ensureDb();
    var f = getEls();
    var courseId = f.noteCourse.value;
    var type = f.noteType.value;
    var title = qs('#noteTitle').value.trim();
    var description = qs('#noteDescription').value.trim();
    var url = qs('#noteLink').value.trim();
    var sectionSel = getEls().noteSection;
    var section = sectionSel && sectionSel.value ? sectionSel.value : 'all';
    var baseTimestamps = {
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    var payload = {
      courseId: courseId,
      type: type,
      title: title,
      description: description || '',
      url: url,
      linkUrl: url,
      section: section,
    };
    var oldResource = editing.resourceId ? cache.resourcesById[editing.resourceId] : null;
    showLoading('Saving resource...');
    try {
      if (editing.resourceId) {
        var docId = editing.resourceId;
        await d.collection('resources').doc(docId).set(Object.assign({}, payload, baseTimestamps), { merge: true });
        await d.collection('courses').doc(courseId).collection(type).doc(docId).set(Object.assign({}, payload, baseTimestamps), { merge: true });
        if (oldResource && (oldResource.courseId !== courseId || oldResource.type !== type)) {
          try { await d.collection('courses').doc(oldResource.courseId).collection(oldResource.type).doc(docId).delete(); } catch (_) {}
        }
      } else {
        var createdAt = baseTimestamps.updatedAt;
        var newRef = d.collection('resources').doc();
        var newId = newRef.id;
        await newRef.set(Object.assign({}, payload, { createdAt: createdAt }));
        await d.collection('courses').doc(courseId).collection(type).doc(newId).set(Object.assign({}, payload, { createdAt: createdAt }));
      }
      hideLoading();
      await window.showThemedAlert('Resource saved successfully', { type: 'success' });
      await loadAndRenderResources();
      closeModal(f.noteModal);
    } catch (err) {
      console.error(err);
      hideLoading();
      await window.showThemedAlert('Failed to save resource: ' + err.message, { type: 'error' });
    }
  }
  async function populateCourseOptions() {
    var f = getEls();
    if (!f.noteCourse) return;
    var d = ensureDb();
    var snap = await d.collection('courses').orderBy('createdAt', 'asc').get();
    var options = '<option value="">Choose a course...</option>';
    snap.forEach(function (doc) {
      var c = doc.data();
      options += '<option value="' + escapeAttr(doc.id) + '">' + escapeHtml(c.title || c.code || 'Course') + '</option>';
    });
    f.noteCourse.innerHTML = options;
  }

  // Notice CRUD
  function resetAttachmentsUI() {
    var f = getEls();
    if (!f.attachmentsList) return;
    f.attachmentsList.innerHTML = '';
  }
  function addAttachmentRow(defaults) {
    var f = getEls();
    if (!f.attachmentsList) return;
    var wrap = document.createElement('div');
    wrap.className = 'attachment-row';
    wrap.innerHTML = '<input type="text" placeholder="File name (e.g., syllabus.pdf)" class="attachment-name" />' +
      '<input type="url" placeholder="https://..." class="attachment-url" />' +
      '<button type="button" class="attachment-remove">✖</button>';
    f.attachmentsList.appendChild(wrap);
    if (defaults) {
      var nameEl = wrap.querySelector('.attachment-name');
      var urlEl = wrap.querySelector('.attachment-url');
      if (defaults.name) nameEl.value = defaults.name;
      if (defaults.url) urlEl.value = defaults.url;
    }
    wrap.querySelector('.attachment-remove').addEventListener('click', function(){ wrap.remove(); });
  }
  function openCreateNotice() {
    editing.noticeId = null;
    var f = getEls();
    if (!f.noticeForm) return;
    f.noticeForm.reset();
    resetAttachmentsUI();
    qs('#noticeModalTitle').textContent = 'Add New Notice';
    openModal(f.noticeModal);
  }
  function openEditNotice(id) {
    var n = cache.noticesById[id];
    if (!n) return;
    editing.noticeId = id;
    qs('#noticeModalTitle').textContent = 'Edit Notice';
    qs('#noticeTitle').value = n.title || '';
    qs('#noticeCategory').value = n.category || 'general';
    qs('#noticeContent').value = n.content || '';
    resetAttachmentsUI();
    if (n.attachments && n.attachments.length) {
      n.attachments.forEach(function (a) { addAttachmentRow({ name: a.name, url: a.url }); });
    }
    openModal(getEls().noticeModal);
  }
  function collectAttachments() {
    var rows = qsa('#attachmentsList .attachment-row');
    var out = [];
    rows.forEach(function (row) {
      var name = (row.querySelector('.attachment-name') || {}).value || '';
      var url = (row.querySelector('.attachment-url') || {}).value || '';
      name = name.trim(); url = url.trim();
      if (!name && !url) return;
      out.push({ name: name, url: url });
    });
    return out;
  }
  async function saveNotice(e) {
    e.preventDefault();
    var d = ensureDb();
    var title = qs('#noticeTitle').value.trim();
    var category = qs('#noticeCategory').value || 'general';
    var content = qs('#noticeContent').value.trim();
    var attachments = collectAttachments();
    var payload = {
      title: title,
      category: category,
      content: content,
      attachments: attachments,
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    if (!editing.noticeId) payload.createdAt = payload.updatedAt;
    showLoading(editing.noticeId ? 'Saving notice...' : 'Creating notice...');
    try {
      if (editing.noticeId) {
        await d.collection('notices').doc(editing.noticeId).set(payload, { merge: true });
      } else {
        await d.collection('notices').add(payload);
      }
      hideLoading();
      await window.showThemedAlert('Notice saved successfully', { type: 'success' });
      await loadAndRenderNotices();
      closeModal(getEls().noticeModal);
    } catch (err) {
      console.error(err);
      hideLoading();
      await window.showThemedAlert('Failed to save notice: ' + err.message, { type: 'error' });
    }
  }
  async function deleteNotice(id) {
    var d = ensureDb();
    var n = cache.noticesById[id];
    if (!n) return;
    var ok = await window.showThemedConfirm('Delete notice "' + (n.title || 'Untitled') + '"?', { type: 'warning', okText: 'Delete' });
    if (!ok) return;
    showLoading('Deleting notice...');
    try {
      await d.collection('notices').doc(id).delete();
      await loadAndRenderNotices();
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to delete notice: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }

  // Extra Class CRUD
  function openCreateExtraClass() {
    editing.extraClassId = null;
    var f = getEls();
    if (!f.extraClassForm) return;
    f.extraClassForm.reset();
    qs('#extraClassModalTitle').textContent = 'Add Extra Class';
    openModal(f.extraClassModal);
  }
  function openEditExtraClass(id) {
    var ex = cache.extraClassesById[id];
    if (!ex) return;
    editing.extraClassId = id;
    qs('#extraClassModalTitle').textContent = 'Edit Extra Class';
    qs('#extraClassTitle').value = ex.title || '';
    qs('#extraClassSubject').value = ex.subject || '';
    qs('#extraClassSubsection').value = ex.subsection || '';
    qs('#extraClassDate').value = formatDateForInput(ex.date);
    qs('#extraClassDay').value = ex.day || '';
    qs('#extraClassTime').value = ex.time || '';
    qs('#extraClassRoom').value = ex.room || '';
    qs('#extraClassInstructor').value = ex.instructor || '';
    qs('#extraClassDescription').value = ex.description || '';
    openModal(getEls().extraClassModal);
  }
  async function saveExtraClass(e) {
    e.preventDefault();
    var d = ensureDb();
    var payload = {
      title: qs('#extraClassTitle').value.trim(),
      subject: qs('#extraClassSubject').value.trim(),
      subsection: qs('#extraClassSubsection').value || '',
      date: normalizeDateValue(qs('#extraClassDate').value),
      day: qs('#extraClassDay').value || '',
      time: qs('#extraClassTime').value || '',
      room: (qs('#extraClassRoom').value || '').trim() || '',
      instructor: (qs('#extraClassInstructor').value || '').trim() || '',
      description: (qs('#extraClassDescription').value || '').trim() || '',
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    if (!editing.extraClassId) payload.createdAt = payload.updatedAt;
    showLoading(editing.extraClassId ? 'Saving extra class...' : 'Creating extra class...');
    try {
      if (editing.extraClassId) {
        await d.collection('extraClasses').doc(editing.extraClassId).set(payload, { merge: true });
      } else {
        await d.collection('extraClasses').add(payload);
      }
      hideLoading();
      await window.showThemedAlert('Extra class saved successfully', { type: 'success' });
      await loadAndRenderExtraClasses();
      closeModal(getEls().extraClassModal);
    } catch (err) {
      console.error(err);
      hideLoading();
      await window.showThemedAlert('Failed to save extra class: ' + err.message, { type: 'error' });
    }
  }
  async function deleteExtraClass(id) {
    var d = ensureDb();
    var ex = cache.extraClassesById[id];
    if (!ex) return;
    var ok = await window.showThemedConfirm('Delete extra class "' + (ex.title || 'Untitled') + '"?', { type: 'warning', okText: 'Delete' });
    if (!ok) return;
    showLoading('Deleting extra class...');
    try {
      await d.collection('extraClasses').doc(id).delete();
      await loadAndRenderExtraClasses();
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to delete extra class: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }

  async function loadAndRenderExtraClasses() {
    var d = ensureDb();
    var listEl = getEls().extraClassesList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('extraClasses').orderBy('createdAt', 'desc').get();
    cache.extraClassesById = {};
    if (snap.empty) { listEl.innerHTML = '<div class="empty-hint">No extra classes yet.</div>'; return; }
    var html = '';
    snap.forEach(function (doc) {
      var ex = doc.data();
      cache.extraClassesById[doc.id] = ex;
      var dateStr = ex.date ? (ex.date.seconds ? new Date(ex.date.seconds * 1000).toISOString().substring(0,10) : String(ex.date)) : '';
      html += (
        '        <div class="extra-class-admin-item" data-id="' + doc.id + '">\n' +
        '          <div class="extra-class-admin-header">\n' +
        '            <div class="extra-class-admin-info">\n' +
        '              <h3>' + escapeHtml(ex.title || 'Untitled Extra Class') + '</h3>\n' +
        '              <p>📅 ' + (dateStr || '-') + ' | 📆 ' + (ex.day || '-') + ' | ⏰ ' + (ex.time || '-') + (ex.subsection ? (' | Sub: ' + escapeHtml(ex.subsection)) : '') + '</p>\n' +
        '            </div>\n' +
        '            <div class="notice-admin-actions">\n' +
        '              <button data-action="edit">Edit</button>\n' +
        '              <button class="delete-btn" data-action="delete">Delete</button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="notice-admin-content">' + (ex.description ? escapeHtml(ex.description) : '') + '</div>\n' +
        '        </div>'
      );
    });
    listEl.innerHTML = html;
    qsa('#extraClassesList .extra-class-admin-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.addEventListener('click', function (e) {
        var action = (e.target && e.target.getAttribute('data-action')) || '';
        if (action === 'edit') { e.preventDefault(); e.stopPropagation(); openEditExtraClass(id); }
        else if (action === 'delete') { e.preventDefault(); e.stopPropagation(); deleteExtraClass(id); }
      });
    });
  }

  // Auth UI
  function showDashboard() {
    var els = getEls();
    if (els.loginScreen) els.loginScreen.style.display = 'none';
    if (els.adminDashboard) els.adminDashboard.style.display = '';
    refreshAll().catch(function (e) { console.error(e); });
  }
  function showLogin() {
    var els = getEls();
    if (els.adminDashboard) els.adminDashboard.style.display = 'none';
    if (els.loginScreen) els.loginScreen.style.display = '';
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    var els = getEls();
    var username = (qs('#username').value || '').trim();
    var password = (qs('#password').value || '').trim();
    if (username === adminCreds.username && password === adminCreds.password) {
      setLoggedIn(true);
      if (els.loginError) els.loginError.textContent = '';
      showDashboard();
      window.showThemedAlert('Welcome, ' + username + '!', { type: 'success' });
    } else {
      if (els.loginError) els.loginError.textContent = 'Invalid credentials';
    }
  }
  function handleLogout() {
    setLoggedIn(false);
    showLogin();
    window.showThemedAlert('Logged out', { type: 'success' });
  }

  // Wiring
  function wireBaseActions() {
    var els = getEls();

    if (els.backToMain) els.backToMain.addEventListener('click', function(){ window.location.href = '../index.html'; });
    if (els.logoutBtn) els.logoutBtn.addEventListener('click', handleLogout);

    if (els.addEventBtn) els.addEventBtn.addEventListener('click', function(){ openCreateEvent(); });
    if (els.eventForm) els.eventForm.addEventListener('submit', saveEvent);
    if (els.closeEventModalBtn) els.closeEventModalBtn.addEventListener('click', function(){ closeModal(els.eventModal); });
    if (els.cancelEventBtn) els.cancelEventBtn.addEventListener('click', function(){ closeModal(els.eventModal); });

    if (els.addCourseBtn) els.addCourseBtn.addEventListener('click', openCreateCourse);
    if (els.courseForm) els.courseForm.addEventListener('submit', saveCourse);
    if (els.closeCourseModalBtn) els.closeCourseModalBtn.addEventListener('click', function(){ closeModal(els.courseModal); });
    if (els.cancelCourseBtn) els.cancelCourseBtn.addEventListener('click', function(){ closeModal(els.courseModal); });

    function openResource(type) { return function(){ openCreateResource(type); }; }
    if (els.addNoteBtn) els.addNoteBtn.addEventListener('click', openResource('books'));
    if (els.addSlideBtn) els.addSlideBtn.addEventListener('click', openResource('slides'));
    if (els.addStudentNoteBtn) els.addStudentNoteBtn.addEventListener('click', openResource('student-notes'));
    if (els.addLabReportBtn) els.addLabReportBtn.addEventListener('click', openResource('lab-reports'));
    if (els.noteForm) els.noteForm.addEventListener('submit', saveResource);
    if (els.closeNoteModalBtn) els.closeNoteModalBtn.addEventListener('click', function(){ closeModal(els.noteModal); });
    if (els.cancelNoteBtn) els.cancelNoteBtn.addEventListener('click', function(){ closeModal(els.noteModal); });

    if (els.addNoticeBtn) els.addNoticeBtn.addEventListener('click', openCreateNotice);
    if (els.addAttachmentBtn) els.addAttachmentBtn.addEventListener('click', function(){ addAttachmentRow(); });
    if (els.noticeForm) els.noticeForm.addEventListener('submit', saveNotice);
    if (els.closeNoticeModalBtn) els.closeNoticeModalBtn.addEventListener('click', function(){ closeModal(els.noticeModal); });
    if (els.cancelNoticeBtn) els.cancelNoticeBtn.addEventListener('click', function(){ closeModal(els.noticeModal); });

    if (els.addExtraClassBtn) els.addExtraClassBtn.addEventListener('click', openCreateExtraClass);
    if (els.extraClassForm) els.extraClassForm.addEventListener('submit', saveExtraClass);
    if (els.closeExtraClassModalBtn) els.closeExtraClassModalBtn.addEventListener('click', function(){ closeModal(els.extraClassModal); });
    if (els.cancelExtraClassBtn) els.cancelExtraClassBtn.addEventListener('click', function(){ closeModal(els.extraClassModal); });
  }

  // Init
  function init() {
    try { ensureDb(); } catch (e) { console.error(e); }
    var els = getEls();
    if (els.loginForm) els.loginForm.addEventListener('submit', handleLoginSubmit);
    wireBaseActions();
    setupGlobalEscapeHandler();
    populateCourseOptions().catch(function (e) { console.warn(e); });
    if (isLoggedIn()) showDashboard(); else showLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();