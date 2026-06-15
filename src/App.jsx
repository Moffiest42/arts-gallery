import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import FilterPanel from './components/FilterPanel';
import Gallery from './components/Gallery';
import Pagination from './components/Pagination';
import './styles/main.scss';

const SPEC_URL = 'https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0';
const ITEMS_PER_PAGE = 6;


const imageFallbacks = {
  
};


const getImageUrl = (artwork) => {
  if (imageFallbacks[artwork.title]) {
    return imageFallbacks[artwork.title];
  }
  if (artwork.imageUrl) {
    return artwork.imageUrl;
  }
  return '';
};

const App = () => {
  const [allPaintings, setAllPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ artist: true, location: true, years: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({ artist: '', location: '', yearFrom: '', yearTo: '' });
  const [tempFilters, setTempFilters] = useState({ artist: '', location: '', yearFrom: '', yearTo: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        
        console.log('Загрузка спецификации API...');
        
        const response = await fetch(SPEC_URL, {
          headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const spec = await response.json();
        console.log('Спецификация получена');
        
        const exampleData = spec.paths['/paintings'].get.responses['200'].content['application/json'].example;
        console.log('Пример данных из спецификации:', exampleData);
        
        let paintingsArray = [];
        
        if (Array.isArray(exampleData)) {
          paintingsArray = exampleData;
        } else if (exampleData && typeof exampleData === 'object') {       
          if (exampleData.imageUrl || exampleData.title) {
            paintingsArray = [exampleData];
          } else {
            for (let key in exampleData) {
              if (Array.isArray(exampleData[key])) {
                paintingsArray = exampleData[key];
                break;
              }
            }
          }
        }
        
        if (!paintingsArray.length) {
          throw new Error('Не удалось извлечь данные о картинах из спецификации');
        }
        
        console.log('Получено картин:', paintingsArray.length);

      
        const processedPaintings = paintingsArray.map((item, index) => ({
          id: index + 1,
          title: item.title || 'Без названия',
          year: item.year || 0,
          artist: item.artist || 'Неизвестный художник',
          location: item.location || 'Неизвестное место',
          imageUrl: getImageUrl(item), 
          alt: item.title || 'Картина'
        }));
        
        console.log('Первая картина:', processedPaintings[0]);
        setAllPaintings(processedPaintings);
        
      } catch (err) {
        console.error('Ошибка:', err);
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.classList.add('filter-open');
    } else {
      document.body.classList.remove('filter-open');
    }
    return () => document.body.classList.remove('filter-open');
  }, [isFilterOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  const filteredPaintings = useMemo(() => {
    if (!allPaintings.length) return [];
    
    return allPaintings.filter(painting => {
      if (searchTerm && !painting.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (activeFilters.artist && painting.artist !== activeFilters.artist) {
        return false;
      }
      if (activeFilters.location && painting.location !== activeFilters.location) {
        return false;
      }
      if (activeFilters.yearFrom && painting.year < parseInt(activeFilters.yearFrom)) {
        return false;
      }
      if (activeFilters.yearTo && painting.year > parseInt(activeFilters.yearTo)) {
        return false;
      }
      return true;
    });
  }, [allPaintings, searchTerm, activeFilters]);

  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE);
  const paginatedPaintings = filteredPaintings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const uniqueArtists = useMemo(() => {
    const artists = allPaintings.map(p => p.artist);
    return [...new Set(artists)].map(name => ({ id: name, name }));
  }, [allPaintings]);

  const uniqueLocations = useMemo(() => {
    const locations = allPaintings.map(p => p.location);
    return [...new Set(locations)].map(name => ({ id: name, name }));
  }, [allPaintings]);

  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilters({ artist: '', location: '', yearFrom: '', yearTo: '' });
    setActiveFilters({ artist: '', location: '', yearFrom: '', yearTo: '' });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid var(--color-accent)',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Загрузка картин из API...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (fetchError && !allPaintings.length) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
          <h2>Ошибка загрузки данных</h2>
          <p>{fetchError}</p>
          <p style={{ fontSize: '12px', marginTop: '10px', color: 'var(--color-text-muted)' }}>
            Проверьте консоль для деталей
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'var(--color-accent)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            Повторить
          </button>
        </div>
      </div>
    );
  }



return (
  <>
    <Header theme={theme} setTheme={setTheme} />
    <main className="main">
      <div className="container">
        <Controls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterOpen={() => setIsFilterOpen(true)}
        />
        
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          tempFilters={tempFilters}
          onTempFilterChange={setTempFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          openGroups={openGroups}
          onToggleGroup={(group) => setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))}
          artists={uniqueArtists}
          locations={uniqueLocations}
        />
        
        <div className="gallery-wrapper">
          <Gallery paintings={paginatedPaintings} />
        </div>
        
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </main>
  </>
);
};

export default App;