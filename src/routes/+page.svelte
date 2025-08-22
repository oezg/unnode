<script>
  import { toNode, countNode, removeNodes } from "$lib/utils/nodeUtils";
  import { xpathCount, xpathRemove } from "$lib/utils/xpathUtils";
  import { saveFile } from "$lib/utils/fileUtils";
  let selectedFile = null;
  let fileContent = "";
  let tagName = "";
  let attributeName = "";
  let attributeValue = "";
  let nodeCount = null;
  let isNodesRemoved = false;
  let searchMode = "regex";

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectedFile = file;
      console.log("Selected file:", file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        fileContent = e.target.result;
        console.log("File loaded!");
      };
      reader.readAsText(file);
    }
  };

  const handleCountNode = () => {
    const counter = searchMode == "regex" ? countNode : xpathCount;
    nodeCount = counter(tagName, attributeName, attributeValue, fileContent);
  };

  const handleSaveFile = () => {
    saveFile(fileContent, selectedFile.name);
  };

  const handleRemoveNodes = () => {
    const [counter, remover] =
      searchMode == "regex"
        ? [countNode, removeNodes]
        : [xpathCount, xpathRemove];
    fileContent = remover(tagName, attributeName, attributeValue, fileContent);
    isNodesRemoved =
      0 === counter(tagName, attributeName, attributeValue, fileContent);
  };
</script>

<div class="container">
  <h1>XML Node Cleaner</h1>
  <p>I remove your nodes from xml</p>

  <input type="file" accept=".xml" on:change={handleFileSelect} />

  {#if selectedFile && fileContent}
    <p class="file-info">Selected: {selectedFile.name}</p>

    <div class="mode-switch">
      <label>
        <input type="radio" bind:group={searchMode} value="regex" />
        Regex
      </label>
      <label>
        <input type="radio" bind:group={searchMode} value="xpath" />
        XPath
      </label>
    </div>

    <div class="inputs">
      <input
        type="text"
        placeholder="Tag name (e.g., div)"
        bind:value={tagName}
      />
      <input
        type="text"
        placeholder="Attribute name (e.g., class)"
        bind:value={attributeName}
      />
      <input
        type="text"
        placeholder="Attribute value (e.g., unwanted)"
        bind:value={attributeValue}
      />
    </div>
  {/if}
  {#if tagName && attributeName && attributeValue}
    <p class="node-info">
      Node: {toNode(tagName, attributeName, attributeValue)}
    </p>
    <button on:click={handleCountNode}
      >Count Nodes in {selectedFile.name}?</button
    >
  {/if}

  {#if nodeCount !== null}
    <p class="node-count">{nodeCount} nodes found</p>

    {#if nodeCount > 0}
      <button on:click={handleRemoveNodes}>Remove all {nodeCount} nodes?</button
      >
    {/if}
  {/if}

  {#if isNodesRemoved}
    <button on:click={handleSaveFile}>Save Celaned File</button>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 3rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  h1 {
    color: white;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 3rem;
    font-weight: 300;
  }

  .file-info {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: yellow;
    font-weight: 500;
  }

  .mode-switch {
    display: flex;
    gap: 2rem;
    margin: 1rem 0 2rem 0;
    justify-content: center;
  }

  .mode-switch label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .mode-switch input[type="radio"] {
    margin: 0;
    transform: scale(1.2);
  }

  .node-count {
    font-size: 1.1rem;
    color: #90ee90;
    margin: 1rem 0;
    font-weight: 500;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  input[type="text"] {
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    width: 300px;
  }

  input[type="file"],
  button {
    padding: 1rem 2rem;
    background: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.5rem;
  }

  button:hover {
    background: #f0f0f0;
  }

  :global(body) {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
