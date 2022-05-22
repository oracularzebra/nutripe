async function getPhoto(query, quantity=1){

    const data=await fetch(`https://api.pexels.com/v1/search?query=${query} food&page=1&per_page=${quantity}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: '563492ad6f917000010000017d09a555ba2540eda58754fc2ce5c733',
        },
    });

    if(data.ok){
        const response = await data.json();
        return response;
    }
    else{
        console.log('Limit exceeded')
    }
}

export default getPhoto;
