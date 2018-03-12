/*************************************************************************
*  Reimplementation of toFixed method in accounting.js using regex and 
*  String manipulation.
*  Algorithm for moving decimal point forward and backward using Regex
*    The decimal point and the following digits upto the given precision value
     are captured.
*    Swap the captured groups.
*    e.g., (precision of 2) 1.005 ---> 1(.)(00)5 --->100.5 
*    After the swap, round the number and move the decimal point backward.
     by  replacing the 'precision' number of digits with '.digits'
     e,g., 100.5 ---> 101 ---> 1.01

* Takes care of non-floating point numbers as well.
* Pads zeroes if the precision value is bigger than the no. of digits after the decimal.

* params:  value  - number to be fixed to a certain precision
           Precision - value that determines that no of digits after the decimal.
* return : The number fixed to a certain precision following rules of rounding.
****************************************************************************/
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
   				moveDecimal(number, precision) : baseNumber.concat('.') + decimalNumber.padEnd(precision,'0');
   	}else{
   		toFixedNumber = (decimalNumber.charAt(0) >=5) ? ++baseNumber : baseNumber;
   	}    	
   }else{
   	throw new Error('More than one decimal point');
   }
 		return toFixedNumber;
	}
 /*
 *   The decimal point and the following digits upto the given precision value
     are captured.
 *   Swap the captured groups.
 *   e.g., (precision of 2) 1.005 ---> 1(.)(00)5 --->100.5 
 *   After the swap, round the number and move the decimal point backward.
     by  replacing the 'precision' number of digits with '.digits'
     e,g., 100.5 ---> 101 ---> 1.01
 */
	function moveDecimal(number, precision){
		var regexMoveDecimalForward = new RegExp('(\\.)(?=\\d)(\\d{'+precision+'})'); 
		var decimalForwardShiftedNumber = number.replace(regexMoveDecimalForward, '$2$1');
		
		var roundedNumber = (Math.round(decimalForwardShiftedNumber)).toString();
		
		var regexMoveDecimalBackward = new RegExp('(\\d{'+precision+'})(?!\\d)');
		var formattedNumber = roundedNumber.replace(regexMoveDecimalBackward, '.$1');

		return formattedNumber;
	}
 
	window.toFixedTwist = toFixedTwist;
})(window);