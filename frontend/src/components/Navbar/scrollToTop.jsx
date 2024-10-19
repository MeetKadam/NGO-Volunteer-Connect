import { useEffect } from 'react';
import '../Navbar/scrollToTop.css'
import { TiArrowUp } from 'react-icons/ti'
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className='scroll'>
      <button id='scrollToTop'
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        < TiArrowUp />
      </button>
    </div>
  );
}