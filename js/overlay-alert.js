(function () {
  let overlayEl = null;
  let okButtonEl = null;
  let cancelButtonEl = null;
  let closeButtonEl = null;
  let lastActiveElement = null;

  function ensureOverlay() {
    if (overlayEl) return overlayEl;

    overlayEl = document.createElement('div');
    overlayEl.className = 'alert-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.style.display = 'none';

    const card = document.createElement('div');
    card.className = 'alert-card';
    card.setAttribute('tabindex', '-1');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'alert-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';

    const header = document.createElement('div');
    header.className = 'alert-header';

    const icon = document.createElement('div');
    icon.className = 'alert-icon';
    icon.textContent = '⚠️';

    const title = document.createElement('div');
    title.className = 'alert-title';
    title.textContent = 'Notice';

    const msg = document.createElement('div');
    msg.className = 'alert-message';

    const actions = document.createElement('div');
    actions.className = 'alert-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'alert-btn secondary';
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.display = 'none';

    const okBtn = document.createElement('button');
    okBtn.className = 'alert-btn';
    okBtn.type = 'button';
    okBtn.textContent = 'OK';

    actions.appendChild(cancelBtn);
    actions.appendChild(okBtn);
    header.appendChild(icon);
    header.appendChild(title);

    card.appendChild(closeBtn);
    card.appendChild(header);
    card.appendChild(msg);
    card.appendChild(actions);

    overlayEl.appendChild(card);

    document.body.appendChild(overlayEl);

    okButtonEl = okBtn;
    cancelButtonEl = cancelBtn;
    closeButtonEl = closeBtn;

    // Close handlers
    function requestClose() {
      hideOverlay();
    }

    okBtn.addEventListener('click', requestClose);
    closeBtn.addEventListener('click', requestClose);

    overlayEl.addEventListener('click', function (e) {
      if (e.target === overlayEl) {
        requestClose();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!overlayEl || overlayEl.style.display === 'none') return;
      if (e.key === 'Escape') {
        e.preventDefault();
        hideOverlay();
      } else if (e.key === 'Tab') {
        // Basic focus trap within the alert card
        const focusable = overlayEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    return overlayEl;
  }

  function showOverlay(message, options) {
    ensureOverlay();
    const card = overlayEl.querySelector('.alert-card');
    const titleEl = overlayEl.querySelector('.alert-title');
    const msgEl = overlayEl.querySelector('.alert-message');

    const type = options && options.type ? String(options.type) : 'info';
    const title = (options && options.title) || (type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Notice');
    const okText = (options && options.okText) || 'OK';
    const cancelText = (options && options.cancelText) || 'Cancel';
    const isConfirm = !!(options && options.confirm);

    card.classList.remove('type-error', 'type-success', 'type-warning');
    if (type === 'error') card.classList.add('type-error');
    if (type === 'success') card.classList.add('type-success');
    if (type === 'warning') card.classList.add('type-warning');

    titleEl.textContent = title;
    msgEl.textContent = message || '';

    okButtonEl.textContent = okText;
    cancelButtonEl.textContent = cancelText;
    cancelButtonEl.style.display = isConfirm ? '' : 'none';

    lastActiveElement = document.activeElement;

    overlayEl.style.display = 'flex';
    overlayEl.classList.add('show');

    // Focus the OK button for accessibility
    setTimeout(function(){ (isConfirm ? cancelButtonEl : okButtonEl).focus(); }, 0);
  }

  function hideOverlay() {
    if (!overlayEl) return;
    overlayEl.classList.remove('show');
    overlayEl.style.display = 'none';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      try { lastActiveElement.focus(); } catch (_) {}
    }
  }

  function showThemedAlert(message, options) {
    return new Promise(function(resolve) {
      ensureOverlay();

      function onDone() {
        okButtonEl.removeEventListener('click', onDone);
        closeButtonEl.removeEventListener('click', onDone);
        hideOverlay();
        resolve();
      }

      okButtonEl.addEventListener('click', onDone);
      closeButtonEl.addEventListener('click', onDone);

      showOverlay(String(message || ''), options || {});
    });
  }

  function showThemedConfirm(message, options) {
    return new Promise(function(resolve) {
      ensureOverlay();

      function onAccept() {
        cleanup();
        hideOverlay();
        resolve(true);
      }
      function onCancel() {
        cleanup();
        hideOverlay();
        resolve(false);
      }
      function cleanup() {
        okButtonEl.removeEventListener('click', onAccept);
        cancelButtonEl.removeEventListener('click', onCancel);
        closeButtonEl.removeEventListener('click', onCancel);
      }

      okButtonEl.addEventListener('click', onAccept);
      cancelButtonEl.addEventListener('click', onCancel);
      closeButtonEl.addEventListener('click', onCancel);

      const opts = Object.assign({}, options || {}, { confirm: true });
      showOverlay(String(message || ''), opts);
    });
  }

  // Expose functions and override window.alert
  window.showThemedAlert = showThemedAlert;
  window.showThemedConfirm = showThemedConfirm;
  var nativeAlert = window.alert ? window.alert.bind(window) : null;
  window.alert = function (message) {
    // Infer type from message keywords for nicer accents
    var msg = String(message);
    var type = /error|failed|invalid|not found|try again/i.test(msg) ? 'error' : /success|saved|done|welcome|logged out/i.test(msg) ? 'success' : 'info';
    showThemedAlert(msg, { type: type });
  };
})();