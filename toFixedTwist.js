(function(){
	function toFixedTwist(value,precision){
		var number = (typeof value === 'number') ? value.toString() : undefined;
    precision = (typeof precision === 'number') ? Math.abs(precision) : 2;

    var toFixedNumber;
    var splitNumber = number.split('.');
    if(splitNumber.length === 1){
      if(precision > 0){
        return splitNumber[0]+''.concat('.').padEnd(precision+1,'0');
      }
      return splitNumber[0];
    }else if(splitNumber.length === 2){
      var baseNumber = splitNumber[0];
      var decimalNumber = splitNumber[1];
      if(precision > 0){
        toFixedNumber = decimalNumber.length >= precision ? 
            formatNumber(number, precision) : baseNumber.concat('.') + decimalNumber.padEnd(precision,'0');
      }else{
        toFixedNumber = (decimalNumber.charAt(0) >=5) ? ++baseNumber : baseNumber;
      }    	
    }else{
      throw new Error('More than one decimal point');
    }
      return toFixedNumber;
    }

    function formatNumber(number, precision){
      var regexMoveDecimalForward = new RegExp('(\\.)(?=\\d)(\\d{'+precision+'})'); 
      var decimalForwardShiftedNumber = number.replace(regexMoveDecimalForward, '$2$1');

      var roundedNumber = (Math.round(decimalForwardShiftedNumber)).toString();

      var regexMoveDecimalBackward = new RegExp('(\\d{'+precision+'})(?!\\d)');
      var formattedNumber = roundedNumber.replace(regexMoveDecimalBackward, '.$1');

      return formattedNumber;
    }

    window.toFixedTwist = toFixedTwist;
})(window);
