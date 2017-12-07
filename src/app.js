import MVVM from './mvvm';

let vm = new MVVM({
    el: '#mvvm-app',
    data: {
        someStr: 'hello ',
        className: 'btn',
        htmlStr: '<span style="color: #f00;">red</span>',
        child: {
            someStr: 'World !'
        }
    },

    computed: {
        getHelloWord: function() {
            return this.someStr + this.child.someStr;
        }
    },

    methods: {
        clickBtn: function(e) {
            var randomStrArr = ['One', 'Two', 'Three'];
            this.child.someStr = randomStrArr[parseInt(Math.random() * 3)];
        }
    }
});

vm.$watch('child.someStr', function() {
    console.log(arguments);
});