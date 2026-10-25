# CHORÃO ONLINE — Demonstração 3D

Esta pasta contém uma fatia técnica isolada para validar a primeira etapa 3D no navegador. O jogo 2D original na raiz não foi substituído.

## Abrir
Depois que o GitHub Pages concluir a publicação, abra:
https://minip2305-netizen.github.io/CHORAO-ONLINE/3d/

## O que esta etapa implementa
- Renderização 3D com Babylon.js carregado pela CDN oficial.
- Clareira de fantasia criada no código, com iluminação, neblina, sombras, vegetação, pedras e cristal mágico.
- Carregamento de um modelo humano GLB externo com animações, quando o dispositivo tem acesso à origem do modelo.
- Controles WASD/setas, corrida e controle virtual por toque.
- Objetivo local simples para aproximar-se e despertar o cristal.

## O que ainda NÃO está pronto
- Multiplayer: nenhum servidor ou sincronização entre dispositivos nesta demonstração.
- Personagem definitivo: o modelo Cesium Man é uma amostra técnica para validar importação/rig/animação, não é o herói final do CHORÃO ONLINE.
- Persistência, inventário real, combate, missões persistentes, áudio final e otimização de produção.
- Testes reais em todos os navegadores/celulares.

## Créditos e licença do modelo de teste
Modelo “Cesium Man”, da Cesium, disponibilizado no repositório glTF Sample Assets do Khronos Group sob Creative Commons Attribution 4.0 International (CC BY 4.0). Esta atribuição se aplica ao modelo de amostra, não ao projeto CHORÃO ONLINE.
- Fonte do modelo: https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CesiumMan
- Licença do modelo: https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/CesiumMan/LICENSE.md
- Babylon.js: https://www.babylonjs.com/
- Esta página carrega Babylon.js e o modelo de teste de origens externas; uma conexão com internet é necessária.

## Critério para avançar
Não marcar esta etapa como concluída até confirmar a publicação, carregamento do modelo, movimento/animação, controles de toque e ausência de erros bloqueantes. O multiplayer exige um servidor persistente separado do GitHub Pages.
