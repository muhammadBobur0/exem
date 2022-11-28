import {read, write} from '../utils/model.js'
const  categoryGet =  (req, res)=>{
  let category = read('categories')
  let subcategory = read('subCategories')
  category.forEach((e)=> e.subcategory  = subcategory.filter((ele)=> e.category_id == ele.category_id))
  res.send(category)
}
const categoryGetparams = (req, res)=>{
  let category = read('categories')
  let subcategory = read('subCategories')
  let {id} = req.params
  let filtred = category.filter((e)=>{
    e.subcategory = subcategory.filter((ele)=> e.category_id == ele.category_id)
    return e.category_id == id
  })
  res.send(filtred)  
}

const categoryPost = (req, res)=>{
  let {category_name} = req.body 
  let category = read('categories')
  if(category_name.length > 3){
    let newcategory = {category_id: category.at(-1).category_id + 1 ||1, category_name}
    category.push(newcategory)
    write('categories',category)
    res.status(201).send('new categories added')
  }else{
    res.status(400).send('category_name invalid')
  }
}
const categoryPut = (req, res)=>{
  let {id} = req.params
  let {category_name} = req.body
  let category = read('categories')
  let find =  category.find((e)=>e.category_id == id)
  if(category_name.length > 3){
    find.category_name = category_name
    write('categories',category)
    res.status(200).send('categories putted')
  }else{
    res.status(400).send('category_name invalid')
  }
}

const categoryDelete = (req, res)=>{
  let {id} = req.params
  let category = read('categories')
  let find =  category.findIndex((e)=>e.category_id == id)
  if(find != -1){
    let del = category.splice(find, 1)
    write('categories',category)
    res.status(200).send({message:'categories delete', data:del})
  }else{
    res.status(404).send('category not found')
  }
}


export {
  categoryGet,
  categoryGetparams,
  categoryPost,
  categoryPut,
  categoryDelete
}