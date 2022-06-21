import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


//add an event listener to return a window alert showing the price of what the user clicked.


document.addEventListener(
    `click`,
    (clickEvent) => {

        const itemClicked = clickEvent.target;

        if (itemClicked.id.startsWith("product")) {
            const [,productId] = itemClicked.id.split("--")
                
                for(const product of products){

                    if(product.id === parseInt(productId)){

            
                    window.alert(`"A ${product.name} costs just $${product.price}."`)
                }}}
            }
);

document.addEventListener(
    `click`,
    (clickEvent) => {

        const itemClicked = clickEvent.target;

        if (itemClicked.id.startsWith("employee")) {
            const [,employeeId] = itemClicked.id.split("--")
                
                for(const employee of employees){

                    if(employee.id === parseInt(employeeId)){

            
                    window.alert(`"${employee.name} has sold ${employee.sales} product(s)."`)
                }}}
            }
);


//create a function that will determine how many sales each employee has, and will add a property to their objects for sales...


const salesFunc = () => {

for(let employee of employees){
    
    employee.sales = 0;

    for(let order of orders){

        if(order.employeeId === employee.id){

              employee.sales++
            
        }
    }
}
    
    return employees.sales

}

salesFunc();





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

