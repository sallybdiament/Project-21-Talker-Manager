// From: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/: 
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

const emailValidation = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json(
        { message: 'O campo "email" é obrigatório' },
      );
    }
    next();
  };

  const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json(
        { message: 'O campo "password" é obrigatório' },
      );
    }
    if (password.length < 6) {
        return res.status(400).json(
          { message: 'O "password" deve ter pelo menos 6 caracteres' },
        );
      }
    next();
  };

  const emailValidationFormat = (req, res, next) => {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json(
        { message: 'O "email" deve ter o formato "email@email.com"' },
      );
    }
    next();
  };

  module.exports = { passwordValidation, emailValidation, emailValidationFormat };