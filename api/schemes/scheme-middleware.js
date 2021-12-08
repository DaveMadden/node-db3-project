const Scheme = require('./scheme-model')

const checkSchemeId = (req, res, next) => {
  Scheme.checkID(req.params.scheme_id)
    .then(response=>{
      if(!response){
        res.status(404).json({ message: `scheme with scheme_id ${req.params.scheme_id} not found` })
      }
      else{
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: `${err}`})
    })
}

const validateScheme = (req, res, next) => {
  const sn = req.body.scheme_name
  if (sn === undefined || sn === null || typeof sn !== 'string'){
    res.status(400).json({ message: "invalid scheme_name"})
  }
  else{
    next()
  }
}

const validateStep = (req, res, next) => {
  console.log(req.body)
  const inst = req.body.instructions
  const num = req.body.step_number

  console.log("instructions:", typeof inst)
  console.log("step_number:", typeof Number(num))
  
  if(inst === undefined || inst === "" || typeof inst !== 'string'){
    res.status(400).json({ message: 'invalid step'})
  }
  else if(num < 1 || typeof num !== 'number'){
    res.status(400).json({ message: 'invalid step'})
  }
  else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
