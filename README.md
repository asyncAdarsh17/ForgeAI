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
# Explain a file directly from terminal
node bin/index.js explain src/index.js

# Debug an error from a file
node bin/index.js debug server.js

# Summarize a large documentation file
node bin/index.js summarize docs/readme.txt

# Analyze entire project architecture
node bin/index.js analyze ./my-project

# Start interactive AI chat
node bin/index.js chat
```

### 🐞 Debug Output Example
```
🤖 Forge AI:

● Bug Detected: Missing return statement in calculateTotal()
● Root Cause: Function computes value but never returns it — always resolves to undefined
● Fix Applied:

  function calculateTotal(price, tax) {
    return price + (price * tax);
  }

● Pattern: Pure function — deterministic, no side effects
● Tip: Always validate return paths in functions with conditional branches
```

### 🧠 Explain Output Example
```
🤖 Forge AI:

● Purpose: Implements JWT-based authentication middleware for Express.js
● Key Logic:
  1. Extracts Bearer token from Authorization header
  2. Verifies token signature using secret key
  3. Attaches decoded user payload to req.user
  4. Calls next() to pass control to the next middleware

● Pattern: Middleware chain — separation of concerns
● Real World Use: Protecting private API routes in production REST APIs
```

### 📁 Analyze Output Example
```
🤖 Forge AI:

● Project: E-Commerce REST API
● Architecture: MVC — Models, Controllers, Routes separated cleanly
● Main Components:
  1. server.js        → Entry point, Express setup, middleware registration
  2. routes/          → All API route definitions
  3. controllers/     → Business logic handlers
  4. models/          → Mongoose schema definitions
  5. middleware/       → Auth, error handling, request validation

● Tech Stack Detected: Node.js, Express, MongoDB, JWT
● Observations:
  - No centralized error handler found — recommend adding one
  - Config values hardcoded in files — recommend using dotenv
```

# 🚀 Features

⚡ Explain code instantly
🐞 Debug errors with AI assistance
🧠 Summarize large files or text
💬 Interactive AI chat
🧾 Generate technical content or code
📂 Analyze entire project folders
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

On first run, Forge AI will automatically ask for your OpenRouter API key and save it. You only need to do this once.

Get your free API key from: https://openrouter.ai

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

Analyze a project folder:
```bash
node bin/index.js analyze ./my-project
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
📁 Analyze Project Folder
⚡ Generate Content
⚡ Chat with AI
📥 Export Full History
❌ Exit
```

---

# 🔑 OpenRouter Setup

ForgeAI uses OpenRouter to access AI models.

On first run the CLI will automatically ask for your API key and save it.

You can get an API key from: https://openrouter.ai

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
│   │   ├── analyze.js
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

GitHub: https://github.com/asyncAdarsh17

---

# 📜 License

MIT License

---

⭐ If you like this project, consider **starring the repository**.