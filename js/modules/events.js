// ===== Events Module =====

import { db } from '../firebase-config.js';

// Events data
export let eventsArray = [];

// Load events from Firebase
export async function loadEventsFromFirebase() {
  try {
    // Delete expired events first
    await deleteExpiredItems();
    
    const snapshot = await db.collection('events').orderBy('date', 'asc').get();
    eventsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error loading events:', err);
    eventsArray = [];
  }
}

// Render events list
export function renderEventsList() {
  const eventsContainer = document.getElementById('events-list');
  if (!eventsContainer) return;
  
  if (!eventsArray.length) {
    eventsContainer.innerHTML = '<div class="no-events">No events scheduled yet.</div>';
    return;
  }
  
  const eventsHTML = eventsArray.map(event => {
    const date = event.date ? new Date(event.date.seconds ? event.date.seconds * 1000 : event.date).toLocaleDateString() : '';
    const urgentClass = event.urgent ? 'urgent' : '';
    
    return `
      <div class="event-item ${urgentClass}">
        <div class="event-header">
          <h3>${event.title}</h3>
          <span class="event-date">📅 ${date}</span>
        </div>
        <div class="event-details">
          <p><strong>Time:</strong> ${event.time || 'TBA'}</p>
          <p><strong>Description:</strong> ${event.description || 'No description available'}</p>
          ${event.details ? `<p><strong>Details:</strong> ${event.details}</p>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  eventsContainer.innerHTML = eventsHTML;
}

// Open events modal
export function openEventsModal() {
  const modal = document.getElementById('eventsModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'events' }, "");
    activeModal = 'events';
  } else {
    activeModal = 'events';
  }
  preventMainPageScroll();
  
  // Load events data
  loadEventsFromFirebase().then(() => {
    renderEventsList();
  });
}

// Close events modal
export function actuallyCloseEventsModal() {
  const modal = document.getElementById('eventsModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'events') activeModal = null;
}

export function closeEventsModal() {
  if (window.history && window.history.state && window.history.state.modal === 'events') {
    window.history.back();
    return;
  }
  actuallyCloseEventsModal();
}

// Auto-delete expired events
async function deleteExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  try {
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
    
    if (expiredEvents.length > 0) {
      console.log(`Auto-deleted ${expiredEvents.length} expired events`);
    }
  } catch (error) {
    console.error('Error deleting expired events:', error);
  }
}
