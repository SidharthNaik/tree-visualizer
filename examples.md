# Tree Visualizer Examples

## Multi-Value Node Examples

### Example 1: Simple Binary Tree with Two Values per Node
```
[[1,2],[3,4],[5,6],[7,8]]
```
Tree structure:
```
       [1,2]
       /   \
    [3,4]  [5,6]
    /
  [7,8]
```

### Example 2: Complete Binary Tree
```
[[1,10],[2,20],[3,30],[4,40],[5,50],[6,60],[7,70]]
```
Tree structure:
```
         [1,10]
        /      \
    [2,20]    [3,30]
    /   \      /   \
[4,40][5,50][6,60][7,70]
```

### Example 3: Left-Skewed Tree
```
[[1,2],[3,4],null,[5,6]]
```
Tree structure:
```
   [1,2]
    /
  [3,4]
  /
[5,6]
```

### Example 4: Right-Skewed Tree
```
[[1,2],null,[3,4],null,null,null,[5,6]]
```
Tree structure:
```
[1,2]
    \
   [3,4]
      \
     [5,6]
```

### Example 5: Tree with Null Nodes
```
[[1,2],[3,4],null,[5,6],[7,8]]
```
Tree structure:
```
       [1,2]
       /
    [3,4]
    /   \
[5,6] [7,8]
```

## Single Value Examples

### Example 6: Classic Binary Tree
```
[1,2,3,4,5,6,7]
```

### Example 7: Binary Tree with Nulls
```
[1,2,3,null,null,6,7]
```

## N-ary Tree Examples (Set tree type to N-ary)

### Example 8: N-ary with Multi-Values (max children = 3)
```
[[1,2],null,[3,4],[5,6],[7,8],null,[9,10]]
```

### Example 9: N-ary Single Values (max children = 4)
```
[1,null,2,3,4,5,null,6,7,8]
```

## LeetCode Problem Examples

### Example 10: Interval Tree (LeetCode interval problems)
```
[[0,30],[5,10],[15,20],[17,19]]
```
Useful for interval overlap problems where each node represents [start, end].

### Example 11: Range Sum Tree
```
[[1,10],[2,5],[6,10],[1,3],[4,5],[6,8],[9,10]]
```
Each node could represent [value, range_sum] or similar composite data.

### Example 12: Min-Max Nodes
```
[[5,10],[3,7],[8,10],[1,5],[4,7]]
```
Each node could represent [min, max] values in a subtree.

## Copy-Paste Ready Examples

Copy and paste these directly into the visualizer:

**Simple multi-value:**
```
[[1,2],[3,4],[5,6]]
```

**Complete binary tree:**
```
[[1,10],[2,20],[3,30],[4,40],[5,50],[6,60],[7,70]]
```

**With nulls:**
```
[[1,2],null,[3,4],[5,6]]
```

**LeetCode intervals:**
```
[[0,3],[1,2],[3,4],[5,6]]
```

**Mixed with nulls:**
```
[[1,5],[2,4],null,[3,3],null,null,null,[4,4]]
```
