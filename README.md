# UnNode 🧹

A clean and simple web application for removing unwanted XML nodes from your files. Built with SvelteKit.

![UnNode Interface](screenshot.png)

## Features ✨

- **Dual Search Modes**: Choose between Regex or XPath for finding nodes
- **Visual Node Preview**: See exactly what you're targeting before removal
- **Real-time Counting**: Count matching nodes before deciding to remove them
- **Clean Interface**: Simple, gradient-styled UI that's easy to use
- **File Safety**: Original files are never modified - always creates new cleaned files
- **Cross-platform**: Works in any modern web browser

## How It Works 🔧

### Regex Mode (Default)
- Specify **Tag Name**, **Attribute Name**, and **Attribute Value**
- Uses pattern matching to find and remove XML elements
- Example: Remove all `<div class="unwanted">` elements

### XPath Mode
- Uses XML parsing with XPath expressions
- More precise node selection using standard XPath syntax
- Example XPath: `//div[@class='unwanted']`

## Usage 📖

1. **Upload XML File**: Click "Choose file" and select your XML document
2. **Choose Search Mode**: Select either "Regex" or "XPath" 
3. **Define Target Nodes**:
   - Enter the tag name (e.g., `div`)
   - Enter the attribute name (e.g., `class`) 
   - Enter the attribute value (e.g., `unwanted`)
4. **Count First**: Click "Count Nodes" to see how many matches were found
5. **Remove**: Click "Remove all X nodes" to eliminate the matching elements
6. **Save**: Download your cleaned XML file

## Installation & Development 🛠️

```bash
# Clone the repository
git clone https://github.com/oezg/unnode.git
cd unnode

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure 📁

```
src/
├── lib/
│   └── utils/
│       ├── nodeUtils.js     # Regex-based node operations
│       ├── xpathUtils.js    # XPath-based node operations
│       ├── regexUtils.js    # Regex pattern generation
│       └── fileUtils.js     # File handling utilities
├── routes/
│   └── +page.svelte        # Main application component
└── app.html                # HTML template
```

## Technologies Used 💻

- **SvelteKit** - Modern web framework
- **JavaScript** - Core functionality
- **DOMParser** - XML parsing for XPath mode
- **CSS3** - Gradient styling and responsive design
- **HTML5** - File API for local file handling

## Use Cases 🎯

Perfect for:
- **Data Cleaning**: Remove tracking pixels, analytics tags, or unwanted metadata
- **XML Preprocessing**: Clean XML before importing to other systems
- **Content Migration**: Strip unwanted elements during site migrations
- **Template Cleanup**: Remove development-only tags from production XML
- **Batch Processing**: Clean multiple XML files with consistent unwanted elements

## Browser Support 🌐

Works in all modern browsers that support:
- File API
- DOMParser
- XPath evaluation
- ES6+ JavaScript

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

MIT License - see [LICENSE](LICENSE) file for details.

## Roadmap 🗺️

- [ ] Batch file processing
- [ ] Custom XPath expression input
- [ ] Preview of nodes before removal
- [ ] Support for other XML-like formats (HTML, SVG)
- [ ] Undo/Redo functionality
- [ ] Drag & drop file upload

---

**UnNode** - Making XML cleaning simple and intuitive. No complex tools, no command line - just upload, target, and clean. 🎯