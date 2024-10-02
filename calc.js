function calculator(input) {
    const romanToArabicMap = {
        'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
        'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
    };
    
    const arabicToRomanMap = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
        6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
        11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV',
        16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX',
        30: 'XXX', 40: 'XL', 50: 'L', 60: 'LX', 70: 'LXX', 80: 'LXXX', 90: 'XC', 100: 'C'
    };
    
    function isRoman(num) {
        return romanToArabicMap.hasOwnProperty(num);
    }

    function romanToArabic(roman) {
        return romanToArabicMap[roman];
    }

    function arabicToRoman(arabic) {
        if (arabic <= 0) return '';
        return arabicToRomanMap[arabic] || '';
    }

    function performOperation(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return Math.floor(a / b);
            default: throw new Error('Некорректная операция');
        }
    }

    const match = input.match(/^(\w+)\s*([+\-*/])\s*(\w+)$/);
    if (!match) {
        throw new Error('Некорректный формат');
    }

    let [, operand1, operator, operand2] = match;

    let isRomanMode = isRoman(operand1) && isRoman(operand2);
    let isArabicMode = !isNaN(operand1) && !isNaN(operand2);

    if (!(isRomanMode || isArabicMode)) {
        throw new Error('Операнды должны быть либо арабскими, либо римскими числами одновременно');
    }

    let a, b;
    
    if (isRomanMode) {
        a = romanToArabic(operand1);
        b = romanToArabic(operand2);
    } else if (isArabicMode) {
        a = parseInt(operand1, 10);
        b = parseInt(operand2, 10);
    } else {
        throw new Error('Некорректные операнды');
    }

    if (a < 1 || a > 10 || b < 1 || b > 10) {
        throw new Error('Операнды должны быть в диапазоне от 1 до 10');
    }

    let result = performOperation(a, b, operator);

    if (isRomanMode) {
        return arabicToRoman(result);
    }

    return result.toString();
}

// Примеры использования:
// console.log(calculator("III + IV")); // Возвращает "VII"
// console.log(calculator("10 - 2"));   // Возвращает "8"
// console.log(calculator("5 * 6"));    // Возвращает "30"
// console.log(calculator("X / II"));   // Возвращает "V"
