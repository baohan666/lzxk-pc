import {checkNumber} from './checkNum'

export default {
  bind: function (el,binding) {
    el.onkeypress = function(e){
      return checkNumber(e)
    }
  }
}