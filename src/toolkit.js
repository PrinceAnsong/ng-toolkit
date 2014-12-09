var ngToolkit = (function () {

	var toolkit = {
		filters: [],
		directives: [],
		services: []
	};

	/**
	 * Bind the toolkit to a module.
	 * @param module The angular module to bind the toolkit to.
	 * @param config The config object containing the names of each type ("directive", "filter" or "service") to bind.
	 */
	toolkit.bind = function(module, config) {
		if (config.filters) {
			toolkit.bindType("filter", module, config.filters);
		}
		if (config.directives) {
			toolkit.bindType("directive", module, config.directives);
		}
		if (config.services) {
			toolkit.bindType("service", module, config.services);
		}
	};

	/**
	 * Bind a type.
	 * @param type The type to bind ("directive", "filter" or "service").
	 * @param module The angular module to bind to.
	 * @param names An array containing the names of the specified type to bind.
	 * @internal
	 */
	toolkit.bindType = function(type, module, names) {
		var i, length, currentArg, registeredHandler;
		for (i=0, length=names.length; i < length; i++) {
			currentArg = names[i];
			registeredHandler = toolkit[type + 's'][currentArg];
			if (registeredHandler) {
				(function(handler, name, type) {
					module[type](name, function(){
						return handler;
					});
				})(registeredHandler, currentArg, type);
			}
		}
	};

	toolkit.registerFilter = function (name, filterFn) {
		toolkit.filters[name] = filterFn;
	};

	toolkit.registerDirective = function (name, directiveFn) {
		toolkit.directives[name] = directiveFn;
	};

	toolkit.registerService = function (name, serviceFn) {
		toolkit.directives[name] = serviceFn;
	};

	toolkit.bindFilters = function (module, filterNames) {
		toolkit.bind(module, {filters: filterNames});
	};

	toolkit.bindDirectives = function (module, directiveNames) {
		toolkit.bind(module, {directives: directiveNames});
	};

	toolkit.bindServices = function (module, serviceNames) {
		toolkit.bind(module, {services: serviceNames});
	};

	return {
		bind: toolkit.bind,
		bindFilters: toolkit.bindFilters,
		bindDirectives: toolkit.bindDirectives,
		bindServices: toolkit.bindServices,
		registerFilter: toolkit.registerFilter,
		registerDirective: toolkit.registerDirective,
		registerService: toolkit.registerService
	};

})();
