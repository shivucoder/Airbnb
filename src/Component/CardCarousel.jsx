/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {FaAngleLeft, FaAngleRight, FaHeart} from 'react-icons/fa6';
import {Link} from 'react-router-dom';

const CardCarousel = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState({});
  const [heartState, setHeartState] = useState({});
  const [visibleCards, setVisibleCards] = useState(16);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
            'https://backend-airbnb-stqx.onrender.com/api/locations',
        );
        const data = await res.json();
        setData(data);
        setCurrentIndex(Object.fromEntries(data.map((_, i) => [i, 0])));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const nextImage = (index) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [index]:
        prevIndex[index] === data[index]?.images.length - 1 ?
          0 :
          prevIndex[index] + 1,
    }));
  };

  const prevImage = (index) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [index]:
        prevIndex[index] === 0 ?
          data[index]?.images.length - 1 :
          prevIndex[index] - 1,
    }));
  };
  // login dispatch  wishlist
  const handleHeartClick = (index) => {
    setHeartState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleShowMore = () => {
    setVisibleCards(data.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-4 gap-y-5 gap-[25px] w-[90%] mx-auto pt-[290px] ">
        {data.slice(0, visibleCards).map((el, i) => (
          <div className="mb-8" key={i}>
            <div className="rounded-[18px] overflow-hidden relative">
              <Link to={`/details/${el.id}`} className="mb-8">
                <img
                  className="w-full h-[300px] object-cover"
                  src={el.images[currentIndex[i]]}
                  alt=""
                />
              </Link>
              <div className="text-[18px] font-semibold rounded-full bg-white py-[3px] px-[16px] absolute top-[10px] left-[10px]">
                Guest favourite
              </div>
              <div
                onClick={() => handleHeartClick(i)}
                className="absolute top-[10px] right-[10px] text-[24px] font-[700] cursor-pointer border-1 border-white"
                style={{color: heartState[i] ? 'red' : 'grey'}}
              >
                <FaHeart />
              </div>
              <span
                onClick={() => prevImage(i)}
                className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-2 text-sm bg-gray-100  p-[8px] rounded-full"
              >
                <FaAngleLeft />
              </span>
              <span
                onClick={() => nextImage(i)}
                className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2 text-sm bg-gray-100 p-[8px] rounded-full"
              >
                <FaAngleRight />
              </span>
            </div>

            <div className="flex justify-between mt-3">
              <div className="font-semibold ">{el.title}</div>
              <div className="font-semibold">★ {el.rating}</div>
            </div>

            <div className="text-gray-600 text-[16px] mt-1">{el.nearBy}</div>

            <div className="text-sm font-[500] mt-1">
              <span className=" font-semibold text-[18px]">₹ {el.price} </span>
              night
            </div>
          </div>
        ))}
      </div>
      {visibleCards < data.length && (
        <div className="flex flex-col justify-center text-center">
          <h3 className=" text-[32px] font-semibold ">
            Continue exploring rooms
          </h3>
          <button
            className="mx-auto mt-4 bg-black font-semibold text-white text-[26px] px-[28px] py-[14px] rounded-[8px]"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(CardCarousel);
