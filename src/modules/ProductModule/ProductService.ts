import mediator from "../../core/mediator";

function AddProduct(payload: any){
    return "Product added!";
}

function GetProducts(payload: any){
    return "List of products";
}

function GetProductsForTheUser(payload: any){
    const userId = payload.user;
    const user = mediator.send("GetUserByID", {userId});
}

export {
    AddProduct,
    GetProducts
}
