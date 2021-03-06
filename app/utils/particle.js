class Circle {
  //创建对象
  //以一个圆为对象
  //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
  //this.r是创建圆的半径，参数越大半径越大
  //this._mx,this._my是移动的距离，参数越大移动
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * 10;
    this._mx = Math.random();
    this._my = Math.random();
  }
  //canvas 画圆和画直线
  //画圆就是正常的用canvas画一个圆
  //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
  drawCircle(ctx) {
    ctx.beginPath();
    //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
    ctx.fill();
  }
  drawLine(ctx, _circle) {
    let dx = this.x - _circle.x;
    let dy = this.y - _circle.y;
    let d = Math.sqrt(dx * dx + dy * dy);
    if (d < 150) {
      ctx.beginPath();
      //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
      ctx.moveTo(this.x, this.y); //起始点
      ctx.lineTo(_circle.x, _circle.y); //终点
      ctx.closePath();
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
      ctx.stroke();
    }
  }
  // 圆圈移动
  // 圆圈移动的距离必须在屏幕范围内
  move(w, h) {
    this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx;
    this._my = this.y < h && this.y > 0 ? this._my : -this._my;
    this.x += this._mx / 2;
    this.y += this._my / 2;
  }
}
//鼠标点画圆闪烁变动
class currentCirle extends Circle {
  constructor(x, y) {
    super(x, y);
  }
  drawCircle(ctx) {
    ctx.beginPath();
    //注释内容为鼠标焦点的地方圆圈半径变化
    //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
    this.r = 8;
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
    ctx.fillStyle = 'rgba(255, 77, 54, 0.6)';
    ctx.fill();
  }
}

class Particle {
  constructor() {
    this.ctx = null;
    this.w = 0;
    this.h = 0;
    this.circles = [];
    this.current_circle = null;
    this.createEle();
  }
  createEle() {
    let canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.w = canvas.width = canvas.offsetWidth;
    this.h = canvas.height = canvas.offsetHeight;
    this.current_circle = new currentCirle(0, 0);
    this.run();
  }
  draw = () => {
    let raFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.circles.forEach((v, i) => {
      v.move(this.w, this.h);
      v.drawCircle(this.ctx);
      for (let j = i + 1; j < this.circles.length; j++) {
        v.drawLine(this.ctx, this.circles[j]);
      }
    });
    if (this.current_circle.x) {
      this.current_circle.drawCircle(this.ctx);
      this.circles.map(k => {
        this.current_circle.drawLine(this.ctx, k);
      });
    }
    raFrame(this.draw);
  };
  init(num) {
    while (num--) {
      this.circles.push(
        new Circle(Math.random() * this.w, Math.random() * this.h)
      );
    }
    this.draw();
  }
  run() {
    this.init(22);
    window.onmousemove = e => {
      e = e || window.event;
      this.current_circle.x = e.clientX;
      this.current_circle.y = e.clientY;
    };
    window.onmouseout = () => {
      this.current_circle.x = null;
      this.current_circle.y = null;
    };
  }
}
new Particle();
