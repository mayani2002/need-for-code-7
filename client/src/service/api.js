export const getAllProducts = async (productCategory) => {
    // return "Request Recieved!";
    console.log(productCategory);
    const res = await fetch('http://localhost:5000/GetAllProducts', {
        method: 'POST',
        body: JSON.stringify({ "Category": productCategory }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .catch((error) => {console.log(error);});
    // const response = await res.json();
    // console.log(response);
    return res.json();
};