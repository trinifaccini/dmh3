export const POST_USER = `https://digitalmoney.ctd.academy/api/users`
export const POST_LOGIN = "https://digitalmoney.ctd.academy/api/login"
export const GET_ACCOUNT = "https://digitalmoney.ctd.academy/api/account"
export const POST_ACCOUNT_NUMBER = "https://digitalmoney.ctd.academy/ping"

export const GET_ACTIVITY = (accountId: string) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/activity`
}
export const GET_TRANSACTION_DETAIL = (accountId: string, transactionId: string | string[],) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/transactions/${transactionId}`
}

export const GET_CARDS = (accountId: string) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/cards`
}

export const GET_CARD = (accountId: string, cardId: string) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/cards/${cardId}`
}

export const GET_USER = (userId: string) => {
    return `https://digitalmoney.ctd.academy/api/users/${userId}`
}

export const DELETE_CARD = (accountId: string, cardId: number) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/cards/${cardId}`
}

export const POST_DEPOSIT = (accountId: string) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/deposits`
}

export const POST_TRANSACTION = (accountId: string) => {
    return `https://digitalmoney.ctd.academy/api/accounts/${accountId}/transactions`
}




