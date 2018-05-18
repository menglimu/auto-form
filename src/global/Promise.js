var Promise = function() {
	    this.callbacks = [];
	}
	
Promise.prototype = {
    construct: Promise,
    resolve: function(result) {
        this.complete("resolve", result);
    },

    reject: function(result) {
        this.complete("reject", result);
    },

    complete: function(type, result) {
    	var that = this;
        while (this.callbacks[0]) {
            let callback = this.callbacks.shift()[type]
            if (callback) {
                callback(result,that);
            }
        }
    },

    then: function(successHandler, failedHandler) {
        this.callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });

        return this;
    },
    breakp:function () {
    	this.callbacks=[];
    }
}
export default Promise