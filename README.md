# Zyenxo v3 - WhatsApp Bot Base

**Zyenxo v3** is a lightweight, modular, and open-source WhatsApp bot base.  
Perfect for developers who want to build their own WhatsApp bot from scratch with full flexibility.

---

## ✨ Main Features

- Clean and well-organized folder structure  
- Modular command system (`whatsapp.js`)  
- Premium user management (`premium.json`)  
- Global configuration system (`config.js`)  
- Built using the Baileys WhatsApp Web API  
- Lightweight and optimized for small servers  
- Custom functions & handlers (`myfunction.js`)

---

## 🧾 Folder Structure

```bash
Zennco/
├── system/                  # Main system folder
│   ├── whatsapp.js          # All WhatsApp commands go here
│   ├── config.js            # Configuration file (owner number, prefix, etc.)
│
├── system/lib/              # Custom library functions
│   ├── myfunction.js        # Contains custom utility functions
│   ├── premium.js           # Premium database loader
│
├── system/database/         # Local databases
│   └── premium.json         # Stores premium user data
│
├── package.json             # Project metadata and dependencies
├── index.js                 # Main entry point of the bot
```

---

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/kagenouReal/Zennco-wa.git
cd Zennco
```

2. Install dependencies:
```bash
npm install
```

3. Run the bot:
```bash
npm start
```

---

## 🛠 Configuration

Edit the `system/config.js` file to configure:
- Owner number
- Prefix, message, and pairing settings

---

## ☕ Example Command

In `system/whatsapp.js`, you can add a command like this:

```js
case 'hello':
  m.reply(m.chat, 'Hello, this is Zyenxo v3!');
  break;
```

---

## 🔐 Premium System

- Premium users are stored in `system/database/premium.json`  
- Handled by `premium.js` for feature access validation

---

## ❤️ Credits

> Zyenxo v3 is developed by [Kagenou](https://github.com/kagenouReal) as a powerful yet simple open-source WhatsApp bot base.

---

## 📜 License

MIT License © 2025 Kagenou-DG
