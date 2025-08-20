// ===== Members Module =====

// Member data and functionality
export const membersArray = [
  // ... existing member data will be moved here
];

export const studentsList = {
  // ... existing students list will be moved here
};

export const fbProfileLinks = {
  // ... existing Facebook profile links will be moved here
};

// Member card creation
export function createMemberCard(member) {
  const card = document.createElement('div');
  card.className = 'member-card';
  card.setAttribute('data-id', member.id);
  
  const displayName = member.nickname || member.name || 'Unknown';
  
  card.innerHTML = `
    <div class="member-avatar">
      <span>${displayName.charAt(0).toUpperCase()}</span>
    </div>
    <div class="member-info">
      <h3>${displayName}</h3>
      <p>ID: ${member.id}</p>
    </div>
  `;
  
  card.addEventListener('click', () => showMemberModal(member));
  return card;
}

// Member modal display
export function showMemberModal(member) {
  const modal = document.getElementById('memberModalOverlay');
  const modalName = document.getElementById('modalName');
  const modalId = document.getElementById('modalId');
  const modalHome = document.getElementById('modalHome');
  const modalCollege = document.getElementById('modalCollege');
  const modalSchool = document.getElementById('modalSchool');
  const modalFacebook = document.getElementById('modalFacebook');
  const modalBlood = document.getElementById('modalBlood');
  const modalBio = document.getElementById('modalBio');
  
  modalName.textContent = member.name || 'Unknown';
  modalId.textContent = `ID: ${member.id}`;
  modalHome.textContent = member.home || 'Not specified';
  modalCollege.textContent = member.college || 'Not specified';
  modalSchool.textContent = member.school || 'Not specified';
  modalBlood.textContent = member.bloodGroup || 'Not specified';
  modalBio.textContent = member.bio || 'No bio available';
  
  // Handle Facebook profile link
  const fbLink = fbProfileLinks[member.id];
  if (fbLink) {
    modalFacebook.innerHTML = `<a href="${normalizeFacebookUrl(fbLink)}" target="_blank" rel="noopener noreferrer">Facebook Profile</a>`;
  } else {
    modalFacebook.textContent = 'No Facebook profile';
  }
  
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'member' }, "");
    activeModal = 'member';
  } else {
    activeModal = 'member';
  }
  preventMainPageScroll();
}

// Facebook URL normalization
export function normalizeFacebookUrl(rawUrl) {
  if (!rawUrl) return '';
  
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}

// Ensure all members from students list
export function ensureAllMembersFromStudents() {
  const allMembers = [];
  
  // Add all IDs from 2404001 to 2404132
  for (let i = 2404001; i <= 2404132; i++) {
    const id = i.toString();
    const existingMember = membersArray.find(member => member.id === id);
    const studentData = studentsList[id];
    
    if (existingMember) {
      // Use existing member data
      allMembers.push(existingMember);
    } else if (studentData) {
      // Use student data
      allMembers.push({
        name: studentData.name || null,
        id: id,
        home: studentData.home || null,
        college: studentData.college || null,
        school: studentData.school || null,
        bio: studentData.bio || null,
        nickname: studentData.nickname || null,
        bloodGroup: studentData.bloodGroup || null,
        fb_profile_link: fbProfileLinks[id] || null
      });
    } else {
      // Create placeholder member
      allMembers.push({
        name: null,
        id: id,
        home: null,
        college: null,
        school: null,
        bio: null,
        nickname: null,
        bloodGroup: null,
        fb_profile_link: null
      });
    }
  }
  
  return allMembers;
}

// Search functionality
export function displaySearchResults(searchTerm, searchType) {
  const memberCards = document.querySelectorAll('.member-card');
  
  memberCards.forEach(card => {
    const memberId = card.getAttribute('data-id');
    const member = membersArray.find(m => m.id === memberId);
    
    if (!member) {
      card.style.display = 'none';
      return;
    }
    
    let shouldShow = false;
    
    if (searchType === 'id') {
      shouldShow = member.id.includes(searchTerm);
    } else if (searchType === 'name') {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = member.name && member.name.toLowerCase().includes(searchLower);
      const nicknameMatch = member.nickname && member.nickname.toLowerCase().includes(searchLower);
      shouldShow = nameMatch || nicknameMatch;
    } else if (searchType === 'blood') {
      const searchLower = searchTerm.toLowerCase();
      shouldShow = member.bloodGroup && String(member.bloodGroup).toLowerCase().includes(searchLower);
    }
    
    card.style.display = shouldShow ? 'block' : 'none';
  });
}
