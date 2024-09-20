import React, { useState } from 'react';
import Notes from './components/Notes';
import GoogleReviews from './components/GoogleReviews';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Notes App with Google Reviews</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Notes />
        <GoogleReviews placeId="PLACE_ID_GOES_HERE" />
      </div>
    </div>
  );
}

export default App;
