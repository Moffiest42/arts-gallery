import React from 'react';
import Card from './Card';

const Gallery = ({ paintings }) => {
  if (paintings.length === 0) {
    return (
      <div className="gallery">
        <p style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
          Нет картин, соответствующих критериям поиска
        </p>
      </div>
    );
  }

  return (
    <div className={`gallery ${paintings.length === 2 ? 'gallery--two-items' : ''}`}>
      {paintings.map(painting => (
        <Card key={painting.id} painting={painting} />
      ))}
    </div>
  );
};

export default Gallery;