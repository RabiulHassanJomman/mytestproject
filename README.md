# 🎓 CUET CSE 24 - Class Management System

A comprehensive web-based class management system for CUET CSE 24 students, featuring member profiles, events, course resources, notices, and class routines.

## 🌟 Features

### 👥 **Member Management**
- **Complete Student Directory**: All students from ID 2404001 to 2404132
- **Search Functionality**: Search by ID, name/nickname, home, school, college, or bio
- **Detailed Profiles**: Full information with Facebook profile links
- **Responsive Cards**: Clean, modern member card design

### 📅 **Events System**
- **Event Management**: Create, edit, and delete events
- **Auto-Expiration**: Events automatically deleted after their date
- **Urgent Events**: Special highlighting for important events
- **Date & Time Tracking**: Comprehensive event scheduling

### 📚 **Course Resources**
- **Course-Based Organization**: Resources organized by course (e.g., EE-181)
- **Multiple Resource Types**:
  - 📝 **Notes**: Course notes and study materials
  - 📽️ **Lecture Slides**: Presentation materials
  - 📖 **Student Notes**: Peer-shared resources
- **Section Filtering**: Separate resources for Section A and Section B
- **Google Drive Integration**: Direct links to shared resources

### 📢 **Notice Board**
- **Category-Based Notices**: Academic, Administrative, General categories
- **File Attachments**: Support for PDFs, documents, images, etc.
- **Server Storage**: Firebase-based notice management
- **Admin Management**: Full CRUD operations for notices

### 📋 **Class Routine**
- **Static Schedules**: Pre-defined routines for each day
- **Subsection Support**: A1, A2, B1, B2 subsection schedules
- **Day-Based Filtering**: Different routines for Sunday-Thursday
- **Extra Classes**: Admin-manageable additional classes
- **Auto-Cleanup**: Expired extra classes automatically removed

### 🔧 **Admin Panel**
- **Secure Access**: Password-protected admin interface
- **Full CRUD Operations**: Manage all system data
- **File Management**: Upload and manage attachments
- **Real-time Updates**: Instant data synchronization
- **Styled Alerts**: Themed confirm/alert overlays for safer destructive actions

## 🆕 What's New

- **Google Sign-In & Profiles**: CUET-only authentication with private `profiles/{uid}` and public mirror `publicProfiles/{studentId}`.
- **Expanded Search**: Query members by ID, name, nickname, home, school, college, or bio.
- **Themed Alerts**: Accessible overlay alerts and confirm dialogs with focus trap and keyboard support.
- **Modular Entry Point**: Optional `js/index-refactored.js` for a cleaner, maintainable architecture.
- **Safer Admin Actions**: Styled confirmations for destructive operations.

## 🏗️ **Project Structure**

```
CUET-CSE-24-main/
├── 📁 js/
│   ├── 📁 modules/           # Modular JavaScript components
│   │   ├── members.js        # Member management
│   │   ├── events.js         # Events system
│   │   ├── routine.js        # Class routine management
│   │   ├── notices.js        # Notice board system
│   │   ├── course-resources.js # Course resources
│   │   └── utils.js          # Utility functions
│   ├── firebase-config.js    # Firebase configuration (lazy-loaded SDK; set window.__firebaseConfig)
│   ├── index.js             # Main application (legacy)
│   ├── index-refactored.js  # Refactored main application
│   ├── overlay-alert.js     # Themed alert/confirm overlay
│   └── admin.js             # Admin panel logic
├── 📁 css/
│   ├── 📁 modules/          # Modular CSS components
│   │   └── background.css   # Dynamic background styles
│   ├── style.css            # Main styles
│   ├── admin.css            # Admin panel styles
│   └── alerts.css           # Themed overlay alerts
├── 📁 admin/
│   ├── admin.html           # Admin panel interface
│   ├── test-firebase.html   # Firebase testing
│   └── debug-delete.html    # Debug utilities
├── 📁 assets/               # Static assets
├── index.html               # Main application interface
├── README.md               # This documentation
└── FIREBASE_SETUP.md       # Firebase setup guide
```

## 🚀 **Quick Start**

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project setup (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
- Optional: Enable the modular build by using `js/index-refactored.js` as the entry point

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CUET-CSE-24-main.git
   cd CUET-CSE-24-main
   ```

2. **Configure Firebase**
   - Follow the [Firebase Setup Guide](FIREBASE_SETUP.md)
   - Update `js/firebase-config.js` with your Firebase credentials

3. **Serve the application**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the application**
   - Main app: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin/admin.html`

## 📱 **Usage Guide**

### For Students
1. **Browse Members**: View all class members with search functionality
2. **Check Events**: Stay updated with class events and deadlines
3. **Access Resources**: Find course materials organized by subject
4. **Read Notices**: View important announcements and updates
5. **View Routine**: Check daily class schedules and extra classes
6. **Login**: Click "Student Login" → sign in with Google using `u<studentId>@student.cuet.ac.bd` → update profile → next time use quick profile access

### For Admins
1. **Login**: Access admin panel with secure credentials
2. **Manage Events**: Create, edit, and delete class events
3. **Upload Resources**: Add course materials and organize by section
4. **Post Notices**: Share announcements with file attachments
5. **Schedule Extra Classes**: Add additional classes to the routine

## 🔧 **Technical Architecture**

### **Frontend Technologies**
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript ES6+**: Modular architecture with modern features
- **Firebase SDK**: Real-time database and authentication

### **Key Features**
- **Modular Design**: Separated concerns for maintainability
- **Responsive Layout**: Mobile-first design approach
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: WCAG compliant design patterns

### **Data Management**
- **Firebase Firestore**: NoSQL database for real-time data
- **Auto-Expiration**: Automatic cleanup of outdated content
- **File Storage**: Firebase Storage for attachments
- **Security Rules**: Role-based access control

## 🎨 **Design System**

### **Color Palette**
- **Primary**: `#00d4ff` (Cyan)
- **Secondary**: `#ff6b6b` (Coral)
- **Background**: `#0a0a0a` to `#16213e` (Dark gradient)
- **Text**: `#ffffff` (White)
- **Accent**: `#6c5ce7` (Purple)

### **Typography**
- **Primary Font**: 'Source Code Pro', monospace
- **Fallback**: system-ui, -apple-system, sans-serif
- **Code Font**: 'Fira Code', monospace

### **Components**
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Backdrop blur with smooth animations
- **Forms**: Clean inputs with validation states
- **Alerts**: Themed overlay alerts (`css/alerts.css`) with focus trap and keyboard support

## 🔒 **Security Features**

### **Authentication**
- Admin-only access to management features
- Secure credential storage
- Session management
- Student login via Google Sign-In (CUET emails only)

### **Data Protection**
- Input validation and sanitization
- XSS prevention
- CSRF protection
- Secure file uploads

### **Privacy**
- Student data protection
- GDPR compliance considerations
- Secure data transmission

## 🚀 **Performance Optimizations**

### **Loading Speed**
- Modular JavaScript loading
- CSS optimization
- Image compression
- Lazy loading for large datasets

### **Caching**
- Browser caching strategies
- Firebase offline support
- Progressive Web App features

### **Responsiveness**
- Mobile-first design
- Touch-friendly interfaces
- Adaptive layouts

## 🧪 **Testing**

### **Manual Testing**
- Cross-browser compatibility
- Mobile responsiveness
- Feature functionality
- Admin operations

### **Automated Testing**
- Unit tests for modules
- Integration tests
- End-to-end testing
- Performance monitoring

## 📈 **Future Enhancements**

### **Planned Features**
- [ ] Real-time notifications
- [ ] Calendar integration
- [ ] Attendance tracking
- [ ] Grade management
- [ ] Discussion forums
- [ ] Mobile app development

### **Technical Improvements**
- [ ] Service Worker implementation
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] A/B testing framework

## 🤝 **Contributing**

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Code Standards**
- Follow ESLint configuration
- Use meaningful commit messages
- Document new features
- Maintain test coverage

### **Issue Reporting**
- Use GitHub Issues
- Provide detailed descriptions
- Include reproduction steps
- Attach relevant files

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Team**

- **Lead Developer**: [Your Name]
- **UI/UX Design**: [Designer Name]
- **Testing**: [Tester Name]
- **Documentation**: [Documentation Writer]

## 📞 **Support**

### **Getting Help**
- Check the [FAQ](FAQ.md)
- Search existing issues
- Create a new issue
- Contact the development team

### **Contact Information**
- **Email**: support@cuet-cse24.com
- **GitHub**: [Project Repository](https://github.com/your-username/CUET-CSE-24-main)
- **Documentation**: [Wiki](https://github.com/your-username/CUET-CSE-24-main/wiki)

---

**Made with ❤️ for CUET CSE 24 Students**

*Last updated: 18th August 2024*

## Student Profiles & Authentication

- Click `👨‍🎓 Student Login` to sign in with CUET student email (`u<ID>@student.cuet.ac.bd`).
- After sign-in, the button changes to `👤 Your Profile` for quick access.
- Manage your profile in a dedicated modal with validation and character counter.
- Editable fields:
  - Name (required)
  - Student ID (required, 7 digits; must match your CUET email)
  - Nickname (optional)
  - Home, School, College (optional)
  - Blood Group (optional)
  - Bio (optional, max 300 chars)
  - Facebook Profile Link (optional)
- Data model:
  - Private: `profiles/{uid}` (full profile)
  - Public mirror: `publicProfiles/{studentId}` (read-only to others)
  - Facebook links: `fbLinksById/{studentId}` (public read; student-restricted write)
- Only the authenticated student can edit their own profile.

### Deploying Firestore Rules

1. Save rules at `firestore.rules`.
2. In Firebase Console → Firestore Database → Rules, paste the rules from `firestore.rules` and publish.
