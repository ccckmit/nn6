const nn6 = require('../lib/nn6')
// f(x,y) = x^2 + 2xy + y^2 + 2
// 在 x=0 y=0 時，有最小值 2
class G1 extends nn6.net.Graph {
  constructor () {
    super()
    let v = this.addVariables(['x', 'y', 'xx', '_2xy', 'yy', 'f'])
    this.setDumpVariables(['x', 'y', 'f'])
    this.addInputs([v.x, v.y])
    let c2 = nn6.node.C2
    v.x.value = 1
    v.y.value = 2
    this.setOutput(v.f)
    this.addGates([
      new nn6.gate.Times([v.x, v.x], v.xx),
      new nn6.gate.Times([c2, v.x, v.y], v._2xy),
      new nn6.gate.Times([v.y, v.y], v.yy),
      new nn6.gate.Sum([v.xx, v._2xy, v.yy, c2], v.f)
    ])
    console.log('vars=%j', this.vars)
  }
}

nn6.GradientDescendent(new G1(), 300)