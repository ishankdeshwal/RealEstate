export const sliderSettings={
    slidesPerView:1,
    spaceBetween:50,
    breakpoints:{
        480:{
            slidesPerView:1
        }
        ,600:{
            slidesPerView:2
        }
        ,750:{
            slidesPerView:3
        }
        ,1100:{
            slidesPerView:4
        }
    }
}
export const updateFavourites = (id, favourites) => {
    if (!Array.isArray(favourites)) {
        return [id];
    }
    if (favourites.includes(id)) {
        return favourites.filter((resId) => resId !== id);
    } else {
        return [...favourites, id];
    }
};
  
export const checkFavourites = (id, favourites) => {
    if (!Array.isArray(favourites)) {
        return "white";
    }
    return favourites.includes(id) ? "#fa3e5f" : "white";
};
export const validateString=(value)=>{
  return value?.length<3 || value===null?"Must Have atleast 3 characters":null
}