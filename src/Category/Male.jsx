import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


function Male({id, male}) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);



  const handleMaleCart = async (checkid) => 
    {
      const selectedItem = male.find((data) => 
      {
        return data.productId === checkid
      })
     console.log(selectedItem)
     if (selectedItem) 
     {
      try{
        await axios.post("http://localhost:8000/cart", 
          {
            title:"Male Clothes", 
            price:selectedItem.price, 
            category:selectedItem.category, 
            image:selectedItem.image
          }
        )
        .then((res) => console.log(res))
        toast.success(`${selectedItem.item} Added to cart`)

      }
      catch(err)
      {
        console.log("Error posting data")
        return toast.error("Error adding to cart")
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
    <div id={id} className="w-full relative py-8 top-0 pr-2 ">
       <ToastContainer/>
      <div className="w-[79rem] h-12 bg-cyan-500 rounded-md ">
        <h1 className="font-serif text-white text-center pt-1 font-bold text-2xl">Male Clothes</h1>
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
          className="flex overflow-x-auto gap-12    scrollbar-hide snap-x "
          onScroll={handleScroll}
        >
          {male.map((item) => (
          <>
            <div className="items-center justify-center pt-10 h-[24rem]">
            <div 
              key={item.productId}
              className={`flex-shrink-0 w-64 h-[20rem]  rounded-md shadow-xl shadow-cyan-600 hover:shadow-cyan-500  relative pl-8 hover:-translate-y-1  pt-3 items-center justify-center snap-start`}
            >
              <img className="h-[13rem] w-[13rem]"src={`http://localhost:8000${item.image}`}  />
              <div className="pt-1">
              <p className="text-sm font-serif">{item.item}</p>
                <p className="font-serif font-semibold">
                  KES:{item.price}
                </p>
              </div>
              <div className="pr-2">
                <button onClick={() => handleMaleCart(item.productId)} 
                className="bg-cyan-600 hover:bg-cyan-500 text-white w-[12rem] h-9 rounded-md">
                  Add To Cart</button> 
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
export default Male