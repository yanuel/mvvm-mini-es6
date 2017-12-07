let uid = 0;

class Pub {
	static target = null;

	constructor () {
		this.id = uid++;
    	this.subs = [];
	}

	addSub (sub) {
		this.subs.push(sub);
	}

	depend () {
		Pub.target.addPub(this);
	}

	removeSub (sub) {
		let index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
	}

	notify () {
        this.subs.forEach(sub => sub.update());
	}
}

export default Pub;