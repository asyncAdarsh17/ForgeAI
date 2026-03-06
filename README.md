# ForgeAI ⚡

Production-grade **AI CLI for developers** powered by OpenRouter.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![CLI](https://img.shields.io/badge/Interface-Terminal-black)
![AI](https://img.shields.io/badge/AI-OpenRouter-purple)

ForgeAI is a terminal-based AI assistant that helps developers **explain code, debug issues, summarize files, generate content, and chat with AI directly from the command line.**

It is designed to be **fast, minimal, and developer-friendly**.

---

# ⚡ Quick Demo

```bash
node bin/index.js explain index.js
node bin/index.js debug server.js
node bin/index.js summarize notes.txt
node bin/index.js chat
```

Example Output:

```
Issue:
The function returns undefined because the variable is not returned.

Why it happens:
The function assigns a value but does not include a return statement.

Fix:
Add a return statement to return the computed value.

Corrected Code:
function add(a, b) {
  return a + b;
}
```

---

# 🚀 Features

⚡ Explain code instantly
🐞 Debug errors with AI assistance
🧠 Summarize large files or text
💬 Interactive AI chat
🧾 Generate technical content or code
📂 Analyze files directly from the terminal
📝 Export AI conversation history
🎨 Beautiful CLI interface with colored output

---

# 🛠 Tech Stack

* Node.js
* OpenRouter API
* Inquirer (CLI prompts)
* Ora (loading spinners)
* Chalk (terminal colors)
* Boxen (styled terminal output)
* CLI Highlight (code syntax highlighting)
* Figlet (ASCII banners)

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/asyncAdarsh17/ForgeAI.git
cd ForgeAI
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the CLI

```bash
node bin/index.js
```

This will start the interactive CLI interface.

---

# ⚡ Command Mode

ForgeAI supports direct commands for quick usage.

Explain a file:

```bash
node bin/index.js explain index.js
```

Debug a file:

```bash
node bin/index.js debug server.js
```

Summarize a file:

```bash
node bin/index.js summarize notes.txt
```

Start AI chat:

```bash
node bin/index.js chat
```

---

# 🧠 Interactive Mode

Run ForgeAI without arguments to open the interactive CLI menu:

```bash
node bin/index.js
```

You will see options like:

```
⚡ Explain Code (paste)
📂 Explain a File
⚡ Summarize Text (paste)
📂 Summarize a File
⚡ Debug Errors (paste)
📂 Debug a File
⚡ Chat with AI
📥 Export Full History
❌ Exit
```

---

# 🔑 OpenRouter Setup

ForgeAI uses OpenRouter to access AI models.

Create the config file:

```
~/.forge-ai-pro/config.json
```

Example configuration:

```json
{
  "apiKey": "your-openrouter-api-key"
}
```

You can get an API key from:

https://openrouter.ai

---

# 📁 Project Structure

```
ForgeAI
│
├── bin
│   └── index.js
│
├── src
│   ├── core
│   │   └── openrouter.js
│   │
│   ├── features
│   │   ├── chat.js
│   │   ├── debug.js
│   │   ├── explain.js
│   │   ├── generate.js
│   │   └── summarize.js
│   │
│   ├── setup
│   │   └── firstRun.js
│   │
│   ├── storage
│   │   ├── config.js
│   │   ├── exporter.js
│   │   ├── fileReader.js
│   │   ├── history.js
│   │   └── paths.js
│   │
│   └── ui
│       ├── banner.js
│       └── printer.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

---

# 📤 Export History

ForgeAI stores interaction history so users can export AI responses.

You can export:

* Last generated result
* Full conversation history

This allows saving AI explanations, debugging output, or generated code.

---



# 👨‍💻 Author

Adarsh Landge

GitHub:
https://github.com/asyncAdarsh17

---

# 📜 License

MIT License

---

⭐ If you like this project, consider **starring the repository**.
