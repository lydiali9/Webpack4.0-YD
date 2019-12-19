// import 'babel-polyfill'; // 引入后打包文件明显增大 或者在entry中以数组的形式引入方可
import './test.ts';
import test from './css/test.css';
document.getElementById('mydiv').setAttribute('class', test.div1);

console.log(2);
const str = 123;

async function a () { // babel-polyfill生成一个全局的垫片，在全局垫片中实现这些方法，去解析ES5不兼容的对象，写项目中推荐用这个
    // babel-runtime生成一个局部的垫片，不会污染全局，用哪个就实现哪个

}