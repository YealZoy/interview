// plugin
module.exports = function({ types: t }) {
    return {
        visitor: {
            VariableDeclaration(path) {
                const node = path.node;
                ['let', 'const'].includes(node.kind) && (node.kind = 'var');
            },
            ArrowFunctionExpression(path) {
                let { id, params, body, generator, async } = path.node;
                //箭头函数我们会简写{return a+b} 为 a+b
                if (!t.isBlockStatement(body)) {
                    const node = t.returnStatement(body);
                    body = t.blockStatement([node]);
                }
                path.replaceWith(t.functionExpression(id, params, body, generator, async));
            }
        }
    };
};

//--------------

const { transform } = require('@babel/core');

const fs = require('fs');

const before = fs.readFileSync('./before.js', 'utf8');

const res = transform(`${before}`, {
    plugins: [require('./plugin')]
});

fs.existsSync('./after.js') && fs.unlinkSync('./after.js');

fs.writeFileSync('./after.js', res.code, 'utf8');