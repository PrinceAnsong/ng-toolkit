(function (toolkit) {

	var trimFn = function () {
		return function trimOnWord (text, maxLength) {
			if (text.length <= maxLength) {
				return text;
			}
			return text.substring(0, text.lastIndexOf(' ', maxLength - 3)) + '...';
		}
	};

	toolkit.registerFilter('wordTrim', trimFn);
	toolkit.registerDirective('wordTrim', trimFn);
	toolkit.registerService('wordTrim', trimFn);

})(ngToolkit);
