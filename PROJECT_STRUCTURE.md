# 📁 Project Structure Documentation

## 🏗️ **Architecture Overview**

The CUET CSE 24 project follows a modular architecture pattern, separating concerns into distinct modules for better maintainability, scalability, and code organization.

## 📂 **Directory Structure**

```
CUET-CSE-24-main/
├── 📄 index.html                    # Main application interface
├── 📄 README.md                     # Comprehensive project documentation
├── 📄 PROJECT_STRUCTURE.md          # This file - detailed structure guide
├── 📄 FIREBASE_SETUP.md             # Firebase configuration guide
├── 📄 LICENSE                       # Project license information
│
├── 📁 js/                           # JavaScript modules and logic
│   ├── 📁 modules/                  # Modular JavaScript components
│   │   ├── members.js               # Member management system
│   │   ├── events.js                # Events and scheduling system
│   │   ├── routine.js               # Class routine management
│   │   ├── notices.js               # Notice board system
│   │   ├── course-resources.js      # Course resources management
│   │   └── utils.js                 # Utility functions and helpers
│   │
│   ├── firebase-config.js           # Firebase SDK configuration
│   ├── index.js                     # Legacy main application (to be deprecated)
│   ├── index-refactored.js          # New modular main application
│   └── admin.js                     # Admin panel functionality
│
├── 📁 css/                          # Stylesheets and design system
│   ├── 📁 modules/                  # Modular CSS components
│   │   └── background.css           # Dynamic background animations
│   ├── style.css                    # Main application styles
│   └── admin.css                    # Admin panel specific styles
│
├── 📁 admin/                        # Admin panel and utilities
│   ├── admin.html                   # Admin interface
│   ├── test-firebase.html           # Firebase connection testing
│   └── debug-delete.html            # Debug and testing utilities
│
└── 📁 assets/                       # Static assets and resources
    ├── 📁 images/                   # Image files
    ├── 📁 icons/                    # Icon files
    └── 📁 documents/                # Documentation files
```

## 🔧 **Module Breakdown**

### **📁 js/modules/**

#### **members.js** - Member Management System
```javascript
// Core functionality
- membersArray: Complete student data
- studentsList: Student information mapping
- fbProfileLinks: Facebook profile URLs
- createMemberCard(): Generate member cards
- showMemberModal(): Display detailed member info
- ensureAllMembersFromStudents(): Data completeness
- displaySearchResults(): Search functionality
```

#### **events.js** - Events and Scheduling
```javascript
// Core functionality
- eventsArray: Event data storage
- loadEventsFromFirebase(): Data fetching
- renderEventsList(): UI rendering
- openEventsModal() / closeEventsModal(): Modal management
- deleteExpiredItems(): Auto-cleanup
```

#### **routine.js** - Class Routine Management
```javascript
// Core functionality
- staticRoutine: Pre-defined class schedules
- extraClassesArray: Additional classes data
- renderRoutineTable(): Schedule display
- renderExtraClasses(): Extra classes display
- switchRoutineFilter() / switchDayFilter(): Filtering
- openRoutineModal() / closeRoutineModal(): Modal management
```

#### **notices.js** - Notice Board System
```javascript
// Core functionality
- noticesArray: Notice data storage
- loadNoticesFromFirebase(): Data fetching
- renderNoticesList(): UI rendering
- getFileIcon(): File type detection
- switchNoticeFilter(): Category filtering
- openNoticeModal() / closeNoticeModal(): Modal management
```

#### **course-resources.js** - Course Resources
```javascript
// Core functionality
- coursesArray: Course data storage
- loadCoursesFromFirebase(): Data fetching
- loadResourcesForCourse(): Resource loading
- renderCoursesList(): Course display
- renderResourcePanel(): Resource display
- switchResourceTab() / switchSectionFilter(): Filtering
- openRoutinesModal() / closeRoutinesModal(): Modal management
```

#### **utils.js** - Utility Functions
```javascript
// Core functionality
- activeModal: Global modal state
- preventMainPageScroll() / restoreMainPageScroll(): Scroll management
- deleteExpiredItems(): Auto-cleanup utility
- setupHistoryAPI(): Browser history management
- setupEscapeKeyHandler(): Keyboard shortcuts
- setupSearchFunctionality(): Search setup
- setupModalCloseHandlers(): Modal event handlers
- initializeUtils(): Utility initialization
```

### **📁 css/modules/**

#### **background.css** - Dynamic Background
```css
/* Features */
- .geometric-background: Main container
- .geometric-shape: Animated shapes (8 variations)
- @keyframes float: Floating animation
- Responsive scaling for mobile devices
```

## 🔄 **Data Flow Architecture**

### **Frontend Data Flow**
```
User Action → Event Handler → Module Function → Firebase → UI Update
```

### **Module Communication**
```
Main App (index-refactored.js)
    ↓
Module Imports (members, events, routine, notices, course-resources)
    ↓
Utility Functions (utils.js)
    ↓
Firebase Integration (firebase-config.js)
```

## 📊 **Database Collections**

### **Firestore Collections**
```
/events
  - title: string
  - date: timestamp
  - time: string
  - description: string
  - details: string
  - urgent: boolean

/courses
  - title: string
  - description: string
  - createdAt: timestamp

/resources
  - courseId: string
  - type: string (notes|slides|student-notes)
  - section: string (A|B)
  - title: string
  - description: string
  - url: string
  - createdAt: timestamp

/notices
  - title: string
  - content: string
  - category: string
  - attachments: array
  - createdAt: timestamp

/extraClasses
  - title: string
  - subject: string
  - subsection: string
  - date: timestamp
  - day: string
  - time: string
  - room: string
  - instructor: string
  - description: string
  - createdAt: timestamp
```

## 🎯 **Component Architecture**

### **Modal System**
```
Modal Container
├── Overlay (backdrop)
├── Modal Card
│   ├── Header (title + close button)
│   ├── Content (dynamic content)
│   └── Footer (optional actions)
└── Event Handlers (close, escape, backdrop)
```

### **Card System**
```
Member Card
├── Avatar (initials)
├── Info Section
│   ├── Name (nickname)
│   └── ID
└── Click Handler (modal trigger)
```

### **Filter System**
```
Filter Container
├── Filter Buttons (active states)
├── Filter Logic (data filtering)
└── UI Updates (filtered display)
```

## 🔒 **Security Architecture**

### **Authentication Layers**
```
Client-Side
├── Admin Credentials (hardcoded)
├── Session Management (localStorage)
└── Access Control (role-based)

Firebase Security
├── Firestore Rules
├── Storage Rules
└── Authentication (future enhancement)
```

### **Data Validation**
```
Input Validation
├── Client-Side (JavaScript)
├── Server-Side (Firebase Rules)
└── Sanitization (XSS prevention)
```

## 🚀 **Performance Architecture**

### **Loading Strategy**
```
Critical Path
├── HTML (immediate)
├── CSS (blocking)
├── JavaScript (deferred)
└── Firebase (async)

Non-Critical
├── Images (lazy loading)
├── Icons (preload)
└── Fonts (optimized)
```

### **Caching Strategy**
```
Browser Cache
├── Static Assets (long-term)
├── CSS/JS (medium-term)
└── HTML (short-term)

Firebase Cache
├── Offline Support
├── Data Persistence
└── Real-time Sync
```

## 🧪 **Testing Architecture**

### **Test Structure**
```
Manual Testing
├── Cross-browser compatibility
├── Mobile responsiveness
├── Feature functionality
└── Admin operations

Automated Testing (Future)
├── Unit tests (modules)
├── Integration tests (Firebase)
├── E2E tests (user flows)
└── Performance tests
```

## 📈 **Deployment Architecture**

### **Build Process**
```
Development
├── Local server
├── Hot reloading
└── Debug tools

Production
├── Asset optimization
├── Minification
├── Compression
└── CDN deployment
```

### **Hosting Options**
```
Static Hosting
├── GitHub Pages
├── Netlify
├── Vercel
└── Firebase Hosting

Backend Services
├── Firebase Firestore
├── Firebase Storage
└── Firebase Functions (future)
```

## 🔄 **Migration Guide**

### **From Legacy to Modular**
```
Step 1: Update index.html
├── Change script src to index-refactored.js
├── Add module type="module"
└── Update CSS imports

Step 2: Data Migration
├── Move member data to members.js
├── Move event logic to events.js
├── Move routine data to routine.js
└── Update imports/exports

Step 3: Testing
├── Test all functionality
├── Verify data integrity
├── Check performance
└── Update documentation
```

## 📝 **Development Guidelines**

### **Code Standards**
```
JavaScript
├── ES6+ syntax
├── Modular imports/exports
├── Async/await patterns
└── Error handling

CSS
├── BEM methodology
├── Mobile-first approach
├── CSS custom properties
└── Performance optimization

HTML
├── Semantic markup
├── Accessibility attributes
├── SEO optimization
└── Progressive enhancement
```

### **File Naming Conventions**
```
JavaScript: kebab-case.js
CSS: kebab-case.css
HTML: kebab-case.html
Modules: descriptive-name.js
Assets: descriptive-name.ext
```

---

**This structure ensures maintainability, scalability, and ease of development for the CUET CSE 24 project.**
