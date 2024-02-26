import React from 'react';


const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
    <header className="app-header">
        <h1>FoodieHub</h1>
      </header>
      <div className="app-content">{children}</div>
      <footer className="app-footer">
        <p>&copy; 2024 FoodieHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
