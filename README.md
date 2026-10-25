# CHORÃO ONLINE

Projeto familiar de RPG/MMORPG de aventura em 3D, planejado para navegador de computador e celular.

## Prévia web

O arquivo `index.html` contém uma prévia 3D estática com movimentação, câmera, cristais colecionáveis e controles para teclado/tela de toque. Ela serve como primeiro marco de publicação, não como versão final do MMORPG.

## Publicar com GitHub Pages

1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`.
4. Clique em **Save** e aguarde o GitHub concluir a publicação.
5. Use o endereço que aparecer na seção Pages para abrir o jogo.

## Estado e próximas etapas

- [x] Repositório criado.
- [x] Primeira prévia 3D enviada para `index.html`.
- [ ] Ativar e testar GitHub Pages.
- [ ] Integrar os sistemas completos do projeto existente.
- [ ] Hospedar o servidor multiplayer em um serviço separado.
- [ ] Implementar sincronização em tempo real, contas e salvamento persistente.
- [ ] Testar em computador e celular.

## Importante sobre o multiplayer

GitHub Pages hospeda arquivos estáticos; não executa o servidor Node.js. Para que dois jogadores em cidades diferentes vejam o mesmo mundo, será necessário hospedar o servidor multiplayer separadamente e configurar a conexão segura. Não envie senhas, tokens, arquivos de túnel ou credenciais para este repositório público.