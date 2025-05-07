import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


function Female({id, female}) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);



const handleCart  = async(id) =>
{
  console.log(id)
  const selectedItem = female.find((data) => data.productId === id)
  console.log(selectedItem, "This is the selected item")
  if(selectedItem) 
  {
    try{
      await axios.post("http://localhost:8000/cart", 
        {
          title:"Female Clothes", 
          price:selectedItem.price, 
          category: selectedItem.category, 
          image:selectedItem.image
        }
      )
      return toast.success("Added to Cart")
    }
    catch(err)
    {
      toast.error("Failed to push to cart ")
      return console.log("Female cart erro", err)
    }
  }
}

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
    <div id={id}className="w-full relative py-8 top-19 pr-2 ">
             <ToastContainer/>

      <div className="w-[79rem] h-12 bg-cyan-500 rounded-md  ">
        <h1 className="font-serif text-white text-center pt-1 font-bold text-2xl">Female Clothes</h1>
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
          className="flex overflow-x-auto gap-12   scrollbar-hide snap-x"
          onScroll={handleScroll}
        >
          {female.map((item) => (
            <>
            <div className="items-center justify-center pt-10 h-[23rem]">
            <div
              key={item.productId}
              className={`shadow-xl shadow-cyan-500 hover:shadow-cyan-400 hover:-translate-y-1 flex-shrink-0 w-64 h-[19rem]  rounded-lg  items-center justify-center snap-start`}
            >
              <img className="h-[12rem] w-[13rem] pl-4" src={`http://localhost:8000${item.image} `} />
              <p className="text-sm font-serif">{item.item}</p>
              <p className="fonr-serif font-semibold">KES: {item.price}</p>
              <div className="pt-4 items-cneter justify-center pr-2">
                <button onClick={() => handleCart(item.productId)} className="bg-cyan-600 h-9 hover:bg-cyan-500 w-[11rem] rounded-md text-white">Add Cart</button>
              </div> 
            </div>
           

            </div>
           </>
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