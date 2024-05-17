import axios from "axios";
import { DraftProductSchema } from "../types"
import { safeParse } from "valibot"
const keyUrl = import.meta.env.VITE_API_URL;


type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${keyUrl}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error)
    }
}