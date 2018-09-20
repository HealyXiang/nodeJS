const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

const shape = [2, 3]; // 2 行, 3 列
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // 输出张量的值
// 输出: [[1 , 2 , 3 ],
//       [10, 20, 30]]

// 张量的维度形状是可以被推测的:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();

const c = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
c.print();