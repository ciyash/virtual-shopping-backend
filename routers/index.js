import express from 'express'
import adminRouter from '../routers/admin.router.js'
import userRouter from './user.route.js'
import addressRouter from '../routers/address.router.js'
import cartRouter from '../routers/cart.router.js'
import itemRouter from '../routers/item.router.js'
import countryRouter from '../routers/country.router.js'
import companyRouter from '../routers/company.router.js'
import categoryRouter from '../routers/category.router.js'
import subCategoryRouter from '../routers/subcategory.router.js'
import productRouter from '../routers/product.router.js'
import feedbackRouter from '../routers/feedback.router.js'
import contactRouter from '../routers/contact.router.js'
import companyCategory from '../routers/company.category.router.js'
import bannersRouter from '../routers/banners.router.js'
import logoRouter from '../routers/logo.router.js'

const app=express()
app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use("/address",addressRouter)
app.use("/cart",cartRouter)
app.use("/item",itemRouter)  
app.use("/country",countryRouter)
app.use("/company",companyRouter)
app.use("/category",categoryRouter)
app.use("/sub-category",subCategoryRouter)
app.use("/product",productRouter)
app.use("/feedback",feedbackRouter)
app.use("/contact",contactRouter)
app.use("/company-category",companyCategory)
app.use("/banners",bannersRouter)
app.use("/logo",logoRouter)


export default app