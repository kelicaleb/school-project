import React from "react";

const SlideShow = ({ items }) => {
    const female = [
        {
            url:'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
            title:"womens clotehs"
        },
        {
            url: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
            title:"womens clotehs"

          },
          {
            url: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
            title:"womens clotehs"

          },
          {
            url:'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
            title:"womens clotehs"

          },
          {
            url:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            title:"womens clotehs"

          },
          {
            url:"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            title:"womens clotehs"

          }
    ]
  return (
    <div className="relative w-full overflow-x-auto items-start right-[4rem]">
      {/* Slideshow container */}
      <div className="inline-flex  p-4 space-x-12 w-[82rem] pb-8">
        {
            female.map(data => 
                <>
                <div className="flex-shrink-0 shadow-xl shadow-cyan-600 relative flex items-center justify-center w-[calc(20%-16px)] h-[14rem] hover:shadow-cyan-500 hover:-translate-y-1  ">
                <div className="bg-white rounded-lg shadow-md p-4 h-full">
              {/* Replace with your actual item content */}
              <div className="text-center pb-12">
                <div className="w-full h-32 mb-2 roundedpb-2"><img className="h-[8rem] w-[8rem] pl-2 pr-2"  src={data.url}/>
                </div>
                <h3 className="font-medium">{data.title}</h3>
                <p className="text-sm text-gray-600">ewguo</p>
              </div>
            </div>
                </div>
                <div>
                </div>
                </>
            )
        }
      </div>
    </div>
  );
};

// Example usage
const Display  = ({username}) => {
  // Sample data - replace with your actual items
  const sampleItems = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  return (
    <div className="container mx-auto p-4">
        <div className="bg-cyan-600 h-[3rem] w-[79rem] right-[3rem] items-start relative rounded-md">
        <h2 className="  pt-2  text-1xl font-bold font-serif text-white">{username} Top Picks</h2>
        </div>
      <SlideShow items={sampleItems} />
    </div>
  );
};

export default Display