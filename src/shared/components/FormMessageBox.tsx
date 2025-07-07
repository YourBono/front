import React from 'react';

export const FormMessageBox: React.FC<{
  type: 'success' | 'error';
  message: string;
}> = ({ type, message }) => {
  return (
    <div
      className={`mb-4 p-4 rounded-md ${
        type === 'success'
          ? 'bg-green-100 text-green-700 border border-green-400'
          : 'bg-red-100 text-red-700 border border-red-400'
      }`}
    >
      {message}
    </div>
  );
};
