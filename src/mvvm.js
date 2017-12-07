import Compile from './compile';
import Observe from './observer';
import Watcher from './watcher';

class MVVM {
	constructor (options) {
		this.$options = options || {};
	    let data = this._data = this.$options.data;

	    // 数据代理
	    // 实现 vm.xxx -> vm._data.xxx
	    Object.keys(data).forEach((key) => {
	    	this._proxyData(key);
	    });

	    this._initComputed();

	    Observe(data, this);

	    this.$compile = new Compile(options.el || document.body, this)
	}

	$watch (key, cb) {
		new Watcher(this, key, cb);
	}

	_proxyData (key, setter, getter) {
		let self = this;
        setter = setter || 
        Object.defineProperty(self, key, {
            configurable: false,

            enumerable: true,

            get () {
            	return self._data[key];
            },

            set (newVal) {
            	self._data[key] = newVal;
            }            
        });
	}

	_initComputed () {
		let [self, computed] = [this, this.$options.computed];

        if (typeof computed === 'object') {
        	Object.keys(computed).forEach((key) => {
        		Object.defineProperty(this, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set () {

                    }
                });
        	});
        }
	}
}

export default MVVM;