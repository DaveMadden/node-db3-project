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

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
