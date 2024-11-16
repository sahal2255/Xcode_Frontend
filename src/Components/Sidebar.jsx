import React from 'react';
import Filter from './Filter';

export default function Sidebar() {
  return (
    <div className="bg-white shadow-md max-w-md flex flex-col justify-center rounded-lg">
      <div className="m-4 p-4 gap-4">
        <h1 className="font-bold text-lg mb-6">Product Categories</h1>
        <h3 className="font-medium text-base mb-4 text-gray-500">Extension</h3>
        <h3 className="font-medium text-base mb-4 text-gray-500">Mobile Phone Cases</h3>
        <h3 className="font-medium text-base mb-4 text-gray-500">Power Banks</h3>
        <h3 className="font-medium text-base mb-4 text-gray-500">HeadSets</h3>
        <h3 className="font-medium text-base mb-4 text-gray-500">Charger And Data Cable</h3>
      </div>
      <div className='bg-white mx-auto mb-9'>
        <Filter />
      </div>
    </div>
  );
}
