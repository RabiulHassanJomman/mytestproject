// ===== Utils Module =====

// Global state management
export let activeModal = null;

// Prevent main page scroll when modal is open
export function preventMainPageScroll() {
  document.body.style.overflow = 'hidden';
}

// Restore main page scroll when modal is closed
export function restoreMainPageScroll() {
  document.body.style.overflow = '';
}

// Auto-delete expired items (events and extra classes)
export async function deleteExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  try {
    // Delete expired events
    const eventsSnapshot = await db.collection('events').get();
    const expiredEvents = eventsSnapshot.docs.filter(doc => {
      const eventData = doc.data();
      if (!eventData.date) return false;
      
      const eventDate = new Date(eventData.date.seconds ? eventData.date.seconds * 1000 : eventData.date);
      eventDate.setHours(0, 0, 0, 0);
      
      return eventDate < today;
    });
    
    for (const doc of expiredEvents) {
      await doc.ref.delete();
      console.log(`Deleted expired event: ${doc.data().title}`);
    }
    
    // Delete expired extra classes
    const extraClassesSnapshot = await db.collection('extraClasses').get();
    const expiredExtraClasses = extraClassesSnapshot.docs.filter(doc => {
      const extraClassData = doc.data();
      if (!extraClassData.date) return false;
      
      const extraClassDate = new Date(extraClassData.date.seconds ? extraClassData.date.seconds * 1000 : extraClassData.date);
      extraClassDate.setHours(0, 0, 0, 0);
      
      return extraClassDate < today;
    });
    
    for (const doc of expiredExtraClasses) {
      await doc.ref.delete();
      console.log(`Deleted expired extra class: ${doc.data().title}`);
    }
    
    if (expiredEvents.length > 0 || expiredExtraClasses.length > 0) {
      console.log(`Auto-deleted ${expiredEvents.length} expired events and ${expiredExtraClasses.length} expired extra classes`);
    }
  } catch (error) {
    console.error('Error deleting expired items:', error);
  }
}

// History API management for modals
export function setupHistoryAPI() {
  window.addEventListener('popstate', () => {
    if (activeModal === 'member') {
      actuallyCloseMemberModal();
      return;
    }
    if (activeModal === 'events') {
      actuallyCloseEventsModal();
      return;
    }
    if (activeModal === 'routines') {
      actuallyCloseRoutinesModal();
      return;
    }
    if (activeModal === 'notice') {
      actuallyCloseNoticeModal();
      return;
    }
    if (activeModal === 'routine') {
      actuallyCloseRoutineModal();
      return;
    }
  });
}

// Escape key handler for modals
export function setupEscapeKeyHandler() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (activeModal === 'member' && window.history && window.history.state?.modal === 'member') {
        window.history.back();
      }
      if (activeModal === 'events' && window.history && window.history.state?.modal === 'events') {
        window.history.back();
      }
      if (activeModal === 'routines' && window.history && window.history.state?.modal === 'routines') {
        window.history.back();
      }
      if (activeModal === 'notice' && window.history && window.history.state?.modal === 'notice') {
        window.history.back();
      }
      if (activeModal === 'routine' && window.history && window.history.state?.modal === 'routine') {
        window.history.back();
      }
    }
  });
}

// Search functionality
export function setupSearchFunctionality() {
  const searchInput = document.getElementById('searchInput');
  const searchType = document.getElementById('searchType');
  
  if (searchInput && searchType) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
      const type = searchType.value;
      
      if (searchTerm === '') {
        // Show all members when search is empty
        document.querySelectorAll('.member-card').forEach(card => {
          card.style.display = 'block';
        });
      } else {
        displaySearchResults(searchTerm, type);
      }
    });
    
    searchType.addEventListener('change', () => {
      const searchTerm = searchInput.value.trim();
      const type = searchType.value;
      
      if (searchTerm !== '') {
        displaySearchResults(searchTerm, type);
      }
    });
  }
}

// Modal close handlers
export function setupModalCloseHandlers() {
  // Member modal
  document.getElementById('memberModalClose')?.addEventListener('click', closeMemberModal);
  document.getElementById('memberModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeMemberModal();
  });
  
  // Events modal
  document.getElementById('eventsModalClose')?.addEventListener('click', closeEventsModal);
  document.getElementById('eventsModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeEventsModal();
  });
  
  // Routines modal
  document.getElementById('routinesModalClose')?.addEventListener('click', closeRoutinesModal);
  document.getElementById('routinesModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRoutinesModal();
  });
  
  // Notice modal
  document.getElementById('noticeModalClose')?.addEventListener('click', closeNoticeModal);
  document.getElementById('noticeModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeNoticeModal();
  });
  
  // Routine modal
  document.getElementById('routineModalClose')?.addEventListener('click', closeRoutineModal);
  document.getElementById('routineModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRoutineModal();
  });
}

// Initialize all utilities
export function initializeUtils() {
  setupHistoryAPI();
  setupEscapeKeyHandler();
  setupSearchFunctionality();
  setupModalCloseHandlers();
}
