import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

export const setItem = async (key: string, value: any) => {
    try {
        await setItemAsync(key, JSON.stringify(value))
    } catch (e) {
        console.log(e)
    }
}

export const getItem = async (key: string) => {
    try {
        const value = await getItemAsync(key) || ''
        return JSON.parse(value)
    } catch (e) {
        console.log(e)
    }
}

export const deleteItem = async (key: string) => {
    try {
        await deleteItemAsync(key)
    } catch (e) {
        console.log(e)
    }
}