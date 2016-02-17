require('./tools.less');

module.exports = {
    template: require('./tools.html'),
    data(){
        return {
            brush: require('module/Brush.es6')
        }
    },
    ready(){

    },
    created(){

    },
    methods: {
        setBrush(type){
            this.brush.type = type;
        },
        cleanBoard(){
            app.$broadcast('clean-board');
        }
    }
};