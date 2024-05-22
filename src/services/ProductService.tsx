import axios from "axios";
import { DraftProductSchema, ProductsShema, Product, ProductShema } from "../types"
import { coerce, safeParse, number, parse } from "valibot"
import { toBoolean } from "../utils";
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

export async function getProducts() {
    try {
        const url = `${keyUrl}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsShema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${keyUrl}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductShema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema = coerce(number(), Number)

        const result = safeParse(ProductShema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        if (result.success) {
            const url = `${keyUrl}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${keyUrl}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${keyUrl}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}