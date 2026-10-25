# CHORÃO ONLINE — Arquitetura Web 3D e Multiplayer

## Decisão de produto
- Jogo 3D de fantasia estilizada, original, inspirado no nível de acabamento de MMORPGs como World of Warcraft, sem copiar personagens, marcas, mapas, história, sons ou assets proprietários.
- Execução obrigatória no navegador, em desktop e celular.
- Não exigir que o jogador instale software.
- Alvo inicial: uma região pequena, bonita e jogável; ampliar só depois de validar o visual, desempenho e multiplayer.

## Fundação inicial do servidor multiplayer — branch de desenvolvimento

Foi criada a branch `feature/multiplayer-server-foundation` com uma estrutura inicial em `server/`:
- `package.json` e `tsconfig.json` para Node.js/TypeScript.
- `src/index.ts` com uma sala Colyseus chamada `vale`, estado sincronizado de jogadores e limites básicos de coordenadas.
- `README.md` com instruções de execução, limites e próximos passos.

**Ainda não está integrado à página 3D nem hospedado.** O esqueleto não deve ser considerado testado ou pronto para exposição pública. Antes de integrar, é necessário instalar dependências, compilar, escrever testes, endurecer a validação do movimento e só então conectar o cliente. A branch separada preserva a versão publicada enquanto a infraestrutura é desenvolvida.

## Estado real do protótipo publicado — 25/10/2026

A página `/3d/` já contém uma primeira fatia jogável local: cenário procedural, câmera de terceira pessoa, controles de teclado e toque, criatura hostil, ataque básico, pulso arcano, vida, vigor, XP, emblemas e missão do cristal. O progresso é salvo no `localStorage` do navegador/dispositivo.

Limites importantes, sem confundir protótipo com jogo concluído:
- O personagem humano atual é o modelo de demonstração CesiumMan do repositório Khronos glTF Sample Assets, usado provisoriamente para validar importação/animação; não é o herói final.
- O modelo depende de download externo. Se o recurso falhar, a página mostra um aviso; a execução visual completa ainda precisa ser validada em navegadores reais.
- O salvamento é local ao navegador. Não sincroniza entre computador e celular.
- Ainda não há servidor de jogo, salas compartilhadas, contas, banco de dados nem multiplayer real.
- A publicação mais recente do GitHub Pages foi concluída com sucesso; isso confirma a publicação dos arquivos, não a validação de todos os recursos dentro do navegador.

Próxima prioridade: validar carregamento do personagem e controles em desktop/celular, corrigir falhas observadas e só então iniciar o servidor multiplayer persistente.

## Arquitetura escolhida

### Cliente
- Babylon.js como motor 3D web.
- WebGL como caminho de compatibilidade; WebGPU apenas quando disponível e validado, com fallback.
- TypeScript e build estático para organizar o código e entregar os arquivos do cliente.
- Modelos de personagens, monstros e equipamentos em glTF 2.0 / GLB.
- Interface adaptativa: teclado e mouse no computador; controles táteis no celular.
- Otimização móvel desde o começo: LOD, compressão de texturas, carregamento sob demanda, limites de sombras/partículas e qualidade gráfica selecionável.

### Servidor de jogo
- Node.js + TypeScript + Colyseus usando WebSockets.
- Servidor autoritativo: o cliente envia intenções/inputs; o servidor valida movimento, combate, recompensas e estado compartilhado.
- Salas privadas inicialmente, permitindo ao proprietário e à filha entrarem no mesmo mundo.
- Reconexão e tratamento de queda de conexão antes de adicionar sistemas complexos.
- Nunca confiar no cliente para definir XP, inventário, dano ou recompensas.

### Persistência
- Banco de dados relacional (PostgreSQL quando houver hospedagem adequada) para contas/identidade, personagens, inventário, equipamento, progresso e configurações.
- Segredos e credenciais somente no servidor; nunca em arquivos públicos do site.
- GitHub Pages pode hospedar o cliente estático, mas não mantém um servidor multiplayer ativo. O servidor Colyseus precisa de hospedagem própria/gerenciada compatível com WebSockets e processo persistente.

## Padrão visual obrigatório
1. Não usar cubos, esferas ou cápsulas como personagem final.
2. Usar personagens completos com licença de uso verificada, malha, materiais/texturas, esqueleto e animações coerentes.
3. Usar uma direção artística consistente entre herói, NPCs, monstros, cenário, armas e interface.
4. Validar o modelo em jogo real: silhueta, rosto, movimento, escala, iluminação e leitura a distância.
5. Não chamar uma cena de “qualidade WoW” apenas por ter 3D, bloom ou sombras. O acabamento depende dos assets, animação, direção de arte e otimização.

## Etapas de implementação

### Etapa 1 — Vertical slice visual 3D (próxima)
- Criar uma nova rota/branch de teste para Babylon.js sem destruir a versão publicada atual.
- Renderizar uma pequena clareira original com terreno, árvores, rochas, iluminação, câmera de terceira pessoa e controles desktop/touch.
- Integrar pelo menos um personagem humanoide GLB com licença confirmada e animações de idle/walk/run.
- Testar em Chrome desktop e navegador móvel.
- Se o modelo não carregar ou sua licença não estiver clara, não o tratar como asset final; registrar a limitação e substituir por asset verificado.

### Etapa 2 — Jogabilidade local
- Colisão, navegação, interação com NPC, um inimigo, ataque básico, vida e HUD.
- Inventário e missões reais em vez de mensagens simuladas.
- Configurações gráficas para celular.

### Etapa 3 — Multiplayer mínimo
- Hospedar Colyseus em serviço com WebSockets.
- Criar sala privada e mostrar dois jogadores simultaneamente.
- Sincronizar movimento com interpolação e validar inputs no servidor.
- Testar computador e celular em redes diferentes.

### Etapa 4 — Salvamento e sistemas
- Persistência de personagem, inventário, XP, missões e equipamentos.
- Autenticação apropriada e regras de acesso.
- Tratamento de reconexão e testes de integridade.

### Etapa 5 — Conteúdo e expansão
- Vila inicial, NPCs, cadeia de missões, criaturas, masmorra e chefe.
- Mais regiões apenas depois de qualidade, desempenho e estabilidade da primeira região.

## Critérios de aceite da Etapa 1
- A página abre sem instalação e sem erro fatal.
- O cenário é realmente 3D e a câmera acompanha o personagem.
- O personagem é um modelo completo importado, não uma figura montada com primitivas.
- Existe ao menos animação idle e walk/run funcional, conforme disponível no asset.
- Teclado funciona no PC e controles táteis funcionam no celular.
- A cena permanece utilizável em hardware móvel; reduzir efeitos antes de sacrificar fluidez.
- A versão atual continua recuperável caso a experiência de teste falhe.

## Limites e custos
- Babylon.js e Colyseus são tecnologias; não fornecem automaticamente arte profissional, hospedagem, banco de dados nem um MMORPG pronto.
- A qualidade dos personagens depende de encontrar ou produzir assets de boa qualidade e de conferir as licenças.
- Multiplayer real requer servidor acessível continuamente. Um site estático, sozinho, não é suficiente.
- O desempenho final depende do dispositivo, navegador, tamanho dos modelos, texturas, iluminação e número de entidades.
