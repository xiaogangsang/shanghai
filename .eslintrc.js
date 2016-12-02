module.exports = {
  "parserOptions": {
    "ecmaVersion": 5
  },
  "env": {
    "browser": true,
    "jquery": true
  },
  "globals": {
    "_": true,
    "Mustache": true
  },
  "rules":{
    "no-alert": 0,
    "func-names": 0
  },
  "extends": "eslint-config-airbnb-es5"
}