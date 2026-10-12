import { id } from 'zod/locales';
import db from '../db/index.js';
import {UserTable}from '../models/user.model.js'
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email) {
    const [existUser] = await db.
    select({
        id : UserTable.id,
        firstname: UserTable.firstname,
        lastname : UserTable.lastname,
        email : UserTable.email,
        salt:UserTable.salt,
        password:UserTable.password
    }).from(UserTable).where(eq(UserTable.email,email));
    return existUser;
}

export async function addUser(email,firstname,lastname,salt,password) {
     const [user] = await db.insert(UserTable).values({
        email,
        firstname,
        lastname,
        salt,
        password,
    }).returning({id: UserTable.id});
    return user;
}