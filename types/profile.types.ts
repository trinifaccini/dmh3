// export type ProfileUser = {
//     firstName: string,
//     lastName: string,
//     password: string,
//     phone: string,
//     alias: string | null | undefined,
//     cvu: string
// }

export type ProfileState = {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    phone: string,
    alias: string | null | undefined,
    cvu: string
}

export type ProfileAction = 
    | { type: 'email', payload: string | null}
    | { type: 'firstname', payload: string | null}
    | { type: 'lastname', payload: string | null}
    | { type: 'password', payload: string | null}
    | { type: 'phone', payload: string | null}
    | { type: 'alias', payload: string | null}
