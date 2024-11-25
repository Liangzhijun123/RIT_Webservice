# React Table with Scrollable Body

This project demonstrates a React-based implementation of a scrollable table. The focus is on maintaining usability, responsiveness, and clean UI design by leveraging both modern CSS techniques and external libraries.

---

## Features

- **Scrollable `<tbody>`:** Enables vertical scrolling for the table body while keeping the headers fixed.
- **Fixed `<thead>`:** Column headers remain visible to ensure data readability during scrolling.
- **Integrated UI Framework:** Utilizes Semantic UI for pre-styled and professional-looking components.
- **Responsive Design:** Adapts seamlessly to various screen sizes.
- **Ellipsis Text Truncation:** Long descriptions are truncated with ellipses for better layout management.

---

## Tools and Libraries Used

### **Libraries**
1. **React**:  
   - Purpose: Framework for building reusable and dynamic UI components.  
   - Source: [React Official Documentation](https://reactjs.org/)  
   
2. **Semantic UI**:  
   - Purpose: Provides pre-designed UI components such as tables, buttons, and icons for professional styling.  
   - Source: [Semantic UI](https://semantic-ui.com/)  
   
3. **Custom CSS**:  
   - Purpose: Adds scrollability and ensures table alignment with sticky headers.  

---

## Listing of UI Components

### **Components Used**
1. **Semantic UI Table**:
   - Imported: `import "semantic-ui-css/semantic.min.css";`
   - Features used: Fixed table layout and CSS customization for scrollable body.  

2. **Icons**:
   - Included Semantic UI icons for aesthetic enhancements, like the loading spinner.

3. **CSS Customizations**:
   - Implemented sticky headers for the `<thead>` and scrollable `<tbody>`.
   - Ensured responsive behavior and proper alignment of columns.

---

## Above and Beyond Features

1. **Fixed Header with Scrollable Body**:
   - Achieved using advanced CSS techniques (`display: block`, `position: sticky`, `overflow-y: auto`) to maintain usability in data-heavy applications.

2. **Responsive Table Design**:
   - Used `table-layout: fixed` and `%`-based widths to ensure responsiveness across devices.

3. **Ellipsis Truncation**:
   - Added CSS rules to truncate long text in specific columns using:
     ```css
     .scrollable-description {
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
     }
     ```

4. **Semantic Integration**:
   - Leveraged Semantic UI for professional styling with minimal effort, saving development time and improving user experience.

---

## Installation

### Prerequisites:
- Node.js (v14 or higher recommended)
- npm or yarn

### Steps:
1. Clone the repository:

2. Navigate to the project directory:
3. Install dependencies:
4. Run the project:

---

## Highlights of the Code

### Scrollable `<tbody>` Implementation

Custom CSS ensures the `<tbody>` is scrollable while maintaining proper alignment with the header:

```css
tbody {
display: block;
height: 300px; 
overflow-y: auto;
}

thead {
position: sticky;
top: 0;
background: #f9f9f9; 
}

table {
table-layout: fixed;
width: 100%;
}
