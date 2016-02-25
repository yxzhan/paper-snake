require('./board.less');
var brush = require('module/Brush.es6');
var randomColor = require('randomColor');

module.exports = {
    template: require('./board.html'),
    data(){
        return {
            paths: [],
            currentPath: null,
            snack: null,
            bgColor: ''
        }
    },
    ready(){
        this.initPaper();
        this.createSnack();
    },
    events: {
        'clean-board'(){
            this.cleanPaths();
        }
    },
    methods: {
        initPaper(){
            var that = this;
            paper.install(window);
            paper.setup('myCanvas');
            paper.tool = new Tool();
            var path;
            // Define a mousedown and mousedrag handler
            paper.tool.onMouseDown = function(event) {
                that.updateCurrentPath(event.point);
                //path.strokeWidth = brush.width;
                //path.add(event.point);
                //that.paths.push(path);
            };

            //paper.tool.onMouseUp = function(event) {
            //    path.add(event.point);
            //};
            //
            //paper.tool.onMouseDrag = function(event) {
            //    if(brush.type === 'line'){
            //        path.removeSegments(1);
            //    }
            //    path.add(event.point);
            //};
            this.updateCurrentPath(new Point(100,100));
        },
        updateCurrentPath(p){
            this.currentPath && this.currentPath.remove();
            var c = randomColor();
            this.currentPath = new Path.Circle({
                center: p,
                radius: 5,
                fillColor: c,
                strokeWidth: 0,
                shadowColor: c,
                shadowBlur: 10
            });
        },
        createSnack(){
            var that = this;
            var length = 10, amount = 20, minDis = 2, speed = 2, c = randomColor();
            this.snack = new Path({
                strokeColor: c,
                strokeWidth: 10,
                strokeCap: 'round',
                shadowColor: 'rgb(0,0,0)',
                shadowBlur: 5
            });
            var start = view.center;
            for (var i = 0; i < amount; i++){
                this.snack.add(new Point(i * length + start.x, start.y));
            }
            this.snack.onFrame = function(e){
                if(that.currentPath){
                    var dx = that.currentPath.position.x - this.firstSegment.point.x,
                        dy = that.currentPath.position.y - this.firstSegment.point.y;
                    if(Math.abs(dx) < minDis && Math.abs(dy) < minDis) {
                        let p = new Point(Math.random()*view.bounds.width,Math.random()*view.bounds.height);
                        console.log(this.strokeColor._canvasStyle);
                        that.bgColor = this.strokeColor._canvasStyle;
                        this.strokeColor = that.currentPath.fillColor;
                        that.updateCurrentPath(p);
                        return true;
                    }
                    //var speed = speed < Math.sqrt(dx*dx + dy*dy) ? Math.sqrt(dx*dx + dy*dy) : speed;
                    this.firstSegment.point.x += (dx > 0 ? speed : -speed)*Math.cos(Math.atan(Math.abs(dy)/Math.abs(dx)));
                    this.firstSegment.point.y += (dy > 0 ? speed : -speed)*Math.sin(Math.atan(Math.abs(dy)/Math.abs(dx)));
                    for (var i = 0; i < amount - 1; i++) {
                        var segment = this.segments[i];
                        var nextSegment = segment.next;
                        var vector = new Point(segment.point.x - nextSegment.point.x, segment.point.y - nextSegment.point.y);
                        vector.length = length;
                        nextSegment.point = new Point(segment.point.x - vector.x,segment.point.y - vector.y);
                    }
                    this.smooth({ type: 'continuous' });
                }
            }
        },
        cleanPaths(){
            this.paths.forEach((item)=>{
                item.remove();
            });
            this.paths = [];
        }
    }
};