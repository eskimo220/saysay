export default class Saysay {
  static animates = [];
  constructor(dom, steps) {
    if (!dom) return;

    this.pointer = 0;
    this.node = dom;
    var str = this.node.innerHTML;
    this.str = str.replace("<br>", "|").split("");
    this.types = [];
    this.step = steps;
    this.intervalID = null;
    for (var i = 0; i < this.str.length; i++) {
      var ch = this.str[i];
      if (ch === " " || ch === "　") {
        this.types[i] = "space";
      } else if (ch === "|") {
        this.types[i] = "br";
      } else if (ch.match(/^[0-9a-zA-Z]+$/) || ch == ".") {
        this.types[i] = "symbol";
      } else {
        this.types[i] = "symbol2";
      }
    }
  }
  setText(text) {
    clearTimeout(this.intervalID);
    var str = text;
    this.str = str.replace("<br>", "|").split("");
    this.types = [];
    this.intervalID = null;
    for (var i = 0; i < this.str.length; i++) {
      var ch = this.str[i];
      if (ch === " " || ch === "　") {
        this.types[i] = "space";
      } else if (ch === "|") {
        this.types[i] = "br";
      } else if (
        ch.match(/^[0-9a-zA-Z]+$/) ||
        ch == "." ||
        ch == "#" ||
        ch == "(" ||
        ch == ")" ||
        ch == "/" ||
        ch == "-"
      ) {
        this.types[i] = "symbol";
      } else {
        this.types[i] = "symbol2";
      }
    }
    this.pointer = 0;
  }

  clear() {
    this.pointer = 0;
    clearTimeout(this.intervalID);
    this.node.innerHTML = " ";
  }

  tick(start) {
    var strClone = this.str.slice(0);
    if (start > this.str.length) {
      var index = Saysay.animates.indexOf(this);
      Saysay.animates.splice(index, 1);
      return;
    }
    for (var i = Math.max(start, 0); i < this.str.length; i++) {
      if (i < start + this.step) {
        strClone[i] = this.randomChar(this.types[i]);
      } else {
        strClone[i] = "";
      }
    }
    this.pointer = start;
    if (Saysay.animates.indexOf(this) < 0) Saysay.animates.push(this);

    console.log(strClone.join(""));
    var d = "";
    this.node.innerHTML = strClone.join("").replace("|", "<br/>") + d;
  }

  randomChar(type) {
    var pool;
    switch (type) {
      case "symbol":
        pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        break;
      case "symbol2":
        pool =
          "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃゅょっアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォャュョッヴ";
        break;
      default:
        pool = "";
    }
    if (type == "br") {
      return "<br/>";
    }
    var arr = pool.split("");
    return arr[Math.floor(Math.random() * arr.length)];
  }

  render = () => {
    requestAnimationFrame(this.render);
    Saysay.animates.forEach(function(el) {
      el.tick(el.pointer + 1);
    });
  };
}
