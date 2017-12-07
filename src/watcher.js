import Pub from './pub';

class Watcher {
	constructor (vm, expOrFn, cb) {
		this.cb = cb;
	    this.vm = vm;
	    this.expOrFn = expOrFn;
	    this.pubIds = {};

	    if (typeof expOrFn === 'function') {
	        this.getter = expOrFn;
	    } else {
	        this.getter = this.parseGetter(expOrFn);
	    }

	    this.value = this.get();
	}

	update () {
		this.run();
	}

	run () {
		var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
	}

	addPub (pub) {
		if (!this.pubIds.hasOwnProperty(pub.id)) {
            pub.addSub(this);
            this.pubIds[pub.id] = pub;
        }
	}

	get () {
		Pub.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Pub.target = null;

        return value;
	}

	parseGetter (exp) {
		if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');

        return (obj) => {
        	for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            
            return obj;
        }
	}
}

export default Watcher;