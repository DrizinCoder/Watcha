# 📺 Watcha - Streaming for Peers

O **Watcha** é uma plataforma de streaming simplificada desenvolvida para facilitar o compartilhamento de conteúdo em vídeo entre colegas. Seja para aulas, tutoriais ou demonstrações, o Watcha oferece uma interface fluida e um sistema de streaming robusto.

---

## 🚀 Tecnologias

| Front-end | Back-end |
| :--- | :--- |
| **Next.js 14** (App Router) | **Node.js** com **Express** |
| **Tailwind CSS** (Estilização) | **TypeScript** |
| **Axios** (Integração com API) | **Multer** (Upload Local) |
| **Lucide React** (Ícones) | **SQLite** (Banco de Dados) |

---

## ✨ Funcionalidades

- [x] **Galeria de Vídeos:** Listagem dinâmica consumindo a API em tempo real.
- [x] **Streaming Real:** Player de vídeo otimizado que consome dados via streaming do servidor.
- [x] **Upload de Conteúdo:** Sistema de upload com suporte a metadados (título e descrição).
- [x] **Interface Responsiva:** Design moderno focado na experiência do usuário (UX).

---

## 🛠️ Como rodar o projeto

### **Pré-requisitos**
* Node.js instalado
* Git

### **Passo a passo**

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/watcha.git](https://github.com/seu-usuario/watcha.git)
   cd watcha
   ```

2. **Configurando o Servidor (Back-end):**
    ``` bash
    cd server
    npm install
    npm run dev
    ```

3. **Configurando o Cliente (Front-end):**
    ``` bash
    cd ../client
    npm install
    npm run dev
    ```
---
## 📁 Estrutura do Projeto

```plaintext
watcha/
├── client/                 # Aplicação Next.js (Front-end)
│   ├── src/
│   │   ├── app/            # Rotas, Páginas e UI
│   │   └── services/       # Camada de integração com API
└── server/                 # API Express (Back-end)
    ├── src/                # Controladores e Rotas
    └── uploads/            # Armazenamento local dos vídeos (Multipart)
```
---

## 👥 Time de Desenvolvimento

| Membro              | Função                   | Redes Sociais |
|---------------------|--------------------------|-----------------|
| Guilherme Fernandes | Front-end & Integração   | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DrizinCoder) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/_guifern/)
| Robson Carvalho     | Backend & Infraestrutura | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Robson-Carvalho) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/_robsonn_carvalho/)
