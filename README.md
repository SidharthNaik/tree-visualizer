# Tree Visualizer

A simple, browser-based tree visualizer designed for LeetCode problems. Visualize binary trees, n-ary trees, and graphs with an intuitive interface.

## Features

- **Binary Tree Visualization**: Visualize binary trees in LeetCode format
- **N-ary Tree Support**: Configurable n-ary trees with custom max children
- **Graph Visualization**: Detect and visualize cycles in graph structures
- **Interactive UI**: Click on nodes to see detailed information
- **Hierarchical Layout**: Top-down tree rendering with automatic positioning
- **Null Node Toggle**: Show or hide null nodes in your visualization

## Quick Start

1. Open `index.html` in your web browser
2. Enter your tree data in LeetCode format (e.g., `[1,2,3,null,5]`)
3. Select the tree type (Binary, N-ary, or Graph)
4. Click "Visualize Tree" or press `Ctrl/Cmd + Enter`

## Input Format

### Single Value Nodes
```
[1,2,3,4,5,6,7]
```
Level-order traversal where each node contains a single value.

### Multi-Value Nodes (Array of Two Numbers)
```
[[1,2],[3,4],[5,6],[7,8]]
```
Each node contains two numbers. The visualizer will display both values stacked in each node.
- `[1,2]` becomes the root
- `[3,4]` becomes the left child
- `[5,6]` becomes the right child
- `[7,8]` becomes the left child of `[3,4]`

### N-ary Tree
```
[1,null,2,3,4,null,5,6]
```
Use `null` as a separator between levels. Configure max children in the UI.
Also works with multi-value format: `[[1,2],null,[3,4],[5,6]]`

### Graph
```
[1,2,3,4,5]
```
Same as binary tree format, but cycles will be detected and shown with dashed red lines.
Works with both single and multi-value formats.

## Examples

### Example 1: Simple Binary Tree
```
Input: [1,2,3,4,5]

        1
       / \
      2   3
     / \
    4   5
```

### Example 2: Multi-Value Binary Tree
```
Input: [[1,2],[3,4],[5,6],[7,8]]

       [1,2]
       /   \
    [3,4]  [5,6]
    /
  [7,8]
```

### Example 3: Binary Tree with Null Nodes
```
Input: [1,null,2,3]

    1
     \
      2
     /
    3
```

### Example 4: Multi-Value with Nulls
```
Input: [[1,2],null,[3,4],[5,6]]

    [1,2]
       \
      [3,4]
      /
   [5,6]
```

### Example 5: N-ary Tree (max children = 3)
```
Input: [1,null,2,3,4,null,5,6]

      1
    / | \
   2  3  4
  / \
 5   6
```

## Features in Detail

### Tree Types

1. **Binary Tree**: Each node has at most 2 children
   - Standard LeetCode binary tree format
   - Null values represent missing nodes

2. **N-ary Tree**: Each node can have multiple children
   - Configure max children per node (2-10)
   - Use `null` to separate parent from children

3. **Graph**: Support for cycles and multiple parents
   - Cycles are detected and shown with red dashed lines
   - Useful for graph-based LeetCode problems

### Configuration Options

- **Tree Type**: Select between Binary, N-ary, or Graph
- **Max Children**: (N-ary only) Set maximum children per node
- **Show Null Nodes**: Toggle visibility of null nodes

### Interactive Features

- Click any node to see detailed information:
  - Node value
  - Array index
  - Children values
  - Position coordinates

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Visualize tree from input

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Technical Details

- Pure vanilla JavaScript (no dependencies)
- SVG-based rendering for crisp visuals
- Responsive design
- Level-order traversal parsing
- Automatic node positioning algorithm

## Use Cases

- Visualizing LeetCode tree problems
- Understanding tree structures
- Debugging tree algorithms
- Learning data structures
- Teaching tree concepts

## Local Development

No build process required. Simply open `index.html` in your browser.

To run with a local server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`

## License

MIT
