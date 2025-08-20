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
    overlay.style.display = 'flex';
  }
  function hideLoading() {
    var overlay = qs('#admin-loading');
    if (!overlay) return;
    overlay.style.display = 'none';
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
      resourcesList: qs('#resourcesList'),

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
      noteCourseSelect: qs('#noteCourse'),
      noteTypeSelect: qs('#noteType'),
      noteSectionSelect: qs('#noteSection'),
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
  function openModal(el) { if (!el) return; el.style.display = 'flex'; setTimeout(function(){ el.classList.add('show'); }, 10); }
  function closeModal(el) { if (!el) return; el.classList.remove('show'); setTimeout(function(){ el.style.display = 'none'; }, 200); }

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
    var listEl = getEls().resourcesList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('resources').orderBy('createdAt', 'desc').get();
    cache.resourcesById = {};
    if (snap.empty) { listEl.innerHTML = '<div class="empty-hint">No resources yet.</div>'; return; }
    var html = '';
    snap.forEach(function (doc) {
      var r = doc.data();
      cache.resourcesById[doc.id] = r;
      var course = cache.coursesById[r.courseId];
      var courseLabel = course ? (course.title || course.code || r.courseId) : (r.courseId || 'Course');
      var typeLabel = r.type || 'resource';
      html += (
        '        <div class="notice-admin-item" data-id="' + doc.id + '">\n' +
        '          <div class="notice-admin-header">\n' +
        '            <div class="notice-admin-info">\n' +
        '              <h3>' + escapeHtml(r.title || 'Untitled') + '</h3>\n' +
        '              <p>📚 ' + escapeHtml(courseLabel) + ' | 🏷️ ' + escapeHtml(typeLabel) + (r.section && r.section !== 'all' ? (' | Section ' + escapeHtml(r.section)) : '') + '</p>\n' +
        '            </div>\n' +
        '            <div class="notice-admin-actions">\n' +
        '              <button data-action="edit">Edit</button>\n' +
        '              <button class="delete-btn" data-action="delete">Delete</button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="notice-admin-content">' + escapeHtml(r.description || '') + (r.url ? ('<br><a href="' + escapeAttr(r.url) + '" target="_blank" rel="noopener noreferrer">Open link</a>') : '') + '</div>\n' +
        '        </div>'
      );
    });
    listEl.innerHTML = html;
    qsa('#resourcesList .notice-admin-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.addEventListener('click', function (e) {
        var action = (e.target && e.target.getAttribute('data-action')) || '';
        if (action === 'edit') { e.preventDefault(); e.stopPropagation(); openEditResource(id); }
        else if (action === 'delete') { e.preventDefault(); e.stopPropagation(); deleteResource(id); }
      });
    });
  }

  async function openEditResource(id) {
    var r = cache.resourcesById[id];
    if (!r) return;
    editing.resourceId = id;
    qs('#noteModalTitle').textContent = 'Edit Resource';
    var f = getEls();
    if (f.noteForm) { f.noteForm.reset(); }
    try { await populateCourseOptions(); } catch (_) {}
    if (getEls().noteCourseSelect) { getEls().noteCourseSelect.value = r.courseId || ''; }
    if (getEls().noteTypeSelect) { getEls().noteTypeSelect.value = r.type || 'books'; }
    if (getEls().noteSectionSelect) { getEls().noteSectionSelect.value = (r.section === 'A' || r.section === 'B') ? r.section : 'all'; }
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
      room: room || undefined,
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
      await window.showThemedAlert('Event saved successfully', { type: 'success' });
      await loadAndRenderEvents();
      closeModal(getEls().eventModal);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to save event: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
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
      instructor: instructor || undefined,
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
      await window.showThemedAlert('Course saved successfully', { type: 'success' });
      await Promise.all([loadAndRenderCourses(), populateCourseOptions()]);
      closeModal(getEls().courseModal);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to save course: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
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
    if (presetType) f.noteTypeSelect.value = presetType;
    if (f.noteSectionSelect) f.noteSectionSelect.value = 'all';
    qs('#noteModalTitle').textContent = 'Add New Resource';
    openModal(f.noteModal);
  }
  async function saveResource(e) {
    e.preventDefault();
    var d = ensureDb();
    var f = getEls();
    var courseId = f.noteCourseSelect.value;
    var type = f.noteTypeSelect.value;
    var title = qs('#noteTitle').value.trim();
    var description = qs('#noteDescription').value.trim();
    var url = qs('#noteLink').value.trim();
    var sectionSel = getEls().noteSectionSelect;
    var section = sectionSel && sectionSel.value ? sectionSel.value : 'all';
    var baseTimestamps = {
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    };
    var payload = {
      courseId: courseId,
      type: type,
      title: title,
      description: description || undefined,
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
      await window.showThemedAlert('Resource saved successfully', { type: 'success' });
      await loadAndRenderResources();
      closeModal(f.noteModal);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to save resource: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
  }
  async function populateCourseOptions() {
    var f = getEls();
    if (!f.noteCourseSelect) return;
    var d = ensureDb();
    var snap = await d.collection('courses').orderBy('createdAt', 'asc').get();
    var options = '<option value="">Choose a course...</option>';
    snap.forEach(function (doc) {
      var c = doc.data();
      options += '<option value="' + escapeAttr(doc.id) + '">' + escapeHtml(c.title || c.code || 'Course') + '</option>';
    });
    f.noteCourseSelect.innerHTML = options;
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
      await window.showThemedAlert('Notice saved successfully', { type: 'success' });
      await loadAndRenderNotices();
      closeModal(getEls().noticeModal);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to save notice: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
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
      room: (qs('#extraClassRoom').value || '').trim() || undefined,
      instructor: (qs('#extraClassInstructor').value || '').trim() || undefined,
      description: (qs('#extraClassDescription').value || '').trim() || undefined,
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
      await window.showThemedAlert('Extra class saved successfully', { type: 'success' });
      await loadAndRenderExtraClasses();
      closeModal(getEls().extraClassModal);
    } catch (err) {
      console.error(err);
      await window.showThemedAlert('Failed to save extra class: ' + err.message, { type: 'error' });
    } finally { hideLoading(); }
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
    populateCourseOptions().catch(function (e) { console.warn(e); });
    if (isLoggedIn()) showDashboard(); else showLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();