# Tradução de Libras para Texto com MediaPipeHands

Este projeto utiliza a biblioteca MediaPipeHands para interpretar sinais da Língua Brasileira de Sinais (Libras) por meio de uma webcam. Os sinais detectados são então traduzidos para texto escrito e exibidos.

## Configuração

### Requisitos
- Navegador da web com suporte à webcam

### Instalação
1. Clone o repositório: `git clone https://github.com/seu-usuario/nome-do-repositorio.git`
2. Abra `index.html` no seu navegador da web preferido.

## Uso

1. Abra a página da web em seu navegador.
2. Conceda acesso à webcam quando solicitado.
3. Realize sinais da Libras na frente da webcam.

## Explicação do Código

### Variáveis
- `video`: Referência ao elemento de vídeo HTML.
- `translatedTextElement`: Referência ao elemento HTML para exibição do texto traduzido.
- `translatedText`: Variável para armazenar o texto traduzido.

### Configuração do MediaPipeHands
```javascript
// ... (código para configurar o MediaPipeHands)


### Configuração da Stream de Vídeo

// ... (código para obter e configurar a stream de vídeo)

### Manipulação dos Resultados da Detecção de Mãos

// ... (código para lidar com os resultados da detecção de mãos)

### Cálculo de Sinais da Libras

// ... (código para calcular sinais da Libras com base nas posições das mãos)

### Funções de Tradução

// ... (código para traduzir sinais e chamar o serviço de tradução)

### Movimentação de Imagem com Base no Sinal

// ... (código para mover uma imagem com base no sinal da Libras detectado)

### Event Listeners para Botões

// ... (código para funções de tradução de texto e fala do texto traduzido)

### Funções de Tradução e Fala

// ... (código para funções de tradução de texto e fala do texto traduzido)



