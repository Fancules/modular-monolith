const users: IUser[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', salary: 5000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', salary: 6000 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', salary: 2500 },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', salary: 5200 },
    { id: 5, name: 'Emily Davis', email: 'emily@example.com', salary: 2800 },
    { id: 6, name: 'Michael Wilson', email: 'michael@example.com', salary: 5800 },
    { id: 7, name: 'Sarah Taylor', email: 'sarah@example.com', salary: 5300 },
    { id: 8, name: 'David Martinez', email: 'david@example.com', salary: 3400 },
    { id: 9, name: 'Emma Anderson', email: 'emma@example.com', salary: 11000 },
    { id: 10, name: 'James Thompson', email: 'james@example.com', salary: 3700 }
];

function AddUser(payload: IAddUserPayload | null) {
    if(payload){
        const newUser = {
            ...payload,
            id: users[users.length - 1].id + 1
        }
        users.push(newUser);
        return newUser
    } else {
        return {}
    }
}

function GetUserByID(payload: IGetUserByIDPayload | null) {
    const user = users.find(user => user.id == payload?.userId);
    return user ? user : {};
}

export {
    AddUser,
    GetUserByID
}
