function AddUser(payload: IPayload | null) {
    const user = {
        salary: 1500
    }
    return "User added!";
}

function GetUserByID(payload: IPayload | null) {
    return "User details!";
}

export {
    AddUser,
    GetUserByID
}
