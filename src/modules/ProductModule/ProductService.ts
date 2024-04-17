import mediator from "../../core/mediator";

function AddProduct(payload: IPayload | null){
    return "Product added!";
}

function GetProducts(payload: IPayload | null){
    return "List of products";
}

function GetProductsForTheUser(payload: any){
    const userId = payload.user;
    // const user = mediator.send("GetUserByID", {userId});
}

export {
    AddProduct,
    GetProducts
}
