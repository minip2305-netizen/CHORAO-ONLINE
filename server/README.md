# CHORÃO ONLINE — servidor multiplayer inicial

Esta pasta contém a **base de desenvolvimento** de um servidor Colyseus. Ela não está hospedada nem conectada ao cliente publicado ainda.

## Requisitos

- Node.js 20 ou superior
- Um host que mantenha processo Node.js ativo e aceite WebSockets
- Porta configurável por `PORT` (padrão local: 2567)

## Executar para desenvolvimento

A partir desta pasta:

```bash
npm install
npm run dev
```

Compilar e iniciar:

```bash
npm run build
npm start
```

A sala inicial chama-se `vale`. Ela mantém os jogadores conectados e publica suas posições pelo estado sincronizado do Colyseus. A mensagem `move` aceita coordenadas-alvo e rotação, com limites por atualização e limites do mapa.

## Estado e segurança

- Este é apenas o primeiro esqueleto de sala e estado sincronizado.
- O cliente 3D atual ainda não se conecta a este servidor.
- Ainda não há autenticação, sala privada com código, persistência em banco, validação completa de velocidade/tempo, combate autoritativo ou reconexão.
- Não coloque senhas, tokens ou credenciais no repositório.
- Não exponha o servidor à internet antes de adicionar autenticação, rate limiting e validação mais rigorosa de movimento.
- GitHub Pages hospeda o cliente estático; não executa este processo Node.js.

## Próximas etapas

1. Instalar dependências e compilar em ambiente Node.js.
2. Adicionar testes de sala e validação de mensagens.
3. Implementar criação/entrada em sala privada.
4. Integrar cliente Babylon.js usando Colyseus SDK.
5. Hospedar o processo num serviço compatível com WebSockets.
6. Somente então testar computador e celular em redes diferentes.
