# Furia Chat 2

Bem-vindo ao **Furia Chat 2**, um projeto de chat interativo desenvolvido para fãs da FURIA, uma das maiores organizações de esports do Brasil. Este projeto foi criado com React e Firebase, permitindo que usuários interajam em tempo real, enviem mensagens e recebam respostas automáticas do `furiaBOT`, um bot temático da FURIA. O chat inclui funcionalidades como comandos personalizados, cores aleatórias para usuários, e uma interface estilizada com o tema da FURIA.

## Funcionalidades

- **Chat em Tempo Real:** Usuários podem enviar mensagens que são salvas e exibidas em tempo real usando o Firestore do Firebase.
- **furiaBOT:** Um bot personalizado que responde a comandos específicos:
  - `/furia`: Retorna mensagens motivacionais da FURIA.
  - `/resultado`: Mostra o resultado do último jogo (ex.: "THE MONGOLZ 2x0 FURIA").
  - `/loja`: Fornece um link para a loja oficial da FURIA.
  - `/contato`: Fornece um link para contato via WhatsApp.
  - `/meme`: Retorna memes engraçados relacionados a esports.
  - `#DIADEFURIA`: Ativa uma resposta temática do bot.
  - `/menu`: Lista todos os comandos disponíveis.
- **Cores Aleatórias:** Cada usuário recebe uma cor aleatória para seu nome no chat, facilitando a identificação.
- **Validação de Nome:** Os nomes dos usuários são validados (somente letras e números, até 20 caracteres).
- **Scroll Automático:** As mensagens mais recentes aparecem na parte inferior, com scroll suave para o final.
- **Alinhamento das Mensagens:** Mensagens alinhadas à esquerda para melhor legibilidade.
- **Notícias e Jogos Recentes:** A interface exibe notícias da FURIA e resultados de jogos recentes (mockados), como parte do design.
- **Tema FURIA:** Estilo visual inspirado na identidade da FURIA, com logos, sombras e cores temáticas.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção da interface.
- **Firebase (v9.22.0):** Firestore para armazenamento e sincronização de mensagens em tempo real.
- **CSS:** Estilização personalizada com tema da FURIA.
- **Node.js e npm:** Gerenciamento de dependências e execução do projeto.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:
- **Node.js** (versão 14 ou superior) e **npm**.
- Um navegador moderno (como Chrome ou Firefox).
- Uma conta no [Firebase](https://firebase.google.com) para configurar o Firestore.

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/furia-chat-2.git
   cd furia-chat-2
   ```

2. **Instale as Dependências**
   Certifique-se de estar na pasta do projeto e instale as dependências com:
   ```bash
   npm install
   ```
   Para garantir a versão correta do Firebase, instale especificamente:
   ```bash
   npm install firebase@9.22.0
   ```

3. **Configure o Firebase**
   - Acesse o [Console do Firebase](https://console.firebase.google.com).
   - Crie um novo projeto (ex.: `furia-chat-2`).
   - Habilite o Firestore Database e crie uma coleção chamada `messages`.
   - No arquivo `src/pages/firebase.js`, verifique se as credenciais do Firebase estão corretas (o arquivo já está configurado com as credenciais fornecidas, mas você pode precisar ajustá-las para seu próprio projeto).

4. **Execute o Projeto**
   Inicie o servidor de desenvolvimento com:
   ```bash
   npm start
   ```
   O projeto será aberto automaticamente no seu navegador, geralmente em `http://localhost:3000`.

## Uso

1. **Acesse a Página Inicial**
   - O projeto inicia na página `FuriaChatWelcome.js`, uma tela de boas-vindas.
   - Clique em "Entrar" para acessar o chat em `FuriaChatHome.js`.

2. **Interaja com o Chat**
   - Insira seu nome no campo "Insira o seu nome" (ex.: "joao1").
   - Digite mensagens no campo "Digite a sua mensagem" e pressione Enter para enviar.
   - Experimente os comandos do `furiaBOT` (ex.: `/furia`, `/meme`, `/menu`).

3. **Visualize Notícias e Jogos**
   - A interface exibe notícias mockadas da FURIA e resultados de jogos recentes no lado esquerdo da tela.

## Estrutura do Projeto

- `src/pages/FuriaChatWelcome.js`: Página inicial de boas-vindas.
- `src/pages/FuriaChatHome.js`: Página principal do chat, onde a interação acontece.
- `src/pages/firebase.js`: Configuração do Firebase para conexão com o Firestore.
- `src/styles/FuriaChatHome.css`: Estilos CSS para o chat.
- `src/assets/images/`: Contém imagens como logos da FURIA, bordas, sombras e ícones.

## Solução de Problemas

- **Erro: "Module not found: Can't resolve 'firebase/app'"**
  - Certifique-se de que o Firebase está instalado:
    ```bash
    npm install firebase@9.22.0
    ```
  - Verifique se `src/pages/firebase.js` existe e está configurado corretamente.

- **Erro: "Execution Policy no PowerShell"**
  - Se estiver usando PowerShell e receber um erro sobre scripts desabilitados, ajuste a política de execução:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```

- **Mensagens Não Aparecem ou Scroll Não Funciona**
  - Verifique se a coleção `messages` existe no Firestore.
  - Confirme que o CSS em `FuriaChatHome.css` está ajustado para a altura correta (ex.: `.mensagens-chat { height: calc(100% - 10px); }`).

## Contribuições

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit das suas alterações (`git commit -m "Adiciona nova funcionalidade"`).
4. Envie para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Isso significa que você pode usar, copiar, modificar e distribuir o código livremente, desde que inclua a licença original e não responsabilize os criadores por quaisquer problemas. Para mais detalhes, veja o arquivo `LICENSE` ou consulte [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).

---

**Vamos rugir juntos com a FURIA! 🐆🔥**