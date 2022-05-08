async function getPhoto(query){

    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=1&per_page=1`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: '563492ad6f917000010000017d09a555ba2540eda58754fc2ce5c733',
        },
    });

    const response = await data.json();
    return response;
}

export default getPhoto;
