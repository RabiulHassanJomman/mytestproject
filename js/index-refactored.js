// ===== Main Application Entry Point =====

import { db } from './firebase-config.js';
import { 
  membersArray, 
  studentsList, 
  fbProfileLinks, 
  createMemberCard, 
  showMemberModal, 
  ensureAllMembersFromStudents, 
  displaySearchResults 
} from './modules/members.js';
import { 
  loadEventsFromFirebase, 
  openEventsModal, 
  closeEventsModal, 
  actuallyCloseEventsModal 
} from './modules/events.js';
import { 
  loadExtraClassesFromFirebase, 
  openRoutineModal, 
  closeRoutineModal, 
  actuallyCloseRoutineModal 
} from './modules/routine.js';
import { 
  loadNoticesFromFirebase, 
  openNoticeModal, 
  closeNoticeModal, 
  actuallyCloseNoticeModal 
} from './modules/notices.js';
import { 
  loadCoursesFromFirebase, 
  openRoutinesModal, 
  closeRoutinesModal, 
  actuallyCloseRoutinesModal 
} from './modules/course-resources.js';
import { 
  activeModal, 
  preventMainPageScroll, 
  restoreMainPageScroll, 
  initializeUtils 
} from './modules/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 CUET CSE 24 - Application Starting...');
  
  // Initialize utilities
  initializeUtils();
  
  // Initialize member data
  initializeMembers();
  
  // Set up button event listeners
  setupButtonListeners();
  
  console.log('✅ Application initialized successfully!');
});

// Initialize member data and display
function initializeMembers() {
  // Ensure all members from students list are included
  const allMembers = ensureAllMembersFromStudents();
  
  // Create and display member cards
  const membersContainer = document.getElementById('members-container');
  if (membersContainer) {
    allMembers.forEach(member => {
      const card = createMemberCard(member);
      membersContainer.appendChild(card);
    });
  }
  
  console.log(`📋 Loaded ${allMembers.length} member cards`);
}

// Set up button event listeners
function setupButtonListeners() {
  // Events button
  document.getElementById('events-button')?.addEventListener('click', openEventsModal);
  
  // Course Resources button
  document.getElementById('routines-button')?.addEventListener('click', openRoutinesModal);
  
  // Notices button
  document.getElementById('notice-button')?.addEventListener('click', openNoticeModal);
  
  // Class Routine button
  document.getElementById('routine-button')?.addEventListener('click', openRoutineModal);
  
  console.log('🔘 Button event listeners configured');
}

// Export functions for use in other modules
export {
  showMemberModal,
  closeEventsModal,
  actuallyCloseEventsModal,
  closeRoutinesModal,
  actuallyCloseRoutinesModal,
  closeNoticeModal,
  actuallyCloseNoticeModal,
  closeRoutineModal,
  actuallyCloseRoutineModal,
  displaySearchResults
};
