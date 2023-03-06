import { useCallback, useRef } from 'react';
import { BookBlock } from '@/shared/book-block';

const BookFlip = () => {
  const bookRef = useRef<BookBlock | null>(null);
  const ref = useCallback((node: HTMLDivElement) => {
    if (node) {
      bookRef.current = new BookBlock(node, {
        orientation: 'vertical',
        speed: 800,
        shadowSides: 0.8,
        shadowFlip: 0.7,
        autoplay: false,
        startPage: 0,
      });
      bookRef.current?.startSlideshow();
    }
  }, []);
  return (
    <div
      style={{ width: '60%', height: 800 }}
      className={'meta-flex meta-flex-center meta-flex-col'}
    >
      <div>
        <button
          onClick={() => {
            if (bookRef.current) {
              bookRef.current?.next();
              //console.log(bookRef.current);
            }
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            if (bookRef.current) {
              bookRef.current?.prev();
              //console.log(bookRef.current);
            }
          }}
        >
          Prev
        </button>
      </div>
      <div id="react-bb-bookblock" className="react-bb-bookblock" ref={ref}>
        <div className="react-bb-item">
          <img
            src={
              'https://cdn.dribbble.com/users/40961/screenshots/305237/media/b6ced815516260e60233529eafa3e9f1.jpg?compress=1&resize=400x300&vertical=top'
            }
          />
        </div>
        <div className="react-bb-item">
          <img
            src={
              'https://cdn.dribbble.com/users/40961/screenshots/5998608/legoweb_1x.jpg?compress=1&resize=400x300&vertical=top'
            }
          />
        </div>
        <div className="react-bb-item">
          <img
            src={
              'https://cdn.dribbble.com/users/40961/screenshots/6233502/tricer.jpg?compress=1&resize=800x600&vertical=top'
            }
          />
        </div>
        <div className="react-bb-item">
          <img
            src={
              'https://cdn.dribbble.com/users/40961/screenshots/5974271/skethesavatar.jpg?compress=1&resize=800x600&vertical=top'
            }
          />
        </div>
        <div className="react-bb-item">
          <img
            src={
              'https://cdn.dribbble.com/users/40961/screenshots/6209529/34_.jpg?compress=1&resize=800x600&vertical=top'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BookFlip;
