'use strict'; // задаем режим совместимости ES5+

module.exports = 
function check(bracketsString) {
  let bracketsArray = [bracketsString]
  console.log("bracketsString",bracketsString)
  console.log("bracketsArray", bracketsArray)
  var i;
  var result = [];
  var len = bracketsArray.length; // определяем количество элементов перебираемого массива 

  /*
  Проверяем и выводим результат true (если все правильно), или false (если нарушены правила скобок)
  */

  //создаем цикл для переборки, ограничиваем предел шагов длиной строки
  for (i = 0; i < len; i++) {
    //if (isBalanced(values[i])) {
      if (isBalanced(bracketsArray[i])) {

      result = true;
    } else {
      result = false;
    }
  }
  return result;
}
/*
Описываем когда значение будет сбалансировано (будет пара ключей (открытие и закрытие))
*/
function isBalanced(str) {
  var i, stringSymbol;

  var bracketsMap = new Map(); // задаем пары КЛЮЧ--ЗНАЧЕНИЕ с помощью Map
  bracketsMap.set(']', '['); // с помощью .set задаем пары ключ - значение
  bracketsMap.set('}', '{'); // с помощью .set задаем пары ключ - значение
  bracketsMap.set(')', '('); // с помощью .set задаем пары ключ - значение
  bracketsMap.set('|', '|'); // с помощью .set задаем пары ключ - значение

  console.log('bracketsMap')
  console.log(bracketsMap) // отладка ключей пар мэпа

  // используя спрэд оператор преобразуем ключи Map в массив (копируем ключи в новый массив)
  var openingBrackets = [...bracketsMap.values()];
  console.log('openingBrackets')
  console.log(openingBrackets) // отладка открывающих скобок

  // используя спрэд оператор преобразуем значения Map в массив (копируем значения в новый массив)
  var closingBrackets = [...bracketsMap.keys()];
  console.log('closingBrackets')
  console.log(closingBrackets) // отладка закрывающих скобок


  /*
  На данном этапе у нас есть пары ключ-значение для скобок, массив с открывающими и массив с закрывающими скобками.
  Теперь мы должны провести сравнение
  */

  var temp = []; // создаем пустой временный массив
  var len = str.length; // длина строки, например длина элемента "[())]" - 5
  for (i = 0; i < len; i++) { // создаем цикл ограниченный в длину строки (i - индекс, начинаем с нуля и увеличиваем на 1 каждый цикл)
    stringSymbol = str[i]; // раскладываем нашу проверяемую строку посимвольно
    console.log("stringSymbol = ", stringSymbol)
    // перебираем сиволы


    // проверяем наличие нашего stringSymbol в массиве со скобками (если индекс вернул "-1", то такой элемент не найден)
    // берем наш stringSymbol и добавляем (push) его в массив temp (но только если это открывающиеся скобки!)
    // Если у нас строка типа [{()}] то по итогу в массив пушнется [,{,(

    if (openingBrackets.indexOf(stringSymbol) > -1) {
      temp.push(stringSymbol); 
       console.log('temp', temp)
       }
    // второе условие - для закрывающихся скобок
    // проверяем наличие нашего stringSymbol в массиве со скобками (если индекс вернул "-1", то такой элемент не найден)
    else if (closingBrackets.indexOf(stringSymbol) > -1 ) {
      // ! Здесь уже описывам условие работы с закрывающимися скобками
      // ! Также нужно понимать, что мы перебираем строку до первой ошибки, когда какая-то пара не совпадает - проверка прерывается с false 
      // наша ожидаемая скобка будет вторым значением и КЛЮЧОМ пары КЛЮЧ--ЗНАЧЕНИЕ из нашего мэпа, берем ее через .get по рассматриваемому символу stringSymbol    
      // myMap.get(key); синтаксис такой, поэтому мы ставили в паре КЛЮЧ--ЗНАЧЕНИЕ закрывающую скобку первой
      var expectedBracket = bracketsMap.get(stringSymbol); // получили пару-значение к ключу 
      console.log('expectedBracket = ', expectedBracket)

      // ИЛИ .pop - Удаляет последний элемент из массива и возвращает его (т.е. удалили и тут же сверили подходит ли он своей паре)
      // Начинаем с последнего так как скобки должны раскрываться и закрываться изнутри
      // т.е. сначала мы проверяем закрытие внутренник скобок (круглых к примеру) [()], а потом уже уровень вверх = квадратных
                  
    
                  if (temp.length === 0 || (temp.pop() !== expectedBracket)) {
   
                  return false;
             
      }
     
       console.log('temp', temp)

 


    } else {
      /* Если стрингсимвол не содержиться в обоих массивах, к примеру - сторониий символ, 
      то мы сразу начинаем следующий проход, не беря в рассчет этот символ
      */
      continue;
    }

     /*костыль от повторяемых скобок, в текущей вариации только для одного повторяемого значения*/
       
     if (temp.indexOf( '|' ) != -1 )
     {let uniqueValues = JSON.stringify(
       temp.reduce((acc, el) => {
         acc[el] = (acc[el] || 0) + 1;
         return acc;
       }, {}), null, 2);
       console.log('uniqueValues', uniqueValues)
       let uniqueValuesArrayTemp = Object.values(uniqueValues)
       let uniqueValuesArray = uniqueValuesArrayTemp.filter(number => number > 0);
       console.log('uniqueValuesArray ', uniqueValuesArray);
       if (uniqueValuesArray % 2 == 0) {
         temp = [];
       }}


  }
  console.log(temp)
  return (temp.length === 0);

}


//console.log(check("([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])(())"));
