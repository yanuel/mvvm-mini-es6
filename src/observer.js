import Pub from './pub';
//劫持监听所有属性
class Observer {
	constructor (data) {
		this.data = data;
    	this.walk(data);
	}

	walk (data) {
		Object.keys(data).forEach((key) => {
			this.convert(key, data[key]);
		});
	}

	convert (key, val) {
		this.defineReactive(this.data, key, val);
	}

	defineReactive (data, key, val) {
        let [pub, childObj] = [new Pub(), observe(val)];

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false,
            get: function() {
                if (Pub.target) {
                    pub.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                pub.notify();
            }
        });
	}
}

export default function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


