import { read, write } from "../utils/model.js"


const productGET = (req, res)=>{
  let {categoryId, subCategoryId, model} = req.query
  let product =  read('products')
  if(!categoryId && subCategoryId || model){
    let filterd =  product.filter((e)=> {
    let ByTittle = subCategoryId ? e.sub_category_id == subCategoryId : true
    let Byid = model ? e.model == model : true
      return ByTittle && Byid
    })
    
    if(filterd.length){
      res.status(200).send(filterd)
    }else{
      res.status(404).send('product not found')
    }
  }else
  {
    let sub =  read('subCategories')
    let filter = []
    product.filter((e)=>{
      return sub.filter((element)=> {
        if(element.category_id == categoryId){
          if(element.sub_category_id == e.sub_category_id){
            filter.push(e)
          }
        }
      })
    })
    if(filter.length){
      res.status(200).send(filter)
    }else{
      res.status(404).send('product not found')
    }
  }
}

const productGETparams = (req, res)=>{
  let {id} = req.params
  let product =  read('products')
  let params = product.filter ((e)=>e.product_id == id)
  if(params.length){
    res.status(200).send(params)
  }else{
    res.status(404).send('product not found')
  }
}

const productPOST = (req, res)=>{
  let {subCategoryId, productName, price, color, model} =  req.body
  let product =  read('products')
  if(subCategoryId  && productName && price && color && model){
    let newobj = {product_id : product.at(-1).product_id +1 || 1, sub_category_id :subCategoryId, product_name:productName,  price, color, model }
    product.push(newobj)
    write('products', product)
    res.status(201).send({status:'you product added', data: newobj})
  }else{
    res.status(400).send('bad request subCategoryId, productName, price, color, model not found')
  }
}
const productDelete = (req, res)=>{
  let {id} = req.params 
  let product =  read('products')
  let index = product.findIndex((e)=> e.product_id == id)
  if(index != -1){
    let del = product.splice(index, 1)
    write('products', product)
    res.status(200).send({status:'you product delete', data: del})
  } else{
    res.status(404).send('prodects not found')
  }
}

const productPUT = (req, res)=>{
  let {id} = req.params
  let {subCategoryId, productName, price, color, model} =  req.body
  let product =  read('products')
  let find = product.find((e)=>e.product_id  == id)
  if(find){
    if(subCategoryId  && productName && price && color && model){
      find.sub_category_id = subCategoryId
      find.model = model
      find.product_name = productName
      find.price = price
      find.color = color
      write('products', product)
      res.status(200).send({message:'your produkt updedd', data: find})
    }else{
      res.status(400).send('bad request subCategoryId, productName, price, color, model not found')
    }
  }else{
    res.status(404).send('product not found')
  }  
}



export {
  productGET,
  productGETparams,
  productPOST,
  productDelete,
  productPUT
}
