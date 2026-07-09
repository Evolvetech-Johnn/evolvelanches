# Guia Completo: Transformando "The Rooster" em App Android (Play Store)

Este guia detalha o processo de transformação do seu sistema web React (Vite) em um aplicativo Android nativo utilizando o **Capacitor**.

> **Nota:** As configurações iniciais (instalação e criação do projeto Android) já foram executadas por mim. Você deve seguir a partir do **Passo 4** se estiver apenas configurando o visual, ou ler tudo para entender o processo.

---

## 1. Pré-requisitos (Ambiente de Desenvolvimento)

Para gerar o aplicativo final (`.apk` ou `.aab`), você precisará instalar em seu computador:

1.  **Node.js** (Já instalado).
2.  **Android Studio** (Essencial para compilar o app).
    - Baixe em: [developer.android.com/studio](https://developer.android.com/studio)
    - Durante a instalação, certifique-se de instalar o **Android SDK** e o **Android Virtual Device** (emulador).
3.  **Java JDK** (Geralmente vem com o Android Studio, mas o JDK 17 é recomendado).

---

## 2. O que já foi feito (Configuração Inicial)

Eu já executei os seguintes comandos no seu projeto:

1.  **Instalação do Capacitor:**

    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/android
    ```

2.  **Inicialização do Capacitor:**

    ```bash
    npx cap init "The Rooster" "com.evolvetech.therooster" --web-dir=dist
    ```

    - _Nome do App:_ The Rooster
    - _Package ID:_ `com.evolvetech.therooster` (Identificador único na Play Store)
    - _Diretório Web:_ `dist` (Padrão do Vite)

3.  **Adição da Plataforma Android:**
    ```bash
    npm run build
    npx cap add android
    ```
    Isso criou a pasta `android/` na raiz do projeto. É lá que vive o código nativo.

---

## 3. Comandos do Dia a Dia

Sempre que você alterar o código do site (React) e quiser atualizar o App:

1.  Gere o build do React:
    ```bash
    npm run build
    ```
2.  Sincronize com o projeto Android:
    ```bash
    npx cap sync
    ```
    _Este comando copia a pasta `dist` atualizada para dentro da pasta `android`._

---

## 4. Personalizando o App (Ícones e Splash Screen)

Para que o app não fique com o ícone padrão do Capacitor, você deve alterá-los no Android Studio.

1.  Abra o projeto no Android Studio:

    ```bash
    npx cap open android
    ```

    _(Ou abra o Android Studio manualmente e selecione a pasta `android` dentro do projeto)._

2.  **Alterar Ícone:**
    - No Android Studio, clique com o botão direito na pasta `app` > `res`.
    - Vá em **New** > **Image Asset**.
    - Selecione o logo do The Rooster (`src/assets/logotherooster.png` ou uma versão quadrada).
    - Ajuste o tamanho e fundo. O Android Studio gerará todos os tamanhos necessários.

3.  **Alterar Nome de Exibição (se necessário):**
    - Arquivo: `android/app/src/main/res/values/strings.xml`
    - Tag: `<string name="app_name">The Rooster</string>`

---

## 5. Testando no Emulador ou Celular

1.  Conecte seu celular Android via USB (ative a Depuração USB nas opções de desenvolvedor) OU crie um emulador no Android Studio.
2.  No Android Studio, clique no botão **Run** (triângulo verde "play").
3.  O app será instalado e aberto no dispositivo.

---

## 6. Gerando o Arquivo para a Play Store (Produção)

A Play Store exige um arquivo `.aab` (Android App Bundle) assinado.

1.  No Android Studio, vá no menu **Build** > **Generate Signed Bundle / APK**.
2.  Selecione **Android App Bundle** e clique em Next.
3.  **Key Store Path:** Clique em "Create new...".
    - Isso cria sua "assinatura digital". **GUARDE ESSE ARQUIVO E A SENHA COM SUA VIDA.** Se perder, nunca mais poderá atualizar o app na loja.
    - Preencha os dados (Alias, Senha, Validade 25+ anos, Nome da empresa).
4.  Selecione a chave criada, digite as senhas e clique em Next.
5.  Selecione **release** e clique em **Create** (ou Finish).
6.  O arquivo `.aab` será gerado na pasta `android/app/release/`.

---

## 7. Publicando na Google Play Store

1.  **Crie uma conta de desenvolvedor:**
    - Acesse [play.google.com/console](https://play.google.com/console).
    - Pague a taxa única de registro (aprox. US$ 25).
2.  **Criar App:**
    - Clique em "Criar app".
    - Preencha Nome, Idioma (Português), App (não jogo), Gratuito.
3.  **Configuração da Loja:**
    - Upload do Ícone (512x512px).
    - Imagem de destaque (1024x500px).
    - Screenshots do app (Tire prints do emulador ou celular).
    - Descrição curta e completa.
4.  **Lançamento (Release):**
    - Vá em "Produção" > "Criar nova versão".
    - Faça o upload do arquivo `.aab` que você gerou no Passo 6.
    - Defina o nome da versão (ex: 1.0.0).
5.  **Revisão:**
    - Preencha a classificação de conteúdo, público-alvo, notícias, etc.
    - Envie para revisão. O Google leva de 1 a 7 dias para aprovar.

---

## Dicas Importantes para o The Rooster

- **Botão Voltar do Android:** O Capacitor já lida bem com isso, mas verifique se ao apertar "Voltar" no celular ele volta a página no navegador.
- **Permissões:** Se no futuro precisar de Câmera ou Geolocalização GPS, precisará adicionar permissões no arquivo `AndroidManifest.xml`.
- **Updates:** Se mudar apenas código JS/CSS/HTML, você pode usar serviços como "Appflow" para atualizar sem passar pela loja, ou simplesmente gerar um novo `.aab` e subir na loja como atualização.
