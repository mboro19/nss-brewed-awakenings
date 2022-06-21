import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findProduct = (order, allProducts) => {

    let orderProduct = null;

    for (const product of allProducts) {
        if (product.id === order.productId) {
        
            orderProduct = product
        }
    }

    return orderProduct //this is a very elaborated function to help understand whats going on.
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {

    

    for (const employee of allEmployees) {
        
        if (employee.id === order.employeeId) {

            return employee //this is exactly the same as the one above... just simpler syntax.

            
        }
    }

    
}

export const Orders = () => {
    let html = "<ul>"
    
    for (const order of orders) {
        let employee = findEmployee(order, employees)
        let product = findProduct(order, products)

        html += `<li> ${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }

    html += "</ul>"

    return html
}

