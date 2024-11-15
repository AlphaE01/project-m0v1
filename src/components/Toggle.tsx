import React from 'react';

interface ToggleProps {
  isActive: boolean;
  onChange: () => void;
  label: string;
}

export const Toggle: React.FC<ToggleProps> = ({ isActive, onChange, label }) => {
  return (
    <div
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={isActive}
      tabIndex={0}
    >
      <div className="toggle-handle" />
      <span className="toggle-label">{label}</span>
    </div>
  );
};