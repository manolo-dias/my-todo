# My Toto

O projeto se trata de uma aplicação de gerenciamento de tarefas que permite aos usuários adicionar, editar e excluir tarefas.

## 🚀 Início

Essas instruções permitirão que você obtenha uma cópia do projeto em funcionamento na sua máquina local para fins de desenvolvimento e teste.

### 📋 Requisitos

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes para JavaScript

### 🔧 Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/manolo-dias/my-todo
    cd seu-repositorio
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

### 🏃‍♂️ Executando o Projeto

Para rodar a aplicação localmente, use os seguintes comandos:

1. **Iniciar o servidor de desenvolvimento**:
    ```bash
    npm start
    ```
    Isso iniciará o servidor e você poderá acessar a aplicação em [http://localhost:3000](http://localhost:3000).

2. **Rodar o proxy (necessário)**:
Em outro terminal, rode 
    ```bash 
    npm run proxy 
    ```
    Isso é necessario pra evitar problema com o cors (e essencial pra aplicação funcionar)
    

### 💡 Como Usar
Agora você está pronto para usar!

1. Abra o navegador e vá para [http://localhost:3000](http://localhost:3000).
2. Use a interface da aplicação para adicionar, editar e excluir tarefas.

### 🔄 Testes

Para rodar os testes, use o comando:

    ```bash
    npm test
    ```