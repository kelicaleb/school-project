import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


function Technology({id, technology}) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);


  useEffect(() => 
{
    console.log("this is the technology array", technology)

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

  const handleTechnologyCart = async (id) =>
  {
    const selectedItem = technology.find((data) =>
    {
      return data.productId === id
    })
    if(selectedItem){
     try{
      await axios.post("http://localhost:8000/cart", 
        {
          title:"Technology", 
          price:selectedItem.price, 
          category:selectedItem.category, 
          image:selectedItem.image
        }
      )
      .then((res) => console.log(res))
      return toast.success("Added to Cart")
     }
     catch(err){
      return toast.error("Error adding to cart")
     }
    }
  }

  return (
    <div id={id} className="w-full relative py-8 top-10 pr-2 ">
            <ToastContainer/>
      <div className="w-[79rem] h-12 bg-cyan-500 rounded-md ">
        <h1 className="font-serif text-white text-center pt-1 font-bold text-2xl">Technology</h1>
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
          className="flex overflow-x-auto gap-12   scrollbar-hide snap-x  pt-4"
          onScroll={handleScroll}
        >
          {technology.map((item) => (
            <div className="items-center justify-center pt-8 h-[25rem]">
               <div 
              key={item.productId}
              className={`hover:-translate-y-1 flex-shrink-0 w-64 h-[21rem]  rounded-md shadow-xl shadow-cyan-500 hover:shadow-cyan-400 items-center justify-center snap-start pl-10`}
            >
              <img className="h-[15rem] w-[12rem]"src={`http://localhost:8000${item.image}`}  />
              <p className="text-sm font-serif">{item.item}</p>
              <p className="font-bold font-serif">KES:{item.price}</p>
             <div className="pt-2 pr-5">
             <button onClick={() => handleCart(item.productId)} className="bg-cyan-600 hover:bg-cyan-500 text-white w-[12rem] rounded-md h-9">Add Cart</button>
             </div>
              </div>
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
export default Technology