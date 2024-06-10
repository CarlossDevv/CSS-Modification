const container = document.querySelector('.container');
const flexDirectionSelect = document.getElementById('flexDirection');

flexDirectionSelect.addEventListener('change', () => {
    const selectedValue = flexDirectionSelect.value;
    container.style.flexDirection = selectedValue;
});

const cssEditor = document.getElementById('cssEditor');
const boxes = document.querySelectorAll('.box');
const suggestionsContainer = document.getElementById('suggestions');

// Mapa de sugestões de CSS com base nas iniciais
const cssSuggestions = {
    'w': 'width: ;',
    'h': 'height: ;',
    'b': 'background: ;',
    'm': 'margin: ;',
    'p': 'padding: ;',
    'ali': 'align-items: ;',
    'ju': 'justify-content: ;',
    'dis': 'display: ;',
    'bor': 'border: ;',
    'bo': 'border-radius: ;',
    
    
    // Adicione mais sugestões conforme necessário
};

// Função para exibir sugestões de CSS
function showSuggestions(input) {
    suggestionsContainer.innerHTML = '';
    const initial = input.charAt(0).toLowerCase();
    const suggestions = Object.keys(cssSuggestions).filter(key => key.startsWith(initial));
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = cssSuggestions[suggestion];
        suggestionElement.addEventListener('click', () => {
            const currentCss = cssEditor.value.trim();
            cssEditor.value = currentCss ? `${currentCss} ${cssSuggestions[suggestion]}: ;` : `${cssSuggestions[suggestion]}: ;`;
            suggestionsContainer.innerHTML = '';
            cssEditor.focus();
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}

cssEditor.addEventListener('input', () => {
    const cssCode = cssEditor.value;
    boxes.forEach(box => {
        box.style.cssText = '';
        box.setAttribute('style', cssCode);
    });
    showSuggestions(cssCode);
});

cssEditor.addEventListener('focusout', () => {
    suggestionsContainer.innerHTML = '';
});