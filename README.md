# My Todo

O projeto se trata de uma aplicação de gerenciamento de tarefas que permite aos usuários adicionar, editar e excluir tarefas.

## 🚀 Início

Essas instruções permitirão que você obtenha uma cópia do projeto em funcionamento na sua máquina local para fins de testes.

### 📋 Requisitos

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes para JavaScript

### 🔧 Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/manolo-dias/my-todo
    cd my-todo
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
2. Use a interface da aplicação para adicionar, editar, excluir tarefas e filtrar tarefas concluidas, por fazer e todas.
3. O aplicativo tambem se comporta diferente em celulares para trazer mais conforto ao usuário, apenas redimensione a tela para testar.
4. Tarefaz podem ser marcadas como cumpridas clicando nelas ou no checkbox 

### 🔄 Testes

Para rodar os testes, use o comando:

    
    npm test
    
