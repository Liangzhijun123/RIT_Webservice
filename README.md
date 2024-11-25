# React Table with Scrollable Body

This project showcases a React-based implementation of a table where the `<tbody>` is scrollable, and the `<thead>` remains fixed. The table is styled with modern CSS techniques to ensure responsiveness and usability.

---

## Features

- **Scrollable `<tbody>`:** Allows vertical scrolling while the header stays fixed.
- **Fixed `<thead>`:** Keeps column headers visible for better readability.
- **Semantic UI Integration:** Utilizes Semantic UI for clean and professional styling.
- **Responsive Design:** Works seamlessly on different screen sizes.
- **Ellipsis Truncation:** Long text is truncated with ellipses to prevent overflow.

---

## Tools and Libraries Used

- **React:** For building reusable UI components and rendering the table dynamically.
- **Semantic UI:** To provide a pre-styled and visually appealing design.
- **CSS:** For custom styling, including making the table body scrollable and the header sticky.

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
height: 300px; /* Fixed height for scrollable area */
overflow-y: auto;
}

thead {
position: sticky;
top: 0;
background: #f9f9f9; /* Optional styling for the header */
}

table {
table-layout: fixed; /* Ensures proper column alignment */
width: 100%; /* Makes the table responsive */
}
