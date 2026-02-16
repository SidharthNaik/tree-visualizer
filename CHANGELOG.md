# Changelog

## Version 1.1.0 - Scrolling and Padding Fixes

### Fixed
- **Horizontal Scrolling Issue**: Fixed issue where leftmost nodes were not accessible even when scrolling
  - Implemented proper node position shifting algorithm
  - Added 150px horizontal padding on both left and right sides
  - All nodes are now guaranteed to be visible and accessible

### Changes Made

#### visualizer.js
1. **Increased horizontal padding** from 100px to 150px for better visibility
2. **Added vertical padding** of 80px for top and bottom spacing
3. **Implemented position normalization**:
   - Calculate all node positions relative to origin
   - Find minimum X coordinate
   - Shift all nodes so leftmost node is at exactly `horizontalPadding` from left edge
   - Ensures no node is ever positioned off-screen
4. **Updated dimension calculations**:
   - Width now accounts for shifted positions + right padding
   - Height includes vertical padding at bottom

#### styles.css
1. **Changed #treeCanvas display** from `flex` with `justify-content: center` to `inline-block`
   - Prevents flex centering from cutting off wide trees
   - Allows proper horizontal scrolling for trees wider than viewport
2. **Maintained overflow: auto** on `.visualization-container` for scrollbar support

### Technical Details

**Before:**
- Nodes were positioned relative to tree structure only
- Leftmost nodes could be at x=0 or negative coordinates
- Flex centering caused clipping for wide trees
- No normalization of coordinate system

**After:**
- Nodes positioned with guaranteed padding on all sides
- Coordinate system normalized: leftmost node always at 150px from left edge
- Inline-block layout ensures full width is scrollable
- Proper SVG dimensions calculated: `(maxX - minX) + (2 * horizontalPadding)`

### Example
For a tree with 53 nodes like:
```
[[13,13],[12,13],[13,13],...,[10,13]]
```

**Result:**
- Leftmost leaf nodes: positioned at x=150px
- Rightmost leaf nodes: proper padding maintained
- Full horizontal scroll range available
- All 53 nodes accessible via scrolling

### Browser Compatibility
Tested and working in:
- Chrome
- Safari
- Firefox
- Edge

## Version 1.0.0 - Initial Release

### Features
- Multi-value node support `[[num1,num2],...]`
- Binary tree visualization
- N-ary tree support
- Graph cycle detection
- Interactive node clicking
- LeetCode format compatibility
