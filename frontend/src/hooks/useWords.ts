import seedrandom from "seedrandom";

export const wordList = [
    'заметка', 'бизнес', 'задача', 'клиент', 'контракт', 'продукт', 'компания', 'предложение', 'сделка', 'рынок', 'товар', 'деньги', 'доход', 'прибыль', 'расходы', 'инвестиции', 'кредит', 'долг', 'банкротство', 'банк', 'финансы', 'отчет', 'бюджет', 'статистика', 'анализ', 'планирование', 'цель', 'стратегия', 'план', 'проект', 'менеджер', 'руководитель', 'сотрудник', 'коллега', 'начальник', 'подчиненный', 'работа', 'зарплата', 'премия', 'оклад', 'офис', 'карьера', 'реклама', 'маркетинг', 'продажи', 'клиентоориентированность', 'конкуренция', 'потребитель', 'бренд', 'логотип', 'репутация', 'доверие', 'инновация', 'технология', 'цифровизация', 'электронная коммерция', 'документ', 'договор', 'акт', 'сертификат', 'гарантия', 'счет', 'чек', 'квитанция', 'инструкция', 'правило', 'законодательство', 'регулирование', 'налог', 'лицензия', 'сертификация', 'аудит', 'контроль', 'ошибка', 'недостаток', 'риск', 'угроза', 'кризис', 'изменение', 'развитие', 'успех', 'провал', 'увольнение', 'банкротство', 'слияние', 'поглощение', 'корпорация', 'акционер', 'совладелец', 'партнер', 'конкурент', 'поставщик', 'дистрибьютор', 'клиент', 'потребитель', 'покупатель', 'заказчик', 'инвестор', 'консультант', 'юрисконсульт', 'бухгалтер', 'секретарь', 'ассистент', 'специалист', 'эксперт', 'профессионал', 'команда', 'конференция', 'встреча', 'переговоры', 'тренинг', 'семинар', 'форум', 'выставка', 'конференция'
  ]
    
  declare type GenerateOptions = {
    min?: number;
    max?: number;
    exactly?: number;
    minLength?: number;
    maxLength?: number;
    wordsPerString?: number;
    separator?: string;
    formatter?: (word: string, index: number) => string;
    seed?: string;
  };
  
  declare type JoinedWordsOptions = GenerateOptions & { join: string };
  
  declare function generate(count?: number): string | string[];
  declare function generate(options: GenerateOptions): string | string[];
  declare function generate(options: JoinedWordsOptions): string;
  
  declare const wordsList: string[];
  
  declare type CountOptions = {
    minLength?: number;
    maxLength?: number;
  };
  
  
    
    
  const shortestWordSize = wordList.reduce((shortestWord, currentWord) =>
    currentWord.length < shortestWord.length ? currentWord : shortestWord
  ).length;
  
  const longestWordSize = wordList.reduce((longestWord, currentWord) =>
    currentWord.length > longestWord.length ? currentWord : longestWord
  ).length;

  
  export function useWords(options: GenerateOptions) {
    // initalize random number generator for words if options.seed is provided
    const random = options?.seed ? new seedrandom(options.seed) : null;
    const { minLength, maxLength, ...rest } = options || {};
  
    function word() {
      let min =
        typeof minLength !== "number"
          ? shortestWordSize
          : limitWordSize(minLength);
  
      const max =
        typeof maxLength !== "number"
          ? longestWordSize
          : limitWordSize(maxLength);
  
      if (min > max) min = max;
  
      let rightSize = false;
      let wordUsed;
      while (!rightSize) {
        wordUsed = generateRandomWord();
        rightSize = wordUsed.length <= max && wordUsed.length >= min;
      }
      return wordUsed;
    }
    function randInt(lessThan) {
      const r = random ? random() : Math.random();
      return Math.floor(r * lessThan);
    }
    function generateRandomWord() {
      return wordList[randInt(wordList.length)];
    }
  
    // limits the size of words to the minimum and maximum possible
    function limitWordSize(wordSize) {
      if (wordSize < shortestWordSize) wordSize = shortestWordSize;
      if (wordSize > longestWordSize) wordSize = longestWordSize;
      return wordSize;
    }
  
    // random int as seeded by options.seed if applicable, or Math.random() otherwise
    
  
    // No arguments = generate one word
    if (options === undefined) {
      return word();
    }
  
    // Just a number = return that many words
    if (typeof options === "number") {
      options = { exactly: options };
    } else if (Object.keys(rest).length === 0) {
      return word();
    }
  
    // options supported: exactly, min, max, join
    if (options.exactly) {
      options.min = options.exactly;
      options.max = options.exactly;
    }
  
    // not a number = one word par string
    if (typeof options.wordsPerString !== "number") {
      options.wordsPerString = 1;
    }
  
    //not a function = returns the raw word
    if (typeof options.formatter !== "function") {
      options.formatter = (word) => word;
    }
  
    //not a string = separator is a space
    if (typeof options.separator !== "string") {
      options.separator = " ";
    }
  
    const total = options.min + randInt(options.max + 1 - options.min);
    let results: string[] = [];
    let token = "";
    let relativeIndex = 0;
  
    for (let i = 0; i < total * options.wordsPerString; i++) {
      if (relativeIndex === options.wordsPerString - 1) {
        token += options.formatter(word(), relativeIndex);
      } else {
        token += options.formatter(word(), relativeIndex) + options.separator;
      }
      relativeIndex++;
      if ((i + 1) % options.wordsPerString === 0) {
        results.push(token);
        token = "";
        relativeIndex = 0;
      }
    }
    if (typeof options.join === "string") {
      results = results.join(options.join);
    }
  
    return results;
  }
  