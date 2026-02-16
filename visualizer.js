class TreeNode {
    constructor(val, index) {
        this.val = val;
        this.index = index;
        this.children = [];
        this.x = 0;
        this.y = 0;
        this.isNull = val === null;
        this.isMultiValue = Array.isArray(val) && val !== null;
    }

    getDisplayValue() {
        if (this.isNull) return 'null';
        if (this.isMultiValue) {
            return this.val.join(',');
        }
        return String(this.val);
    }

    getFullValue() {
        if (this.isNull) return 'null';
        if (this.isMultiValue) {
            return `[${this.val.join(', ')}]`;
        }
        return String(this.val);
    }
}

class TreeVisualizer {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.cycles = [];
        this.nodeSpacing = 80;
        this.levelSpacing = 100;
        this.nodeRadius = 30;
        this.horizontalPadding = 150;
        this.verticalPadding = 80;

        this.init();
    }

    init() {
        this.visualizeBtn = document.getElementById('visualizeBtn');
        this.treeInput = document.getElementById('treeInput');
        this.treeType = document.getElementById('treeType');
        this.maxChildren = document.getElementById('maxChildren');
        this.showNull = document.getElementById('showNull');
        this.treeCanvas = document.getElementById('treeCanvas');
        this.treeInfo = document.getElementById('treeInfo');
        this.naryConfig = document.getElementById('naryConfig');

        this.visualizeBtn.addEventListener('click', () => this.visualize());
        this.treeType.addEventListener('change', () => this.handleTreeTypeChange());

        this.treeInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.visualize();
            }
        });
    }

    handleTreeTypeChange() {
        const type = this.treeType.value;
        this.naryConfig.style.display = type === 'nary' ? 'flex' : 'none';
    }

    parseInput(input) {
        input = input.trim();
        if (!input.startsWith('[') || !input.endsWith(']')) {
            throw new Error('Input must be a valid array format: [1,2,3,...] or [[1,2],[3,4],...]');
        }

        const content = input.slice(1, -1).trim();
        if (content === '') {
            return [];
        }

        // Check if input contains nested arrays like [[1,2],[3,4]]
        if (content.startsWith('[')) {
            try {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed)) {
                    return parsed.map(item => {
                        if (item === null) return null;
                        if (Array.isArray(item)) {
                            // Convert nested array values to numbers if possible
                            return item.map(val => {
                                if (val === null) return null;
                                const num = parseFloat(val);
                                return isNaN(num) ? val : num;
                            });
                        }
                        const num = parseFloat(item);
                        return isNaN(num) ? item : num;
                    });
                }
            } catch (e) {
                throw new Error('Invalid nested array format. Use [[1,2],[3,4],...] or [1,2,3,...]');
            }
        }

        // Original simple array format
        return content.split(',').map(item => {
            item = item.trim();
            if (item === 'null' || item === 'None') {
                return null;
            }
            const num = parseFloat(item);
            if (isNaN(num)) {
                return item.replace(/['"]/g, '');
            }
            return num;
        });
    }

    buildBinaryTree(values) {
        if (!values || values.length === 0) return null;

        const root = new TreeNode(values[0], 0);
        const queue = [root];
        let i = 1;

        while (queue.length > 0 && i < values.length) {
            const node = queue.shift();

            if (node.isNull) continue;

            if (i < values.length) {
                const leftChild = new TreeNode(values[i], i);
                node.children.push(leftChild);
                queue.push(leftChild);
                i++;
            }

            if (i < values.length) {
                const rightChild = new TreeNode(values[i], i);
                node.children.push(rightChild);
                queue.push(rightChild);
                i++;
            }
        }

        return root;
    }

    buildNaryTree(values, maxChildren) {
        if (!values || values.length === 0) return null;

        const root = new TreeNode(values[0], 0);
        const queue = [root];
        let i = 1;

        while (queue.length > 0 && i < values.length) {
            const node = queue.shift();

            if (node.isNull) continue;

            while (i < values.length && values[i] !== null) {
                const child = new TreeNode(values[i], i);
                node.children.push(child);
                queue.push(child);
                i++;

                if (node.children.length >= maxChildren) break;
            }

            if (i < values.length && values[i] === null) {
                i++;
            }
        }

        return root;
    }

    buildGraph(values) {
        if (!values || values.length === 0) return null;

        const nodeMap = new Map();
        const root = new TreeNode(values[0], 0);
        nodeMap.set(0, root);

        const queue = [root];
        let i = 1;

        while (queue.length > 0 && i < values.length) {
            const node = queue.shift();

            if (node.isNull) continue;

            if (i < values.length) {
                let leftChild;
                if (nodeMap.has(i)) {
                    leftChild = nodeMap.get(i);
                    this.cycles.push({ from: node.index, to: leftChild.index });
                } else {
                    leftChild = new TreeNode(values[i], i);
                    nodeMap.set(i, leftChild);
                    queue.push(leftChild);
                }
                node.children.push(leftChild);
                i++;
            }

            if (i < values.length) {
                let rightChild;
                if (nodeMap.has(i)) {
                    rightChild = nodeMap.get(i);
                    this.cycles.push({ from: node.index, to: rightChild.index });
                } else {
                    rightChild = new TreeNode(values[i], i);
                    nodeMap.set(i, rightChild);
                    queue.push(rightChild);
                }
                node.children.push(rightChild);
                i++;
            }
        }

        return root;
    }

    calculatePositions(root, showNullNodes) {
        if (!root) return { width: 0, height: 0 };

        this.nodes = [];
        this.edges = [];

        const getTreeWidth = (node, level = 0) => {
            if (!node || (node.isNull && !showNullNodes)) return 0;

            if (node.children.length === 0) return 1;

            let width = 0;
            for (const child of node.children) {
                width += getTreeWidth(child, level + 1);
            }
            return Math.max(width, 1);
        };

        const assignPositions = (node, level, left, right) => {
            if (!node || (node.isNull && !showNullNodes)) return;

            const mid = (left + right) / 2;
            node.x = mid * this.nodeSpacing;
            node.y = level * this.levelSpacing + this.verticalPadding;

            this.nodes.push(node);

            if (node.children.length > 0) {
                const childWidths = node.children.map(child =>
                    getTreeWidth(child, level + 1)
                );
                const totalWidth = childWidths.reduce((a, b) => a + b, 0);

                let currentLeft = left;
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    const childWidth = childWidths[i];
                    const childRight = currentLeft + childWidth;

                    const isCycle = this.cycles.some(c =>
                        c.from === node.index && c.to === child.index
                    );

                    this.edges.push({
                        from: node,
                        to: child,
                        isCycle: isCycle
                    });

                    assignPositions(child, level + 1, currentLeft, childRight);
                    currentLeft = childRight;
                }
            }
        };

        const treeWidth = getTreeWidth(root);
        assignPositions(root, 0, 0, treeWidth);

        // Find the actual min and max positions
        const minX = Math.min(...this.nodes.map(n => n.x));
        const maxX = Math.max(...this.nodes.map(n => n.x));
        const maxY = Math.max(...this.nodes.map(n => n.y));

        // Shift all nodes so leftmost is at horizontalPadding from origin
        const xOffset = this.horizontalPadding - minX;
        this.nodes.forEach(node => {
            node.x += xOffset;
        });

        // Recalculate max after shift
        const newMaxX = Math.max(...this.nodes.map(n => n.x));

        return {
            width: newMaxX + this.horizontalPadding,
            height: maxY + this.verticalPadding
        };
    }

    renderTree(dimensions) {
        this.treeCanvas.innerHTML = '';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', dimensions.width);
        svg.setAttribute('height', dimensions.height);

        this.edges.forEach(edge => {
            if (edge.to.isNull && !this.showNull.checked) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('class', edge.isCycle ? 'cycle-edge' : 'tree-edge');
            svg.appendChild(line);
        });

        this.nodes.forEach(node => {
            if (node.isNull && !this.showNull.checked) return;

            // Use larger radius for multi-value nodes
            const radius = node.isMultiValue ? this.nodeRadius * 1.3 : this.nodeRadius;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', radius);
            circle.setAttribute('class', node.isNull ? 'tree-node null-node' : 'tree-node');

            circle.addEventListener('click', () => {
                this.showNodeInfo(node);
            });

            // Handle multi-value nodes with two lines
            if (node.isMultiValue && node.val.length === 2) {
                const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text1.setAttribute('x', node.x);
                text1.setAttribute('y', node.y - 6);
                text1.setAttribute('class', 'node-text');
                text1.textContent = node.val[0];

                const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text2.setAttribute('x', node.x);
                text2.setAttribute('y', node.y + 8);
                text2.setAttribute('class', 'node-text node-text-small');
                text2.textContent = node.val[1];

                svg.appendChild(circle);
                svg.appendChild(text1);
                svg.appendChild(text2);
            } else {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', node.x);
                text.setAttribute('y', node.y);
                text.setAttribute('class', 'node-text');
                text.textContent = node.getDisplayValue();

                svg.appendChild(circle);
                svg.appendChild(text);
            }
        });

        this.treeCanvas.appendChild(svg);
    }

    showNodeInfo(node) {
        const childrenDisplay = node.children.length > 0
            ? node.children.map(c => c.getFullValue()).join(', ')
            : 'None';

        const info = `
Node Value: ${node.getFullValue()}
Index: ${node.index}
Children: ${childrenDisplay}
Position: (${node.x}, ${node.y})
        `.trim();
        this.treeInfo.textContent = info;
    }

    visualize() {
        try {
            this.cycles = [];
            const input = this.treeInput.value;
            const values = this.parseInput(input);

            if (values.length === 0) {
                throw new Error('Empty tree');
            }

            const type = this.treeType.value;
            let root;

            switch (type) {
                case 'binary':
                    root = this.buildBinaryTree(values);
                    break;
                case 'nary':
                    const maxChildrenVal = parseInt(this.maxChildren.value) || 3;
                    root = this.buildNaryTree(values, maxChildrenVal);
                    break;
                case 'graph':
                    root = this.buildGraph(values);
                    break;
                default:
                    throw new Error('Invalid tree type');
            }

            const dimensions = this.calculatePositions(root, this.showNull.checked);
            this.renderTree(dimensions);

            const stats = `
Visualized ${type === 'binary' ? 'Binary Tree' : type === 'nary' ? 'N-ary Tree' : 'Graph'}
Total Nodes: ${values.length}
Visible Nodes: ${this.nodes.length}
Depth: ${Math.max(...this.nodes.map(n => n.y)) / this.levelSpacing + 1}
${this.cycles.length > 0 ? `Cycles Detected: ${this.cycles.length}` : ''}
            `.trim();
            this.treeInfo.textContent = stats;

        } catch (error) {
            this.treeCanvas.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #dc3545;">
                    <h3>Error</h3>
                    <p>${error.message}</p>
                </div>
            `;
            console.error(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TreeVisualizer();
});
