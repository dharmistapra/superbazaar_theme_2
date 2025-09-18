// src/helper/shouldShowPrice.js
// src/helper/shouldShowPrice.js
const shouldShowPrice = (userToken, website) => {
    if (userToken) return true;
    if (!userToken && website?.showPrice === false) return true;
    return false;
};

export default shouldShowPrice;
