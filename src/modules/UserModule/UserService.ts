function AddUser(payload: any) {
    const user = {
        salary: 1500
    }
    return "User added!";
}

function GetUserByID(payload: any) {
    return "User details!";
}

export {
    AddUser,
    GetUserByID
}
