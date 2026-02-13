export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserCreate extends Omit<User, 'id'> {
    password: string;
}

export interface UserDb extends User {
    password: string;
}

export function sanitizeUser(userDb: UserDb): User {
    const { password, ...user } = userDb;
    return user;
}
