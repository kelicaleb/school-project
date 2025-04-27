import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Female({female}) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);


  useEffect(() => 
{
    console.log("This is the female array", female)

},[])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative py-8 top-12 pr-2 ">
      <div className="w-[75rem] h-12 bg-cyan-500 rounded-md ">
        <h1 className="font-serif text-white text-center pt-1 font-bold text-3xl">Female</h1>
      </div>
      <div className="relative">
        {showLeftButton && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4   scrollbar-hide snap-x"
          onScroll={handleScroll}
        >
          {female.map((item) => (
            <div 
              key={item.cartId}
              className={`flex-shrink-0 w-64 h-64  rounded-lg flex items-center justify-center snap-start`}
            >
              <img className="h-[15rem] w-[15rem]"src={`http://localhost:8000${item.image}`}  />
              </div>
          ))}
        </div>
        
        {showRightButton && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
export default Female