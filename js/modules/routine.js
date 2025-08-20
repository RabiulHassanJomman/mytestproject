// ===== Routine Module =====

import { db } from '../firebase-config.js';

// Routine data
export let extraClassesArray = [];
export let currentActiveSubsection = 'A1';
export let currentActiveDay = 'all';

// Static routine data with different schedules for each day
export const staticRoutine = {
  sunday: {
    A1: {
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-142', room: 'Operating System Lab' },
      '11:50-12:40': { course: 'CSE-142', room: 'Operating System Lab' },
      '12:40-1:30': { course: 'CSE-142', room: 'Operating System Lab' }
    },
    A2: {
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '11:50-12:40': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '12:40-1:30': { course: 'Phy-142', room: 'PHYSICS LAB' }
    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' }
    },
    B2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '2:30-5:00': { course: 'Phy-142', room: 'PHYSICS LAB' }
    }
  },
  // ... rest of the routine data will be moved here
};

// Load extra classes from Firebase
export async function loadExtraClassesFromFirebase() {
  try {
    // Delete expired extra classes first
    await deleteExpiredItems();
    
    const snapshot = await db.collection('extraClasses').orderBy('createdAt', 'desc').get();
    extraClassesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error loading extra classes:', err);
    extraClassesArray = [];
  }
}

// Render routine table
export function renderRoutineTable(subsection = 'A1', day = 'all') {
  const tableContainer = document.getElementById('routine-table');
  if (!tableContainer) return;
  
  // Define time slots from 9:00 AM to 5:00 PM in chronological order
  const timeSlots = [
    '9:00-9:50', '9:50-10:40', '10:40-11:00', '11:00-11:50', '11:50-12:40',
    '12:40-1:30', '1:30-2:30', '2:30-5:00'
  ];
  
  const subsections = ['A1', 'A2', 'B1', 'B2'];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  
  let tableHTML = '<table><thead><tr><th>Time</th>';
  
  if (day === 'all') {
    // Show all days for specific subsection
    days.forEach(dayName => {
      tableHTML += `<th>${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${subsection}</th>`;
    });
  } else {
    // Show specific subsection for specific day
    tableHTML += `<th>${day.charAt(0).toUpperCase() + day.slice(1)} ${subsection}</th>`;
  }
  
  tableHTML += '</tr></thead><tbody>';
  
  timeSlots.forEach(timeSlot => {
    tableHTML += '<tr>';
    tableHTML += `<td class="time-slot">${timeSlot}</td>`;
    
    if (day === 'all') {
      // Show all days for specific subsection
      days.forEach(dayName => {
        const classData = staticRoutine[dayName]?.[subsection]?.[timeSlot];
        const cellContent = !classData ? 
          '<span style="color: rgba(255,255,255,0.3);">-</span>' : 
          classData.course === 'Break' || classData.course === 'Lunch' ? 
          `<span style="color: rgba(255,255,255,0.5);">${classData.course}</span>` : 
          `<div class="course-cell">
            <div style="font-weight: 600; color: #00d4ff;">${classData.course}</div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.8);">${classData.room}</div>
          </div>`;
        
        tableHTML += `<td>${cellContent}</td>`;
      });
    } else {
      // Show specific subsection for specific day
      const classData = staticRoutine[day]?.[subsection]?.[timeSlot];
      const cellContent = !classData ? 
        '<span style="color: rgba(255,255,255,0.3);">-</span>' : 
        classData.course === 'Break' || classData.course === 'Lunch' ? 
        `<span style="color: rgba(255,255,255,0.5);">${classData.course}</span>` : 
        `<div class="course-cell">
          <div style="font-weight: 600; color: #00d4ff;">${classData.course}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.8);">${classData.room}</div>
        </div>`;
      
      tableHTML += `<td>${cellContent}</td>`;
    }
    
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  tableContainer.innerHTML = tableHTML;
}

// Render extra classes
export function renderExtraClasses() {
  const extraContainer = document.getElementById('extra-classes');
  if (!extraContainer) return;
  
  if (!extraClassesArray.length) {
    extraContainer.innerHTML = '<h3>📚 Extra Classes</h3><div class="no-extra-classes">No extra classes scheduled yet.</div>';
    return;
  }
  
  const extraClassesHTML = extraClassesArray.map(extraClass => {
    const date = extraClass.date ? new Date(extraClass.date.seconds ? extraClass.date.seconds * 1000 : extraClass.date).toLocaleDateString() : '';
    const time = extraClass.time || '';
    const dayName = extraClass.day ? extraClass.day.charAt(0).toUpperCase() + extraClass.day.slice(1) : '';
    const subsection = extraClass.subsection ? ` | Sub: ${extraClass.subsection}` : '';
    
    return `
      <div class="extra-class-item">
        <div class="extra-class-info">
          <h4>${extraClass.title}</h4>
          <p>📅 ${date} | 📆 ${dayName} | ⏰ ${time} | 📍 ${extraClass.room || 'TBA'} | 👨‍🏫 ${extraClass.instructor || 'TBA'}</p>
        </div>
      </div>
    `;
  }).join('');
  
  extraContainer.innerHTML = `
    <h3>📚 Extra Classes</h3>
    <div class="extra-class-list">
      ${extraClassesHTML}
    </div>
  `;
}

// Switch routine filter
export function switchRoutineFilter(subsection) {
  // Update active filter
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector(`[data-subsection="${subsection}"]`).classList.add('active');
  
  currentActiveSubsection = subsection;
  renderRoutineTable(subsection, currentActiveDay);
}

// Switch day filter
export function switchDayFilter(day) {
  // Update active day filter
  document.querySelectorAll('.day-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector(`[data-day="${day}"]`).classList.add('active');
  
  currentActiveDay = day;
  renderRoutineTable(currentActiveSubsection, day);
}

// Open routine modal
export function openRoutineModal() {
  const modal = document.getElementById('routineModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'routine' }, "");
    activeModal = 'routine';
  } else {
    activeModal = 'routine';
  }
  preventMainPageScroll();
  
  // Set A1 as default active subsection
  currentActiveSubsection = 'A1';
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector('[data-subsection="A1"]').classList.add('active');
  
  // Load extra classes data
  loadExtraClassesFromFirebase().then(() => {
    renderRoutineTable(currentActiveSubsection, currentActiveDay);
    renderExtraClasses();
  });
  
  // Set up subsection filter switching
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchRoutineFilter(filter.dataset.subsection);
    });
  });
  
  // Set up day filter switching
  document.querySelectorAll('.day-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchDayFilter(filter.dataset.day);
    });
  });
}

// Close routine modal
export function actuallyCloseRoutineModal() {
  const modal = document.getElementById('routineModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'routine') activeModal = null;
  currentActiveSubsection = 'A1';
}

export function closeRoutineModal() {
  if (window.history && window.history.state && window.history.state.modal === 'routine') {
    window.history.back();
    return;
  }
  actuallyCloseRoutineModal();
}

// Auto-delete expired extra classes
async function deleteExpiredItems() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  try {
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
    
    if (expiredExtraClasses.length > 0) {
      console.log(`Auto-deleted ${expiredExtraClasses.length} expired extra classes`);
    }
  } catch (error) {
    console.error('Error deleting expired extra classes:', error);
  }
}
