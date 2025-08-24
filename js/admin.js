(function () {
  var firebase = window.firebase;
  var db = window.db;

  function ensureDb() {
    if (db) return db;
    if (window.db) { db = window.db; return db; }
    if (window.firebase && window.__firebaseConfig) {
      if (!window.firebase.apps || window.firebase.apps.length === 0) {
        window.firebase.initializeApp(window.__firebaseConfig);
      }
      db = window.firebase.firestore();
      try { db.enablePersistence({ synchronizeTabs: true }); } catch (_) {}
      return db;
    }
    throw new Error('Firestore not initialized');
  }

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

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(str) { return escapeHtml(str).replace(/"/g, '&quot;'); }

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
  function setupModalAutoClose(modalEl) {
    if (!modalEl || modalEl._autoBound) return;
    modalEl.addEventListener('click', function(e){ if (e.target === modalEl) closeModal(modalEl); });
    var content = modalEl.querySelector('.modal-card');
    if (content) content.addEventListener('click', function(e){ e.stopPropagation(); });
    modalEl._autoBound = true;
  }
  function setupGlobalEscapeHandler() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        var openModals = document.querySelectorAll('.modal-overlay[style*="flex"]');
        if (openModals.length > 0) closeModal(openModals[0]);
      }
    });
  }

  function getEls() {
    return {
      adminDashboard: qs('#adminDashboard'),
      backToMain: qs('#backToMain'),
      logoutBtn: qs('#logoutBtn'),

      eventsList: qs('#eventsList'),
      coursesList: qs('#coursesList'),
      noticesList: qs('#noticesList'),
      extraClassesList: qs('#extraClassesList'),
      expandableResourcesList: qs('#expandableResourcesList'),

      addEventBtn: qs('#addEventBtn'),
      addCourseBtn: qs('#addCourseBtn'),
      addNoteBtn: qs('#addNoteBtn'),
      addSlideBtn: qs('#addSlideBtn'),
      addStudentNoteBtn: qs('#addStudentNoteBtn'),
      addLabReportBtn: qs('#addLabReportBtn'),
      addNoticeBtn: qs('#addNoticeBtn'),
      addExtraClassBtn: qs('#addExtraClassBtn'),

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

  async function refreshAll() {
    try { ensureDb(); } catch (e) {}
    await Promise.all([
      loadAndRenderEvents(),
      loadAndRenderCourses(),
      loadAndRenderNotices(),
      loadAndRenderExtraClasses(),
      loadAndRenderResources(),
      populateCourseOptions(),
    ]).catch(function(e){ console.warn(e); });
  }

  function normalizeDateForDisplay(d) {
    if (!d) return '';
    if (d && d.seconds) return new Date(d.seconds * 1000).toISOString().substring(0,10);
    try { return new Date(d).toISOString().substring(0,10); } catch (_) { return String(d); }
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
      var ev = doc.data() || {};
      cache.eventsById[doc.id] = ev;
      var dateStr = ev.date ? normalizeDateForDisplay(ev.date) : '';
      var urgent = ev.urgent ? '🚨 Urgent' : '📋 Normal';
      html += (
        '<div class="notice-admin-item" data-id="' + doc.id + '">' +
          '<div class="notice-admin-header">' +
            '<div class="notice-admin-info">' +
              '<h3>' + escapeHtml(ev.title || 'Untitled') + '</h3>' +
              '<p>📅 ' + escapeHtml(dateStr || '-') + ' | ⏰ ' + escapeHtml(ev.time || '-') + ' | ' + urgent + '</p>' +
            '</div>' +
            '<div class="notice-admin-actions">' +
              '<button data-action="edit">Edit</button>' +
              '<button class="delete-btn" data-action="delete">Delete</button>' +
            '</div>' +
          '</div>' +
          '<div class="notice-admin-content">' + escapeHtml(ev.description || '') + '</div>' +
        '</div>'
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

  function readEventForm() {
    return {
      title: (qs('#eventTitle').value || '').trim(),
      date: (qs('#eventDate').value || '').trim(),
      time: (qs('#eventTime').value || '').trim(),
      description: (qs('#eventDescription').value || '').trim(),
      duration: (qs('#eventDuration').value || '').trim(),
      marks: Number(qs('#eventMarks').value || 0),
      room: (qs('#eventRoom').value || '').trim(),
      urgent: !!qs('#eventUrgent').checked,
      updatedAt: new Date().toISOString(),
    };
  }
  function fillEventForm(ev) {
    qs('#eventTitle').value = ev.title || '';
    qs('#eventDate').value = normalizeDateForDisplay(ev.date) || '';
    qs('#eventTime').value = ev.time || '';
    qs('#eventDescription').value = ev.description || '';
    qs('#eventDuration').value = ev.duration || '';
    qs('#eventMarks').value = ev.marks != null ? String(ev.marks) : '';
    qs('#eventRoom').value = ev.room || '';
    qs('#eventUrgent').checked = !!ev.urgent;
  }
  function openCreateEvent() {
    editing.eventId = null;
    qs('#modalTitle').textContent = 'Add New Event';
    fillEventForm({});
    openModal(getEls().eventModal);
  }
  async function openEditEvent(id) {
    editing.eventId = id;
    qs('#modalTitle').textContent = 'Edit Event';
    var ev = cache.eventsById[id];
    if (!ev) {
      var doc = await ensureDb().collection('events').doc(id).get();
      ev = doc.exists ? (doc.data() || {}) : {};
    }
    fillEventForm(ev);
    openModal(getEls().eventModal);
  }
  async function saveEvent(e) {
    e.preventDefault();
    try {
      showLoading('Saving event...');
      var d = ensureDb();
      var data = readEventForm();
      if (!data.title || !data.date) {
        hideLoading();
        (window.showThemedAlert ? window.showThemedAlert('Title and Date are required', { type: 'warning' }) : alert('Title and Date are required'));
        return;
      }
      if (editing.eventId) {
        await d.collection('events').doc(editing.eventId).set(data, { merge: true });
      } else {
        data.createdAt = new Date().toISOString();
        await d.collection('events').add(data);
      }
      closeModal(getEls().eventModal);
      await loadAndRenderEvents();
    } catch (err) {
      console.error(err);
      (window.showThemedAlert ? window.showThemedAlert('Failed to save event', { type: 'error' }) : alert('Failed to save event'));
    } finally { hideLoading(); }
  }
  async function deleteEvent(id) {
    var proceed = window.showThemedConfirm ? await window.showThemedConfirm('Delete this event?', { type: 'warning' }) : confirm('Delete this event?');
    if (!proceed) return;
    try {
      showLoading('Deleting...');
      await ensureDb().collection('events').doc(id).delete();
      await loadAndRenderEvents();
    } catch (e) {
      console.error(e);
    } finally { hideLoading(); }
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
      var c = doc.data() || {};
      cache.coursesById[doc.id] = c;
      html += (
        '<div class="extra-class-admin-item" data-id="' + doc.id + '">' +
          '<div class="extra-class-admin-header">' +
            '<div class="extra-class-admin-info">' +
              '<h3>' + escapeHtml(c.title || 'Untitled Course') + '</h3>' +
              '<p>' + escapeHtml(c.code || '') + (c.instructor ? (' | 👨‍🏫 ' + escapeHtml(c.instructor)) : '') + '</p>' +
            '</div>' +
            '<div class="notice-admin-actions">' +
              '<button data-action="edit">Edit</button>' +
              '<button class="delete-btn" data-action="delete">Delete</button>' +
            '</div>' +
          '</div>' +
        '</div>'
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
  function readCourseForm() {
    return {
      code: (qs('#courseCode').value || '').trim(),
      title: (qs('#courseTitle').value || '').trim(),
      instructor: (qs('#courseInstructor').value || '').trim(),
      updatedAt: new Date().toISOString(),
    };
  }
  function fillCourseForm(c) {
    qs('#courseCode').value = c.code || '';
    qs('#courseTitle').value = c.title || '';
    qs('#courseInstructor').value = c.instructor || '';
  }
  function openCreateCourse() {
    editing.courseId = null;
    qs('#courseModalTitle').textContent = 'Add New Course';
    fillCourseForm({});
    openModal(getEls().courseModal);
  }
  async function openEditCourse(id) {
    editing.courseId = id;
    qs('#courseModalTitle').textContent = 'Edit Course';
    var c = cache.coursesById[id];
    if (!c) {
      var doc = await ensureDb().collection('courses').doc(id).get();
      c = doc.exists ? (doc.data() || {}) : {};
    }
    fillCourseForm(c);
    openModal(getEls().courseModal);
  }
  async function saveCourse(e) {
    e.preventDefault();
    try {
      showLoading('Saving course...');
      var d = ensureDb();
      var data = readCourseForm();
      if (!data.code || !data.title) {
        hideLoading();
        (window.showThemedAlert ? window.showThemedAlert('Code and Title are required', { type: 'warning' }) : alert('Code and Title are required'));
        return;
      }
      if (editing.courseId) {
        await d.collection('courses').doc(editing.courseId).set(data, { merge: true });
      } else {
        data.createdAt = new Date().toISOString();
        await d.collection('courses').add(data);
      }
      closeModal(getEls().courseModal);
      await Promise.all([loadAndRenderCourses(), populateCourseOptions(), loadAndRenderResources()]);
    } catch (err) {
      console.error(err);
      (window.showThemedAlert ? window.showThemedAlert('Failed to save course', { type: 'error' }) : alert('Failed to save course'));
    } finally { hideLoading(); }
  }
  async function deleteCourse(id) {
    var proceed = window.showThemedConfirm ? await window.showThemedConfirm('Delete this course?', { type: 'warning' }) : confirm('Delete this course?');
    if (!proceed) return;
    try {
      showLoading('Deleting...');
      await ensureDb().collection('courses').doc(id).delete();
      await Promise.all([loadAndRenderCourses(), populateCourseOptions(), loadAndRenderResources()]);
    } catch (e) {
      console.error(e);
    } finally { hideLoading(); }
  }

  async function populateCourseOptions() {
    var sel = getEls().noteCourse;
    if (!sel) return;
    sel.innerHTML = '<option value="">Choose a course...</option>';
    var snap = await ensureDb().collection('courses').orderBy('createdAt', 'asc').get();
    snap.forEach(function (doc) {
      var c = doc.data() || {};
      var opt = document.createElement('option');
      opt.value = doc.id;
      opt.textContent = (c.code ? (c.code + ' - ') : '') + (c.title || 'Untitled');
      sel.appendChild(opt);
    });
  }

  async function loadAndRenderResources() {
    var d = ensureDb();
    var listEl = getEls().expandableResourcesList;
    if (!listEl) return;
    listEl.innerHTML = '';
    var snap = await d.collection('resources').orderBy('createdAt', 'desc').get();
    cache.resourcesById = {};
    var resources = [];
    snap.forEach(function (doc) {
      var r = doc.data() || {};
      cache.resourcesById[doc.id] = r;
      resources.push({ id: doc.id, data: r });
    });
    await renderExpandableResources(resources);
  }

  async function renderExpandableResources(resources) {
    var container = getEls().expandableResourcesList;
    if (!container) return;
    var coursesSnap = await ensureDb().collection('courses').get();
    var courseMap = {};
    coursesSnap.forEach(function (doc) { courseMap[doc.id] = doc.data() || {}; });
    if (!resources || resources.length === 0) {
      container.innerHTML = '<div class="empty-hint">No resources available yet.</div>';
      return;
    }
    var grouped = {};
    resources.forEach(function (it) {
      var r = it.data || {};
      var cid = r.courseId || 'unknown';
      if (!grouped[cid]) grouped[cid] = { books: [], slides: [], 'student-notes': [], 'lab-reports': [] };
      var t = r.type || 'books';
      if (!grouped[cid][t]) grouped[cid][t] = [];
      grouped[cid][t].push(it);
    });
    var html = '';
    Object.keys(grouped).forEach(function (cid) {
      var c = courseMap[cid] || {};
      var courseTitle = (c.code ? (c.code + ' - ') : '') + (c.title || 'Unknown Course');
      html += '<div class="expandable-course">';
      html += '<h4>' + escapeHtml(courseTitle) + '</h4>';
      ['books','slides','student-notes','lab-reports'].forEach(function (t) {
        var arr = grouped[cid][t] || [];
        if (arr.length === 0) return;
        html += '<div class="expandable-type"><h5>' + escapeHtml(t) + '</h5><ul>';
        arr.forEach(function (it) {
          var r = it.data || {};
          var title = r.title || 'Untitled';
          var link = r.link || '#';
          var section = r.section && r.section !== 'all' ? (' [' + r.section + ']') : '';
          html += '<li><a href="' + escapeAttr(link) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(title + section) + '</a></li>';
        });
        html += '</ul></div>';
      });
      html += '</div>';
    });
    container.innerHTML = html;
  }

  function readResourceForm() {
    return {
      courseId: (qs('#noteCourse').value || '').trim(),
      type: (qs('#noteType').value || '').trim(),
      section: (qs('#noteSection').value || 'all').trim(),
      title: (qs('#noteTitle').value || '').trim(),
      description: (qs('#noteDescription').value || '').trim(),
      link: (qs('#noteLink').value || '').trim(),
      updatedAt: new Date().toISOString(),
    };
  }
  function openCreateResource(type) {
    if (getEls().noteType && type) getEls().noteType.value = type;
    openModal(getEls().noteModal);
  }
  async function saveResource(e) {
    e.preventDefault();
    try {
      showLoading('Saving resource...');
      var d = ensureDb();
      var data = readResourceForm();
      if (!data.courseId || !data.type || !data.title || !data.link) {
        hideLoading();
        (window.showThemedAlert ? window.showThemedAlert('Course, Type, Title and Link are required', { type: 'warning' }) : alert('Course, Type, Title and Link are required'));
        return;
      }
      data.createdAt = new Date().toISOString();
      await d.collection('resources').add(data);
      closeModal(getEls().noteModal);
      await loadAndRenderResources();
    } catch (e) {
      console.error(e);
      (window.showThemedAlert ? window.showThemedAlert('Failed to save resource', { type: 'error' }) : alert('Failed to save resource'));
    } finally { hideLoading(); }
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
      var n = doc.data() || {};
      cache.noticesById[doc.id] = n;
      var dateStr = n.createdAt ? (n.createdAt.seconds ? new Date(n.createdAt.seconds * 1000).toLocaleString() : String(n.createdAt)) : '';
      html += (
        '<div class="notice-admin-item" data-id="' + doc.id + '">' +
          '<div class="notice-admin-header">' +
            '<div class="notice-admin-info">' +
              '<h3>' + escapeHtml(n.title || 'Untitled Notice') + '</h3>' +
              '<p>🏷️ ' + escapeHtml(n.category || 'general') + (dateStr ? (' | 📅 ' + escapeHtml(dateStr)) : '') + '</p>' +
            '</div>' +
            '<div class="notice-admin-actions">' +
              '<button data-action="edit">Edit</button>' +
              '<button class="delete-btn" data-action="delete">Delete</button>' +
            '</div>' +
          '</div>' +
          '<div class="notice-admin-content">' + escapeHtml(n.content || '') + renderNoticeAttachmentsInline(n.attachments) + '</div>' +
        '</div>'
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
  function addAttachmentRow() {
    var list = getEls().attachmentsList;
    if (!list) return;
    var row = document.createElement('div');
    row.className = 'attachment-row';
    row.innerHTML = '<input type="text" placeholder="Attachment name" class="att-name" /> <input type="url" placeholder="https://..." class="att-url" />';
    list.appendChild(row);
  }
  function readAttachments() {
    var list = getEls().attachmentsList;
    if (!list) return [];
    var rows = qsa('.attachment-row');
    return rows.map(function (r) {
      var name = (r.querySelector('.att-name') && r.querySelector('.att-name').value || '').trim();
      var url = (r.querySelector('.att-url') && r.querySelector('.att-url').value || '').trim();
      if (!name && !url) return null;
      return { name: name || 'Attachment', url: url || '' };
    }).filter(Boolean);
  }
  function fillAttachments(attachments) {
    var list = getEls().attachmentsList;
    if (!list) return;
    list.innerHTML = '';
    (attachments || []).forEach(function (a) {
      var row = document.createElement('div');
      row.className = 'attachment-row';
      row.innerHTML = '<input type="text" placeholder="Attachment name" class="att-name" /> <input type="url" placeholder="https://..." class="att-url" />';
      var n = row.querySelector('.att-name');
      var u = row.querySelector('.att-url');
      if (n) n.value = a.name || '';
      if (u) u.value = a.url || '';
      list.appendChild(row);
    });
  }

  function readNoticeForm() {
    return {
      title: (qs('#noticeTitle').value || '').trim(),
      category: (qs('#noticeCategory').value || '').trim(),
      content: (qs('#noticeContent').value || '').trim(),
      attachments: readAttachments(),
      updatedAt: new Date().toISOString(),
    };
  }
  function fillNoticeForm(n) {
    qs('#noticeTitle').value = n.title || '';
    qs('#noticeCategory').value = n.category || '';
    qs('#noticeContent').value = n.content || '';
    fillAttachments(n.attachments || []);
  }
  function openCreateNotice() {
    editing.noticeId = null;
    qs('#noticeModalTitle').textContent = 'Add New Notice';
    fillNoticeForm({ attachments: [] });
    openModal(getEls().noticeModal);
  }
  async function openEditNotice(id) {
    editing.noticeId = id;
    qs('#noticeModalTitle').textContent = 'Edit Notice';
    var n = cache.noticesById[id];
    if (!n) {
      var doc = await ensureDb().collection('notices').doc(id).get();
      n = doc.exists ? (doc.data() || {}) : {};
    }
    fillNoticeForm(n);
    openModal(getEls().noticeModal);
  }
  async function saveNotice(e) {
    e.preventDefault();
    try {
      showLoading('Saving notice...');
      var d = ensureDb();
      var data = readNoticeForm();
      if (!data.title || !data.category || !data.content) {
        hideLoading();
        (window.showThemedAlert ? window.showThemedAlert('Title, Category and Content are required', { type: 'warning' }) : alert('Title, Category and Content are required'));
        return;
      }
      if (editing.noticeId) {
        await d.collection('notices').doc(editing.noticeId).set(data, { merge: true });
      } else {
        data.createdAt = new Date().toISOString();
        await d.collection('notices').add(data);
      }
      closeModal(getEls().noticeModal);
      await loadAndRenderNotices();
    } catch (e) {
      console.error(e);
      (window.showThemedAlert ? window.showThemedAlert('Failed to save notice', { type: 'error' }) : alert('Failed to save notice'));
    } finally { hideLoading(); }
  }
  async function deleteNotice(id) {
    var proceed = window.showThemedConfirm ? await window.showThemedConfirm('Delete this notice?', { type: 'warning' }) : confirm('Delete this notice?');
    if (!proceed) return;
    try {
      showLoading('Deleting...');
      await ensureDb().collection('notices').doc(id).delete();
      await loadAndRenderNotices();
    } catch (e) {
      console.error(e);
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
      var ex = doc.data() || {};
      cache.extraClassesById[doc.id] = ex;
      var dateStr = ex.date ? normalizeDateForDisplay(ex.date) : '';
      html += (
        '<div class="extra-class-admin-item" data-id="' + doc.id + '">' +
          '<div class="extra-class-admin-header">' +
            '<div class="extra-class-admin-info">' +
              '<h3>' + escapeHtml(ex.title || 'Untitled Extra Class') + '</h3>' +
              '<p>📅 ' + escapeHtml(dateStr || '-') + ' | 📆 ' + escapeHtml(ex.day || '-') + ' | ⏰ ' + escapeHtml(ex.time || '-') + (ex.subsection ? (' | Sub: ' + escapeHtml(ex.subsection)) : '') + '</p>' +
            '</div>' +
            '<div class="notice-admin-actions">' +
              '<button data-action="edit">Edit</button>' +
              '<button class="delete-btn" data-action="delete">Delete</button>' +
            '</div>' +
          '</div>' +
          '<div class="notice-admin-content">' + escapeHtml(ex.description || '') + '</div>' +
        '</div>'
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

  function readExtraClassForm() {
    return {
      title: (qs('#extraClassTitle').value || '').trim(),
      subject: (qs('#extraClassSubject').value || '').trim(),
      subsection: (qs('#extraClassSubsection').value || '').trim(),
      date: (qs('#extraClassDate').value || '').trim(),
      day: (qs('#extraClassDay').value || '').trim(),
      time: (qs('#extraClassTime').value || '').trim(),
      room: (qs('#extraClassRoom').value || '').trim(),
      instructor: (qs('#extraClassInstructor').value || '').trim(),
      description: (qs('#extraClassDescription').value || '').trim(),
      updatedAt: new Date().toISOString(),
    };
  }
  function fillExtraClassForm(ex) {
    qs('#extraClassTitle').value = ex.title || '';
    qs('#extraClassSubject').value = ex.subject || '';
    qs('#extraClassSubsection').value = ex.subsection || '';
    qs('#extraClassDate').value = normalizeDateForDisplay(ex.date) || '';
    qs('#extraClassDay').value = ex.day || '';
    qs('#extraClassTime').value = ex.time || '';
    qs('#extraClassRoom').value = ex.room || '';
    qs('#extraClassInstructor').value = ex.instructor || '';
    qs('#extraClassDescription').value = ex.description || '';
  }
  function openCreateExtraClass() {
    editing.extraClassId = null;
    qs('#extraClassModalTitle').textContent = 'Add Extra Class';
    fillExtraClassForm({});
    openModal(getEls().extraClassModal);
  }
  async function openEditExtraClass(id) {
    editing.extraClassId = id;
    qs('#extraClassModalTitle').textContent = 'Edit Extra Class';
    var ex = cache.extraClassesById[id];
    if (!ex) {
      var doc = await ensureDb().collection('extraClasses').doc(id).get();
      ex = doc.exists ? (doc.data() || {}) : {};
    }
    fillExtraClassForm(ex);
    openModal(getEls().extraClassModal);
  }
  async function saveExtraClass(e) {
    e.preventDefault();
    try {
      showLoading('Saving extra class...');
      var d = ensureDb();
      var data = readExtraClassForm();
      if (!data.title || !data.date || !data.time) {
        hideLoading();
        (window.showThemedAlert ? window.showThemedAlert('Title, Date and Time are required', { type: 'warning' }) : alert('Title, Date and Time are required'));
        return;
      }
      if (editing.extraClassId) {
        await d.collection('extraClasses').doc(editing.extraClassId).set(data, { merge: true });
      } else {
        data.createdAt = new Date().toISOString();
        await d.collection('extraClasses').add(data);
      }
      closeModal(getEls().extraClassModal);
      await loadAndRenderExtraClasses();
    } catch (e) {
      console.error(e);
      (window.showThemedAlert ? window.showThemedAlert('Failed to save extra class', { type: 'error' }) : alert('Failed to save extra class'));
    } finally { hideLoading(); }
  }
  async function deleteExtraClass(id) {
    var proceed = window.showThemedConfirm ? await window.showThemedConfirm('Delete this extra class?', { type: 'warning' }) : confirm('Delete this extra class?');
    if (!proceed) return;
    try {
      showLoading('Deleting...');
      await ensureDb().collection('extraClasses').doc(id).delete();
      await loadAndRenderExtraClasses();
    } catch (e) {
      console.error(e);
    } finally { hideLoading(); }
  }

  function wireBaseActions() {
    var els = getEls();
    if (els.backToMain) els.backToMain.addEventListener('click', function(){ window.location.href = '../index.html'; });
    if (els.logoutBtn) els.logoutBtn.addEventListener('click', function(){ (window.showThemedAlert ? window.showThemedAlert('Logout disabled', { type: 'info' }) : alert('Logout disabled')); });

    if (els.addEventBtn) els.addEventBtn.addEventListener('click', openCreateEvent);
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
    if (els.addAttachmentBtn) els.addAttachmentBtn.addEventListener('click', addAttachmentRow);
    if (els.noticeForm) els.noticeForm.addEventListener('submit', saveNotice);
    if (els.closeNoticeModalBtn) els.closeNoticeModalBtn.addEventListener('click', function(){ closeModal(els.noticeModal); });
    if (els.cancelNoticeBtn) els.cancelNoticeBtn.addEventListener('click', function(){ closeModal(els.noticeModal); });

    if (els.addExtraClassBtn) els.addExtraClassBtn.addEventListener('click', openCreateExtraClass);
    if (els.extraClassForm) els.extraClassForm.addEventListener('submit', saveExtraClass);
    if (els.closeExtraClassModalBtn) els.closeExtraClassModalBtn.addEventListener('click', function(){ closeModal(els.extraClassModal); });
    if (els.cancelExtraClassBtn) els.cancelExtraClassBtn.addEventListener('click', function(){ closeModal(els.extraClassModal); });
  }

  function init() {
    try { ensureDb(); } catch (e) { console.error(e); }
    wireBaseActions();
    setupGlobalEscapeHandler();
    populateCourseOptions().catch(function (e) { console.warn(e); });
    refreshAll().catch(function (e) { console.error(e); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();