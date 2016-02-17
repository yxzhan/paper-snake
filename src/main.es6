require('style/style.less');
var Vue = require('Vue');

$(document).ready( function() {
    window.app = new Vue ({
        el: '#mainContainer',
        data: {
        },
        created(){

        },
        ready(){
            console.log('Vue ready!');
        },
        components: {
            'board': require('module/board/board.es6'),
            'tools': require('module/tools/tools.es6')
        }
    });
});


