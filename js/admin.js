(function () {
  // Dependencies from window
  var firebase = window.firebase;
  var db = window.db;

  // Basic guards for Firebase
  function ensureDb() {
    if (!db) {
      throw new Error('Firestore not initialized. Ensure firebase-config.js ran and window.db is set.');
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

  // Ensure Google sign-in with admin custom claim for protected writes
  async function ensureAdminSignIn() {
    if (!window.firebase || !window.firebase.auth) {
      throw new Error('Firebase Auth SDK not loaded');
    }
    var auth = window.firebase.auth();
    if (!auth.currentUser) {
      var provider = new window.firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await auth.signInWithPopup(provider);
    }
    var tokenResult = await auth.currentUser.getIdTokenResult(true);
    if (!tokenResult || !tokenResult.claims || tokenResult.claims.admin !== true) {
      throw new Error('This Google account does not have admin access');
    }
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
    // Store as YYYY-MM-DD string for consistent ordering and compatibility with main app
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
  function isLoggedIn() {
    return localStorage.getItem(STORAGE_KEY) === '1';
  }
  function setLoggedIn(val) {
    if (val) localStorage.setItem(STORAGE_KEY, '1'); else localStorage.removeItem(STORAGE_KEY);
  }

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

  // ... existing code ...