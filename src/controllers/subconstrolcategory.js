import {read, write} from '../utils/model.js'
const  subcategoryGet =  (req, res)=>{
  let subcategory = read('subCategories')
  let product = read('products')
  subcategory.forEach((e)=> e.products  = product.filter((ele)=> {
    if(e.sub_category_id == ele.sub_category_id){
      delete ele.sub_category_id
      return ele
    }
  }))
  res.send(subcategory)
}
const subcategoryGetParams = (req, res)=>{
  let subcategory = read('subCategories')
  let product = read('products')
  let {id}  = req.params
  let fil = subcategory.filter((sub) => sub.sub_category_id == id)
  fil.forEach((e)=> e.products  = product.filter((ele)=> {
    if(e.sub_category_id == ele.sub_category_id){
      delete ele.sub_category_id
      return ele
    }
  }))
  res.send(fil)
}


const subcategoryPost = (req, res)=>{
  let {category_id, sub_category_name} = req.body
  let subcategory = read('subCategories')
  if(category_id > 0 && sub_category_name.length > 3){
    let newsubcategory = {sub_category_id:subcategory.at(-1).sub_category_id + 1||1,sub_category_name , category_id}
    subcategory.push(newsubcategory)
    write('subCategories', subcategory)
    res.status(201).send({status:"new subcategory added", data: newsubcategory})
  }else{
    res.status(400).send({status:"category_id  and sub_category_name  invalid"})
  }
}


const subcategoryDelete = (req, res)=>{
  let {id} = req.params
  let subcategory = read('subCategories')
  let index = subcategory.findIndex((e)=> e.sub_category_id == id)
  if(index != -1){
    let del = subcategory.splice(index,1)  
    write('subCategories', subcategory)
    res.status(200).send({status:"subcategory delete", data: del})
  }else{
    res.status(404).send({status:"subcategory not found"})
  }
}

const subcategoryPut = (req, res)=>{
  let {id} = req.params
  let {sub_category_name} = req.body
  let subcategory = read('subCategories')
  let find = subcategory.find((e)=> e.sub_category_id == id)
  if (find && sub_category_name.length > 3) {
    find.sub_category_name  = sub_category_name
    write('subCategories', subcategory)
    res.status(200).send({status:"sub_category_name  putted", data: find})
  }else{
    res.status(400).send({status:"sub_category_name  not found"})
  }
}

export {
  subcategoryGet,
  subcategoryGetParams,
  subcategoryPost,
  subcategoryDelete,
  subcategoryPut
}
